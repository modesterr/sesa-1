import React, { useContext, useEffect, useRef, useState } from 'react'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'
import { ModalContext } from '../../../Context/ModalContext'
import { Select } from '../../../components/SuperAdmin/UI/Select'
import Input from '../../../components/UI/Input'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useAppDispatch } from '../../../store/app/hooks'
import { AxiosRequest } from '../../../utils/axios'

const AddEstate = () => {
    interface Inputs {
        email_address: string
        first_name: string
        last_name: string
        dob: string
        gender: string
        phoneNumber: number
        photoUrl?: string
    }

    const dispatch = useAppDispatch()
    const [photoUrl, setPhotoUrl] = useState('')
    const [selectedState, setSelectedState] = useState<string | null>('')

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageUrl, setImageUrl] = useState<File | null>(null)

    const handlePicture = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]

        const preview = URL.createObjectURL(file)
        setPhotoPreview(preview)
        setImageUrl(file)
    }

    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const postAdmin = (data: Inputs) => {
        return AxiosRequest({
            dispatch,
            url: '/admin/create',
            method: 'post',
            data,
        })
    }
    const {
        mutate,
        data: response_data,
        isLoading,
    } = useMutation(postAdmin) as any

    useEffect(() => {
        console.log({ response_data })
        if (response_data?.status === 200) {
            handleOpen()
        } else {
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: response_data?.response?.data.message,
            })
        }

        // const timeoutId = setTimeout(() => {
        //     setResponseMessage(null)
        // }, 10000)
    }, [response_data])

    const onSubmit = handleSubmit((data) => {
        const {
            first_name,
            last_name,
            gender,
            dob,
            email_address,
            phoneNumber,
        } = data

        const adminData = {
            name: `${first_name} ${last_name}`,
            gender,
            dob,
            email: email_address,
            address: 'no 4 odeyim street',
            phone: `+234${phoneNumber}`,
            image: imageUrl?.name,
        }

        mutate(adminData)
    })

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    type FormInputs = {
        label: string
        type?: string
        name?: string
    }

    const formInputs = [
        {
            label: 'first_name',
        },
        {
            label: 'last_name',
        },
        {
            label: 'dob',
            type: 'date',
            name: 'date of birth',
        },
        {
            label: 'select',
        },
        {
            label: 'phone_number',
            type: 'number',
        },
        {
            label: 'email_address',
            type: 'email',
        },
    ] satisfies FormInputs[]

    return (
        <div className='bg-white rounded-lg p-8'>
            <form onSubmit={onSubmit} className='grid gap-4'>
                <p className='text-[2rem] font-Satoshi-Medium'>
                    Estate Details
                </p>
                <section
                    className='grid max-w-[84rem] gap-16 mt-12 '
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    {formInputs.map((input, idx) => {
                        const { label, type, name } = input
                        return idx === 1 ? (
                            <Select
                                label='Gender'
                                state={['Male', 'Female']}
                                selectedState={selectedState}
                                setSelectedState={setSelectedState}
                            />
                        ) : (
                            <Input
                                key={idx + label}
                                label={label}
                                register={register}
                                formErrors={formErrors}
                                type={type || 'text'}
                                name={name || undefined}
                            />
                        )
                    })}
                    <div className='addEstate__form'>
                        <div className='addEstate__form--item'>
                            <label htmlFor='firstName'>Estate Name *</label>
                            <input type='text' required id='firstName' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='lastName'>State *</label>
                            <div className='item__select'>
                                <select id='state'>
                                    <option hidden>&nbsp;</option>
                                    <option value='lagos'>Lagos</option>
                                    <option value='FCT'>FCT</option>
                                </select>
                                <GrDown />
                            </div>
                        </div>
                        <div className='addEstate__form--item col-span-full'>
                            <label htmlFor='address'>Address *</label>
                            <input type='text' id='address' required />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='estateManager'>
                                Estate Manager *
                            </label>
                            <div className='item__select'>
                                <select id='estateManager'>
                                    <option hidden>&nbsp;</option>
                                    <option value='manager'>Manager1</option>
                                    <option value='manager2'>Manager2</option>
                                </select>
                                <GrDown />
                            </div>
                        </div>

                        <div className='addEstate__form--item'>
                            <label htmlFor='securityCompaany'>
                                Security Company *
                            </label>
                            <div className='item__select'>
                                <select id='securityCompaany'>
                                    <option hidden>&nbsp;</option>
                                    <option value='company'>Company1</option>
                                    <option value='company2'>Company2</option>
                                </select>
                                <GrDown />
                            </div>
                        </div>
                    </div>
                </section>
                <section className='addEstate__box'>
                    <p className='addEstate__heading'>
                        Estate Convenience Fees
                    </p>
                    <div className='addEstate__form'>
                        <div className='addEstate__form--item'>
                            <label htmlFor='firstName'>Estate(%)</label>
                            <input type='text' required id='estatePercentage' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='lastName'>SESA(%)</label>
                            <input type='text' required id='sesaPercentage' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='date'>
                                Number of Resident User
                            </label>
                            <input
                                type='number'
                                id='residentUsersNo'
                                required
                            />
                        </div>

                        <div className='addEstate__form--item'>
                            <label htmlFor='additionalResidentUser'>
                                Additional Resident User
                            </label>
                            <input
                                required
                                type='text'
                                id='additionalResidentUser'
                            />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='signOutRequired'>
                                Sign Out Required
                            </label>
                            <div
                                className='item__select'
                                style={{
                                    width: '10rem',
                                }}
                            >
                                <select id='signOutRequired'>
                                    <option value='yes'>Yes</option>
                                    <option value='no'>No</option>
                                </select>
                                <GrDown />
                            </div>
                        </div>
                        <div className='addEstate__form--file'>
                            <label htmlFor='photoUpload'>
                                <img
                                    src='/icons/addEstates/photo_library.svg'
                                    alt=''
                                />
                                <p>
                                    Drag addEstate manager picture here or{' '}
                                    <span>click</span> to upload
                                </p>
                            </label>
                            <input
                                type='file'
                                name='photoUpload'
                                id='photoUpload'
                                accept='image/*'
                                className='hidden'
                                onChange={handlePicture}
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
                    </div>
                </section>
                <section className='addEstate__box'>
                    <p className='addEstate__heading'>Estate Account Details</p>
                    <div className='addEstate__form'>
                        <div className='addEstate__form--item'>
                            <label htmlFor='bankName'>Bank Name *</label>
                            <input type='text' required id='bankName' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='accountName'>Account Name *</label>
                            <input type='text' required id='accountName' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='accountNumber'>
                                Account Number *
                            </label>
                            <input type='number' id='accountNumber' required />
                        </div>
                    </div>
                </section>
                <button
                    className='btn addEstate__btn'
                    style={{ justifySelf: 'start' }}
                >
                    <span>
                        <IoMdAdd />
                    </span>{' '}
                    Add AddEstate
                </button>
            </form>
        </div>
    )
}

export default AddEstate
