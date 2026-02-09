import { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useAssets } from "../hooks/useAssets";
import type { AssetFilters } from "../types/filters";
import { FilterDrawer } from "./FilterDrawer";
import { AssetRow } from "./AssetRow";
import { SlidersHorizontal, Wallet } from "lucide-react";
import { SkeletonRow } from "./SkeletonRow";
import { SearchBar } from "./SearchBar";

type Props = {
	search: string;
	onSearchChange: (value: string) => void;
};

export function AssetLedger({ search, onSearchChange }: Props) {
	const parentRef = useRef<HTMLDivElement>(null);
	const [filters, setFilters] = useState<AssetFilters>({ type: "all" });
	const [drawerOpen, setDrawerOpen] = useState(false);

	const {
		data: assets = [],
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
	} = useAssets(search, filters);

	const rowVirtualizer = useVirtualizer({
		count: hasNextPage ? assets.length + 1 : assets.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 72,
		overscan: 5,
	});

	const virtualItems = rowVirtualizer.getVirtualItems();

	useEffect(() => {
		const lastItem = virtualItems[virtualItems.length - 1];
		if (!lastItem) return;

		if (lastItem.index >= assets.length && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [virtualItems, assets.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

	useEffect(() => {
		parentRef.current?.scrollTo({ top: 0 });
	}, [search, filters]);

	return (
		<div className="h-full flex flex-col bg-white overflow-hidden">
			{/* Header */}
			<div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
				<div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
							<Wallet size={20} strokeWidth={2.5} />
						</div>
						<div>
							<h1 className="text-xl font-extrabold text-gray-900 tracking-tight leading-tight">
								Asset Ledger
							</h1>
							<span className="text-xs font-medium text-gray-500">Asset Overview</span>
						</div>
					</div>

					<div className="flex items-center gap-3 w-full md:w-auto">
						<div className="flex-1 md:flex-none">
							<SearchBar onChange={onSearchChange} />
						</div>
						<button
							onClick={() => setDrawerOpen(true)}
							className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg transition-all border border-gray-900 shrink-0 shadow-sm h-[38px]"
						>
							<SlidersHorizontal size={18} strokeWidth={2.5} />
							<span className="hidden sm:inline text-xs font-bold uppercase tracking-wide">
								Filter
							</span>
						</button>
					</div>
				</div>

				<div className="flex justify-between items-center bg-gray-50 px-5 py-2 border-t border-gray-200">
					<span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
						Asset Name
					</span>
					<span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
						Value / 24h
					</span>
				</div>
			</div>

			{/* List Content */}
			<div ref={parentRef} className="flex-1 overflow-auto bg-gray-100 pt-3 pb-6">
				{isLoading ? (
					<>
						{Array.from({ length: 12 }).map((_, i) => (
							<div key={i} className="relative w-full h-[72px]">
								<SkeletonRow />
							</div>
						))}
					</>
				) : assets.length === 0 ? (
					<div className="h-full flex flex-col items-center justify-center text-gray-500">
						<SlidersHorizontal size={40} className="text-gray-200 mb-4" />
						<p className="text-sm font-medium">No assets found</p>
					</div>
				) : (
					<div className="relative w-full" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
						{virtualItems.map((virtualRow) => {
							const isLoaderRow = virtualRow.index > assets.length - 1;
							const asset = assets[virtualRow.index];

							return (
								<div
									key={virtualRow.key}
									className="absolute top-0 left-0 w-full"
									style={{
										height: `${virtualRow.size}px`,
										transform: `translateY(${virtualRow.start}px)`,
									}}
								>
									{isLoaderRow ? <SkeletonRow /> : <AssetRow asset={asset} />}
								</div>
							);
						})}
					</div>
				)}
			</div>

			<FilterDrawer
				open={drawerOpen}
				filters={filters}
				onChange={setFilters}
				onClose={() => setDrawerOpen(false)}
			/>
		</div>
	);
}
