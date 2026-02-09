import { X, RotateCcw } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import type { AssetFilters } from "../types/filters";

type Props = {
	open: boolean;
	filters: AssetFilters;
	onChange: (f: AssetFilters) => void;
	onClose: () => void;
};

const FILTER_OPTIONS: { label: string; value: AssetFilters["type"] }[] = [
	{ label: "All Assets", value: "all" },
	{ label: "Stocks", value: "stock" },
	{ label: "Bonds", value: "bond" },
	{ label: "Crypto", value: "crypto" },
	{ label: "Real Estate", value: "real_estate" },
	{ label: "Commodities", value: "commodity" },
];

export function FilterDrawer({ open, filters, onChange, onClose }: Props) {
	const [tempFilters, setTempFilters] = useState<AssetFilters>(filters);

	useEffect(() => {
		if (open) setTempFilters(filters);
	}, [open, filters]);

	const handleApply = useCallback(() => {
		onChange(tempFilters);
		onClose();
	}, [onChange, tempFilters, onClose]);

	const handleReset = useCallback(() => {
		setTempFilters({ type: "all" });
	}, []);

	const isFiltered = tempFilters.type !== "all";

	return (
		<>
			<div
				className={`
                    fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 will-change-[opacity]
                    ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                `}
				onClick={onClose}
				aria-hidden="true"
			/>

			<div
				className={`
                    fixed z-50 bg-white shadow-2xl transition-all duration-300 ease-out
                    
                    /* Mobile: Bottom Sheet */
                    bottom-0 left-0 right-0 rounded-t-2xl p-6
					
                    /* Desktop: Centered Modal */
                    md:bottom-auto md:top-1/2 md:left-1/2 
                    md:w-full md:max-w-md md:rounded-2xl
                    ${
											open
												? "translate-y-0 md:-translate-x-1/2 md:-translate-y-1/2 md:opacity-100 md:scale-100"
												: "translate-y-full md:-translate-x-1/2 md:-translate-y-[45%] md:opacity-0 md:scale-95 md:pointer-events-none"
										}
                `}
			>
				{/* Header */}
				<div className="flex items-center justify-between mb-8 relative">
					<div className="absolute -top-3 left-1/2 -translate-x-1/2 h-1.5 w-12 rounded-full bg-gray-200 md:hidden" />

					<h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Filter Assets</h3>

					<div className="flex items-center gap-2">
						{isFiltered && (
							<button
								onClick={handleReset}
								className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-full transition-colors"
							>
								<RotateCcw size={14} strokeWidth={2.5} />
								<span className="text-[10px] font-bold uppercase tracking-wider">Reset</span>
							</button>
						)}

						<button
							onClick={onClose}
							className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
							aria-label="Close"
						>
							<X size={20} />
						</button>
					</div>
				</div>

				<div className="flex flex-wrap gap-2.5 mb-10">
					{FILTER_OPTIONS.map((option) => {
						const isActive = tempFilters.type === option.value;
						return (
							<button
								key={option.value}
								onClick={() => setTempFilters({ type: option.value })}
								className={`
                                    px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-200
                                    ${
																			isActive
																				? "bg-gray-900 text-white border-gray-900 shadow-md scale-[1.02]"
																				: "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900"
																		}
                                `}
							>
								{option.label}
							</button>
						);
					})}
				</div>

				{/* Apply Button */}
				<button
					onClick={handleApply}
					className="
                        w-full rounded-xl bg-blue-600 py-4 text-sm font-bold text-white 
                        shadow-lg shadow-blue-600/20 active:scale-[0.97] hover:bg-blue-700 
                        transition-all duration-150
                    "
				>
					Apply Filters
				</button>
			</div>
		</>
	);
}
