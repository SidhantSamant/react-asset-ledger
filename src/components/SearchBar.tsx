import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

type Props = {
	onChange: (value: string) => void;
};

export function SearchBar({ onChange }: Props) {
	const [value, setValue] = useState("");

	useEffect(() => {
		const id = setTimeout(() => onChange(value.trim()), 500);
		return () => clearTimeout(id);
	}, [value, onChange]);

	return (
		<div className="relative flex items-center w-full md:w-72">
			<div className="absolute left-3 text-gray-500 pointer-events-none">
				<Search size={16} strokeWidth={2.5} />
			</div>

			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Search assets..."
				className="
                    w-full px-9 py-2
                    bg-gray-100 border border-gray-300
                    text-sm font-semibold text-gray-900 
                    placeholder-gray-500 rounded-lg
                    hover:border-gray-400 hover:bg-gray-50
                    focus:bg-white focus:border-gray-900 
                    focus:outline-none
                    transition-colors duration-200
                "
			/>

			{value && (
				<button
					onClick={() => setValue("")}
					className="
                        absolute right-3 p-0.5
                        text-gray-400 hover:text-gray-900 hover:bg-gray-200
                        rounded-full transition-colors
                    "
					aria-label="Clear search"
				>
					<X size={14} strokeWidth={3} />
				</button>
			)}
		</div>
	);
}
