import React, { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'
import { getPhotoUrl } from '../../../../utils/getPhotoUrl'

const NotificationSettings = () => {
    const [isInAppOn, setISInAppOn] = useState(true)
    const [isSmsOn, setIsSmsOn] = useState(false)

    const toggleIsInAppOn = () => setISInAppOn(!isInAppOn)
    const toggleIsSmsOn = () => setIsSmsOn(!isSmsOn)

    return (
        <>
            <ToastContainer />
            <div className=' p-8 bg-white h-[80vh] overflow-y-scroll rounded-lg'>
                <section>
                    <p
                        style={{
                            fontFamily: 'Satoshi-Medium',
                        }}
                    >
                        Notification Settings
                    </p>
                    <p>
                        Select method of notifying security guards when
                        assigning or reassigning occurs
                    </p>
                </section>

                <section>
                        <div>
                                <div>
                                    <p>In-App</p>
                                    <div>
                                        {
                                            
                                        }
                                    </div>
                                    <img src="/icons/admins/switchOn.svg" alt="" />
                                </div>
                        </div>
                        
                    <p className='text-color-blue-1'>NB: A charge of N3 would be incured for this process</p>
                </section>
            </div>
        </>
    )
}

export default NotificationSettings
