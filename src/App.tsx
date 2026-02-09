import { useState } from "react";
import { AssetLedger } from "./components/AssetLedger";

export default function App() {
	const [search, setSearch] = useState("");

	return (
		<div className="h-screen bg-white">
			<AssetLedger search={search} onSearchChange={setSearch} />
		</div>
	);
}
