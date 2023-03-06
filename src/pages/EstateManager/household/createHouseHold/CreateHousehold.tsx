import { Fragment, useState } from 'react'
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi'
import AddProperty from './AddProperty'

// type PathSwitch =
//     | 'add-property'
//     | 'add-resident'
//     | 'add-RFID'
//     | 'add-accessCard'

const paths = [
    {
        name: 'add Property',
        id: 1,
    },
    {
        name: 'add resident',
        id: 2,
    },
    {
        name: 'add RFID',
        id: 3,
    },
    {
        name: 'add accessCard',
        id: 4,
    },
]
function CreateHousehold() {
    const [pathToSwitch, setPathToSwitch] = useState(1)

    const handlePathSwitch = new Map<number, JSX.Element>([
        [1, <AddProperty />],
        [2, <></>],
        [3, <></>],
        [4, <></>],
    ])
    return (
        <div className='bg-white p-16 rounded-lg min-h-[90vh] relative'>
            <div
                className='estateDetail__radioBox'
                style={{
                    marginTop: '0',
                }}
            >
                <>
                    {paths.map((item) => {
                        return (
                            <Fragment key={item.name}>
                                <input
                                    type='radio'
                                    name='household'
                                    id={item.name}
                                    checked={item.id === pathToSwitch}
                                    className='hidden'
                                    onChange={() => setPathToSwitch(item.id)}
                                />
                                <label
                                    htmlFor={item.name}
                                    className='capitalize'
                                >
                                    {item.name}
                                </label>
                            </Fragment>
                        )
                    })}
                </>
            </div>
            <section className='bg-color-white rounded-lg mt-[5rem] '>
                {handlePathSwitch.get(pathToSwitch)}
                <div className='absolute bottom-0 right-0 flex items-center gap-16 m-10'>
                    <button
                        className='flex gap items-center cursor-pointer gap-4 disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={pathToSwitch === 1}
                        onClick={() =>
                            setPathToSwitch((prev) => {
                                return prev === 1 ? prev : prev - 1
                            })
                        }
                    >
                        <TfiArrowCircleLeft className='w-[3rem] h-[3rem] text-color-blue' />
                        <span>Previous</span>
                    </button>
                    <button
                        className='flex gap items-center cursor-pointer gap-4 disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={pathToSwitch === 4}
                        onClick={() =>
                            setPathToSwitch((prev) => {
                                console.log({ prev })
                                return prev === 4 ? prev : prev + 1
                            })
                        }
                    >
                        {' '}
                        <TfiArrowCircleRight className='w-[3rem] h-[3rem] text-color-blue' />
                        <span className=''>Next</span>
                    </button>
                </div>
            </section>
        </div>
    )
}

export default CreateHousehold
