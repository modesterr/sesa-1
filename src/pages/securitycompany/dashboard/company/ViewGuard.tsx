import React, { useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { getPhotoUrl } from '../../../../utils/getPhotoUrl'
import { BsQuestionCircle } from 'react-icons/bs'
import { toast, ToastContainer } from 'react-toastify'

import { TbCopy } from 'react-icons/tb'
import { CompoundSelect } from '../../../../components/ui/select/CompoundSelect'
import SingleSelect from '../../../../components/ui/select/SingleSelect'

type Actions = 'Deactivate' | 'Delete'

export type ValidateInputTypes =
    | 'Phone Number'
    | 'BVN Number'
    | 'NIN Number'
    | 'Drivers License'
    | 'International Passport'
    | 'Voters Card'

const ViewGuard = () => {
    const [selectedEstate1, setSelectedEstate1] = useState<any>('')
    const [selectedEstate2, setSelectedEstate2] = useState<any>('')
    const [selectedEstate3, setSelectedEstate3] = useState<any>('')
    const [selectedEstate4, setSelectedEstate4] = useState<any>('')
    const [selectedState, setSelectedState] = useState<string>('')
    const [selectedGender, setSelectedGender] = useState<string>('')
    const [isAccountCreated, setIsAccountCreated] = useState(true)
    const [isValidated, setIsValidated] = useState(false)

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

    const assignGuardRef = useRef<HTMLDialogElement | null>(null)
    const validatedDialogRef = useRef<HTMLDialogElement | null>(null)
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const [dialogType, setDialogType] = useState<Actions>('Deactivate')

    const closeAssignGuardDialog = () => {
        if (assignGuardRef.current) {
            assignGuardRef.current.close()
        }
    }

    const openAssignGuardDialog = () => {
        if (assignGuardRef.current) {
            assignGuardRef.current.showModal()
        }
    }

    const closeValidatedDialog = () => {
        if (validatedDialogRef.current) {
            validatedDialogRef.current.close()
        }
    }
    const openValidatedDialog = () => {
        if (validatedDialogRef.current) {
            validatedDialogRef.current.showModal()
        }
    }

    const openDeleteOrDeactivateDialog = (dialogType: Actions) => {
        if (dialogType === 'Deactivate') {
            setDialogType('Deactivate')
        }
        if (dialogType === 'Delete') {
            setDialogType('Delete')
        }

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const handleCloseDeleteOrDeactivateDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleReAssign = () => {
        closeAssignGuardDialog()

        toast(' Reassigned successfully', {
            type: 'success',
            className: 'bg-green-100 text-green-600 text-[1.4rem]',
        })
    }

    const handleDeleteSecurityGuard = () => {
        handleCloseDeleteOrDeactivateDialog()

        toast('Security Guard deleted successfully', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })
    }
    const handleDeactivateSecurityGuard = () => {
        handleCloseDeleteOrDeactivateDialog()

        toast('Security Guard deactivated successfully', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })
    }

    return (
        <>
            <ToastContainer />

            <dialog className='dialog' ref={assignGuardRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[90rem] min-h-[30rem] p-10 text-[1.6rem] relative justify-items-center'>
                        <IoMdClose
                            className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                            onClick={() => closeValidatedDialog()}
                        />

                        <img src='/icons/admins/modalDeactivate.svg' alt='' />
                        <p className='text-[1.6rem]'>
                            Are you sure you want to reassign this security
                            guard primary estate
                        </p>

                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={() => closeAssignGuardDialog()}
                            >
                                Cancel
                            </button>
                            <button
                                className=' bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                onClick={handleReAssign}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>

            <dialog className='dialog' ref={validatedDialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[90rem] min-h-[30rem] p-10 text-[1.6rem] relative gap-20'>
                        <IoMdClose
                            className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                            onClick={() => closeValidatedDialog()}
                        />

                        <div className='relative h-[14rem] bg-blue-600 w-full mt-10 rounded-lg'>
                            <img
                                src='/img/me.jpeg'
                                alt=''
                                className='w-[10rem] h-[10rem] border rounded-full border-green-600 object-cover absolute bottom-[-6rem] left-10 object-top'
                            />
                        </div>
                        <div className='mt-20'>
                            <h2>Validation Result</h2>

                            <div className='border grid mt-5'>
                                <div className='grid grid-cols-2 border-b gap-4'>
                                    <p
                                        className='border-r py-4 pl-4 text-gray-700'
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Validation Option
                                    </p>
                                    <p className='py-4'>
                                        Phone Number | (+234) 813238432
                                    </p>
                                </div>
                                <div className='grid grid-cols-2 border-b gap-4'>
                                    <p
                                        className='border-r py-4 pl-4 text-gray-700'
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Full Name
                                    </p>
                                    <p className='py-4'>Michael Okonkwo</p>
                                </div>
                                <div className='grid grid-cols-2 border-b gap-4'>
                                    <p
                                        className='border-r py-4 pl-4 text-gray-700'
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Date of Birth
                                    </p>
                                    <p className='py-4'>15 May, 1998</p>
                                </div>
                                <div className='grid grid-cols-2 border-b gap-4'>
                                    <p
                                        className='border-r py-4 pl-4 text-gray-700'
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Phone Number
                                    </p>
                                    <p className='py-4'> (+234) 813238432</p>
                                </div>
                                <div className='grid grid-cols-2  gap-4'>
                                    <p
                                        className='border-r py-4 pl-4 text-gray-700'
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Gender
                                    </p>
                                    <p className='py-4'>Male</p>
                                </div>
                            </div>
                        </div>
                        <button
                            className='btn text-white bg-[#0556E5] border rounded-lg w-[15rem] justify-self-center'
                            onClick={() => closeValidatedDialog()}
                        >
                            Ok
                        </button>
                    </div>
                </section>
            </dialog>

            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        {dialogType === 'Deactivate' ? (
                            <>
                                <img
                                    src='/icons/admins/modalDeactivate.svg'
                                    alt=''
                                />
                                <p className='text-[1.6rem]'>
                                    Are you sure you want to deactivate this
                                    Security Guard
                                </p>

                                <div className='flex w-full justify-center gap-8'>
                                    <button
                                        className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                        onClick={() =>
                                            handleCloseDeleteOrDeactivateDialog()
                                        }
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                        onClick={handleDeactivateSecurityGuard}
                                    >
                                        Deactivate
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <img
                                    src='/icons/admins/modalWarning.svg'
                                    alt=''
                                />
                                <p className='text-[1.6rem]'>
                                    Are you sure you want to delete this
                                    Security Guard
                                </p>

                                <div className='flex w-full justify-center gap-8'>
                                    <button
                                        className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                        onClick={() =>
                                            handleCloseDeleteOrDeactivateDialog()
                                        }
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                        onClick={handleDeleteSecurityGuard}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </dialog>
            <main className='bg-white grid gap-10 rounded-lg py-10'>
                <section className='grid p-8 bg-white items-baseline rounded-lg'>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-8 items-center'>
                            <label
                                htmlFor='photoUpload'
                                className='grid gap-4 cursor-pointer justify-items-center'
                            >
                                <img
                                    src={photoUrl ? photoUrl : '/img/me.jpeg'}
                                    alt='photoPreview'
                                    className='object-cover w-[11rem] h-[11rem] rounded-full object-top'
                                />
                                <span className='text-color-blue-1 text-[1.4rem]'>
                                    Edit
                                </span>
                            </label>
                            <input
                                type='file'
                                name='photoUpload'
                                id='photoUpload'
                                accept='image/*'
                                className='hidden'
                                onClick={handlePhotoPreview}
                            />
                            <div className='grid gap-2 justify-items-start'>
                                <p
                                    style={{
                                        fontFamily: 'Satoshi-Light',
                                    }}
                                >
                                    Guard Code :{' '}
                                    <span
                                        style={{
                                            fontFamily: 'Satoshi-Medium',
                                        }}
                                    >
                                        SG09897
                                    </span>
                                </p>
                                <p className='flex items-center gap-4'>
                                    <span className='flex items-center gap-2'>
                                        KYG Status <BsQuestionCircle />:
                                    </span>
                                    {isValidated ? (
                                        <span
                                            className='text-green-600'
                                            style={{
                                                fontFamily: 'Satoshi-Light',
                                            }}
                                        >
                                            Validated
                                        </span>
                                    ) : (
                                        <span
                                            className='text-red-600'
                                            style={{
                                                fontFamily: 'Satoshi-Light',
                                            }}
                                        >
                                            Not Validated
                                        </span>
                                    )}
                                </p>
                                <button
                                    style={{
                                        fontFamily: 'Satoshi-Medium',
                                    }}
                                    className='text-color-blue'
                                    onClick={() => openValidatedDialog()}
                                >
                                    Click here to view results
                                </button>
                            </div>
                        </div>

                        <div className='flex gap-8'>
                            <button
                                className='border border-color-blue-1 text-color-blue-1 px-16 py-4 flex items-center  rounded-lg gap-4'
                                onClick={() =>
                                    openDeleteOrDeactivateDialog('Deactivate')
                                }
                            >
                                <span className=' text-[1.4rem] font-semibold'>
                                    Deactivate
                                </span>
                            </button>
                            <button
                                className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                                onClick={() =>
                                    openDeleteOrDeactivateDialog('Delete')
                                }
                            >
                                <img src='/icons/admins/delete.svg' alt='' />
                                <span className='text-red-600 text-[1.4rem] font-semibold'>
                                    Delete
                                </span>
                            </button>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className='grid max-w-[84rem] gap-16 mt-12'
                        style={{
                            gridTemplateColumns:
                                ' repeat(auto-fit, minmax(35rem, 1fr))',
                        }}
                    >
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='firstName'
                                className='text-[1.4rem] font-Satoshi-Medium'
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
                                className='text-[1.4rem] font-Satoshi-Medium'
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
                                className='text-[1.4rem] font-Satoshi-Medium'
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
                                className='text-[1.4rem] font-Satoshi-Medium'
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
                                className='text-[1.4rem] font-Satoshi-Medium'
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
                        <SingleSelect
                            label='Gender'
                            state={['Male', 'Female']}
                            selectedState={selectedGender}
                            setSelectedState={setSelectedGender}
                        />
                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='email'
                                className='text-[1.4rem] font-Satoshi-Medium'
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
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Address
                            </label>
                            <input
                                type='text'
                                required
                                id='address1'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>

                        <SingleSelect
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
                                    Drag Security Guard picture here or{' '}
                                    <span className='text-color-blue font-Satoshi-Medium'>
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
                <section className='grid p-8 bg-white border-t-gray-100 border-t'>
                    <h2
                        className='text-[2rem] mb-10'
                        style={{
                            fontFamily: 'Satoshi-Medium',
                        }}
                    >
                        Assigned Estate Details
                    </h2>
                    <div className='grid gap-4'>
                        <div className=' items-center grid grid-cols-3'>
                            <div>
                                <p className='text-[1.4rem] font-Satoshi-Medium'>
                                    Primary Assigned Estate
                                </p>
                                <p className='text-[1.4rem] font-light'>
                                    Last Assigned on: 12-May-2023
                                </p>
                            </div>
                            <div>
                                <CompoundSelect
                                    state={[
                                        { name: 'Gwarimpa Estate', No: 3 },
                                        { name: 'Ibara Estate', No: 12 },
                                        { name: 'Peace estate', No: 1 },
                                        {
                                            name: 'Iba Estate',
                                            No: 2,
                                        },
                                    ]}
                                    placeholder='Gwarimpa Estate'
                                    selectedState={selectedEstate1}
                                    isSearchable={true}
                                    setSelectedState={setSelectedEstate1}
                                />
                            </div>

                            <button
                                className='btn text-color-blue-1 '
                                onClick={() => openAssignGuardDialog()}
                            >
                                Reassign
                            </button>
                        </div>
                        <div className=' items-center grid grid-cols-3'>
                            <div>
                                <p className='text-[1.4rem] font-Satoshi-Medium'>
                                    Secondary Assigned Estate
                                </p>
                                <p className='text-[1.4rem] font-light'>
                                    Last Assigned on: 12-May-2023
                                </p>
                            </div>
                            <div>
                                <CompoundSelect
                                    state={[
                                        { name: 'Gwarimpa Estate', No: 3 },
                                        { name: 'Ibara Estate', No: 12 },
                                        { name: 'Peace estate', No: 1 },
                                        {
                                            name: 'Iba Estate',
                                            No: 2,
                                        },
                                    ]}
                                    placeholder='Iba Estate'
                                    selectedState={selectedEstate2}
                                    isSearchable={true}
                                    setSelectedState={setSelectedEstate2}
                                />
                            </div>

                            <button
                                className='btn text-color-blue-1 '
                                onClick={() => openAssignGuardDialog()}
                            >
                                Reassign
                            </button>
                        </div>
                        <div className=' items-center grid grid-cols-3'>
                            <div>
                                <p className='text-[1.4rem] font-Satoshi-Medium'>
                                    Primary Assigned Estate
                                </p>
                                <p className='text-[1.4rem] font-light'>
                                    Last Assigned on: 12-May-2023
                                </p>
                            </div>
                            <div>
                                <CompoundSelect
                                    state={[
                                        { name: 'Gwarimpa Estate', No: 3 },
                                        { name: 'Ibara Estate', No: 12 },
                                        { name: 'Peace estate', No: 1 },
                                        {
                                            name: 'Iba Estate',
                                            No: 2,
                                        },
                                    ]}
                                    placeholder='Peace Estate'
                                    selectedState={selectedEstate3}
                                    isSearchable={true}
                                    setSelectedState={setSelectedEstate3}
                                />
                            </div>

                            <button
                                className='btn text-color-blue-1 '
                                onClick={() => openAssignGuardDialog()}
                            >
                                Reassign
                            </button>
                        </div>
                        <div className=' items-center grid grid-cols-3'>
                            <div>
                                <p className='text-[1.4rem] font-Satoshi-Medium'>
                                    Primary Assigned Estate
                                </p>
                                <p className='text-[1.4rem] font-light'>
                                    Last Assigned on: 12-May-2023
                                </p>
                            </div>
                            <div>
                                <CompoundSelect
                                    state={[
                                        { name: 'Gwarimpa Estate', No: 3 },
                                        { name: 'Ibara Estate', No: 12 },
                                        { name: 'Peace estate', No: 1 },
                                        {
                                            name: 'Ibara Estate',
                                            No: 2,
                                        },
                                    ]}
                                    placeholder='Gwarimpa Estate'
                                    selectedState={selectedEstate4}
                                    isSearchable={true}
                                    setSelectedState={setSelectedEstate4}
                                />
                            </div>

                            <button
                                className='btn text-color-blue-1 '
                                onClick={() => openAssignGuardDialog()}
                            >
                                Reassign
                            </button>
                        </div>
                    </div>
                </section>
                <section className='grid p-8 bg-white w-4/5 border-t border-t-gray-100'>
                    <h2
                        className='text-[2rem] mb-10'
                        style={{
                            fontFamily: 'Satoshi-Medium',
                        }}
                    >
                        Account Information
                    </h2>

                    {isAccountCreated ? (
                        <div className='columns-2 justify-between items-center gap-10'>
                            <div className='grid gap-4 relative '>
                                <label
                                    htmlFor='bankName'
                                    className='text-[1.4rem] font-Satoshi-Medium'
                                >
                                    Bank Name
                                </label>
                                <input
                                    type='text'
                                    required
                                    id='bankName'
                                    placeholder={`First City Monument Bank`}
                                    className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                                />
                            </div>

                            <div className='grid gap-4 relative '>
                                <label
                                    htmlFor='firstName'
                                    className='text-[1.4rem] font-Satoshi-Medium'
                                >
                                    Account Number
                                </label>
                                <div className='relative flex items-center pr-20 w-full rounded-lg border border-color-grey'>
                                    <input
                                        type='number'
                                        required
                                        id='firstName'
                                        placeholder={`2084827323`}
                                        className=' text-[1.6rem] outline-transparent py-4 px-4 w-full'
                                    />

                                    <TbCopy className='text-[#0556E5] absolute right-8 text-[2rem]' />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className='flex items-cente gap-2'>
                            <span>No account Information created.</span>
                            <span
                                className=' text-color-blue'
                                style={{
                                    fontFamily: 'Satoshi-Medium',
                                }}
                            >
                                Open a bank account
                            </span>
                        </p>
                    )}
                </section>
            </main>
        </>
    )
}

export default ViewGuard
