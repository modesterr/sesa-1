import { useState } from 'react'
import SingleSelect from '../../../../../components/ui/select/SingleSelect'


export const PhoneNumber = () => {
    return (
        <div className='grid gap-4'>
            <label
                htmlFor='phoneNumber'
                className='text-[1.4rem] font-Satoshi-Medium'
            >
                Phone Number
            </label>

            <div className='flex text-[1.6rem] gap-4 h-[5rem]'>
                <select className='w-[30%] rounded-lg border border-color-grey py-4.8 px-4 outline-none cursor-pointer text-color-dark relative h-full'>
                    <option value='234'>+234</option>
                </select>
                <input
                    required
                    type='number'
                    inputMode='numeric'
                    id='phoneNumber'
                    placeholder='Phone Number'
                    className='w-full rounded-lg border border-color-grey py-4.8 px-8 outline-none text-color-dark'
                />
            </div>
        </div>
    )
}
export const ResidentCode = () => {
    return (
        <div className='grid gap-4'>
            <label
                htmlFor='residentCode'
                className='text-[1.4rem] font-Satoshi-Medium'
            >
                ResidentCode
            </label>

            <div className='flex text-[1.6rem] gap-4 h-[5rem]'>
                <input
                    required
                    type='text'
                    id='residentCode'
                    placeholder='Enter resident code'
                    className='w-full rounded-lg border border-color-grey py-4.8 px-8 outline-none text-color-dark'
                />
            </div>
        </div>
    )
}
export const BVN_Number = () => {
    return (
        <div className='grid gap-4'>
            <label
                htmlFor='phoneNumber'
                className='text-[1.4rem] font-Satoshi-Medium'
            >
                BVN (Number)
            </label>

            <div className='flex text-[1.6rem] gap-4 h-[5rem]'>
                <input
                    required
                    type='number'
                    inputMode='numeric'
                    id='phoneNumber'
                    placeholder='BVN (Number)'
                    className='w-full rounded-lg border border-color-grey py-4.8 px-8 outline-none text-color-dark'
                />
            </div>
        </div>
    )
}
export const NIN_Number = () => {
    return (
        <div className='grid gap-4'>
            <label
                htmlFor='phoneNumber'
                className='text-[1.4rem] font-Satoshi-Medium'
            >
                NIN (Number)
            </label>

            <div className='flex text-[1.6rem] gap-4 h-[5rem]'>
                <input
                    required
                    type='number'
                    inputMode='numeric'
                    id='phoneNumber'
                    placeholder='NIN (Number)'
                    className='w-full rounded-lg border border-color-grey py-4.8 px-8 outline-none text-color-dark'
                />
            </div>
        </div>
    )
}

export const DriversLicence = () => {
    return (
        <div className='grid gap-4'>
            <div>
                <label
                    htmlFor='phoneNumber'
                    className='text-[1.4rem] font-Satoshi-Medium'
                >
                    License (Number)
                </label>

                <div className='flex text-[1.6rem] gap-4 h-[5rem]'>
                    <input
                        required
                        type='number'
                        inputMode='numeric'
                        id='phoneNumber'
                        className='w-full rounded-lg border border-color-grey py-4.8 px-8 outline-none text-color-dark'
                    />
                </div>
            </div>
            <div>
                <label
                    htmlFor='phoneNumber'
                    className='text-[1.4rem] font-Satoshi-Medium'
                >
                    Date of Birth
                </label>

                <div className='flex text-[1.6rem] gap-4 h-[5rem]'>
                    <input
                        required
                        type='date'
                        inputMode='numeric'
                        id='phoneNumber'
                        className='w-full rounded-lg border border-color-grey py-4.8 px-8 outline-none text-color-dark'
                    />
                </div>
            </div>
        </div>
    )
}
export const International_PassPort = () => {
    return (
        <div className='grid gap-4'>
            <div>
                <label
                    htmlFor='phoneNumber'
                    className='text-[1.4rem] font-Satoshi-Medium'
                >
                    Int'l Passport (Number)
                </label>

                <div className='flex text-[1.6rem] gap-4 h-[5rem]'>
                    <input
                        required
                        type='number'
                        inputMode='numeric'
                        id='phoneNumber'
                        className='w-full rounded-lg border border-color-grey py-4.8 px-8 outline-none text-color-dark'
                    />
                </div>
            </div>
            <div>
                <label
                    htmlFor='phoneNumber'
                    className='text-[1.4rem] font-Satoshi-Medium'
                >
                    Last Name
                </label>

                <div className='flex text-[1.6rem] gap-4 h-[5rem]'>
                    <input
                        required
                        type='text'
                        inputMode='numeric'
                        id='phoneNumber'
                        className='w-full rounded-lg border border-color-grey py-4.8 px-8 outline-none text-color-dark'
                    />
                </div>
            </div>
        </div>
    )
}
export const Voters_Card = () => {
    const [selectedState, setSelectedState] = useState<string>('')

    return (
        <div className='grid gap-4'>
            <div>
                <label
                    htmlFor='phoneNumber'
                    className='text-[1.4rem] font-Satoshi-Medium'
                >
                    Voter's Card Number
                </label>

                <div className='flex text-[1.6rem] gap-4 h-[5rem]'>
                    <input
                        required
                        type='number'
                        inputMode='numeric'
                        id='phoneNumber'
                        className='w-full rounded-lg border border-color-grey py-4.8 px-8 outline-none text-color-dark'
                    />
                </div>
            </div>
            <div>
                <label
                    htmlFor='phoneNumber'
                    className='text-[1.4rem] font-Satoshi-Medium'
                >
                    Last Name
                </label>

                <div className='flex text-[1.6rem] gap-4 h-[5rem]'>
                    <input
                        required
                        type='text'
                        inputMode='numeric'
                        id='phoneNumber'
                        className='w-full rounded-lg border border-color-grey py-4.8 px-8 outline-none text-color-dark'
                    />
                </div>
            </div>
            <SingleSelect
                label='State'
                state={['Lagos', 'Imo', 'Abia', 'FCT']}
                placeholder='Select State'
                selectedState={selectedState}
                setSelectedState={setSelectedState}
            />
        </div>
    )
}
