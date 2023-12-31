import { Dispatch, createContext, useContext, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router'
import useAxios from '../../hooks/useAxios'
import { AxiosInstance } from 'axios'
import { SetStateAction } from 'jotai'
import TableDialog from './TableDialog'
import TableData from './TableData'

export type Actions =
    | 'view details'
    | 'deactivate'
    | 'activate'
    | 'delete'
    | 'remove'

interface Table {
    fetch_url?: string
    is_addWithin?:boolean
    title: string
    secondary_id?: string
    view_with_secondary_id?: boolean
    view_page_url?: string
    add_page_url?: string
    is_add_btn?: boolean
    isCategory?: boolean
    providedData?: any[]
    isStrictAction?: boolean
    deactivateProp?: { url: string; tag?: string }
    data_to_display: string[]
    nested?: boolean
    isDataProvided?: boolean
    delete_item_url?: string
    titleDialog?: string
    is_dropdown?: boolean
    is_checkbox?: boolean
    THeader: string[]
    actions?: Actions[]
}

interface ICreateTableContext extends Table {
    navigate: NavigateFunction
    axiosInstance: AxiosInstance
    filterBy: string
    setFilterBy: Dispatch<SetStateAction<string>>
    fetchedId: number
    setFetchedId: Dispatch<SetStateAction<number>>
    isDialogOpen: { isOpen: boolean; type: string }
    fetchedData: any[]
    actions: Actions[]
    setFetchedData: Dispatch<SetStateAction<any[]>>
    setIsDialogOpen: Dispatch<SetStateAction<{ isOpen: boolean; type: string }>>
}

const CreateTableContext = createContext<ICreateTableContext | null>(null)

export const useTableContext = () => {
    const context = useContext(CreateTableContext)

    if (!context) {
        throw new Error('Table Context must be used within the Table Container')
    }

    return context
}

const Table = ({
    fetch_url,
    title,
    secondary_id,
    view_with_secondary_id = false,
    is_dropdown = true,
    isCategory,
    view_page_url,
    add_page_url,
    titleDialog,
    is_checkbox = false,
    data_to_display,
    providedData,
    is_add_btn,
    is_addWithin,
    isStrictAction,
    nested = false,
    isDataProvided = false,
    deactivateProp,
    THeader,
    delete_item_url,
    actions = [],
}: Table) => {
    const navigate = useNavigate()
    const axiosInstance = useAxios()

    const [filterBy, setFilterBy] = useState<string>('')
    const [fetchedId, setFetchedId] = useState<number>(null as any)
    const [fetchedData, setFetchedData] = useState<any[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState<{
        isOpen: boolean
        type: string
    }>({
        isOpen: false,
        type: 'deactivate',
    })

    return (
        <CreateTableContext.Provider
            value={{
                axiosInstance,
                navigate,
                filterBy,
                setFilterBy,
                fetchedId,
                secondary_id,
                view_with_secondary_id,
                is_checkbox,
                setFetchedId,
                isStrictAction,
                titleDialog,
                fetchedData,
                providedData,
                setFetchedData,
                isDialogOpen,
                is_addWithin,
                isDataProvided,
                actions,
                setIsDialogOpen,
                deactivateProp,
                fetch_url,
                title,
                view_page_url,
                add_page_url,
                is_add_btn,
                nested,
                THeader,
                isCategory,
                delete_item_url,
                is_dropdown,
                data_to_display,
            }}
        >
            <TableDialog />
            <TableData />
        </CreateTableContext.Provider>
    )
}

export default Table
