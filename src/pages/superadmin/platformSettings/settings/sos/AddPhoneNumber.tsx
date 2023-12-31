import { forwardRef, useState, ChangeEvent, useEffect } from "react";
import { CiCircleRemove } from "react-icons/ci";


interface Props {
	idx: number;
	phoneError: any;
	lastPhoneNumber: number;
	value?: string
	removePhoneNumberHandler: (idx: number) => void;
}

// const AddPhoneNumber = forwardRef<HTMLInputElement, Props>(
// 	({ idx, phoneError, value }, ref) => {
// 		const [phone, setPhone] = useState(value);
// 		const [isError, setIsError] = useState(false);
// 		const [errorMessage, setErrorMessage] = useState("");

// 		useEffect(() => {
// 			setPhone(value);
// 		}, [value]);

// 		const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
// 			setIsError(false);
// 			setErrorMessage("");
// 			const value = e.target.value.replace(/\D/g, "");

// 			if (value.length <= 1 && value === "0") {
// 				return setPhone("");
// 			}

// 			if (value.length < 11) {
// 				setPhone(value);
// 			}
// 		};

// 		useEffect(() => {
// 			if (phoneError?.[`phone${idx + 1}`]) {
// 				setErrorMessage(phoneError[`phone${idx + 1}`]);
// 				setIsError(true);
// 			}
// 		}, [phoneError]);

// 		return (
// 			<div className={"w-full grid gap-4 self-baseline"}>
// 				<label
// 					htmlFor={`phone${idx + 1}`}
// 					className="text-[1.4rem] font-semibold capitalize"
// 				>
// 					phone Number {idx + 1}
// 				</label>

// 				<div
// 					className={`relative flex items-center w-full border pl-4 rounded-lg ${
// 						isError ? "border-red-500" : "border-color-grey"
// 					}`}
// 				>
// 					<input type="text" value={"+234"} className="w-[4.2rem]" />
// 					<input
// 						type="number"
// 						name="number"
// 						id={`phone${idx + 1}`}
// 						ref={ref}
// 						inputMode="numeric"
// 						maxLength={10}
// 						value={phone}
// 						onChange={handlePhoneChange}
// 						className={
// 							" w-full border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed p-4 pl-0 "
// 						}
// 					/>
// 				</div>

// 				<p className="text-red-500 text-[1.2rem]">{errorMessage}</p>
// 			</div>
// 		);
// 	},
// );



const AddPhoneNumber = forwardRef<HTMLInputElement, Props>(
	({ idx, phoneError, removePhoneNumberHandler, lastPhoneNumber, value}, ref) => {
		const [phone, setPhone] = useState("");
		const [isError, setIsError] = useState(false);
		const [errorMessage, setErrorMessage] = useState("");

		useEffect(() => {
			value && setPhone(value);
		}, [value]);

		const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
			setIsError(false);
			setErrorMessage("");
			const value = e.target.value.replace(/\D/g, "");

			if (value.length <= 1 && value === "0") {
				return setPhone("");
			}

			if (value.length < 11) {
				setPhone(value);
			}
		};

		useEffect(() => {
			if (phoneError?.[`phone${idx + 1}`]) {
				setErrorMessage(phoneError[`phone${idx + 1}`]);
				setIsError(true);
			}
		}, [phoneError]);


		return (
			<div className={"w-full grid gap-4 self-baseline"}>
				<label
					htmlFor={`phone${idx + 1}`}
					className="text-[1.4rem] font-semibold capitalize"
				>
					phone Number {idx + 1}
				</label>

				<div className="flex relative items-center w-full gap-4">
					<div
						className={`relative flex items-center w-full border pl-4 rounded-lg ${
							isError ? "border-red-500" : "border-color-grey"
						}`}
					>
						<input type="text" value={"+234"} className="w-[4.2rem]" />
						<input
							type="number"
							name="number"
							id={`phone${idx + 1}`}
							ref={ref}
							inputMode="numeric"
							maxLength={10}
							value={phone}
							onChange={handlePhoneChange}
							className={
								" w-full border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed p-4 pl-0 "
							}
						/>
					</div>
					{idx > 0 && idx === lastPhoneNumber && (
						<CiCircleRemove
							className="text-[3rem] text-red-500 cursor-pointer"
							onClick={() => removePhoneNumberHandler(idx)}
						/>
					)}
				</div>
				<p className="text-red-500 text-[1.2rem]">{errorMessage}</p>
			</div>
		);
	},
);

export default AddPhoneNumber;
