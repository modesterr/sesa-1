import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { ViewHouseHoldContext } from '../../ViewHouseHold'

function Resident() {
    const { closeDialog } = useContext(ViewHouseHoldContext)

    interface Resident {
        resCode: string
        name: string
        gender: string
        phoneNo: string
        residentCategory: string
        tenancyType: string
        id: string
        date: string
        action: 'added' | 'removed'
        imgUrl: string
    }

    const RESIDENT_LIST: Resident[] = Array.from({ length: 20 }, (_, i) => {
        return {
            id: `1 + ${i}`,
            resCode: `R${(Math.random() * 0.1 + 0.9).toFixed(5).split('.')[1]}`,
            imgUrl: '/img/avatar11.png',
            gender: Math.random() > 0.5 ? 'Male' : 'Female',
            name: 'Darlene Robert',
            phoneNo: '(+234) 9076577689',
            residentCategory: Math.random() > 0.5 ? 'Resident' : 'Alpha',
            tenancyType: 'tenant (resident)',
            date: '12th Nov, 2023',
            action: Math.random() > 0.5 ? 'added' : 'removed',
        }
    })

    const [fetchedResidentData, setFetchedResidentData] = useState<Resident[]>(
        []
    )

    useEffect(() => {
        setTimeout(() => {
            setFetchedResidentData(RESIDENT_LIST)
        }, 100)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: Resident[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(fetchedResidentData.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: Resident[][] = []
        for (let i = 0; i < fetchedResidentData.length; i += item) {
            slicedPages.push(fetchedResidentData.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedResidentData.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: Resident[][] = []
        for (
            let i = 0;
            i < fetchedResidentData.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedResidentData.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    fetchedResidentData.length / paginate.itemsPerPage
                ),
            }
        })
    }, [fetchedResidentData])

    const handleNext = () => {
        console.log(paginate.currentPage, paginate.totalPage)
        if (paginate.currentPage === paginate.totalPage) return
        setPaginate((prev) => {
            return {
                ...prev,
                index: prev.index + 1,
                currentPage: prev.currentPage + 1,
            }
        })
    }

    const handlePrev = () => {
        if (paginate.currentPage === 1) return
        setPaginate((prev) => {
            return {
                ...prev,
                index: prev.index - 1,
                currentPage: prev.currentPage - 1,
            }
        })
    }

    const { currentPage, slicedPages, itemsPerPage } = paginate

    const jumpToPage = (e: React.MouseEvent, index: number) => {
        setPaginate((prev) => {
            return {
                ...prev,
                index,
                currentPage: index + 1,
            }
        })
    }

    return (
        <section className='bg-color-white rounded-lg border  overflow-scroll h-full'>
            <div className='grid text-[1.6rem]'>
                <div className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                    <div className='relative flex items-center'>
                        <img
                            src='/icons/admins/search.svg'
                            alt=''
                            className='absolute left-4 text-[4rem]'
                        />
                        <input
                            type='text'
                            placeholder='Search Parameters'
                            className='pl-16 w-[20rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'
                        />
                    </div>
                    <div className='relative flex items-center'>
                        <select className=' cursor-pointer w-[20rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4 bg-white'>
                            <option hidden value=''>
                                Sort By
                            </option>
                            <option value='date'>date</option>
                            <option value='alpha'>Alpha</option>
                        </select>
                        <GrDown className='absolute right-4 text-[1.3rem]' />
                    </div>
                </div>

                <div className='grid'>
                    <div className='grid justify-between text-color-dark-1 bg-gray-100 p-8 grid-cols-8 gap-6 capitalize items-center'>
                        <p>Res. Code</p>
                        <p>Name</p>
                        <p>Gender</p>
                        <p>Phone No.</p>
                        <p>Resident Category</p>
                        <p>Tenancy Type</p>
                        <p>Date</p>
                        <p>Action</p>
                    </div>

                    <div className='grid gap-8 mt-8 p-8'>
                        {slicedPages && slicedPages.length > 0 ? (
                            React.Children.toArray(
                                slicedPages[paginate.index].map(
                                    ({
                                        id,
                                        gender,
                                        name,
                                        resCode,
                                        residentCategory,
                                        phoneNo,
                                        tenancyType,
                                        imgUrl,
                                        date,
                                        action
                                    }) => {
                                        return (
                                            <div className='grid justify-between border-b grid-cols-8 gap-8 py-4 items-center capitalize'>
                                                <p>{resCode}</p>
                                                <p className='flex items-center gap-4'>
                                                    <img
                                                        src={imgUrl}
                                                        alt=''
                                                        className='w-[3.5rem] h-[h-3.5rem] rounded-full object-cover'
                                                    />

                                                    <span className=' max-w-[40rem] overflow-hidden text-ellipsis whitespace-nowrap'>
                                                        {name}
                                                    </span>
                                                </p>
                                                <p>{gender}</p>
                                                <p className=' max-w-[40rem] overflow-hidden text-ellipsis whitespace-nowrap'>
                                                    {phoneNo}
                                                </p>
                                                <p>{residentCategory}</p>
                                                <p>{tenancyType}</p>
                                                <p className=' max-w-[40rem] overflow-hidden text-ellipsis whitespace-nowrap'>
                                                    {date}
                                                </p>
                                                <p>{action}</p>
                                            </div>
                                        )
                                    }
                                )
                            )
                        ) : (
                            <div>
                                <div className='relative'>
                                    <div className='absolute w-full grid place-content-center'>
                                        <CgSpinnerTwo className='animate-spin text-[#0660FE] text-4xl' />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <footer className='flex items-center p-4 mt-4 bg-color-white rounded-lg'>
                    <div className='flex gap-8 items-center'>
                        <p>View</p>
                        <select
                            name=''
                            id=''
                            className='flex items-center border px-4 rounded-lg outline-none cursor-pointer'
                            onChange={handleItemsPerPage}
                        >
                            {itemsPerPageArr.map((item, index) => (
                                <option
                                    value={item}
                                    key={index}
                                    selected={item === itemsPerPage}
                                    className='capitalize cursor-pointer bg-white'
                                >
                                    {item}
                                </option>
                            ))}
                        </select>
                        <p className='text'>List per page</p>
                    </div>
                    <ul className='flex items-center gap-5 ml-10'>
                        <HiOutlineChevronLeft
                            onClick={handlePrev}
                            className='cursor-pointer'
                        />

                        {slicedPages?.map((item, index) => {
                            return (
                                <li key={index}>
                                    {index + 1 === currentPage ? (
                                        <span className='bg-color-primary text-white grid place-content-center w-[3rem] h-[3rem] cursor-pointer'>
                                            {index + 1}
                                        </span>
                                    ) : (
                                        <span
                                            className='text-color-primary bg-white grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'
                                            onClick={(e) =>
                                                jumpToPage(e, index)
                                            }
                                        >
                                            {index + 1}
                                        </span>
                                    )}
                                </li>
                            )
                        })}

                        {/* <li className='grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'>
                        {totalPage}
                    </li> */}
                        <HiOutlineChevronRight
                            onClick={handleNext}
                            className='cursor-pointer'
                        />
                    </ul>
                </footer>
            </div>{' '}
        </section>
    )
}

export default Resident
