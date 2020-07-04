export const saveItemToLocalStorage = <T>(
	itemName: string,
	itemData: T
): void => {
	window.localStorage.setItem(itemName, JSON.stringify(itemData));
};
export const getItemFromLocalStorage = <T>(itemName: string): T | null => {
	const result = window.localStorage.getItem(itemName);
	return result ? JSON.parse(result) : null;
};
export const removeItemFromLocalStorage = (itemName: string): void => {
	window.localStorage.removeItem(itemName);
};
