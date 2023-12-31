import { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import useFetchData from '../../../../../components/hooks/useFetchData'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'
import useAxios from '../../../../../components/hooks/useAxios'
import Input from '../../../../../components/ui/input/Input'
import { useNavigate, useParams } from 'react-router'
import Spinner from '../../../../../components/ui/Spinner'

const ViewProperty = () => {
    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    type Inputs = {
        property_type: string
        description: string
    }

    type FormInputs = {
        label: keyof Inputs
        type?: string
        pre?: string
    }

    const params = useParams()

    const property_id = params.id?.replace(':', '')
    const navigate = useNavigate()

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const axiosInstance = useAxios({
        is_form_data: false,
    })

    const get_request = () => {
        return axiosInstance({
            url: `/platformsettings/propertytype/getbyid/${property_id}`,
        })
    }

    const postRequest = (inputs: Inputs) => {
        console.log({ inputs })
        return axiosInstance({
            url: `/platformsettings/propertytype/update/${property_id}`,
            method: 'put',
            data: inputs,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    const postDelete = () => {
        return axiosInstance({
            url: `/platformsettings/propertytype/delete/${property_id}`,
            method: 'delete',
        })
    }

    const { isLoading, data, error } = useQuery(
        `property_type_${property_id}`,
        get_request,
        {
            onSuccess: ({ data }) => {
                const { property_type, description } = data

                reset({
                    property_type,
                    description,
                })
            },
        }
    ) as any

    const { mutate: post_mutation, isLoading: post_loading } = useMutation(
        postRequest,
        {
            onSuccess: () => {
                toast(`Property Updated successfully`, {
                    type: 'success',
                    className:
                        'bg-green-100 text-green-600 text-[1.4rem] capitalize',
                })
            },
            onError: (err: any) => {
                toast(`${err?.response.data.message}`, {
                    type: 'error',
                    className:
                        'bg-red-100 text-red-600 text-[1.4rem] capitalize',
                })
            },
        }
    )

    const queryClient = useQueryClient()
    const { mutate: delete_mutation, isLoading: delete_loading } = useMutation(
        postDelete,
        {
            onSuccess: () => {
                toast(`Property deleted successfully`, {
                    type: 'success',
                    className:
                        'bg-green-100 text-green-600 text-[1.4rem] capitalize',
                })

                closeDialog()
            },
            onError: (err: any) => {
                toast(`${err?.response.data.message}`, {
                    type: 'success',
                    className:
                        'bg-green-100 text-green-600 text-[1.4rem] capitalize',
                })
            },

            onSettled: () => {
                queryClient.invalidateQueries('propertyType')
                navigate(-1)
            },
        }
    ) as any

    const onSubmit = handleSubmit((data) => {
        setResponseMessage(null)

        post_mutation(data)
    })

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error.message}</p>
    }

    const formInputs = [
        {
            label: 'property_type',
        },
        {
            label: 'description',
            type: 'textarea',
            pre: ' Maximum of 30 Characters',
        },
    ] satisfies FormInputs[]

    return (
        <>
            <ToastContainer />
            <Spinner start={post_loading} />
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8 relative'>
                        <img
                            src='/icons/admins/modalDeactivate.svg'
                            alt=''
                            className='animate__animated animate__pulse '
                            style={{
                                animationIterationCount: 'infinite',
                            }}
                        />
                        <p>Are you sure you want to delete this Property?</p>

                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='btn bg-white text-[#0556E5] border-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={closeDialog}
                            >
                                Cancel
                            </button>
                            <button
                                className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem] capitalize'
                                onClick={() => delete_mutation()}
                            >
                                {delete_loading ? 'Loading...' : 'delete'}
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>
            <div className='grid text-[1.6rem] border rounded-lg bg-white'>
                <div className=' p-10  rounded-lg '>
                    <div className='flex w-full border-b items-center pb-5 justify-between'>
                        <h2 className='heading2'>{data?.data.property_type}</h2>

                        <button
                            className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                            onClick={openDialog}
                        >
                            <img src='/icons/admins/delete.svg' alt='' />
                            <span className='text-red-600 text-[1.4rem] font-semibold capitalize'>
                                delete
                            </span>
                        </button>
                    </div>
                </div>
                {responseMessage?.displayMessage && (
                    <p className='text-center'>
                        <span className={responseMessage?.className}>
                            {responseMessage?.displayMessage}
                        </span>
                    </p>
                )}
                <form
                    className='grid gap-8 mt-8 p-8 max-w-[60rem]'
                    onSubmit={onSubmit}
                >
                    <>
                        {formInputs.map((input, idx) => {
                            const { label, type, pre } = input
                            return (
                                <Input
                                    key={idx + label}
                                    label={label}
                                    pre={pre}
                                    register={register}
                                    formErrors={formErrors}
                                    type={type}
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
                            {post_loading ? 'Loading...' : 'Save'}
                        </button>
                    </>
                </form>
            </div>
        </>
    )
}

export default ViewProperty
