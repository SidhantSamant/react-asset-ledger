import { memo } from "react";

export const SkeletonRow = memo(function SkeletonRow({ style }: { style?: React.CSSProperties }) {
	return (
		<div style={style} className="absolute left-0 w-full px-3 box-border">
			<div
				className="
                flex items-center justify-between w-full h-full px-4 py-3
                bg-white border border-gray-200 rounded-xl animate-pulse
            "
			>
				{/* Left Side */}
				<div className="flex items-center gap-1">
					<div className="h-10 w-10 rounded-lg bg-gray-200" />
					<div className="flex flex-col gap-2">
						<div className="h-3.5 w-24 bg-gray-200 rounded" />
						<div className="h-2.5 w-32 bg-gray-200 rounded" />
					</div>
				</div>

				{/* Right Side */}
				<div className="flex flex-col items-end gap-2">
					<div className="h-3.5 w-20 bg-gray-200 rounded" />
					<div className="flex items-center gap-2">
						<div className="hidden sm:block h-2.5 w-12 bg-gray-200 rounded" />
						<div className="h-4 w-12 rounded bg-gray-200" />
					</div>
				</div>
			</div>
		</div>
	);
});
