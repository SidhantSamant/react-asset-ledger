import { memo } from "react";
import type { Asset } from "../types/asset";
import { TrendingUp, ShieldCheck, Bitcoin, Building2, Coins, type LucideIcon } from "lucide-react";

const INR_CURRENCY = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "INR",
	maximumFractionDigits: 0,
});

const DECIMAL_FORMAT = new Intl.NumberFormat("en-IN", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const PERCENT_FORMAT = new Intl.NumberFormat("en-US", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const ICON_STYLES: Record<string, { bg: string; text: string; icon: LucideIcon }> = {
	stock: { bg: "bg-blue-100", text: "text-blue-600", icon: TrendingUp },
	bond: { bg: "bg-green-100", text: "text-green-600", icon: ShieldCheck },
	crypto: { bg: "bg-purple-100", text: "text-purple-600", icon: Bitcoin },
	real_estate: { bg: "bg-orange-100", text: "text-orange-600", icon: Building2 },
	commodity: { bg: "bg-yellow-100", text: "text-yellow-700", icon: Coins },
};

const DEFAULT_STYLE = { bg: "bg-gray-100", text: "text-gray-600", icon: TrendingUp };

interface AssetRowProps {
	asset: Asset;
	style?: React.CSSProperties;
}

export const AssetRow = memo(function AssetRow({ asset, style }: AssetRowProps) {
	const { type, quantity = 0, price = 0, change24h = 0, value, name, ticker } = asset;

	const config = ICON_STYLES[type] || DEFAULT_STYLE;
	const IconComponent = config.icon;
	const isPositive = change24h >= 0;

	return (
		<div style={style} className="absolute left-0 w-full px-3 box-border will-change-transform">
			<div className="flex items-center justify-between w-full h-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-colors duration-150 cursor-pointer shadow-sm">
				<div className="flex items-center gap-3">
					<div
						className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${config.bg} ${config.text}`}
					>
						<IconComponent size={20} strokeWidth={2.5} />
					</div>

					<div className="flex flex-col justify-center min-w-0">
						<span className="font-bold text-gray-900 text-sm leading-tight truncate">{name}</span>
						<span className="text-xs font-medium text-gray-400 font-mono tracking-wide uppercase truncate">
							{ticker} • {type.replace("_", " ")}
						</span>
					</div>
				</div>

				<div className="flex flex-col items-end justify-center shrink-0">
					<span className="font-bold text-gray-900 text-sm tabular-nums">
						{INR_CURRENCY.format(value)}
					</span>

					<div className="flex items-center gap-2 mt-0.5">
						<span className="text-[10px] text-gray-400 font-medium tabular-nums">
							{DECIMAL_FORMAT.format(quantity)} @ {DECIMAL_FORMAT.format(price)}
						</span>

						<div
							className={`flex items-center px-1.5 py-0.5 rounded border ${
								isPositive
									? "bg-green-50 text-green-700 border-green-100"
									: "bg-red-50 text-red-700 border-red-100"
							}`}
						>
							<span className="text-[9px] font-bold mr-0.5">{isPositive ? "▲" : "▼"}</span>
							<span className="text-[11px] font-bold tabular-nums">
								{PERCENT_FORMAT.format(Math.abs(change24h))}%
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
