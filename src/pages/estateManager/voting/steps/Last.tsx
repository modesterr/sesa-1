import { useEffect, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { GroupThreeImages } from '../../../../components/ui/GroupThreeImages'
import { CandidateField, useCreateElectionContext } from '../createElection'

const Last = () => {
    type CandidateDetails = { [key: string]: CandidateField[] }
    const {
        electionCategory,
        candidate_details,
        votesDisplay,
        setStep,
        allowPhysicalVoting,
        electionDates,
    } = useCreateElectionContext()
    const [candidateData, setCandidateData] = useState<CandidateDetails>({})
    const [candidateImgs, setCandidateImgs] = useState<{
        [key: string]: string[]
    }>({})

    const [currentCategory, setCurrentCategory] = useState<CandidateField[]>([])

    useEffect(() => {
        const tempCandidateData: CandidateDetails = {}
        const tempCandidateImg: { [key: string]: string[] } = {}

        candidate_details.forEach((detail) => {
            const category = detail.category as string

            if (electionCategory.includes(category)) {
                tempCandidateData[category]
                    ? (tempCandidateData[category] = [
                          ...tempCandidateData[category],
                          detail,
                      ])
                    : (tempCandidateData[category] = [detail])

                tempCandidateImg[category]
                    ? (tempCandidateImg[category] = [
                          ...tempCandidateImg[category],
                          detail.photoUrl,
                      ])
                    : (tempCandidateImg[category] = [detail.photoUrl])
            }
        })
        setCandidateData((prev) => ({ ...prev, ...tempCandidateData }))
        setCandidateImgs((prev) => ({ ...prev, ...tempCandidateImg }))
    }, [candidate_details, electionCategory])

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }
    const openDialog = (key: string) => {
        Object.values(candidateData).length > 0 &&
            Object.entries(candidateData)
                .filter(([foundKey]) => foundKey === key)
                .map(([_, value]) => {
                    setCurrentCategory([...value])
                })

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    console.log({ electionDates })

    const { votingStartDate, votingEndDate } = electionDates

    return (
        <main className='bg-color-white rounded-lg grid gap-16'>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className=' rounded-2xl justify-items-center w-[64rem] h-[30rem] bg-white overflow-scroll'>
                        <div className=' relative p-8 capitalize h-full'>
                            <IoMdClose
                                className='absolute right-0 top-0 text-[2.5rem] cursor-pointer m-5'
                                onClick={() => closeDialog()}
                            />
                            <section className='grid gap-8 p-8'>
                                <>
                                    <p className='font-Satoshi-Bold text-[1.8rem] pb-4 border-b'>
                                        President Category Candidates
                                    </p>

                                    {currentCategory.map((item) => {
                                        console.log({ item })
                                        const { photoUrl, name } = item
                                        return (
                                            <div className='flex items-center gap-8'>
                                                <img
                                                    src={photoUrl}
                                                    alt=''
                                                    className={`w-[5rem] h-[5rem] object-cover rounded-full `}
                                                />
                                                <p>{name}</p>
                                            </div>
                                        )
                                    })}
                                </>
                            </section>
                        </div>
                    </div>
                </section>
            </dialog>
            <section className='capitalize'>
                <p className='text-[2rem] font-Satoshi-Medium'>
                    Election Title
                </p>
                <p>Peace Estate 2023 General Election</p>
            </section>

            <section>
                <p className='text-[2rem] font-Satoshi-Medium'>
                    Election Categories
                </p>
                {Object.values(candidateImgs).length > 0 &&
                    Object.entries(candidateImgs).map(([key, value], i) => {
                        return (
                            <div className='grid gap-8 w-[60rem]' key={i}>
                                <div className='grid grid-cols-2 mt-[5rem] pb-5 border-b w-full'>
                                    <p>{key}</p>
                                    <div className='flex items-center gap-16'>
                                        <GroupThreeImages images={value} />

                                        <button
                                            className='text-color-blue'
                                            onClick={() => openDialog(key)}
                                        >
                                            View Candidates
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </section>

            <section className='grid gap-8 w-[60rem]'>
                <p className='font-Satoshi-Medium text-[2rem]'>Voting Period</p>
                <div className='grid grid-cols-2 gap-8'>
                    <div className='flex items-center gap-8'>
                        <img alt='' src='/icons/calendar_month.svg' />
                        <div>
                            {' '}
                            <p className='font-Satoshi-Light'>Start Date</p>
                            <p>
                                {votingStartDate &&
                                    new Date(
                                        votingStartDate
                                    ).toLocaleDateString(undefined, {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-8'>
                        {' '}
                        <img alt='' src='/icons/calendar_month.svg' />
                        <div>
                            {' '}
                            <p className='font-Satoshi-Light'>End Date</p>
                            <p>
                                {votingEndDate &&
                                    new Date(votingEndDate).toLocaleString(
                                        undefined,
                                        {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        }
                                    )}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className='grid gap-8 w-max-[70rem]'
                style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(25rem, 1fr))',
                }}
            >
                <div>
                    <p className='font-Satoshi-Medium text-[2rem]'>
                        Voting Channel
                    </p>
                    <div className='mt-5 grid gap-2'>
                        <div className='flex items-center gap-4'>
                            <input type='checkbox' name='' id='onlineVoting' />
                            <label htmlFor='onlineVoting' className=''>
                                Online Voting
                            </label>
                        </div>
                        <div className='flex items-center gap-4'>
                            <input
                                type='checkbox'
                                defaultChecked={allowPhysicalVoting}
                                id='physicalVoting'
                            />
                            <label htmlFor='physicalVoting' className=''>
                                Physical Voting
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <p className='font-Satoshi-Medium text-[2rem]'>
                        Total number of votes
                    </p>
                    <div className='mt-5 flex gap-4 items-center'>
                        <p>1700</p>{' '}
                        <button
                            className='text-color-blue'
                            onClick={() => setStep(4)}
                        >
                            See All Voters
                        </button>
                    </div>
                </div>

                <div>
                    <p className='font-Satoshi-Medium text-[2rem]'>
                        Voting Display
                    </p>
                    <div className='mt-5 grid gap-2'>
                        {votesDisplay.map((vote) => (
                            <p key={vote} className='capitalize'>
                                {vote}
                            </p>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Last
