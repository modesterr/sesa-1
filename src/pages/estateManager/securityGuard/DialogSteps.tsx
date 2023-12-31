import { useContext } from 'react'
import { TbCopy } from 'react-icons/tb'
import SingleSelect from '../../../components/ui/select/SingleSelect'

export const AddedSecurityGuardSuccessfully = ({
    contextData,
}: {
    contextData: React.Context<any>
}) => {
    const { handleClose, setAddedSecurityGuardStep } = useContext(contextData)

    return (
        <div className='w-full grid justify-items-center gap-4'>
            <img src='/icons/admins/modalSuccess.svg' alt='' />

            <p>You have successfully added an Security Guard </p>

            <p
                className='font-Satoshi-Medium text-[1.8rem] max-w-[40rem] text-center'
                style={{
                    fontFamily: 'Satoshi-Medium',
                }}
            >
                Do you want to open a bank account for this Security Guard ?
            </p>

            <div className='flex w-full justify-center gap-8 mt-10'>
                <button
                    className='btn bg-white text-[#0556E5] border-[#0556E5] border rounded-lg w-[20rem] font-Satoshi-Medium'
                    onClick={() => handleClose()}
                >
                    Skip, Later
                </button>
                <button
                    className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[20rem]'
                    onClick={() => setAddedSecurityGuardStep('addBankAccount')}
                >
                    Open an Account
                </button>
            </div>
        </div>
    )
}

export const AddBankAccount = ({
    contextData,
}: {
    contextData: React.Context<any>
}) => {
    const { selectedBank, setSelectedBank, setAddedSecurityGuardStep } =
        useContext(contextData)

    return (
        <div className='w-[40rem] grid justify-items-center gap-10'>
            <p
                className='border-b w-full text-left pb-2'
                style={{
                    fontFamily: 'Satoshi-Medium',
                }}
            >
                Open a bank Account
            </p>
            <div className='w-full'>
                <SingleSelect
                    label='Select Bank'
                    state={[
                        'FCMB Easy Wallet',
                        'FCMB Account',
                        'Parallax Bank Account',
                    ]}
                    selectedState={selectedBank}
                    setSelectedState={setSelectedBank}
                />
            </div>

            <button
                className='bg-[#0556E5] py-6 px-12 w-full text-white text-[1.6rem] rounded-lg mt-10'
                onClick={() =>
                    setAddedSecurityGuardStep('openedBankAccountSuccessful')
                }
            >
                Generate Account Number
            </button>
        </div>
    )
}

export const OpenedBankAccountSuccessful = ({
    contextData,
}: {
    contextData: React.Context<any>
}) => {
    const { handleClose, selectedBank, setAddedSecurityGuardStep } =
        useContext(contextData)

    const closeSteps = () => {
        handleClose()
        setAddedSecurityGuardStep('addedSecurityGuardSuccessful')
    }

    return (
        <div className='w-full grid justify-items-center gap-4'>
            <img src='/icons/admins/modalSuccess.svg' alt='' />

            <p>
                You have successfully opened an account number for this Security
                Guard
            </p>

            <div className='grid justify-items-center gap-4'>
                <h2
                    className='font-Satoshi-Medium text-[2rem] text-center uppercase flex items-center gap-4'
                    style={{
                        fontFamily: 'Satoshi-Medium',
                    }}
                >
                    2094828922 <TbCopy className='text-[#0556E5]' /> -{' '}
                    {selectedBank}
                </h2>
                <p
                    className='uppercase text-[2rem] font-Satoshi-Medium'
                    style={{
                        fontFamily: 'Satoshi-Medium',
                    }}
                >
                    Ajayi Suileman Adeyemi
                </p>
            </div>
            <div className='flex justify-center gap-8 w-full mt-10'>
                <button
                    className='bg-[#0556E5] py-4 px-12 text-white text-[1.6rem] rounded-lg w-[20rem]'
                    onClick={() => closeSteps()}
                >
                    Ok
                </button>
            </div>
        </div>
    )
}
