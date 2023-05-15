import React, { useState, useEffect, ChangeEvent } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown, GrUp } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import ReportChart from '../../../../components/SuperAdmin/charts/ReportsChart'

export interface ReportDetail {
    id: number
    eventCode: string
    startDate: string
    endDate: string
    eventName: string
    totalCheckIn: number
    propCode: string
    expectedGuest: number
    date: string
}

export const EVENTS_REPORT: ReportDetail[] = Array.from({
    length: 10,
}).map((_, i) => ({
    id: i,
    date: '12-May-2023',
    eventCode: 'EV-908423',
    startDate: '02-Feb-2023',
    endDate: '02-May-2023',
    propCode: '982JADLA',
    expectedGuest: 30,
    totalCheckIn: 40,
    eventName: 'Child Dedication',
}))

type SortBy = 'Today' | 'This week' | 'This Month'

function EventsReport() {
    const navigate = useNavigate()

    const [eventsReport, setEventsReport] = useState<ReportDetail[]>([])

    useEffect(() => {
        setTimeout(() => {
            setEventsReport(EVENTS_REPORT)
        }, 500)
    }, [])

    const sortBy: Array<SortBy> = ['Today', 'This week', 'This Month']

    const [toggleMenu, setToggleMenu] = useState(false)
    const [sortType, setSortType] = useState<SortBy>('Today')

    const menuToggler = () => setToggleMenu(!toggleMenu)

    const handleSortType = (item: SortBy) => {
        setSortType(item)
        setToggleMenu(false)
    }

    const actions = ['View Details'] as const

    const [toggleDropDown, setToggleDropDown] = useState<{
        isDropDownOpen: boolean
        index: number | null
    }>({
        isDropDownOpen: false,
        index: null,
    })

    const dropDownHandler = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        setToggleDropDown(() => {
            return {
                isDropDownOpen: e.target.checked,
                index,
            }
        })
    }

    const selectAction = (item: 'View Details', id: number) => {
        if (item === 'View Details') {
            navigate(`/estateManager/reports/view/:${id}`)
        }
    }

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: ReportDetail[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(eventsReport.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: ReportDetail[][] = []
        for (let i = 0; i < eventsReport.length; i += item) {
            slicedPages.push(eventsReport.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(eventsReport.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: ReportDetail[][] = []
        for (let i = 0; i < eventsReport.length; i += paginate.itemsPerPage) {
            slicedPages.push(eventsReport.slice(i, i + paginate.itemsPerPage))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    eventsReport.length / paginate.itemsPerPage
                ),
            }
        })
    }, [eventsReport])

    const handleNext = () => {
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
        <>
            <div className='mt-8 grid gap-8'>
                <div className='flex justify-between'>
                    <p className='text-[2rem]'>Site Worker Report</p>
                    <div className='relative grid gap-4'>
                        <div className='flex items-center gap-8'>
                            <p>Sort By</p>
                            <div className='relative flex items-center border border-color-grey bg-white rounded-lg gap-2 py-2 px-4 cursor-pointer'>
                                <p className='' onClick={menuToggler}>
                                    {sortType}
                                </p>
                                {toggleMenu ? (
                                    <GrUp className='w-[1.2rem] h-[1.2rem] text-red-600' />
                                ) : (
                                    <GrDown className='w-[1.2rem] h-[1.2rem]' />
                                )}
                            </div>
                        </div>

                        {toggleMenu && (
                            <div className='absolute top-[4rem]  right-0 border border-color-primary-light  bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                                {sortBy.map((item, index) => (
                                    <p
                                        className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                        key={index}
                                        onClick={() => handleSortType(item)}
                                    >
                                        {item}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <section
                    className=' text-[1.4rem] grid gap-8 bg-white py-8 px-16 rounded-lg'
                    style={{
                        gridTemplateColumns: '1fr 1fr',
                    }}
                >
                    <div className=' grid items-baseline border-r grid-cols-2'>
                        <div className='grid gap-8'>
                            <p className='text-[1.8rem] font-Satoshi-Medium'>
                                Total Event: 15
                            </p>
                            <div className='grid items-center gap-4'>
                                <div className='grid gap-4 justify-start'>
                                    <p>Check - In</p>
                                    <div className='flex items-center gap-4'>
                                        <img
                                            src='/icons/report/walk1.svg'
                                            alt=''
                                        />
                                        <p>3000</p>
                                    </div>
                                </div>
                                <div className='grid gap-4 justify-start'>
                                    <p>Check - Out</p>
                                    <div className='flex items-center gap-4'>
                                        <img
                                            src='/icons/report/walk2.svg'
                                            alt=''
                                        />
                                        <p>3000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid gap-8'>
                            <p className='text-[1.8rem] font-Satoshi-Medium'>
                                Top 3 Event Check-In
                            </p>{' '}
                            <div className='grid gap-4'>
                                <p className='flex items-center gap-4'>
                                    <span className='w-[1rem] h-[1rem] bg-gray-400 rounded-full'>
                                        &nbsp;
                                    </span>
                                    <span>House Opening: 500 Check-In</span>
                                </p>
                                <p className='flex items-center gap-4'>
                                    <span className='w-[1rem] h-[1rem] bg-gray-400 rounded-full'>
                                        &nbsp;
                                    </span>
                                    <span>Seminar: 200 Check-In</span>
                                </p>
                                <p className='flex items-center gap-4'>
                                    <span className='w-[1rem] h-[1rem] bg-gray-400 rounded-full'>
                                        &nbsp;
                                    </span>
                                    <span>Graduation Party: 129 Check-In</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=' grid gap-16'>
                        <div className='flex justify-between items-baseline'>
                            <p className='text-[1.8rem] font-Satoshi-Medium'>
                                Trend
                            </p>

                            <div className='flex items-center gap-4'>
                                <div className='flex items-center gap-2'>
                                    <span className='bg-[#1D9F5F] w-[1rem] h-[1rem] rounded-full'>
                                        &nbsp;
                                    </span>
                                    <span>Check-in</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='bg-[#EA0B90] w-[1rem] h-[1rem] rounded-full'>
                                        &nbsp;
                                    </span>
                                    <span>Check-out</span>
                                </div>
                            </div>
                        </div>
                        <ReportChart />
                    </div>
                </section>
                <section className='bg-color-white rounded-lg border min-w-[112rem]'>
                    <div className='grid border rounded-lg'>
                        <div className='grid p-10'>
                            <p className=' font-Satoshi-Medium'>
                                Site Worker Report List <span>(200)</span>
                            </p>
                            <div className='flex w-full justify-start items-end gap-12 bg-white rounded-lg'>
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
                                    <select className=' cursor-pointer w-[20rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'>
                                        <option hidden value=''>
                                            Sort By
                                        </option>
                                        <option value='date'>date</option>
                                        <option value='alpha'>Alpha</option>
                                    </select>
                                    <GrDown className='absolute right-4 text-[1.3rem]' />
                                </div>
                                <div className='relative grid items-center'>
                                    <label htmlFor=''>From</label>
                                    <input
                                        type='date'
                                        placeholder='Search Parameters'
                                        className=' w-[20rem] rounded-lg border border-color-blue-light cursor-pointer outline-none p-4'
                                    />
                                </div>
                                <div className='relative grid items-center'>
                                    <label htmlFor=''>To</label>
                                    <input
                                        type='date'
                                        placeholder='Search Parameters'
                                        className=' w-[20rem] rounded-lg border border-color-blue-light cursor-pointer outline-none p-4'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='grid bg-white'>
                            <div className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-9 gap-8 text-[1.4rem] items-center'>
                                <p className='flex items-center gap-4'>
                                    <input
                                        type='checkbox'
                                        className='cursor-pointer'
                                    />

                                    <span> Date</span>
                                </p>
                                <p>Event Code</p>
                                <p>Event Name</p>
                                <p>Prop Code</p>
                                <p>Expected Guest</p>
                                <p>Total Check-In</p>
                                <p>Start Date</p>
                                <p>End Date</p>
                                <p>Action</p>
                            </div>

                            <div className='grid gap-8 mt-8 p-8'>
                                {slicedPages && slicedPages.length > 0 ? (
                                    React.Children.toArray(
                                        slicedPages[paginate.index].map(
                                            (
                                                {
                                                    id,
                                                    date,
                                                    eventCode,
                                                    eventName,
                                                    expectedGuest,
                                                    totalCheckIn,
                                                    startDate,
                                                    endDate,
                                                    propCode,
                                                },
                                                i
                                            ) => {
                                                const {
                                                    isDropDownOpen,
                                                    index,
                                                } = toggleDropDown

                                                return (
                                                    <div className='grid justify-between border-b grid-cols-9 items-center gap-8 py-4'>
                                                        <p className='flex items-center gap-4'>
                                                            <input
                                                                type='checkbox'
                                                                className='cursor-pointer'
                                                            />

                                                            <span> {date}</span>
                                                        </p>
                                                        <p>{eventCode}</p>
                                                        <p>{eventName}</p>
                                                        <p>{propCode}</p>
                                                        <p>{expectedGuest}</p>
                                                        <p>{totalCheckIn}</p>
                                                        <p>{startDate}</p>
                                                        <p>{endDate}</p>

                                                        <div className='relative'>
                                                            <label
                                                                className='font-semibold capitalize cursor-pointer flex items-center gap-2 relative z-10'
                                                                htmlFor={i.toString()}
                                                                onClick={() =>
                                                                    setToggleDropDown(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            return {
                                                                                isDropDownOpen:
                                                                                    !prev.isDropDownOpen,
                                                                                index: i,
                                                                            }
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <span className='text-color-primary'>
                                                                    <img
                                                                        src='/icons/admins/threeDots.svg'
                                                                        alt=''
                                                                    />
                                                                </span>
                                                            </label>
                                                            <input
                                                                type='radio'
                                                                name='dropdown'
                                                                className='hidden'
                                                                id={i.toString()}
                                                                onChange={(e) =>
                                                                    dropDownHandler(
                                                                        e,
                                                                        i
                                                                    )
                                                                }
                                                            />

                                                            {isDropDownOpen &&
                                                                index === i && (
                                                                    <div className='absolute top-0 translate-x-[4rem] border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                                                                        {actions.map(
                                                                            (
                                                                                item,
                                                                                index
                                                                            ) => (
                                                                                <p
                                                                                    className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                                                                    key={
                                                                                        index +
                                                                                        i
                                                                                    }
                                                                                    onClick={() =>
                                                                                        selectAction(
                                                                                            item,
                                                                                            id
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        item
                                                                                    }
                                                                                </p>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                )}
                                                        </div>
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
                </section>
            </div>
        </>
    )
}

export default EventsReport
