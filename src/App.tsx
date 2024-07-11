import { FormEvent, useState } from 'react';
import { Instruction } from './Instruction';
import { Item } from './Item';
import { RecursiveItem } from './types';

export default function App() {
	const [name, setName] = useState('');
	const [data, setData] = useState<RecursiveItem[]>([]);
	const [selectedItem, setSelectedItem] = useState<RecursiveItem | null>(null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const id = String(
			new Date().getTime() + Math.floor(Math.random() * (1 - 10 + 1) + 10),
		);

		const payload = { id, name, level: '', child: [] };

		setData((prevState) => {
			let newState = [...prevState];

			if (!selectedItem) {
				payload.level = id;
				newState.push(payload);
			} else {
				payload.level = selectedItem.level + '-' + id;
				newState = insertItem(newState, selectedItem.level, payload);
			}

			return newState;
		});

		setName('');
		setSelectedItem(null);
	};

	const insertItem = (
		data: RecursiveItem[],
		level: string,
		payload: RecursiveItem,
	) => {
		return data.map((item) => {
			if (item.level === level) {
				item.child = [...item.child, payload];
			} else if (item.child?.length > 0) {
				item.child = insertItem(item.child, level, payload);
			}

			return item;
		});
	};

	return (
		<div className="container py-[1rem]">
			<Instruction />

			<p className="mb-4">
				SELECTED: <span className="font-semibold">{selectedItem?.name}</span>
			</p>

			<form onSubmit={handleSubmit} className="mb-4">
				<input
					value={name}
					placeholder="Enter item name!"
					onChange={(e) => setName(e.target.value)}
					className="p-2 border border-gray-200 outline-none rounded"
				/>
				<button className="ml-4 font-medium border border-gray-200 py-2 px-3 hover:bg-gray-200 rounded">
					Submit
				</button>
			</form>

			{data && data?.length > 0 && (
				<ul role="list" className="ml-3 list-disc list-inside">
					{data.map((el) => (
						<Item
							{...el}
							key={el.id}
							onSelected={(value) => setSelectedItem(value)}
						/>
					))}
				</ul>
			)}
		</div>
	);
}
