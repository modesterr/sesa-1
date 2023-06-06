import { Outlet, useNavigate } from 'react-router'
import Sidebar from '../../components/estatemanager/Sidebar'
import Header from '../../components/superadmin/dashboard/Header'
import BreadCrumb from '../../components/ui/BreadCrumb'
import { useEffect } from 'react'

function Dashboard() {
    const navigate = useNavigate()
    useEffect(() => {
        // const role = localStorage.getItem('role')
        // if (role?.indexOf('estate') === -1) {
        //     navigate('/')
        // }
    }, [])
    return (
        <div className='dashboard'>
            <Sidebar />
            <div className='dashboard__container'>
                <Header
                    fullName='Collins Igboanugwo'
                    role='Estate Manager'
                    imgUrl='/img/me.jpeg'
                />

                <div className='p-10 overflow-scroll max-h-[90vh]'>
                    <BreadCrumb />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard