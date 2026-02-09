import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchAssets } from "../api/fetchAssets";
import type { AssetFilters } from "../types/filters";

export function useAssets(search: string, filters: AssetFilters) {
	return useInfiniteQuery({
		queryKey: ["assets", search, filters],
		initialPageParam: 0,
		queryFn: ({ pageParam, signal }) =>
			fetchAssets({
				cursor: pageParam as number,
				limit: 50,
				search,
				filters,
				signal,
			}),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		select: (data) => data.pages.flatMap((page) => page.data),
		placeholderData: keepPreviousData,
	});
}
