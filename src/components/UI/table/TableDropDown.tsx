import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Actions, useTableContext } from './Table'

interface ITableDropDown {
    id: number
    view_page_url: string
}

const TableDropDown = ({ id, view_page_url }: ITableDropDown) => {
    const { setFetchedId, setIsDialogOpen, actions } = useTableContext()

    const navigate = useNavigate()

    const [toggleDropDown, setToggleDropDown] = useState<{
        isDropDownOpen: boolean
        index: number | null
    }>({
        isDropDownOpen: false,
        index: null,
    })

    const handleSelectedAction = (item: Actions, itemId: number) => {
        setToggleDropDown(() => {
            return {
                isDropDownOpen: false,
                index: null,
            }
        })

        if (item === 'view details') {
            navigate(`${view_page_url}:${itemId}`)
        }

        if (item === 'deactivate') {
            setFetchedId(itemId)
            setIsDialogOpen(true)
        }
    }

    const { isDropDownOpen, index } = toggleDropDown

    return (
        <div className='relative'>
            <label
                className='font-semibold capitalize cursor-pointer flex items-center gap-2 relative z-10'
                htmlFor={id.toString()}
                onClick={() =>
                    setToggleDropDown((prev) => ({
                        isDropDownOpen: !prev.isDropDownOpen,
                        index: id,
                    }))
                }
            >
                <span className='text-color-primary'>
                    <img src='/icons/admins/threeDots.svg' alt='' />
                </span>
            </label>
            <input
                type='radio'
                name='dropdown'
                className='hidden'
                id={id.toString()}
                onChange={(e) =>
                    setToggleDropDown(() => ({
                        isDropDownOpen: e.target.checked,
                        index: id,
                    }))
                }
            />

            {isDropDownOpen && index === id && (
                <div className='absolute top-0 translate-x-[4rem] border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                    {actions.map((item, i) => (
                        <p
                            className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                            key={i}
                            onClick={() => handleSelectedAction(item, id)}
                        >
                            {['deactivate', 'delete'].includes(item) ? (
                                <span className='text-red-600'>{item}</span>
                            ) : (
                                <span>{item}</span>
                            )}
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}
