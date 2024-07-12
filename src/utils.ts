export function getId() {
	return String(
		new Date().getTime() + Math.floor(Math.random() * (1 - 10 + 1) + 10),
	);
}
