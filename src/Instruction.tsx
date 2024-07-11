export function Instruction() {
	return (
		<div className="mb-4 text-center">
			<p>
				<span className="font-semibold">Instructions: </span>
				Type a 'name' and submit it to add it to the list. Select any item from
				the list, then type another 'name' and submit it to add it as a child of
				the selected item.
			</p>
			<p className="block">
				The list-item insertion and rendering process is occurring recursively.
			</p>
		</div>
	);
}
