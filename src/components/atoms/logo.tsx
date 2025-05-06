import React from "react";
import logo from "../../assets/sc-logo.png";

type LogoVariant = "sm" | "md" | "lg" | "xl";

interface LogoProps {
	variant?: LogoVariant;
	altText?: string;
	className?: string;
}

const sizeMap: Record<LogoVariant, string> = {
	sm: "w-12 h-auto", // 48px
	md: "w-24 h-auto", // 96px
	lg: "w-32 h-auto", // 128px
	xl: "w-48 h-auto", // 192px
};

const Logo: React.FC<LogoProps> = ({
	variant = "md",
	altText = "Secured Calls Logo",
	className = "",
}) => {
	return (
		<img
			src={logo}
			alt={altText}
			className={`${sizeMap[variant]} object-contain ${className} rounded-md drop-shadow-2xl border-white border-2`}
		/>
	);
};

export default Logo;
