import React, {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react'
import { BsQuestionCircle } from 'react-icons/bs'
import { PaymentPlan, PaymentType } from '../CreatePayment'
import SingleSelect from '../../../../../components/ui/select/SingleSelect'

interface PaymentForm {
    props: {
        paymentType: PaymentType | string
        setPaymentType: Dispatch<SetStateAction<PaymentType | string>>
    }
}

interface InstallmentField {
    amount: string
    startDate: string
    endDate: string
}
function PaymentForm({ props }: PaymentForm) {
    const { paymentType, setPaymentType } = props

    const [isTrackPayment, setIsTrackPayment] = useState(false)
    const [paymentPlan, setPaymentPlan] = useState<string | PaymentPlan>('')
    const [amount, setAmount] = useState('')
    const [balanceAmount, setBalanceAmount] = useState(Number(amount))
    const [installmentField, setInstallmentField] = useState<
        InstallmentField[]
    >([
        {
            amount: '',
            startDate: '',
            endDate: '',
        },
    ])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const amountHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        if (value === '') {
            setAmount('')
            return
        }
        const parsedValue = parseFloat(value.replace(/,/g, ''))

        if (!isNaN(parsedValue) && isFinite(parsedValue)) {
            const transformedValue = parsedValue.toLocaleString()
            setAmount(transformedValue)
        }
    }

    const flexible = (
        <>
            <div className='grid gap-4'>
                <label
                    htmlFor='amount'
                    className='text-[1.4rem] font-Satoshi-Medium'
                >
                    Start Date
                </label>
                <input
                    type='date'
                    required
                    id='startDate'
                    className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                />
            </div>
            <div className='grid gap-4'>
                <label
                    htmlFor='amount'
                    className='text-[1.4rem] font-Satoshi-Medium'
                >
                    End Date
                </label>
                <input
                    type='date'
                    required
                    id='startDate'
                    className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                />
            </div>
        </>
    )

    const fixed = (
        <>
            <div className='grid gap-4'>
                <label
                    htmlFor='amount'
                    className='text-[1.4rem] font-Satoshi-Medium'
                >
                    Start Date
                </label>
                <input
                    type='date'
                    required
                    id='startDate'
                    className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                />
            </div>
            <div className='grid gap-4'>
                <label
                    htmlFor='amount'
                    className='text-[1.4rem] font-Satoshi-Medium'
                >
                    End Date
                </label>
                <input
                    type='date'
                    required
                    id='startDate'
                    className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                />
            </div>

            <div className='grid gap-4'>
                <label
                    htmlFor='amount'
                    className='text-[1.4rem] font-Satoshi-Medium'
                >
                    Amount
                </label>
                <div className='relative rounded-lg border border-color-grey outline-none flex items-center pl-4'>
                    <input
                        type='text'
                        required
                        id='amount'
                        value={amount}
                        onChange={amountHandler}
                        name='amount'
                        className='w-full border-none outline-none py-4 px-4 pl-5'
                    />
                    <img src='/icons/Naira.svg' alt='' className='absolute' />
                </div>
            </div>

            <SingleSelect
                label='Payment Plan'
                state={['full', 'installment'] satisfies PaymentPlan[]}
                selectedState={paymentPlan}
                setSelectedState={setPaymentPlan}
            />
            {paymentPlan === 'full' && (
                <div className='grid gap-4'>
                    <label
                        htmlFor='deadline'
                        className='text-[1.4rem] font-Satoshi-Medium'
                    >
                        Deadline
                    </label>
                    <input
                        type='date'
                        required
                        className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                    />
                </div>
            )}

            <div className='grid justify-items-start gap-4 self-end'>
                <p className=' font-Satoshi-Medium flex items-center gap-2 text-[#043FA7]'>
                    Track Payment{' '}
                    <span className='text-[#043FA7]'>
                        <BsQuestionCircle />
                    </span>
                </p>
                <div
                    onClick={() => setIsTrackPayment(!isTrackPayment)}
                    className='cursor-pointer'
                >
                    {isTrackPayment ? (
                        <img src='/icons/admins/switchOn.svg' alt='' />
                    ) : (
                        <img src='/icons/admins/switchOff.svg' alt='' />
                    )}
                </div>
            </div>
        </>
    )

    const renderForm = new Map([
        ['flexible', flexible],
        ['fixed', fixed],
    ]) satisfies Map<PaymentType, JSX.Element>

    const addAnotherInstallmentHandler = () => {
        setInstallmentField((prev) => [
            ...prev,
            { amount: '', startDate: '', endDate: '' },
        ])
    }

    const installmentChangeHandler = (
        e: ChangeEvent<HTMLInputElement>,
        idx: number
    ) => {
        const { name, value } = e.target

        if (name !== 'amount') {
            setInstallmentField((prev) => {
                const updatedFields = [...prev]

                updatedFields[idx] = {
                    ...updatedFields[idx],
                    [name]: value,
                }

                return updatedFields
            })
        }

        const parsedValue = Number(value.replace(/,/g, ''))

        if (!isNaN(parsedValue) && isFinite(parsedValue)) {
            const transformedValue = parsedValue.toLocaleString()

            setInstallmentField((prev) => {
                const updatedFields = [...prev]

                updatedFields[idx] = {
                    ...updatedFields[idx],
                    [name]: transformedValue === '0' ? '' : transformedValue,
                }

                return updatedFields
            })
        }
    }

    useEffect(() => {
        const reducedAmount =
            installmentField.length > 0
                ? installmentField.reduce((prev, curr) => {
                      const amount: number =
                          parseInt(curr.amount.split(',').join('')) + prev

                      if (isNaN(amount)) {
                          return prev
                      } else {
                          return amount
                      }
                  }, 0)
                : 0

        const balance = parseInt(amount.split(',').join('')) - reducedAmount

        setBalanceAmount(balance)
    }, [installmentField, amount])

    return (
        <div>
            <p className='font-Satoshi-Medium text-[2rem] mb-10'>
                Add Payment ( Step 1 of 2)
            </p>
            {paymentType === 'fixed' && paymentPlan === 'installment' ? (
                <div>
                    {installmentField.map((item, idx) => (
                        <div className='mt-16'>
                            <p className='text-color-blue font-Satoshi-Medium my-5'>
                                Installment {idx + 1}
                            </p>
                            <div
                                className='grid gap-8'
                                style={{
                                    gridTemplateColumns:
                                        ' repeat(auto-fit, minmax(30rem, 1fr))',
                                    rowGap: '4rem',
                                }}
                            >
                                <div
                                    key={idx}
                                    className='contents'
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => installmentChangeHandler(e, idx)}
                                >
                                    <div className='grid gap-4 relative '>
                                        <label
                                            htmlFor='amount'
                                            className='text-[1.4rem] font-Satoshi-Medium'
                                        >
                                            Installment Amount
                                        </label>

                                        <div className='relative rounded-lg border border-color-grey outline-none flex items-center pl-4'>
                                            <input
                                                type='text'
                                                required
                                                id='amount'
                                                value={item.amount}
                                                name='amount'
                                                className='w-full border-none outline-none py-4 px-4 pl-5'
                                            />
                                            <img
                                                src='/icons/Naira.svg'
                                                alt=''
                                                className='absolute'
                                            />
                                        </div>
                                    </div>
                                    <div className='grid gap-4'>
                                        <label
                                            htmlFor='startDate'
                                            className='text-[1.4rem] font-Satoshi-Medium'
                                        >
                                            Start Date
                                        </label>
                                        <input
                                            type='date'
                                            required
                                            name='startDate'
                                            id='startDate'
                                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                                        />
                                    </div>
                                    <div className='grid gap-4'>
                                        <label
                                            htmlFor='endDate'
                                            className='text-[1.4rem] font-Satoshi-Medium'
                                        >
                                            End Date
                                        </label>
                                        <input
                                            type='date'
                                            required
                                            name='endDate'
                                            id='endDate'
                                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <p className='text-[1.4rem] font-light text-gray-400 mt-4'>
                        Max. of 12 installments
                    </p>
                    <button
                        className='border border-color-blue btn text-color-blue flex items-center gap-4 mt-[5rem] rounded-lg'
                        onClick={addAnotherInstallmentHandler}
                    >
                        <img src='/img/add_circle.svg' alt='' />
                        <div className='text-left'>
                            <p>Add Another Installment</p>
                            <p className='text-[1.4rem] font-light'>
                                Max. of 12 installments
                            </p>
                        </div>
                    </button>

                    <div className='mt-[5rem]'>
                        <div className='flex items-center gap-4 my-5 font-Satoshi-Medium'>
                            <span>Total Amount:</span>{' '}
                            <p className='flex items-center'>
                                <span>
                                    <img src='/icons/Naira.svg' alt='' />
                                </span>{' '}
                                <span>{amount}</span>
                            </p>
                        </div>

                        {installmentField.map((item, idx) => (
                            <div className='flex items-center gap-4'>
                                {item.amount && (
                                    <>
                                        <span className='text-color-blue-1 font-Satoshi-Medium w-[10rem]'>
                                            Installment {idx + 1}:
                                        </span>
                                        <p className='flex items-center font-semibold '>
                                            <span>
                                                <img
                                                    src='/icons/Naira.svg'
                                                    alt=''
                                                />
                                            </span>{' '}
                                            <span>{item.amount}</span>
                                        </p>
                                    </>
                                )}
                            </div>
                        ))}

                        <div className='flex items-center gap-4 my-5 font-Satoshi-Medium mt-[5rem] text-[2rem]'>
                            {balanceAmount < 0 ? (
                                <span className='border shadow border-red-400 py-6 px-6 rounded-2xl animate__animated animate__shakeX'>
                                    Installment is greater than total Amount to
                                    pay
                                </span>
                            ) : (
                                <>
                                    {' '}
                                    <span className='text-green-600'>
                                        Balance Amount:
                                    </span>{' '}
                                    <p className='flex items-center'>
                                        <span>
                                            <img
                                                src='/icons/Naira.svg'
                                                alt=''
                                            />
                                        </span>{' '}
                                        <span>
                                            {balanceAmount.toLocaleString()}
                                        </span>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <form
                        onSubmit={handleSubmit}
                        className='grid max-w-[84rem] gap-16 items-start content-start capitalize'
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
                                Payment Name
                            </label>
                            <input
                                type='text'
                                required
                                id='firstName'
                                placeholder='placeholder'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <SingleSelect
                            label='Payment Type'
                            state={
                                ['fixed', 'flexible'] satisfies PaymentType[]
                            }
                            selectedState={paymentType}
                            setSelectedState={setPaymentType}
                        />
                        {renderForm.get(paymentType as PaymentType)}
                    </form>
                </>
            )}
        </div>
    )
}

export default PaymentForm
