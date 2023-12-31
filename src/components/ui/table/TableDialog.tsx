import React, {
    ChangeEvent,
    FormEvent,
    useEffect,
    useRef,
    useState,
} from 'react'
import { useTableContext } from './Table'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { IoMdClose } from 'react-icons/io'
import SingleSelect from '../select/SingleSelect'
import { useNavigate } from 'react-router'

function TableDialog() {
    const {
        axiosInstance,
        deactivateProp,
        fetchedId,
        title,
        isDialogOpen,
        is_addWithin,
        setIsDialogOpen,
        isCategory,
        delete_item_url,
        titleDialog,
    } = useTableContext()

    const [artisanCategory, setArtisanCategory] = useState('')
    const [propertyCode, setPropertyCode] = useState<string>('')

    const navigate = useNavigate()

    const postRequest = () => {
        const { url, tag = 'id' } = deactivateProp ?? {}

        if (isCategory && isDialogOpen.type === 'create') {
            return axiosInstance({
                url: '/admin/category',
                method: 'post',
                data: { name: artisanCategory },
            })
        }

        if (isDialogOpen.type === 'delete') {
            return axiosInstance({
                url: `${delete_item_url}${fetchedId}`,
                method: 'delete',
                data: { id: fetchedId },
            })
        }

        return axiosInstance({
            url,
            method: 'post',
            data: { [tag]: fetchedId },
        })
    }

    const queryClient = useQueryClient()
    const messageTitle = title.replace(/([a-z])([A-Z])/g, '$1 $2')
    const type = isDialogOpen.type

    console.log({ title })

    const prevData: any[] = []
    const { mutate, isLoading } = useMutation(postRequest, {
        onMutate: async () => {
            if (['delete', 'remove'].indexOf(isDialogOpen.type) < 0) {
                await queryClient.cancelQueries(title)

                const previousData: any = await queryClient.getQueryData(title)
                prevData.push(structuredClone(previousData))

                const prev =
                    previousData.data.data || previousData.data || previousData
                if (prev) {
                    let index_to_replace = 0
                    let updatedData = prev
                        .filter((data: any, idx: number) => {
                            if (data.id === fetchedId) {
                                index_to_replace = idx
                                return data
                            }
                        })
                        .map((gotten_data: any) => {
                            let status = 1

                            if (gotten_data.status) {
                                status = 0
                            }

                            return {
                                ...gotten_data,
                                status,
                            }
                        })

                    const cloneOld: any[] = prev

                    cloneOld.splice(index_to_replace, 1, ...updatedData)

                    queryClient.setQueryData(title, (updatedData: any) => {
                        const relevantData =
                            updatedData.data.data || updatedData.data

                        return {
                            ...relevantData,
                            data: [...cloneOld],
                        }
                    })
                }
            }
            closeDialog()
            return {
                previousData: prevData[0],
            }
        },

        onSuccess: () => {
            toast(`${messageTitle} ${type + 'd'} Successfully`, {
                type: 'success',
                className:
                    'bg-green-100 text-green-600 text-[1.4rem] capitalize',
            })
        },

        onError: (_error, _option, context) => {
            // queryClient.setQueryData(title, context?.previousData)

            toast(`Failed to ${type} ${messageTitle} `, {
                type: 'error',
                className: 'bg-red-100 text-red-600 text-[1.4rem] capitalize',
            })
        },
        onSettled: () => {
            closeDialog()
            queryClient.invalidateQueries(title)
        },
    })

    useEffect(() => {
        if (isDialogOpen.isOpen) {
            return openDialog()
        }
    }, [isDialogOpen.isOpen])

    const onSubmitCategory = (e: FormEvent) => {
        e.preventDefault()

        mutate()
    }

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const closeDialog = () => {
        setIsDialogOpen({
            isOpen: false,
            type: '',
        })
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    return (
        <dialog className='dialog' ref={dialogRef}>
            <section className='grid place-content-center w-full h-[100vh]'>
                <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8 relative'>
                    {isCategory && isDialogOpen.type === 'create' ? (
                        <>
                            <IoMdClose
                                className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                                onClick={() => closeDialog()}
                            />
                            <form
                                className='grid gap-12'
                                onSubmit={onSubmitCategory}
                            >
                                <h3
                                    className='text-[2rem] font-Satoshi-Medium border-b '
                                    style={{
                                        fontFamily: 'Satoshi-Medium',
                                    }}
                                >
                                    Create Artisan Category
                                </h3>

                                <div className='w-full grid gap-4'>
                                    <label
                                        htmlFor='artisanCategory'
                                        className='text-[1.4rem] font-semibold'
                                    >
                                        Name
                                    </label>

                                    <input
                                        type='text'
                                        value={artisanCategory}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) => setArtisanCategory(e.target.value)}
                                        required
                                        id='artisanCategory'
                                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                                    />
                                </div>

                                <button className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'>
                                    {isLoading ? 'Loading...' : 'Create'}
                                </button>
                            </form>
                        </>
                    ) : is_addWithin && isDialogOpen.type === 'create' ? (
                        <>
                            <>
                                <IoMdClose
                                    className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                                    onClick={() => closeDialog()}
                                />
                                <div className='grid gap-12'>
                                    <h3
                                        className='text-[2rem] font-Satoshi-Medium border-b '
                                        style={{
                                            fontFamily: 'Satoshi-Medium',
                                        }}
                                    >
                                        Create Household
                                    </h3>
                                    <div className='w-[30rem]'>
                                        <SingleSelect
                                            state={[
                                                'ThomasEstate/SO-2345CDGK1',
                                                'ThomasEstate/SO-2345CDGK2',
                                                'ThomasEstate/SO-2345CDGK3',
                                                'ThomasEstate/SO-2345CDGK4',
                                                'ThomasEstate/SO-2345CDGK5',
                                            ]}
                                            label='Property Code*'
                                            isSearchable
                                            selectedState={propertyCode}
                                            setSelectedState={setPropertyCode}
                                        />
                                    </div>
                                    <button
                                        className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'
                                        onClick={() =>
                                            navigate(
                                                '/estateManager/household/create-household',
                                                {
                                                    state: {
                                                        propertyCode,
                                                    },
                                                }
                                            )
                                        }
                                    >
                                        Continue
                                    </button>
                                </div>
                            </>
                        </>
                    ) : (
                        <>
                            {['delete', 'remove'].includes(
                                isDialogOpen.type
                            ) ? (
                                <img
                                    src='/icons/admins/modalDeactivate.svg'
                                    alt=''
                                    className='animate__animated animate__pulse '
                                    style={{
                                        animationIterationCount: 'infinite',
                                    }}
                                />
                            ) : isDialogOpen.type === 'deactivate' ? (
                                <img
                                    src='/icons/admins/modalWarning.svg'
                                    alt=''
                                    className='animate__animated animate__pulse '
                                    style={{
                                        animationIterationCount: 'infinite',
                                    }}
                                />
                            ) : (
                                <img
                                    src='/icons/admins/modalSuccess.svg'
                                    alt=''
                                    className='animate__animated animate__pulse '
                                    style={{
                                        animationIterationCount: 'infinite',
                                    }}
                                />
                            )}

                            <p>
                                Are you sure you want to {isDialogOpen.type}{' '}
                                this{' '}
                                <span className='capitalize'>
                                    {titleDialog ??
                                        title.split(/(?=[A-Z])/).join(' ')}
                                    ?
                                </span>
                            </p>

                            <div className='flex w-full justify-center gap-8'>
                                <button
                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={closeDialog}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`${
                                        isDialogOpen.type === 'activate'
                                            ? 'bg-green-700'
                                            : 'bg-red-500'
                                    } py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem] capitalize`}
                                    onClick={() => mutate()}
                                >
                                    {isLoading
                                        ? 'Loading...'
                                        : `${isDialogOpen.type}`}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </dialog>
    )
}

export default TableDialog
