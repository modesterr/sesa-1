import { useState } from 'react'

type PathSwitch = 'add-property' | 'add-resident' | 'add-RFID' | 'add-accessKey'

function CreateHousehold() {
    const [pathToSwitch, setPathToSwitch] =
        useState<PathSwitch>('add-property')

    const handlePathSwitch = new Map<PathSwitch, JSX.Element>([
        ['add-property', <></>],
        ['add-resident', <></>],
        ['add-RFID', <></>],
        ['add-accessKey', <></>],
    ])
    return (
        <div>
            <div className='estateDetail__radioBox'>
                <input
                    type='radio'
                    name='household'
                    id='passwordSettings'
                    className='hidden'
                    defaultChecked
                    onChange={() => setPathToSwitch('passwordSettings')}
                />
                <label htmlFor='passwordSettings' className='capitalize'>
                    Password Settings
                </label>

                <input
                    type='radio'
                    name='household'
                    id='notificationSettings'
                    className='hidden'
                    onChange={() => setPathToSwitch('notificationSettings')}
                />
                <label htmlFor='notificationSettings'>
                    Notification Settings
                </label>
            </div>
            <div className='mt-8 grid gap-8'>
                <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                    {handlePathSwitch.get(pathToSwitch)}
                </section>
            </div>
        </div>
    )
}

export default CreateHousehold
