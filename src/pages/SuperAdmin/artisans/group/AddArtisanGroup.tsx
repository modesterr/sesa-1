import React, { FormEvent, useRef, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'

import { toast, ToastContainer } from 'react-toastify'
import { MultipleSelect } from '../../../../components/SuperAdmin/UI/Select'

type DialogType = 'validate' | 'add-Artisan'

const AddArtisanGroup = () => {
    const [isAddArtisanGroup, setIsAddArtisanGroup] = useState(true)
    const [selectedArtisans, setSelectedArtisans] = useState<string[]>([])
    const [selectedEstates, setSelectedEstates] = useState<string[]>([])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const addArtisanGroupHandler = () => {}

    return (
        <>
            <ToastContainer />

            <div className='p-8 bg-white rounded-lg '>
                <div className='grid gap-8 border-b py-10 self-start'>
                    <h2
                        className='text-[2rem] '
                        style={{
                            fontFamily: 'Satoshi-medium',
                        }}
                    >
                        Add Artisan Group
                    </h2>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-16 max-w-[40rem] h-[60vh] mt-10'
                >
                    <div className='grid gap-4 relative '>
                        <label
                            htmlFor='name'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            Name
                        </label>
                        <input
                            type='text'
                            required
                            id='name'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>

                    <MultipleSelect
                        selectFrom={['Artisan 1', 'Artisan 2', 'Artisan 3']}
                        label='Artisans'
                        placeholder='Select Artisans'
                        selected={selectedArtisans}
                        setSelected={setSelectedArtisans}
                    />
                    <MultipleSelect
                        selectFrom={[
                            'Estate 1',
                            'Estate 2',
                            'Estate 3',
                            'Estate 4',
                            'Estate 5',
                            'Estate 6',
                            'Estate 7',
                        ]}
                        label='Estates'
                        placeholder='Select Estate'
                        selected={selectedEstates}
                        setSelected={setSelectedEstates}
                    />

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full mt-auto mr-auto'
                        onClick={addArtisanGroupHandler}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Add Artisan Group
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddArtisanGroup