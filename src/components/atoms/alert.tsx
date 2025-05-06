import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

type AlertVariant = "info" | "warning" | "error";

interface AlertProps {
	message: string;
	variant?: AlertVariant;
	onDismiss?: () => void;
}

const variantStyles: Record<AlertVariant, string> = {
	info: "border-blue-500 bg-blue-50 text-blue-900",
	warning: "border-yellow-500 bg-yellow-50 text-yellow-900",
	error: "border-red-500 bg-red-50 text-red-900",
};

const Alert: React.FC<AlertProps> = ({
	message,
	variant = "info",
	onDismiss,
}) => {
	return (
		<div
			className={`relative flex items-center justify-between p-4 pl-6 border-l-8 shadow-sm ${variantStyles[variant]}`}
		>
			<span>{message}</span>
			{onDismiss && (
				<button
					onClick={onDismiss}
					className="ml-4 p-1 rounded hover:bg-black/10"
					aria-label="Dismiss alert"
				>
					<XMarkIcon className="h-5 w-5" />
				</button>
			)}
		</div>
	);
};

export default Alert;
