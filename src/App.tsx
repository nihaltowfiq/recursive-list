import { FormEvent, useState } from 'react';
import { Item } from './Item';
import { mock } from './mock-data';
import { RecursiveItem } from './types';

function App() {
	const [name, setName] = useState('');
	const [data, setData] = useState<RecursiveItem[]>(mock);
	const [selectedItem, setSelectedItem] = useState<RecursiveItem | null>(null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const id = String(
			new Date().getTime() + Math.floor(Math.random() * (1 - 10 + 1) + 10),
		);
		const payload = { id, name, level: id, child: [] };

		setData((prevState) => {
			const arr = [...prevState];
			if (!selectedItem) {
				arr.push(payload);
			} else {
				const arr = selectedItem.level.split('-');
				console.log(arr, arr.length);
				// arr.forEach((el,i) => {

				// })
			}
			return arr;
		});

		setName('');
		// setSelectedItem(null);
	};

	console.log('SELECTED', selectedItem);

	return (
		<>
			<p>SELECTED: {selectedItem?.name}</p>

			<form onSubmit={handleSubmit}>
				<input value={name} onChange={(e) => setName(e.target.value)} />
				<button style={{ marginLeft: '10px' }}>Submit</button>
			</form>

			{data?.length > 0 && (
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
