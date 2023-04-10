import { Dispatch, FC, SetStateAction } from 'react'
import TableDropDown from './TableDropDown'
import { ToggleDropDown } from './TableData'
import { useTableContext } from './Table'

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
    const { data_to_display, nested } = useTableContext()

    if (!pages || !pages.length) {
        return null
    }
    
    
    const page = pages[index]
    
    console.log({ page })

    const TableItem = ({data}:any) => {

        const {id, ...restData} = data

        const details: Map<any, any> = new Map<
            string,
            string | { name: string; image: string | null }
        >()

        console.log({restData, data_to_display})
        const dataToLoop = nested ? restData.user : restData

        Object.entries(dataToLoop).map(([key, value]: any, idx: number) => {
            if (data_to_display.includes(key)) {
                if (key === data_to_display[0]) {
                   // console.log({key})
                    details.set(key, {
                        name: value,
                        image: 'hello world',
                    })
                }

                if (key === 'image') {
                    console.log({key}, {value})
                    const firstKey = details.keys().next().value
                    const firstValue = details.get(firstKey)
                    details.set(firstKey, {
                        firstValue,
                        image: value,
                    })
                } else {
                    details.set(key, value)
                }
            }
        })

        //console.log({details})

        const sorted = []
        data_to_display.map((item: string, i: number) => {
            if (item)
                for (const [key, value] of details.entries()) {
                    if (key === item) {
                        return sorted.push({
                            key,
                            value,
                        })
                    }
                }
        })

        sorted.push({
            key: 'actions',
            value: null,
        })

       // console.log({sorted})

        return (
            <>
                {sorted.map(({ key, value }: any, idx: number) => {

                    if (key === 'actions') {
                        return (
                            <TableDropDown
                                toggleDropDown={toggleDropDown}
                                setToggleDropDown={setToggleDropDown}
                                id={id}
                            />
                        )
                    }
                    if (idx === 0) {
                        return (
                            <div className='flex items-center gap-4  '>
                                <input
                                    type='checkbox'
                                    className='cursor-pointer'
                                />
                                <div className='flex items-center gap-2'>
                                 
                                        {value.image && (
                                            <figure className='w-[3.5rem] h-[3.5rem]'>
                                                <img
                                                    src={value.image}
                                                    alt=''
                                                    className='w-full h-full rounded-full object-cover'
                                                />
                                            </figure>
                                        )}
                                

                                    <p className=''>{value.firstValue}</p>
                                </div>
                            </div>
                        )
                    }
                    if (key === 'created_at') {
                        return (
                            <p>
                                {new Date(value)
                                    .toLocaleDateString()
                                    .replace(/\//g, '-')}
                            </p>
                        )
                    }
                    if (key === 'status') {
                        return (
                            <p>
                                {value === 'active' ? (
                                    <span className='text-green-600'>
                                        {value}
                                    </span>
                                ) : (
                                    <span className='text-red-500'>
                                        {value}
                                    </span>
                                )}
                            </p>
                        )
                    } else {
                        return <p>{value}</p>
                    }
                })}
            </>
        )
    }

    return (
        <>
            {page.map((data, idx) => (
                <div
                    className={`grid justify-between border-b grid-cols-${data_to_display.length} items-center gap-8 text-[1.6rem] py-4 table__ellipsis`}
                    key={`${idx}`}
                >
                    <TableItem data={data} />
                </div>
            ))}
        </>
    )
}

export default SlicedPages
