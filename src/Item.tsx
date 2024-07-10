import { RecursiveItem } from './types';

export function Item({ name, onSelected, child, ...rest }: Props) {
	return (
		<li>
			<p role="button" onClick={() => onSelected({ name, ...rest })}>
				{name}
			</p>

			{child?.length > 0 && (
				<ul>
					{child.map((el) => (
						<Item key={el.id} {...el} onSelected={onSelected} />
					))}
				</ul>
			)}
		</li>
	);
}

type Props = RecursiveItem & {
	onSelected: (value: RecursiveItem) => void;
};
