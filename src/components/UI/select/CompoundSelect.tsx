import { FC, useState, ChangeEvent } from "react"
import { GrUp, GrDown } from "react-icons/gr"
import { ISelect } from "./SingleSelect"

type Compound = {
    name: string
    No?: number
    sub?: string
}

interface CompoundSelect extends Omit<ISelect<string>, 'state'> {
    state: Array<Compound>
    double?: boolean
}

export const CompoundSelect: FC<CompoundSelect> = ({
    state,
    selectedState,
    setSelectedState,
    label,
    placeholder,
    double,
    isSearchable = false,
}) => {
    const [toggleStateMenu, setToggleStateMenu] = useState(false)

    const stateMenuToggler = () => setToggleStateMenu(!toggleStateMenu)
    const [search, setSearch] = useState('')
    const [selectFrom, setSelectFrom] = useState(state)

    const handleSelectedState = (item: string) => {
        setSelectedState(item)
        setToggleStateMenu(false)
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearch(value)

        if (value.length > 0) {
            setSelectFrom((prev) => {
                return prev.filter((item) => {
                    return item.name.toLowerCase().includes(value.toLowerCase())
                })
            })
        } else {
            setSelectFrom(selectFrom)
        }
    }

    return (
        <div className='relative grid gap-4'>
            <p className='text-[1.4rem] font-semibold capitalize'>{label}</p>
            <div className='relative flex items-center'>
                <p
                    className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer min-h-[5rem]'
                    onClick={stateMenuToggler}
                >
                    {selectedState || (
                        <span className='text-gray-500'>
                            {placeholder || ''}
                        </span>
                    )}
                </p>
                {toggleStateMenu ? (
                    <GrUp className='absolute right-4' />
                ) : (
                    <GrDown className='absolute right-4' />
                )}
            </div>

            {toggleStateMenu && (
                <div
                    className={`absolute top-[8rem]  left-0 border border-color-primary-light min-w-[12rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize max-h-[40rem] overflow-y-scroll`}
                >
                    {isSearchable && (
                        <div className='relative flex items-center text-[1.4rem]'>
                            <img
                                src='/icons/admins/search.svg'
                                alt=''
                                className='absolute left-4'
                            />

                            <input
                                type='text'
                                placeholder='Search Parameters'
                                value={search}
                                onChange={handleSearch}
                                className={`pl-16 ${
                                    double ? 'w-full' : 'w-[25rem] '
                                } rounded-lg border border-color-blue-light py-4 px-8 outline-none appearance-none`}
                            />
                        </div>
                    )}
                    {selectFrom.map((item, index) => (
                        <p
                            className={`text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer ${
                                double ? 'grid' : 'flex justify-between'
                            }`}
                            key={index}
                            onClick={() => handleSelectedState(item.name)}
                        >
                            {double ? (
                                <>
                                    <span className='font-Satoshi-Medium text-[1.6rem]'>
                                        {item.name}
                                    </span>
                                    <span>{item.sub}</span>
                                </>
                            ) : (
                                <>
                                    <span>{item.name}</span>
                                    <span>{item.No}</span>
                                </>
                            )}
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CompoundSelect