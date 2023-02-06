
import { FormEvent } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const PlatformChanges = () => {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        toast('Changes saved successfully', {
            type: 'success',
            className: 'bg-green-100 text-green-600 text-[1.4rem]',
        })
    }

    return (
        <>
            <ToastContainer />
            <div className=' p-8 bg-white h-[80vh] rounded-lg'>
                <h2 className='heading2'>Platform Changes</h2>
                <form
                    onSubmit={handleSubmit}
                    className='grid max-w-[84rem] gap-16 mt-12'
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    <div className='relative flex items-center'>
                        <img
                            src='/icons/Naira.svg'
                            alt=''
                            className='absolute left-3'
                        />
                        <input
                            type='number'
                            required
                            placeholder='40'
                            id='description'
                            className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                        />
                    </div>
                    <div className='relative flex items-center'>
                        <img
                            src='/icons/Naira.svg'
                            alt=''
                            className='absolute left-3'
                        />
                        <input
                            type='number'
                            required
                            placeholder='40'
                            id='description'
                            className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                        />
                    </div>

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full mt-auto'
                        style={{ justifySelf: 'start' }}
                    >
                        <span>
                            <img
                                src='/icons/admins/saveDisk.svg'
                                alt=''
                                className='w-[1.7rem] h-[1.7rem]'
                            />
                        </span>{' '}
                        Save Changes
                    </button>
                </form>
            </div>
        </>
    )
}

export default PlatformChanges
