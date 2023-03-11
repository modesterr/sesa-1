import React, { createContext, FormEvent, useRef, useState } from 'react'
import { IoMdAdd, IoMdCheckmarkCircleOutline, IoMdClose } from 'react-icons/io'
import { BsQuestionCircle } from 'react-icons/bs'

import { Select } from '../../../components/SuperAdmin/UI/Select'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'


const AddEnergyToken = () => {
  

    const [selectedState, setSelectedState] = useState<string | null>(null)
    const [selectedGender, setSelectedGender] = useState<string | null>(null)
 

    const [photoUrl, setPhotoUrl] = useState('')

    const handlePhotoPreview = async (
        _: React.MouseEvent<HTMLInputElement>
    ) => {
        const getUrl = await getPhotoUrl(`#photoUpload`)
        setPhotoUrl(getUrl)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <>
            <ToastContainer />

            <main>
                <section className='grid p-8 bg-white items-baseline rounded-lg'>
                    <button className=' mb-5 ml-auto border border-color-blue'>
                        Bulk Upload
                    </button>
                    <p className='text-[2rem] font-Satoshi-Medium'>
                        Token Details
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className='grid max-w-[84rem] gap-16 mt-12 '
                        style={{
                            gridTemplateColumns:
                                ' repeat(auto-fit, minmax(35rem, 1fr))',
                        }}
                    >
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='firstName'
                                className='text-[1.4rem] font-medium'
                            >
                                First Name *
                            </label>
                            <input
                                type='text'
                                required
                                id='firstName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='lastName'
                                className='text-[1.4rem] font-medium'
                            >
                                Last Name *
                            </label>
                            <input
                                type='text'
                                required
                                id='lastName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='lastName'
                                className='text-[1.4rem] font-medium'
                            >
                                Middle Name *
                            </label>
                            <input
                                type='text'
                                required
                                id='lastName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='lastName'
                                className='text-[1.4rem] font-medium'
                            >
                                Date of Birth
                            </label>
                            <input
                                type='text'
                                required
                                id='lastName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>

                        <div className='grid gap-4'>
                            <label
                                htmlFor='phoneNumber'
                                className='text-[1.4rem] font-medium'
                            >
                                Phone Number *
                            </label>

                            <div className='flex text-[1.6rem] gap-4   h-[5rem]'>
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
                        <Select
                            label='Gender'
                            state={['Male', 'Female']}
                            selectedState={selectedGender}
                            setSelectedState={setSelectedGender}
                        />
                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='email'
                                className='text-[1.4rem] font-medium'
                            >
                                Email Address *
                            </label>
                            <input
                                type='email'
                                required
                                id='email'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>

                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='address1'
                                className='text-[1.4rem] font-medium'
                            >
                                Home Address
                            </label>
                            <input
                                type='text'
                                required
                                id='address1'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>

                        <Select
                            label='State'
                            state={['Lagos', 'Imo', 'Abia', 'FCT']}
                            placeholder='Select State'
                            selectedState={selectedState}
                            setSelectedState={setSelectedState}
                        />

                        <div className='col-span-full rounded-lg border border-width-[.2rem] border-dashed border-color-grey-1 p-8 text-[1.6rem] relative w-full'>
                            <label
                                htmlFor='photoUpload'
                                className='flex justify-center gap-4 items-center cursor-pointer'
                            >
                                <img
                                    src='/icons/admins/photo_library.svg'
                                    alt=''
                                />
                                <p
                                    className='text-color-dark-1'
                                    style={{
                                        fontFamily: 'Satoshi-Light',
                                    }}
                                >
                                    Drag picture here{' '}
                                    <span className='text-color-blue font-bold'>
                                        click
                                    </span>{' '}
                                    to upload
                                </p>
                            </label>
                            <input
                                type='file'
                                name='photoUpload'
                                id='photoUpload'
                                accept='image/*'
                                className='hidden'
                                onClick={handlePhotoPreview}
                            />

                            {photoUrl && (
                                <div className='flex justify-center justify-self-center'>
                                    <img
                                        src={photoUrl}
                                        alt='photoPreview'
                                        className='object-cover w-[11rem] h-[11rem] rounded-full'
                                    />
                                </div>
                            )}
                        </div>
                    </form>
                </section>
                <section className='grid p-8 bg-white'>
                    <div className='grid gap-8 max-w-[40rem] mt-[5rem] '>
                        <div className='flex items-center justify-between'>
                            <p className='text-[2rem] font-bold flex items-center gap-2'>
                                kys{' '}
                                <span className='text-[#043FA7]'>
                                    <BsQuestionCircle />
                                </span>
                            </p>
                            <div
                                onClick={toggleIskys}
                                className='cursor-pointer'
                            >
                                {iskys ? (
                                    <img
                                        src='/icons/admins/switchOn.svg'
                                        alt=''
                                    />
                                ) : (
                                    <img
                                        src='/icons/admins/switchOff.svg'
                                        alt=''
                                    />
                                )}
                            </div>
                        </div>

                        {isValidated ? (
                            <div className='flex gap-8 text-[1.6rem]'>
                                <p className='text-[#098DFF] cursor-pointer flex items-center font-medium'>
                                    kys Validated <IoMdCheckmarkCircleOutline />
                                </p>
                                <button
                                    className='text-green-600 flex items-center gap-2'
                                    style={{
                                        fontFamily: 'Satoshi-Medium',
                                    }}
                                    onClick={() => openValidateDialog()}
                                >
                                    View Results <BsQuestionCircle />
                                </button>
                            </div>
                        ) : (
                            <>
                                {iskys && (
                                    <div className='flex justify-between text-[1.6rem]'>
                                        <p
                                            className='text-[#098DFF] cursor-pointer'
                                            onClick={() =>
                                                handleOpen('validate')
                                            }
                                            style={{
                                                fontFamily: 'Satoshi-Medium',
                                            }}
                                        >
                                            Click here to validate this person
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg mt-32'
                        style={{ justifySelf: 'start' }}
                        onClick={addSecurityGuardHandler}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Add Site Worker
                    </button>
                </section>
            </main>
        </>
    )
}

export default AddEnergyToken
