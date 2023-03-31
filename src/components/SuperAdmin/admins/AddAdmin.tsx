import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { useMutation } from 'react-query'
import { ModalContext } from '../../../Context/ModalContext'
import { AxiosRequest } from '../../../utils/axios'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'
import { storeToken } from '../../../utils/token'

const AddAdmin = () => {
    interface Inputs {
        email: string
        firstName: string
        lastName: string
        dateOfBirth: string
        Gender: string
        phoneNumber: number
    }

    const ModalContextData = useContext(ModalContext)
    const { handleOpen } = ModalContextData

    const [photoUrl, setPhotoUrl] = useState('')

    const handlePhotoPreview = async (
        value: React.MouseEvent<HTMLInputElement>
    ) => {
        const getUrl = await getPhotoUrl(`#photoUpload`)
        setPhotoUrl(getUrl)
    }

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault()

    //     handleOpen('renderedAdmins')
    // }

      const {
          register,
          handleSubmit,
          watch,
          formState: { errors: formErrors },
      } = useForm<Inputs>()

      type ResponseMessage = {
          className: string
          displayMessage: string
      }

      const [responseMessage, setResponseMessage] =
          useState<ResponseMessage | null>(null)

      // watch((values) => {
      //     console.log({ values })
      // })

      const postLogin = (data: Inputs) => {
          const user = {
              user: data.email,
              password: data.password,
          }

          return AxiosRequest({
              token: '',
              url: '/login',
              method: 'post',
              data: user,
          })
      }
      const {
          mutate,
          data: response_data,
          isLoading,
      } = useMutation(postLogin) as any

      useEffect(() => {
          if (response_data?.status === 200) {
              setResponseMessage({
                  className: 'text-green-600',
                  displayMessage: 'Login Successful',
              })
             
          } else {
              setResponseMessage({
                  className: 'text-red-600',
                  displayMessage: response_data?.response?.data.message,
              })
          }

          const timeoutId = setTimeout(() => {
              setResponseMessage(null)
          }, 1000 * 3)
      }, [response_data])

      const onSubmit = handleSubmit((data) => {
         
      })


    return (
        <div className='addAdmin'>
            <p className='addAdmin__heading'>Personal Information</p>
            <form onSubmit={onSubmit} className='addAdmin__formBox'>
                <section className='addAdmin__form'>
                    <div className='addAdmin__form--item'>
                        <label htmlFor='firstName'>First Name *</label>
                        <input type='text' required id='firstName' />
                    </div>
                    <div className='addAdmin__form--item'>
                        <label htmlFor='lastName'>Last Name *</label>
                        <input type='text' required id='lastName' />
                    </div>
                    <div className='addAdmin__form--item'>
                        <label htmlFor='date'>Date of Birth *</label>
                        <input type='date' id='date' required />
                    </div>
                    <div className='addAdmin__form--item'>
                        <label htmlFor='gender'>Gender *</label>
                        <div className='item__select'>
                            <select id='gender'>
                                <option hidden>&nbsp;</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </select>
                            <select {...register('gender', { required: true })}>
                                <option value='Mr'>Mr</option>
                                <option value='Mrs'>Mrs</option>
                                <option value='Miss'>Miss</option>
                                <option value='Dr'>Dr</option>
                            </select>
                            <GrDown />
                        </div>
                    </div>
                    <div className='addAdmin__form--phoneNumber'>
                        <label htmlFor='phoneNumber'>Phone Number *</label>

                        <div className='phoneNumber__box'>
                            <select>
                                <option value='234'>+234</option>
                            </select>
                            <input
                                required
                                type='number'
                                inputMode='numeric'
                                id='phoneNumber'
                                placeholder='Phone Number'
                            />
                        </div>
                    </div>
                    <div className='addAdmin__form--item'>
                        <label htmlFor='email'>Email Address *</label>
                        <input
                            required
                            type='email'
                            id='email'
                            placeholder='Your Email'
                        />
                    </div>
                    <div className='addAdmin__form--file'>
                        <label htmlFor='photoUpload'>
                            <img src='/icons/admins/photo_library.svg' alt='' />
                            <p>
                                Drag estate manager picture here or{' '}
                                <span>click</span> to upload
                            </p>
                        </label>
                        <input
                            type='file'
                            name='photoUpload'
                            id='photoUpload'
                            accept='image/*'
                            className='hidden'
                            onClick={handlePhotoPreview}
                        />

                        {photoUrl && (
                            <div className='file__uploadImgBox'>
                                <img
                                    src={photoUrl}
                                    alt='photoPreview'
                                    className='object-contain'
                                />
                            </div>
                        )}
                    </div>
                    <button
                        className='btn admins__btn'
                        style={{ justifySelf: 'start' }}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Add Admin
                    </button>
                </section>
            </form>
        </div>
    )
}

export default AddAdmin
