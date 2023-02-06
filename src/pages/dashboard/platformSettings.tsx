import { useState, useEffect } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'

type PathSwitch =
    | 'platformChanges'
    | 'propertyType'
    | 'SOSDetails'
    | 'Account Settings'

function PlatformSettings() {
    const [pathToSwitch, setPathToSwitch] =
        useState<PathSwitch>('platformChanges')

    const handlePathSwitch: Record<PathSwitch, JSX.Element> = {}

    return (
        <div>
            <div className='estateDetail__radioBox'>
                <input
                    type='radio'
                    name='platform'
                    id='platformChanges'
                    className='hidden'
                    defaultChecked
                    onChange={() => setPathToSwitch('platformChanges')}
                />
                <label htmlFor='platformChanges' className='capitalize'>
                    Platform Changes
                </label>

                <input
                    type='radio'
                    name='platform'
                    id='propertyType'
                    className='hidden'
                    onChange={() => setPathToSwitch('propertyType')}
                />
                <label htmlFor='propertyType'>Property Type</label>
            </div>
            <div className='mt-8 grid gap-8'>
                <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                    handlePathSwitch[pathToSwitch]
                </section>
            </div>
        </div>
    )
}

export default PlatformSettings
