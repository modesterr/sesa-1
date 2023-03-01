import React, { FormEvent, useRef, useState } from 'react'
import { IoMdAdd, IoMdClose } from 'react-icons/io'
import { BsQuestionCircle } from 'react-icons/bs'
import { ToastContainer } from 'react-toastify'
import { Select } from '../../../components/SuperAdmin/UI/Select'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'
import { PhoneNumber, BVN_Number, NIN_Number, DriversLicence, International_PassPort, Voters_Card } from '../../SecurityCompany/dashboard/company/AddSecurity/Inputs'
import { ValidateInputTypes } from '../../SecurityCompany/dashboard/company/ViewGuard'

type DialogType = 'validate' | 'add-Resident'

export type ValidateInputTypes =
    | 'Phone Number'
    | 'BVN Number'
    | 'NIN Number'
    | 'Drivers License'
    | 'International Passport'
    | 'Voters Card'
    
const AddResident = () => {
    const [selectedState, setSelectedState] = useState<string | null>(null)
    const [selectedResident, setSelectedResident] = useState<string | null>(null)
    const [selectedGender, setSelectedGender] = useState<string | null>(null)
    const [isValidated, setIsValidated] = useState(false)

    
    const [dialogState, setDialogState] = useState<DialogType>('validate')
    const [validationType, setValidationType] = useState<
        ValidateInputTypes | string | null
    >('Phone Number')

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

    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const validateDialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const closeValidateDialog = () => {
        if (validateDialogRef.current) {
            validateDialogRef.current.close()
        }
    }

    const openValidateDialog = () => {
        if (validateDialogRef.current) {
            validateDialogRef.current.showModal()
        }
    }
    const handleOpen = (modalState: DialogType) => {
        if (modalState === 'validate') {
            setIsAddResident(true)
        } else {
            setIsAddResident(false)
        }

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const addResidentHandler = () => {
        // navigate('/superAdmin/residentCategory/add')
        handleOpen('add-Resident')
    }

    const confirmAddResident = () => {
        handleClose()
    }

    const handleDialogSubmit = (e: FormEvent) => {
        e.preventDefault()
        handleClose()

        openValidateDialog()
    }



    const renderValidationType = new Map([
        ['Phone Number', <PhoneNumber />],
        ['BVN Number', <BVN_Number />],
        ['NIN Number', <NIN_Number />],
        ['Drivers License', <DriversLicence />],
        ['International Passport', <International_PassPort />],
        ['Voters Card', <Voters_Card />],
    ]) satisfies Map<ValidateInputTypes, JSX.Element>

    const handleValidate = () => {
        setIsValidated(true)
    }

   
    return (
        <>
            <ToastContainer />

            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[64rem] min-h-[30rem] p-10 gap-8 text-[1.6rem] relative'>
                        <IoMdClose
                            className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                            onClick={() => handleClose()}
                        />

                        {dialogState === 'validate' ? (
                            <form
                                className='grid gap-12'
                                onSubmit={handleDialogSubmit}
                            >
                                <h3
                                    className='text-[2rem] font-bold border-b '
                                    style={{
                                        fontFamily: 'Satoshi-Medium',
                                    }}
                                >
                                    Know Your Guard (KYG)
                                </h3>

                                <Select
                                    state={[
                                        'Phone Number',
                                        'BVN Number',
                                        'NIN Number',
                                        'Drivers License',
                                        'International Passport',
                                        'Voters Card',
                                    ]}
                                    label='Validation Option'
                                    validate
                                    selectedState={validationType}
                                    setSelectedState={setValidationType}
                                />

                                <p
                                    className='text-[#043FA7] flex items-center gap-2 border-b pb-10 w-full'
                                    style={{
                                        fontFamily: 'Satoshi-Light',
                                    }}
                                >
                                    What is KYG <BsQuestionCircle />
                                </p>
                                {renderValidationType.get(
                                    validationType as ValidateInputTypes
                                )}

                                <button
                                    className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'
                                    onClick={handleValidate}
                                >
                                    Validate
                                </button>
                            </form>
                        ) : (
                            <div className='bg-white rounded-2xl grid place-content-center justify-items-center h-[30rem] gap-8 text-[1.6rem]'>
                                {' '}
                                <img
                                    src='/icons/admins/modalSuccess.svg'
                                    alt=''
                                />
                                <p className='text-[1.6rem]'>
                                    You have successfully added a resident
                                </p>
                                <div className='flex w-full justify-center gap-8'>
                                    <button
                                        className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                        onClick={() => handleClose()}
                                    >
                                        View details
                                    </button>
                                    <button
                                        className=' bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                        //onClick={handleReAssign}
                                    >
                                        Ok
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </dialog>
            <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg'>
                <div className='grid gap-8 max-w-[40rem]'>
                    <p className='text-[2rem] font-bold'>
                        KYA <span className='text-gray-500'>(Optional)</span>
                    </p>
                    <div className='flex justify-between text-[1.6rem]'>
                        <p
                            className='text-[#098DFF] cursor-pointer'
                            onClick={() => handleOpen('validate')}
                        >
                            Click her to validate this person
                        </p>
                        <p
                            className='text-[#043FA7] flex items-center gap-2'
                            style={{
                                fontFamily: 'Satoshi-Light',
                            }}
                        >
                            What is KYA <BsQuestionCircle />
                        </p>
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
                    <Select
                        label='Gender'
                        state={['Male', 'Female']}
                        selectedState={selectedGender}
                        setSelectedState={setSelectedGender}
                    />
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
                            Address Line 1*
                        </label>
                        <input
                            type='text'
                            required
                            id='address1'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='address2'
                            className='text-[1.4rem] font-medium'
                        >
                            Address Line 2*
                        </label>
                        <input
                            type='text'
                            required
                            id='address2'
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
                    <Select
                        label='Resident Category'
                        state={[
                            'Plumber',
                            'Electrician',
                            'Carpenter',
                            'Painter',
                        ]}
                        selectedState={selectedResident}
                        setSelectedState={setSelectedResident}
                    />
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='businessName'
                            className='text-[1.4rem] font-medium'
                        >
                            Business Name
                        </label>
                        <input
                            type='text'
                            placeholder='Optional'
                            id='businessName'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='col-span-full rounded-lg border border-width-[.2rem] border-dashed border-color-grey-1 p-8 text-[1.6rem] relative w-full'>
                        <label
                            htmlFor='photoUpload'
                            className='flex justify-center gap-4 items-center cursor-pointer'
                        >
                            <img src='/icons/admins/photo_library.svg' alt='' />
                            <p
                                className='text-color-dark-1'
                                style={{
                                    fontFamily: 'Satoshi-Light',
                                }}
                            >
                                Drag estate manager picture here or{' '}
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

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                        style={{ justifySelf: 'start' }}
                        onClick={addResidentHandler}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Add Resident
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddResident
