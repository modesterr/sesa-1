import Table from '../../../../../components/ui/table/Table'

function SOSTable() {
    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <Table
                title={'SOS'}
                fetch_url={'/platformsettings/sos/getall'}
                view_page_url={'/superAdmin/platformSettings/SOSDetail/'}
                add_page_url={'/superAdmin/platformSettings/addSOS'}
                isStrictAction
                actions={['view details', 'delete']}
                is_add_btn={true}
                THeader={['name', 'estate_count', 'created_at', 'actions']}
                data_to_display={['name', 'estate_count', 'created_at']}
                delete_item_url={'/platformsettings/sos/delete/'}
            />
        </div>
    )
}

export default SOSTable
