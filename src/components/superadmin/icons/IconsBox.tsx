import { NavLink } from "react-router-dom";

import AdditionalResidentSvg from "./sidebar/AdditionalResidentSvg";
import AdminsSvg from "./sidebar/AdminsSvg";
import AdvertSvg from "./sidebar/AdvertSvg";
import ArtisanSvg from "./sidebar/ArtisanSvg";
import EstateManagerSvg from "./sidebar/EstateManagerSvg";
import EstatesSvg from "./sidebar/EstatesSvg";
import OverviewSvg from "./sidebar/overviewSvg";

import SecurityCompSvg from "./sidebar/SecurityCompSvg";
import SettingsSvg from "./sidebar/SettingsSvg";
import WalletSvg from "./sidebar/WalletSvg";

function IconsBox() {
	interface LinkProps {
		to: string;
		icon: JSX.Element;
		text: string;
		classes?: string;
	}

	const links: LinkProps[] = [
		{
			to: "/superAdmin",
			icon: <OverviewSvg />,
			text: "Overview",
		},
		{
			to: "/superAdmin/admin",
			icon: <AdminsSvg />,
			text: "Admin",
		},

		{
			to: "/superAdmin/estates",
			icon: <EstatesSvg />,
			text: "Estates",
			classes: "fillIcon",
		},

		{
			to: "/superAdmin/estateManagers",
			icon: <EstateManagerSvg />,
			text: "Estate Manager",
			classes: "fillIcon",
		},

		{
			to: "/superAdmin/resident-user-package",
			icon: <AdditionalResidentSvg />,
			text: "Resident User Package",
		},

		{
			to: "/superAdmin/security-company",
			icon: <SecurityCompSvg />,
			text: "Security Company",
			classes: "fillIcon",
		},

		{
			to: "/superAdmin/securityManagers",
			icon: <EstateManagerSvg />,
			text: "Security Manager",
			classes: "fillIcon",
		},

		{
			to: "/superAdmin/wallet",
			icon: <WalletSvg />,
			text: "Wallet",
			classes: "fillIcon",
		},

		{
			to: "/superAdmin/artisan",
			icon: <ArtisanSvg />,
			text: "Artisan",
			classes: "fillIcon",
		},

		{
			to: "/superAdmin/advert",
			icon: <AdvertSvg />,
			text: "Advert",
		},

		{
			to: "/superAdmin/platformSettings",
			icon: <SettingsSvg />,
			text: "Settings",
			classes: "fillIcon",
		},
	];

	return (
		//ToDo - ADd roles permissions, with the former overlay

		<ul className="iconsBox">
			{links.map(({ classes, to, icon, text }, idx) => {
				const baseClasses = "flex gap-4 rounded-[8px] items-center py-4 w-max transition-all duration-[.2s] hover:px-8 hover:bg-color-primary hover:text-black hover:translate-x-4 hover:scale-[1.01] [&>svg]:hover:fill-black [&>svg]:hover:transition-all [&>svg]:hover:duration-[.1s] [&>svg]:color-primary" ;
				return (
					<li className="iconsBox__list" key={`${idx}link`}>
						<NavLink
							to={to}
							// className={(props) =>
							// 	(idx === 0 &&
							// 		props.isActive &&
							// 		location.pathname === "/dashboard") ||
							// 	(props.isActive && idx > 0)
							// 		? `${baseClasses} transition-all duration-[.2s] py-4 pl-8 [&>svg]:stroke-black bg-color-blue ${
							// 				classes ? "[&>svg]:fill-white" : "[&>svg]:stroke-white"
							// 		  } text-white`
							// 		: baseClasses
							// }

							className={`${baseClasses}`}
						>
							{/* <Link to={to} className={`bg-red-500`} > */}
							{icon}
							<span>{text}</span>
						</NavLink>
					</li>
				);
			})}
		</ul>
	);
}

export default IconsBox;
