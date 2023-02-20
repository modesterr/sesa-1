import React, { useState, useEffect, FC } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import OverviewCard from '../../../../components/SuperAdmin/overview/OverviewCard'

interface ActivityReport {
    id: number
    guardName: string
    date: string
    guardCode: number
    clockInCount: number
    clockOutCount: number
}

interface AttendanceReport {
    id: number
    guardName: string
    phoneNumber: string
    date: string
    guardCode: number
    clockInCount: number
    clockOutCount: number
}





const ATTENDANCE_REPORT_DATA: AttendanceReport[] = Array.from({length: 20}).map((_, i) => ({
    id: i,
    guardName: 'John Doe',
    date: '12-May-2023',
    phoneNumber: '+2347024954270',
    guardCode: Math.floor(Math.random() * 3000 + 1000),
    clockInCount: Math.floor(Math.random() * 10 + 1),
    clockOutCount: Math.floor(Math.random() * 10 + 1),
}))
const ACTIVITY_REPORT_DATA: ActivityReport[] = Array.from({length: 20}).map((_, i) => ({
    id: i,
    guardName: 'John Doe',
    date: '12-May-2023',
    guardCode: Math.floor(Math.random() * 3000 + 1000),
    clockInCount: Math.floor(Math.random() * 10 + 1),
    clockOutCount: Math.floor(Math.random() * 10 + 1),
}))


const ActivityReport: FC<{
    fetchedActivityReport: ActivityReport[]
}> = ({ fetchedActivityReport }) => {

  

      const [
          fetchedActivityReportData,
          setFetchedActivityReportData,
      ] = useState<ActivityReport[]>([])

      useEffect(() => {
          setTimeout(() => {
              setFetchedActivityReportData(ACTIVITY_REPORT_DATA)
          }, 1000)
      }, [])

      interface Paginate {
          index: number
          currentPage: number
          itemsPerPage: number
          totalPage: number
          slicedPages: ActivityReport[][] | null
      }

      const itemsPerPageArr = [2, 4, 6, 8]
      const perPage = 4

      const [paginate, setPaginate] = useState<Paginate>({
          index: 0,
          currentPage: 1,
          itemsPerPage: perPage,
          totalPage: Math.ceil(fetchedActivityReportData.length / perPage),
          slicedPages: null,
      })

      const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
          const item = parseInt(e.target.value)

          const slicedPages: ActivityReport[][] = []
          for (
              let i = 0;
              i < fetchedActivityReportData.length;
              i += item
          ) {
              slicedPages.push(
                  fetchedActivityReportData.slice(i, i + item)
              )
          }

          setPaginate((prev) => {
              return {
                  ...prev,
                  itemsPerPage: item,
                  index: 0,
                  currentPage: 1,
                  slicedPages,
                  totalPage: Math.ceil(
                      fetchedActivityReportData.length / item
                  ),
              }
          })
      }

      useEffect(() => {
          const slicedPages: ActivityReport[][] = []
          for (
              let i = 0;
              i < fetchedActivityReportData.length;
              i += paginate.itemsPerPage
          ) {
              slicedPages.push(
                  fetchedActivityReportData.slice(
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
                      fetchedActivityReportData.length /
                          paginate.itemsPerPage
                  ),
              }
          })
      }, [fetchedActivityReportData])

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
        <div className='grid text-[1.6rem]'>
            <caption className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                <p className=' font-bold'>
                    Activity Report List <span>(4)</span>
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
                        className='pl-16 w-[18rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'
                    />
                </div>
                <div className='relative flex items-center'>
                    <select className=' cursor-pointer w-[18rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4 bg-white'>
                        <option hidden value=''>
                            Sort By
                        </option>
                        <option value='date'>date</option>
                        <option value='alpha'>Alpha</option>
                    </select>
                    <GrDown className='absolute right-4 text-[1.3rem]' />
                </div>
                <div className='relative flex items-center'>
                    <select className=' cursor-pointer w-[18rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4 bg-white'>
                        <option hidden value=''>
                            Start Date
                        </option>
                        <option value='date'>date</option>
                        <option value='alpha'>Alpha</option>
                    </select>
                    <GrDown className='absolute right-4 text-[1.3rem]' />
                </div>
                <div className='relative flex items-center'>
                    <select className=' cursor-pointer w-[18rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4 bg-white'>
                        <option hidden value=''>
                            End Date
                        </option>
                        <option value='date'>date</option>
                        <option value='alpha'>Alpha</option>
                    </select>
                    <GrDown className='absolute right-4 text-[1.3rem]' />
                </div>
            </caption>

            <div className='grid'>
                <div
                    className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-6 gap-8'
                    style={{
                        fontSize: '1.6rem',
                    }}
                >
                    <p className='flex items-center gap-2'>
                        <input type='checkbox' className='cursor-pointer' />
                        <p>Guard Name</p>
                    </p>
                    <p>Date</p>
                    <p>Guard Code</p>
                    <p>Clock-In Count</p>
                    <p>Clock-Out Count</p>
                    <p>Panic Alert</p>
                </div>

                <div className='grid gap-8 mt-8 p-8'>
                    {fetchedActivityReport &&
                    fetchedActivityReport.length > 0 ? (
                        React.Children.toArray(
                            fetchedActivityReport.map(
                                ({
                                    guardCode,
                                    guardName,
                                    clockInCount,
                                    clockOutCount,
                                    date,
                                }) => {
                                    return (
                                        <div className='grid justify-between border-b grid-cols-6 gap-8 '>
                                            <p className='flex items-center gap-4'>
                                                <input
                                                    type='checkbox'
                                                    className='cursor-pointer'
                                                />

                                                <span>{guardName}</span>
                                            </p>
                                            <p>{date}</p>
                                            <p>{guardCode}</p>
                                            <p>{clockInCount}</p>
                                            <p>{clockOutCount}</p>
                                            <p>0</p>
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
                    <div className='flex items-center border px-4 rounded-lg'>
                        <input
                            type='text'
                            className='w-8 outline-none border-none cursor-pointer '
                            value={6}
                            inputMode='numeric'
                        />
                        <GrDown className='text-[1.3rem]' />
                    </div>
                    <p className='text'>List per page</p>
                </div>
                <ul className='flex items-center gap-5 ml-10'>
                    <HiOutlineChevronLeft />
                    <li className='grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'>
                        1
                    </li>
                    <li className='grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'>
                        2
                    </li>
                    <li className='grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'>
                        3
                    </li>
                    <li className='grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'>
                        4
                    </li>
                    <li className='grid place-content-center w-[3rem] h-[3rem] cursor-pointer'>
                        ....
                    </li>
                    <li className='grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'>
                        10
                    </li>
                    <HiOutlineChevronRight />
                </ul>
            </footer>
        </div>
    )
}
const AttendanceReport: FC<{
    fetchedAttendanceReport: AttendanceReport[]
}> = ({ fetchedAttendanceReport }) => {
    return (
        <div className='grid text-[1.6rem]'>
            <caption className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                <p className=' font-bold'>
                    Attendance Report List <span>(4)</span>
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
                        className='pl-16 w-[18rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'
                    />
                </div>
                <div className='relative flex items-center'>
                    <select className=' cursor-pointer w-[18rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4 bg-white'>
                        <option hidden value=''>
                            Sort By
                        </option>
                        <option value='date'>date</option>
                        <option value='alpha'>Alpha</option>
                    </select>
                    <GrDown className='absolute right-4 text-[1.3rem]' />
                </div>
                <div className='relative flex items-center'>
                    <select className=' cursor-pointer w-[18rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4 bg-white'>
                        <option hidden value=''>
                            Start Date
                        </option>
                        <option value='date'>date</option>
                        <option value='alpha'>Alpha</option>
                    </select>
                    <GrDown className='absolute right-4 text-[1.3rem]' />
                </div>
                <div className='relative flex items-center'>
                    <select className=' cursor-pointer w-[18rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4 bg-white'>
                        <option hidden value=''>
                            End Date
                        </option>
                        <option value='date'>date</option>
                        <option value='alpha'>Alpha</option>
                    </select>
                    <GrDown className='absolute right-4 text-[1.3rem]' />
                </div>
            </caption>

            <div className='grid'>
                <div
                    className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-6 gap-8'
                    style={{
                        fontSize: '1.6rem',
                    }}
                >
                    <p className='flex items-center gap-2'>
                        <input type='checkbox' className='cursor-pointer' />
                        <p>Guard Name</p>
                    </p>
                    <p>Date</p>
                    <p>Guard Code</p>
                    <p>Check In Count</p>
                    <p>Check Out Count</p>
                    <p>Panic Alert</p>
                </div>

                <div className='grid gap-8 mt-8 p-8'>
                    {fetchedAttendanceReport &&
                    fetchedAttendanceReport.length > 0 ? (
                        React.Children.toArray(
                            fetchedAttendanceReport.map(
                                ({
                                    guardCode,
                                    guardName,
                                    date,
                                    checkInCount,
                                    checkOutCount,
                                    panicAlert,
                                }) => {
                                    return (
                                        <div className='grid justify-between border-b grid-cols-6 gap-8 '>
                                            <p className='flex items-center gap-4'>
                                                <input
                                                    type='checkbox'
                                                    className='cursor-pointer'
                                                />

                                                <span>{guardName}</span>
                                            </p>
                                            <p>{date}</p>
                                            <p>{guardCode}</p>
                                            <p>{checkInCount}</p>
                                            <p>{checkOutCount}</p>
                                            <p>{panicAlert}</p>
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
                    <div className='flex items-center border px-4 rounded-lg'>
                        <input
                            type='text'
                            className='w-8 outline-none border-none cursor-pointer '
                            value={6}
                            inputMode='numeric'
                        />
                        <GrDown className='text-[1.3rem]' />
                    </div>
                    <p className='text'>List per page</p>
                </div>
                <ul className='flex items-center gap-5 ml-10'>
                    <HiOutlineChevronLeft />
                    <li className='grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'>
                        1
                    </li>
                    <li className='grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'>
                        2
                    </li>
                    <li className='grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'>
                        3
                    </li>
                    <li className='grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'>
                        4
                    </li>
                    <li className='grid place-content-center w-[3rem] h-[3rem] cursor-pointer'>
                        ....
                    </li>
                    <li className='grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'>
                        10
                    </li>
                    <HiOutlineChevronRight />
                </ul>
            </footer>
        </div>
    )
}

function EstateReport() {
  
    const [fetchedAttendanceReport, setFetchedAttendanceReport] = useState<
        AttendanceReport[] | null
    >(null)

    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedAttendanceReport(ATTENDANCE_REPORT_DATA)
            }, 1000)
        }
        fetchData()
    }, [])

    const getDate = () => {
        const newDate = new Date()

        const date = newDate.toLocaleString('en-GB', { dateStyle: 'full' })

        return date
    }

    const dateString = getDate()

    getDate()

    const handlePathSwitch = (pageNum: number) => {
        switch (pageNum) {
            case 1:
                return (
                    <ActivityReport/>
                     
                )
            case 2:
                return (
                    <AttendanceReport
                        fetchedAttendanceReport={fetchedAttendanceReport ?? []}
                    />
                )
            default:
                return (
                    <ActivityReport
                       />
                )
        }
    }

    return (
        <div className='estateDetail'>
            <h1 className='heading2'>Estate Details</h1>
            <div className='estateDetail__radioBox'>
                <input
                    defaultChecked
                    type='radio'
                    name='report'
                    id='activityReport'
                    className='hidden'
                    onChange={() => setCurrentPage(1)}
                />
                <label htmlFor='activityReport'>Activity Report</label>

                <input
                    type='radio'
                    name='report'
                    id='attendanceReport'
                    className='hidden'
                    onChange={() => setCurrentPage(2)}
                />
                <label htmlFor='attendanceReport'>Attendance Report</label>
            </div>
            <div className='mt-8 grid gap-8'>
                {currentPage === 2 && (
                    <section className='bg-white rounded-lg p-8 grid h-[28rem] text-[1.4rem]'>
                        <div className='flex w-full justify-between'>
                            <p className='font-medium text-[2rem]'>
                                Security Report
                            </p>
                            <p className='text-[#666869]'>
                                Showing current Day:{' '}
                                <span className='text-black'>{dateString}</span>
                            </p>
                        </div>
                        <div className='overview flex gap-8'>
                            <OverviewCard
                                title='Total Estates'
                                number={18_000}
                                iconUrl='/icons/securityCompany/totalEstates.svg'
                                percent={5}
                                arrow='/icons/securityCompany/arrowUp.svg'
                                bgColor='bg-[#DDFCDC]'
                                textColor='text-[#1A8F56]'
                            />
                            <OverviewCard
                                title='Guards on Duty'
                                number={40}
                                iconUrl='/icons/admins/housePeople.svg'
                                bgColor='bg-[#FCF3FA]'
                                textColor='text-[#B6008E]'
                            />
                        </div>
                    </section>
                )}
                <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                    {handlePathSwitch(currentPage)}
                </section>
            </div>
        </div>
    )
}

export default EstateReport
