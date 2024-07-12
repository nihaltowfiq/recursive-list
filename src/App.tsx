import { FormEvent, useRef, useState } from 'react';
import { Instruction } from './Instruction';
import { Item } from './Item';
import { RecursiveItem } from './types';
import { getId } from './utils';

export default function App() {
	const [data, setData] = useState<RecursiveItem[]>([]);
	const [selectedItem, setSelectedItem] = useState<RecursiveItem | null>(null);

	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!inputRef.current.value) {
			inputRef.current.classList.add('animate-shake');

			setTimeout(() => {
				inputRef.current.classList.remove('animate-shake');
				inputRef.current.focus();
			}, 1000);

			return;
		}

		const id = getId();
		const payload = { id, name: inputRef.current.value, level: '', child: [] };

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

		setSelectedItem(null);
		inputRef.current.value = '';
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
					ref={inputRef}
					placeholder="Enter item name!"
					className="py-2 px-3 border border-gray-200 outline-none rounded"
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
							selectedItem={selectedItem}
							onSelected={(value) => {
								setSelectedItem(value);
								inputRef.current.focus();
							}}
						/>
					))}
				</ul>
			)}
		</div>
	);
}
