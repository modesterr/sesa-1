import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import useFetchData from '../../../../components/hooks/useFetchData'
import Input from '../../../../components/ui/input/Input'

const EstateWalletDetails = () => {
    interface Inputs {
        type: string
        transaction_date: string
        transaction_time: string
        category: string
        transaction_source: string
        amount: string
        tran_id: string
        description: string
        balance: string
    }

    type FormInputs = {
        label: keyof Inputs
        type?: string
        name?: string
        value?: string
        tag?: string
        disabled?: string
    }

    const params = useParams()

    const wallet_id = params.id?.replace(':', '')

    if (!wallet_id) {
        toast('Wallet not Found', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })

        return <p className='p-4'> Not found!</p>
    }

    const {
        register,
        clearErrors,
        setValue,
        formState: { errors: formErrors },
        reset,
    } = useForm<Inputs>()

    const { isLoading, data } = useFetchData({
        url: `admin/get/wallet/transaction/details/estate/${wallet_id}`,
        name: `estate_wallet_detail_${wallet_id}`,
    })

    const amount = data?.amount
    const balance = data?.balance
    useEffect(() => {
        if (data) {
            const { created_at, amount, estate_name, ...other } = data

            const transaction_date = created_at.slice(0, 10)
            const transaction_time = created_at.slice(11, 16)
            const transaction_source = estate_name

            reset({
                transaction_date,
                transaction_time,
                transaction_source,
                ...other,
            })
        }
    }, [data])

    if (isLoading) {
        return <p>loading...</p>
    }

    const formInputs = [
					{
						label: "type",
						name: "transaction_type",
					},

					{
						label: "transaction_date",
					},
					{
						label: "transaction_time",
						type: "time",
					},
					{
						label: "category",
						name: "transaction_category",
					},
					{
						label: "transaction_source",
					},
					{
						label: "amount",
						name: "transaction_amount",
						tag: "money",
						value: amount,
					},
					{
						label: "balance",
						name: "transaction_balance",
						tag: "money",
						value: balance,
					},
					{
						label: "tran_id",
						name: "transaction_ID",
					},
					{
						label: "description",
						name: "narration",
					},
				] satisfies FormInputs[];

    return (
        <div className=' p-8 bg-white min-h-[60vh] rounded-lg overflow-y-scroll'>
            <div
                className='grid max-w-[84rem] gap-16 mt-12 '
                style={{
                    gridTemplateColumns:
                        ' repeat(auto-fit, minmax(35rem, 1fr))',
                }}
            >
                <>
                    {formInputs.map((input, idx) => {
                        const { label, name, tag, type, value } = input

                        return (
                            <Input
                                key={idx + label}
                                label={label}
                                tag={tag}
                                type={type}
                                value={value}
                                clearErrors={clearErrors}
                                setValue={setValue}
                                register={register}
                                formErrors={formErrors}
                                name={name}
                                disabled={true}
                            />
                        )
                    })}
                </>
            </div>
        </div>
    )
}

export default EstateWalletDetails
