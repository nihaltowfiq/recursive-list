import { RecursiveItem } from './types';

export function Item({
	name,
	onSelected,
	selectedItem,
	child,
	...rest
}: Props) {
	return (
		<li className="py-2">
			<button
				onClick={() => onSelected({ name, ...rest })}
				className={`py-1 px-3 rounded border border-transparent hover:border-gray-200 ${selectedItem?.id === rest?.id ? 'bg-gray-200' : ''}`}
			>
				{name}
			</button>

			{child?.length > 0 && (
				<ul role="list" className="ml-[1.5rem] list-disc list-inside">
					{child.map((el) => (
						<Item
							key={el.id}
							{...el}
							onSelected={onSelected}
							selectedItem={selectedItem}
						/>
					))}
				</ul>
			)}
		</li>
	);
}

type Props = RecursiveItem & {
	selectedItem: RecursiveItem;
	onSelected: (value: RecursiveItem) => void;
};
