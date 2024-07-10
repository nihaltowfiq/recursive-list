export type RecursiveItem = {
	id: string;
	name: string;
	level: string;
	child?: RecursiveItem[];
};
