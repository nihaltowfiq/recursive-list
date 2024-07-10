export type RecursiveItem = {
	id: string;
	name: string;
	level: number;
	child?: RecursiveItem[];
};
