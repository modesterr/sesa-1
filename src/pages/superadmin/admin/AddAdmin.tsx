import React, { useEffect, useState } from "react";
import Input, { SelectProps } from "../../../components/ui/input/Input";
import ImageInput from "../../../components/ui/input/ImageInput";
import AddBtn from "../../../components/ui/button/AddBtn";
import AddedSuccess from "../../../components/ui/dialog/AddedSuccess";
import Spinner from "../../../components/ui/Spinner";
import useAddPageMutation from "../../../components/hooks/useAddPageMutation";
import { ToastContainer } from "react-toastify";
import Permissions from "../../../components/ui/dialog/Permissions";

const AddAdmin = () => {
	const [permissions, setPermissions] = useState<string[]>([]);

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
		url: "/admin/create",
		title: "admin",
		props: {
			permissions,
		},
	});

	const genderState = ["Male", "Female"];
	type FormInputs = {
		label?: string;
		type?: string;
		name?: string;
		selectProps?: SelectProps;
	};

	const formInputs = [
		{
			label: "first_name",
		},
		{
			label: "last_name",
		},
		{
			label: "dob",
			type: "date",
			name: "date of birth",
		},
		{
			label: "gender",
			type: "select",
			selectProps: {
				state: genderState,
				selectedState: selectedGender,
				setSelectedState: setSelectedGender,
			},
		},
		{
			name: "phone_number",
			label: "phone",
			type: "tel",
		},
		{
			name: "Email Address",
			label: "email",
			type: "email",
		},
	] satisfies FormInputs[];

	return (
		<div className="bg-white rounded-2xl grid p-8">
			<Spinner start={postLoading ? true : false} />
			<AddedSuccess open={openDialog} title={"admin"} close={setOpenDialog} />
			<ToastContainer />

			<p className="text-[2rem] font-Satoshi-Medium">Personal Information</p>

			<form
				onSubmit={onSubmit}
				className="grid max-w-[84rem] gap-16 mt-12 "
				style={{
					gridTemplateColumns: " repeat(auto-fit, minmax(35rem, 1fr))",
					columnGap: "10rem",
				}}
			>
				<>
					{formInputs.map((input, idx) => {
						const { label, type, name, selectProps } = input;
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
								isSelect={type === "select"}
								select={selectProps}
							/>
						);
					})}
					<Permissions setPermissions={setPermissions} />

					<ImageInput
						handlePicture={handlePicture}
						photoPreview={photoPreview}
					/>
					<AddBtn isLoading={postLoading} />
				</>
			</form>
		</div>
	);
};

export default AddAdmin;
