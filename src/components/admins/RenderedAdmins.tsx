import { useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'

type Admin = {
    id: string
    name: string
    gender: string
    phoneNumber: string
    status: string
    onboardingDate: string
}

const ADMINDATA: Admin[] = [
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
]

function RenderedAdmins() {
    const [fetchedUsers, setFetchedUsers] = useState<Admin[] | null>([])

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedUsers(ADMINDATA)
            }, 2000)
        }
        fetchData()
    }, [])

    return (
        <div className='renderedAdmins grid overflow-scroll h-[70vh]'>
            <table className='renderedAdmins__table'>
                <caption className='font-bold text-lg py-5 uppercase'>
                    Users
                </caption>

                <thead>
                    <tr className='mb-10'>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Phone Number</th>
                        <th>Joined</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {fetchedUsers && fetchedUsers.length > 0 ? (
                        fetchedUsers.map((value, i) => {
                            return (
                                <tr key={i} className='mx-4 py-2'>
                                    <td>
                                        <span>{value.name}</span>
                                    </td>
                                    <td>{value.gender}</td>
                                    <td>{value.phoneNumber}</td>
                                    <td>{value.status.toString()}</td>
                                    <td>
                                        <>
                                            <div className='flex justify-center'>
                                                {new Date(
                                                    value.onboardingDate
                                                ).toLocaleDateString()}
                                            </div>
                                        </>
                                    </td>
                                    <td>
                                        <button>action</button>
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td>
                                <div className='absolute w-full top-[50%]'>
                                    <CgSpinnerTwo className='animate-spin text-orange-300 text-4xl' />
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default RenderedAdmins
