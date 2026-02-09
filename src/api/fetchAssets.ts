import type { Asset } from "../types/asset";
import type { AssetFilters } from "../types/filters";

const TYPES = ["stock", "bond", "crypto", "real_estate", "commodity"] as const;

const CONFIG: Record<string, { prefix: string; price: number; names: string[] }> = {
	stock: {
		prefix: "NSE",
		price: 2500,
		names: ["Reliance Ind", "TCS", "HDFC Bank", "Infosys", "Tata Motors", "ITC Ltd"],
	},
	bond: {
		prefix: "GOI",
		price: 10000,
		names: ["GOI Bond 2030", "NHAI Tax Free", "REC Bond", "SGB Series"],
	},
	crypto: {
		prefix: "COIN",
		price: 3500000,
		names: ["Bitcoin", "Ethereum", "Solana", "Matic (Polygon)", "Tether"],
	},
	real_estate: {
		prefix: "PROP",
		price: 7500000,
		names: ["Mumbai Apt", "Bangalore Villa", "Gurgaon Office", "Goa Plot", "Hyd Tech Park"],
	},
	commodity: {
		prefix: "MCX",
		price: 60000,
		names: ["Gold", "Silver", "Copper", "Platinum", "Zinc"],
	},
};

// Random number helper
const random = (seed: number) => {
	const x = Math.sin(seed + 12345) * 10000;
	return x - Math.floor(x);
};

// Generate a random asset
const getAsset = (index: number, cursor: number): Asset => {
	const type = TYPES[index % TYPES.length];
	const conf = CONFIG[type];

	const priceVar = 0.8 + random(index) * 0.4;
	const quantity = 0.1 + random(index + 1) * 9.9;
	const price = Math.round(conf.price * priceVar);
	const assetNum = index + 1 + cursor;

	return {
		id: `asset-${assetNum}`,
		name: `Asset ${assetNum}: ${conf.names[index % conf.names.length]}`,
		ticker: `${conf.prefix}-${assetNum}`,
		type,
		price,
		quantity,
		value: price * quantity,
		change24h: random(index + 2) * 20 - 10,
	};
};

type Params = {
	cursor?: number;
	limit: number;
	search?: string;
	filters?: AssetFilters;
	signal?: AbortSignal;
};

const MAX_TOTAL_ITEMS = 1_000_000;

export async function fetchAssets({ cursor = 0, limit, search, filters, signal }: Params) {
	await new Promise<void>((resolve, reject) => {
		const timeout = setTimeout(resolve, 500);

		if (signal) {
			if (signal.aborted) {
				clearTimeout(timeout);
				reject(new DOMException("Aborted", "AbortError"));
				return;
			}

			signal.addEventListener("abort", () => {
				clearTimeout(timeout);
				reject(new DOMException("Aborted", "AbortError"));
			});
		}
	});

	const BATCH_SIZE = limit * 4;
	let allData = Array.from({ length: BATCH_SIZE }).map((_, i) => getAsset(i, cursor));

	if (filters?.type && filters.type !== "all") {
		allData = allData.filter((a) => a.type === filters.type);
	}

	if (search) {
		const term = search.toLowerCase();
		allData = allData.filter(
			(a) => a.name.toLowerCase().includes(term) || a.ticker.toLowerCase().includes(term)
		);
	}

	const nextCursor = cursor + limit;
	const resultData = allData.slice(0, limit);
	return {
		data: resultData,
		nextCursor: nextCursor < MAX_TOTAL_ITEMS ? nextCursor : undefined,
	};
}
