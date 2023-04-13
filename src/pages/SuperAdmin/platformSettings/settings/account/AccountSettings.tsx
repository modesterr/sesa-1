import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'

const AccountSettings = () => {
    type FormInputs = {
        label: string
        type?: string
        pre?: string
    }

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    type Inputs = {
        property_type: string
        description: string
    }

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

        const {
            register,
            handleSubmit,
            reset,
            formState: { errors: formErrors },
        } = useForm<Inputs>()

    const handlePicture = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]

        const preview = URL.createObjectURL(file)
        setPhotoPreview(preview)
        setImageFile(file)
    }

    const onSubmit = handleSubmit((data) => {
        setResponseMessage(null)

        const adminData = {
            ...data,
            transferable_fee: 30,
        }

        mutate(adminData)
    })

    const formInputs = [
        {
            label: 'Current Password',
            type: 'password',
        },
        {
            label: 'New Password',
            type: 'password',
        },
        {
            label: 'Re-Enter New Password',
            type: 'password',
        },
    ] satisfies FormInputs[]

    return (
        <>
            <ToastContainer />
            <div className=' p-8 bg-white h-[80vh] overflow-y-scroll rounded-lg'>
                <figure className='grid text-center justify-start'>
                    <input
                        type='file'
                        name='photoUpload'
                        id='photoUpload'
                        accept='image/*'
                        className='hidden'
                        onChange={handlePicture}
                    />
                    <img
                        src={photoPreview}
                        alt='photoPreview'
                        className='object-cover w-[11rem] h-[11rem] rounded-full object-top'
                    />
                    <label
                        htmlFor='photoUpload'
                        className='cursor-pointer text-color-blue-1 text-[1.6rem] text-center'
                    >
                        Edit
                    </label>
                </figure>

                <form
                    onSubmit={onSubmit}
                    className='grid max-w-[84rem] text-[1.6rem] mt-[5rem] gap-10'
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    <>
                        {formInputs.map((input, idx) => {
                            const { label, type, name, pre, tag } = input
                            return (
                                <Input
                                    key={idx + label}
                                    label={label}
                                    pre={pre}
                                    tag={tag}
                                    register={register}
                                    formErrors={formErrors}
                                    type={type}
                                    minLength={0}
                                    name={name}
                                />
                            )
                        })}

                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full mt-[10rem]'
                            style={{ justifySelf: 'start' }}
                        >
                            <span>
                                <img
                                    src='/icons/admins/saveDisk.svg'
                                    alt=''
                                    className='w-[1.7rem] h-[1.7rem]'
                                />
                            </span>{' '}
                            {mutation_loading ? 'Loading...' : 'Save Changes'}
                        </button>
                    </>

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full mt-[10rem]'
                        style={{ justifySelf: 'start' }}
                    >
                        <span>
                            <img
                                src='/icons/admins/saveDisk.svg'
                                alt=''
                                className='w-[1.7rem] h-[1.7rem]'
                            />
                        </span>{' '}
                        Save Changes
                    </button>
                </form>
            </div>
        </>
    )
}

export default AccountSettings
