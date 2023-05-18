import React from 'react'
import Input, { SelectProps } from '../../../components/ui/input/Input'
import ImageInput from '../../../components/ui/input/ImageInput'
import AddBtn from '../../../components/ui/button/AddBtn'
import {
    ServiceProvider,
    useServiceContext,
} from '../../../Context/ServiceProvider'

const AddAdmin = () => {
    const {
        onSubmit,
        handlePicture,
        register,
        setValue,
        clearErrors,
        postLoading,
        photoPreview,
        selectedGender,
        setSelectedGender,
        formErrors,
    } = useServiceContext()

    const genderState = ['Male', 'Female']
    type FormInputs = {
        label?: string
        type?: string
        name?: string
        selectProps?: SelectProps
    }

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
            label: 'phone_number',
            type: 'tel',
        },
        {
            label: 'email_address',
            type: 'email',
        },
    ] satisfies FormInputs[]

    return (
        <ServiceProvider genderState={genderState}>
            <div className='bg-white rounded-2xl grid p-8'>
                <p className='text-[2rem] font-Satoshi-Medium'>
                    Personal Information
                </p>

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
        </ServiceProvider>
    )
}

export default AddAdmin
