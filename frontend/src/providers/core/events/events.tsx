import type React from "react";
import { Toaster } from "@/components/ui/toaster"

export const Events: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		<>
			<Toaster />
			{children}
		</>
	);
};

export default Events;