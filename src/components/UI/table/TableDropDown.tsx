import { Dispatch, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { Actions, useTableContext } from './Table'
import { SetStateAction } from 'jotai'
import { ToggleDropDown } from './TableData'

interface TableDropDown {
    id: number
    toggleDropDown: ToggleDropDown
    setToggleDropDown: Dispatch<SetStateAction<ToggleDropDown>>
    actions: Actions[]
}

const TableDropDown = ({
    id,
    toggleDropDown,
    setToggleDropDown,
    actions,
}: TableDropDown) => {
    const { setFetchedId, setIsDialogOpen, view_page_url } = useTableContext()
    const toCloseDropDownRef = useRef<'outside' | 'inner'>('outside')

    const navigate = useNavigate()

    const handleSelectedAction = (item: Actions, itemId: number) => {
        console.log('clicked')
        toCloseDropDownRef.current = 'inner'
        setToggleDropDown(() => {
            return {
                isDropDownOpen: false,
                index: null,
            }
        })

        setFetchedId(itemId)

        if (item === 'view details') {
            navigate(`${view_page_url}:${itemId}`)
        }
        if (item === 'activate') {
            setIsDialogOpen({
                isOpen: true,
                type: 'activate',
            })
        }

        if (item === 'deactivate') {
            setIsDialogOpen({
                isOpen: true,
                type: 'deactivate',
            })
        }

        if (item === 'delete') {
            setIsDialogOpen({
                isOpen: true,
                type: 'delete',
            })
        }
    }

    const { isDropDownOpen, index } = toggleDropDown

    const handleClose = () => {
        console.log('outside timeout close ref', toCloseDropDownRef.current)
        
       const id =  setTimeout(() => {
            console.log('inside timout close ref', toCloseDropDownRef.current)
            if (toCloseDropDownRef.current === 'outside') {
                setToggleDropDown(() => {
                    return {
                        isDropDownOpen: false,
                        index: null,
                    }
                })
            }
        }, 100)

        return clearTimeout(id)
    }

    useEffect(() => {
        console.log('ref', toCloseDropDownRef.current)
    }, [toCloseDropDownRef.current])

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
                <div className='absolute top-0 translate-x-[4rem] border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid shadow z-20 capitalize'>
                    <>
                        <input
                            type='text'
                            className='border absolute left-[-9999px] opacity-0 w-0 h-0'
                            autoFocus
                            onBlur={handleClose}
                        />
                        {actions.map((item, i) => (
                            <p
                                className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                key={i}
                                onClick={() => handleSelectedAction(item, id)}
                            >
                                {['deactivate', 'delete', 'remove'].includes(
                                    item
                                ) ? (
                                    <span className='text-red-600'>{item}</span>
                                ) : item === 'activate' ? (
                                    <span className='text-green-600'>
                                        {item}
                                    </span>
                                ) : (
                                    <span>{item}</span>
                                )}
                            </p>
                        ))}
                    </>
                </div>
            )}
        </div>
    )
}

export default TableDropDown
