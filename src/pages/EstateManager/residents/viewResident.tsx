import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Input, { SelectProps } from '../../../components/ui/input/Input'
import ImageInput from '../../../components/ui/input/ImageInput'
import AddBtn from '../../../components/ui/button/AddBtn'
import AddedSuccess from '../../../components/ui/dialog/AddedSuccess'
import Spinner from '../../../components/ui/Spinner'
import useAddPageMutation from '../../../components/hooks/useAddPageMutation'
import { ToastContainer, toast } from 'react-toastify'
import useFetchData from '../../../components/hooks/UseFetchData'
import Activate_Deactivate from '../../../components/ui/dialog/Activate_Deactivate'
import ValidatedResult from '../../../components/ui/dialog/ValidatedResult'

const AddAdmin = () => {
    type FormInputs = {
        label?: string
        type?: string
        name?: string
        selectProps?: SelectProps
    }

    const genderState = ['Male', 'Female']

    const [phone, setPhone] = useState(0)

    const params = useParams()
    const navigate = useNavigate()

    const id = params.id?.replace(':', '')

    const {
        clearErrors,
        formErrors,
        onSubmit,
        openDialog,
        setOpenDialog,
        selectedGender,
        setSelectedGender,
        postLoading,
        handlePicture,
        photoPreview,
        register,
        setValue,
    } = useAddPageMutation({
        title: `view_resident_${id}`,
        url: `/manager/resident/update/${id}`,
        props: {
            is_kyr_approved: 0,
            validation_option: 'phone_number',
        },
    })

    

    if (!id) {
        toast('Resident not Found', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem] capitalize',
        })

        navigate(-1)
    }

    const { isLoading: estate_admin_loading, data } = useFetchData({
        url: `/manager/resident/getbyid/${id}`,
        name: `view_resident_${id}`,
    })

    const formInputs = [
        {
            label: 'first_name',
        },
        {
            label: 'last_name',
        },
        {
            label: 'dob',
            type: 'date',
            name: 'date of birth',
        },
        {
            label: 'gender',
            type: 'select',
            selectProps: {
                state: genderState,
                selectedState: selectedGender,
                setSelectedState: setSelectedGender,
            },
        },
        {
            name: 'phone_number',
            label: 'phone',
            type: 'tel',
        },
        {
            name: 'Email Address',
            label: 'email',
            type: 'email',
        },
    ] satisfies FormInputs[]

    return (
        <div className='bg-white rounded-2xl grid p-8'>
            <ToastContainer />
            <Spinner start={postLoading ? true : false} />
            <AddedSuccess
                open={openDialog}
                title={'resident'}
                close={setOpenDialog}
            />

            <div className='flex justify-between items-center mb-10'>
                <ValidatedResult
                    image={photoPreview}
                    handlePicture={handlePicture}
                />

                <Activate_Deactivate
                    id={id!}
                    url={'/manager/resident/deactivate_activate'}
                    status={data?.status}
                    title={'resident'}
                    queryCache={`view_resident_${id}`}
                />
            </div>

            <form
                onSubmit={onSubmit}
                className='grid max-w-[84rem] gap-16 mt-12 '
                style={{
                    gridTemplateColumns:
                        ' repeat(auto-fit, minmax(35rem, 1fr))',
                    columnGap: '10rem',
                }}
            >
                <>
                    {formInputs.map((input, idx) => {
                        const { label, type, name, selectProps } = input
                        return (
                            <Input
                                key={idx + label}
                                label={label}
                                register={register}
                                formErrors={formErrors}
                                type={type}
                                clearErrors={clearErrors}
                                name={name}
                                setValue={setValue}
                                isSelect={type === 'select'}
                                select={selectProps}
                            />
                        )
                    })}

                    <ImageInput
                        handlePicture={handlePicture}
                        photoPreview={photoPreview}
                    />
                    <AddBtn isLoading={postLoading} />
                </>
            </form>
        </div>
    )
}

export default AddAdmin
