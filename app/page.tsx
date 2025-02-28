"use client"
import { type MouseEvent, useState } from "react";

interface Click {
	id: number;
	x: number;
	y: number;
}

export default function Home() {
	const [clicks, setClicks] = useState<Click[]>([]);

	const handleClick = (e: MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const id = Date.now();
		const newClick: Click = { id, x, y };

		setClicks((prev) => [...prev, newClick]);

		setTimeout(() => {
			setClicks((prev) => prev.filter((click) => click.id !== id));
		}, 1000);
	};

	return (
		<div
			onClick={handleClick}
			className="w-screen h-screen overflow-hidden cursor-pointer bg-amber-100 grid grid-cols-3 grid-rows-3 gap-4"
		>
			<h1 className="col-start-2 row-start-2 text-2xl">とびだせ！とび太くん</h1>
			{clicks.map((click) => (
				<img
					key={click.id}
					src="/tobita_kun.png"
					alt="tobita_kun"
					className="absolute w-12 h-12 pointer-events-none emoji-animation select-none"
					style={{
						left: click.x - 24,
						top: click.y - 24,
					}}
				/>
			))}
		</div>
	);
}
