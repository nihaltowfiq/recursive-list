import { FormEvent, useState } from 'react';
import { Item } from './Item';
import { RecursiveItem } from './types';

function App() {
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
				insertItem(item.child, level, payload);
			}

			return item;
		});
	};

	return (
		<>
			<p>SELECTED: {selectedItem?.name}</p>

			<form onSubmit={handleSubmit}>
				<input
					value={name}
					placeholder="Enter item name!"
					onChange={(e) => setName(e.target.value)}
				/>
				<button style={{ marginLeft: '10px' }}>Submit</button>
			</form>

			{data && data?.length > 0 && (
				<ul>
					{data.map((el) => (
						<Item
							{...el}
							key={el.id}
							onSelected={(value) => setSelectedItem(value)}
						/>
					))}
				</ul>
			)}
		</>
	);
}

export default App;
