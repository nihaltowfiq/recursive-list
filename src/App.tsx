import { FormEvent, useState } from 'react';
import { Item } from './Item';
import { RecursiveItem } from './types';

function App() {
	const [name, setName] = useState('');
	const [data, setData] = useState<RecursiveItem[]>([]);
	const [selectedItem, setSelectedItem] = useState<RecursiveItem | null>(null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const id =
			new Date().getTime() + Math.floor(Math.random() * (1 - 10 + 1) + 10);

		setData((prevState) => {
			return prevState;
		});

		setName('');
		setSelectedItem(null);
	};

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
