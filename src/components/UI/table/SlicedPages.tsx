import { Dispatch, FC, SetStateAction } from 'react'
import TableDropDown from './TableDropDown'
import { ToggleDropDown } from './TableData'
import { Actions, useTableContext } from './Table'
import StarRating from '../../SuperAdmin/UI/StarRating'

interface SlicedPages {
    pages: any[][] | null
    index: number
    toggleDropDown: ToggleDropDown
    setToggleDropDown: Dispatch<SetStateAction<ToggleDropDown>>
}

const SlicedPages: FC<SlicedPages> = ({
    pages,
    index,
    toggleDropDown,
    setToggleDropDown,
}) => {
    const {
        data_to_display,
        nested,
        THeader,
        actions,
        is_dropdown,
        isStrictAction,
        is_checkbox,
    } = useTableContext()

    if (!pages || !pages.length) {
        return null
    }

    const page = pages[index]

    const TableItem = ({ data }: any) => {
        console.log({data})
        if (!data) {
            return null
        }

        const { id, ...restData } = data

        const details: Map<any, any> = new Map<
            string,
            string | { name: string; image: string | null }
        >()

        const dataToLoop = nested ? restData.user : restData


        Object.entries(dataToLoop).map(([key, value]: any) => {
    
            if (data_to_display.includes(key)) {
                if (key === data_to_display[0]) {
                    return details.set(key, {
                        name: value,
                        image: null,
                    })
                }

                if (key === 'image') {
                    const firstKey = details.keys().next().value
                    const firstValue = details.get(firstKey)

                    return details.set(firstKey, {
                        name: firstValue.name,
                        image: value,
                    })
                } else {
                     details.set('key', value)
                }
            }
        })

        console.log({ details})
        const sorted: any[] = []
        data_to_display.map((item: string, i: number) => {
            if (item)
                for (const [key, value] of details.entries()) {
                    if (key === item) {
                        sorted.push({
                            key,
                            value,
                        })

                        return
                    }
                }
        })
        

        const isAction = sorted.some(({ key }: any) => key === 'actions')
        const findStatus = sorted.find(({ key }: any) => key === 'status')

        if (is_dropdown && !isAction) {
            sorted.push({
                key: 'actions',
                value: findStatus?.value || 0,
            })
        }


        console.log({sorted})
        return (
            <>
                {sorted.map(({ key, value }: any, idx: number) => {
                    if (idx === 0) {
                        return (
                            <div className='flex items-center gap-4 ' key={idx}>
                                {is_checkbox && (
                                    <input
                                        type='checkbox'
                                        className='cursor-pointer'
                                    />
                                )}

                                <div className='flex items-center gap-2'>
                                    {value.image && (
                                        <figure className='w-[3.5rem] h-[3.5rem]'>
                                            <img
                                                src={value.image}
                                                alt=''
                                                width={'56px'}
                                                height={'56px'}
                                                className='w-full h-full rounded-full object-cover'
                                            />
                                        </figure>
                                    )}

                                    <p className=''>{value.name}</p>
                                </div>
                            </div>
                        )
                    }
                    if (key === 'created_at' || key === 'onboarding_date') {
                        return (
                            <p key={idx}>
                                {new Date(value)
                                    .toLocaleDateString()
                                    .replace(/\//g, '-')}
                            </p>
                        )
                    }
                    if (key === 'status') {
                        return (
                            <p key={idx}>
                                {value === 1 ? (
                                    <span className='text-green-600'>
                                        active
                                    </span>
                                ) : (
                                    <span className='text-red-500'>
                                        inactive
                                    </span>
                                )}
                            </p>
                        )
                    }
                    if (key === 'actions') {
                        let updatedActions: Actions[] = ['view details']

                        actions.indexOf('remove') !== 0
                            ? value === 0
                                ? (updatedActions = [
                                      ...updatedActions,
                                      'activate',
                                  ])
                                : (updatedActions = [
                                      ...updatedActions,
                                      'deactivate',
                                  ])
                            : null

                        updatedActions = [...updatedActions, ...actions]
                        return is_dropdown ? (
                            <TableDropDown
                                toggleDropDown={toggleDropDown}
                                setToggleDropDown={setToggleDropDown}
                                id={id}
                                actions={
                                    isStrictAction ? actions : updatedActions
                                }
                                key={idx}
                            />
                        ) : null
                    }
                    if (key.toLowerCase() === 'rating') {
                        return <StarRating starsNum={value} key={idx} />
                    }
                    if (['price', 'amount'].includes(key.toLowerCase())) {
                        return (
                            <div key={idx} className='flex items-center'>
                                <img
                                    src='/icons/Naira.svg'
                                    alt=''
                                    className='mr-1'
                                />
                                {Number(value).toLocaleString()}
                            </div>
                        )
                    } else {
                        return <p key={idx}>{value}</p>
                    }
                })}
            </>
        )
    }

    return (
        <>
            {page.map((data, idx) => (
                <div
                    className={`grid justify-between border-b grid-cols-${THeader.length} items-center gap-8 text-[1.6rem] capitalize py-4 table__ellipsis`}
                    key={`${idx}`}
                >
                    <TableItem data={data} />
                </div>
            ))}
        </>
    )
}

export default SlicedPages
