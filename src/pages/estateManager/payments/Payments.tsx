import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import RenderedPayments from './RenderPayments'

function Payment() {
    const [isPayment, setIsPayment] = useState(false)

    const addPaymentHandler = () => {
        setIsPayment(true)
    }

    return (
        <div className='grid'>
            <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
                {isPayment ? (
                    <section>
                        <RenderedPayments />
                    </section>
                ) : (
                    <section className='grid  place-content-center w-full h-full justify-items-center gap-4 bg-white rounded-lg'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any Payment yet
                        </p>
                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                            onClick={addPaymentHandler}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Payment
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default Payment
