export type Asset = {
	id: string;
	name: string;
	ticker: string;
	type: AssetType;
	value: number;
	price: number;
	quantity: number;
	change24h: number;
	updatedAt?: string;
};

type AssetType = "stock" | "commodity" | "bond" | "crypto" | "real_estate";
