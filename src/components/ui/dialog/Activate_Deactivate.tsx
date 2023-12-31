import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { ToastContainer, toast } from 'react-toastify'
import useAxios from '../../hooks/useAxios'

interface Props {
    id: string
    url: string
    status: number
    title: string
    queryCache: string
}

function Activate_Deactivate({ id, url, status, title, queryCache }: Props) {
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const axiosInstance = useAxios()
    const [currentStatus, setCurrentStatus] = useState('activate')

    useEffect(() => {
        status ? setCurrentStatus('deactivate') : setCurrentStatus('activate')
    }, [status])

    const postDeactivate = () => {
        return axiosInstance({
            url,
            method: 'post',
            data: { id },
        })
    }

    const queryClient = useQueryClient()

    const { mutate, isLoading } = useMutation(postDeactivate, {
        onSuccess: (res) => {
            toast(`${title} ${currentStatus + 'd'} successfully`, {
                type: 'success',
                className:
                    'bg-green-100 text-green-600 text-[1.4rem] capitalize',
            })
        },
        onError: (err: any) => {
            toast(`Failed to ${currentStatus} ${title}`, {
                type: 'error',
                className: 'bg-red-100 text-red-600 text-[1.4rem] capitalize',
            })
        },

        onSettled: () => {
            queryClient.invalidateQueries(queryCache)
            return handleClose()
        },
    })

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

    const postHandler = () => {
        return mutate()
    }

    return (
        <>
            <ToastContainer />
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8 text-[1.6rem] '>
                        {currentStatus === 'activate' ? (
                            <>
                                <img
                                    src='/icons/admins/modalSuccess.svg'
                                    alt=''
                                    className='animate__animated animate__pulse '
                                    style={{
                                        animationIterationCount: 'infinite',
                                    }}
                                />

                                <p>
                                    Are you sure you want to activate this{' '}
                                    <span className='capitalize'>{title}</span>?
                                </p>
                            </>
                        ) : (
                            <>
                                <img
                                    src='/icons/admins/modalWarning.svg'
                                    alt=''
                                    className='animate__animated animate__pulse '
                                    style={{
                                        animationIterationCount: 'infinite',
                                    }}
                                />

                                <p>
                                    Are you sure you want to deactivate this{' '}
                                    <span className='capitalize'>{title}</span>?
                                </p>
                            </>
                        )}

                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={() => handleClose()}
                            >
                                Cancel
                            </button>
                            {currentStatus === 'activate' ? (
                                <button
                                    className='bg-green-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem] capitalize'
                                    onClick={postHandler}
                                >
                                    {isLoading ? 'Loading...' : 'activate'}
                                </button>
                            ) : (
                                <button
                                    className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem] capitalize'
                                    onClick={postHandler}
                                >
                                    {isLoading ? 'Loading...' : 'deactivate'}
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </dialog>

            <div className='font-Satoshi-Medium'>
                {currentStatus === 'deactivate' ? (
                    <button
                        className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                        onClick={() => handleOpen()}
                    >
                        <img src='/icons/admins/delete.svg' alt='' />
                        <span className='text-red-600 text-[1.4rem] font-semibold'>
                            Deactivate
                        </span>
                    </button>
                ) : (
                    <button
                        className='border border-green-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                        onClick={() => handleOpen()}
                    >
                        <span className='text-green-600 text-[1.4rem] font-semibold capitalize'>
                            Activate
                        </span>
                    </button>
                )}
            </div>
        </>
    )
}

export default Activate_Deactivate
