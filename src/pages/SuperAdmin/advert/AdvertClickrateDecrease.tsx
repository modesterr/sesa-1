import React, { ChangeEvent, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { FiDownload } from 'react-icons/fi'
import { useNavigate } from 'react-router'

export interface IAdvertClickrateDecrease {
    id: number
    estateName: string
    location: string
    noOfResidents: number
    noOfViews: number
}

export const ADVERT_CLICK_RATE_DECREASE: IAdvertClickrateDecrease[] =
    Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        estateName: 'Sun City',
        location: 'Lagos',
        noOfResidents: Math.floor(Math.random() * 100 + 10),
        noOfViews: Math.floor(Math.random() * 100 + 10),
    }))

const AdvertClickrateDecrease = () => {
    const navigate = useNavigate()

    const [fetchedAdvertClickrateDecrease, setFetchedAdvertClickrateDecrease] =
        useState<IAdvertClickrateDecrease[]>([])

    useEffect(() => {
        setTimeout(() => {
            setFetchedAdvertClickrateDecrease(ADVERT_CLICK_RATE_DECREASE)
        }, 200)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: IAdvertClickrateDecrease[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(fetchedAdvertClickrateDecrease.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: IAdvertClickrateDecrease[][] = []
        for (let i = 0; i < fetchedAdvertClickrateDecrease.length; i += item) {
            slicedPages.push(fetchedAdvertClickrateDecrease.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(
                    fetchedAdvertClickrateDecrease.length / item
                ),
            }
        })
    }

    useEffect(() => {
        const slicedPages: IAdvertClickrateDecrease[][] = []
        for (
            let i = 0;
            i < fetchedAdvertClickrateDecrease.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedAdvertClickrateDecrease.slice(
                    i,
                    i + paginate.itemsPerPage
                )
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    fetchedAdvertClickrateDecrease.length /
                        paginate.itemsPerPage
                ),
            }
        })
    }, [fetchedAdvertClickrateDecrease])

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

    const handleCSVDownload = () => {
        console.log('download csv')
    }

    return (
        <>
            <div className='grid text-[1.6rem] border'>
                <div className='flex w-full items-center gap-12 p-10 bg-white rounded-lg'>
                    <p className=' font-bold'>
                        Total Views <span>(10)</span>
                    </p>
                    <div className='relative flex items-center'>
                        <img
                            src='/icons/admins/search.svg'
                            alt=''
                            className='absolute left-4 text-[4rem]'
                        />
                        <input
                            type='text'
                            placeholder='Search Parameters'
                            className='pl-16 w-[25rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'
                        />
                    </div>
                    <button
                        className='btn border-[#0556E5] text-[#0556E5] border rounded-lg gap-3 ml-auto flex items-center'
                        onClick={handleCSVDownload}
                    >
                        <FiDownload />
                        Download CSV
                    </button>
                </div>

                <div className='grid bg-white'>
                    <div
                        className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-4 gap-8'
                        style={{
                            fontSize: '1.4rem',
                        }}
                    >
                        <p className='flex items-center gap-2'>
                            <input type='checkbox' className='cursor-pointer' />
                            <p>Estate Name</p>
                        </p>
                        <p>Location</p>
                        <p>No of Views</p>
                        <p>No of Residents</p>
                    </div>

                    <div className='grid gap-8 mt-8 p-8'>
                        {slicedPages && slicedPages.length > 0 ? (
                            React.Children.toArray(
                                slicedPages[paginate.index].map(
                                    (
                                        {
                                            estateName,
                                            location,
                                            noOfResidents,
                                            noOfViews,
                                        },
                                        i
                                    ) => {
                                        return (
                                            <div className='grid justify-between border-b grid-cols-4 items-center gap-8 '>
                                                <p className='flex items-center gap-4'>
                                                    <input
                                                        type='checkbox'
                                                        className='cursor-pointer'
                                                    />

                                                    <span>{estateName}</span>
                                                </p>
                                                <p>{location}</p>
                                                <p>{noOfResidents}</p>
                                                <p>{noOfViews}</p>
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
            </div>
        </>
    )
}

export default AdvertClickrateDecrease