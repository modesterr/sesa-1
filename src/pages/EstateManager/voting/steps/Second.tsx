import { ChangeEvent, useState } from 'react'
import { Select } from '../../../../components/SuperAdmin/UI/Select'
import { getPhotoUrl } from '../../../../utils/getPhotoUrl'
import { useCreateElectionContext } from '../createElection'

function Second() {
    const { electionCategory } = useCreateElectionContext()
    const [candidate, setCandidate] = useState<string | null>(null)
    const [category, setCategory] = useState<string | null>(null)

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
        <div>
            <div className='grid  gap-16 items-start content-start capitalize'>
                <div className='grid gap-4 relative w-[35rem]'>
                    <Select
                        state={[
                            'ALIBA DESMOND (RES CODE: 2345CDGK1)',
                            'ALIBA DESMOND (RES CODE: 2345CDGK2)',
                            'ALIBA DESMOND (RES CODE: 2345CDGK3)',
                            'ALIBA DESMOND (RES CODE: 2345CDGK4)',
                            'ALIBA DESMOND (RES CODE: 2345CDGK5)',
                        ]}
                        label='Election Candidates (Select Resident Code)'
                        selectedState={candidate}
                        setSelectedState={setCandidate}
                    />
                </div>

                <div
                    className='grid gap-16 '
                    style={{
                        gridTemplateColumns: 'repeat(auto-fit, 35rem)',
                    }}
                >
                    <div className='grid gap-4 select-none pointer-events-none opacity-50 '>
                        <label
                            htmlFor='name'
                            className='text-[1.4rem] font-medium'
                        >
                            Name
                        </label>
                        <input
                            type='text'
                            required
                            id='name'
                            defaultValue={candidate ? 'Aliba Desmond' : ''}
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 select-none pointer-events-none opacity-50'>
                        <label
                            htmlFor='gender'
                            className='text-[1.4rem] font-medium'
                        >
                            Gender
                        </label>
                        <input
                            type='text'
                            required
                            id='gender'
                            defaultValue={candidate ? 'Male' : ''}
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <Select
                        state={electionCategory}
                        label='Election Category'
                        selectedState={category}
                        setSelectedState={setCategory}
                    />

                    <div className='col-span-full'>
                        <label className=' font-medium'>Manifesto</label>
                        <textarea
                            rows={5}
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 '
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
                                picture here{' '}
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
                </div>
            </div>
        </div>
    )
}

export default Second
