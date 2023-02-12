export const useLocalStorage = () => {
    const setLocalStorageItem = (item: string, value: any) => {
		try {
			if (!localStorage.getItem(item)) {
			  localStorage.setItem(item, "");
			}
		} catch (e) {
			throw new Error(e.message);
		}

		try {
			window.localStorage.setItem(item, value);
		} catch (e) {
			throw new Error(e.message);
		}
    }

	const setLocalStorageObjItem = (item: string, value: any) => {
		try {
			if (!localStorage.getItem(item)) {
			  localStorage.setItem(item, "[]");
			}
		} catch (e) {
			throw new Error(e.message);
		}
		// let memoryArr = JSON.parse(localStorage.getItem(item) || "");
		// let newMemoryArr = JSON.stringify([...new Set([value, ...memoryArr])]);
		let newMemory = JSON.stringify(value);
		try {
			window.localStorage.setItem(item, newMemory);
		} catch (e) {
			throw new Error(e.message);
		}
    }

	const getLocalStorageItem = (item: string): string | null => {
		return localStorage.getItem(item);
    };

	const getLocalStorageItems = (item: string) => {
		return JSON.parse(localStorage.getItem(item) || "");
    };

	const removeLocalStorageItem = (item: string) => localStorage.removeItem(item);

	const clearLocalStorageItem = () => localStorage.clear();
	
    return [setLocalStorageItem, setLocalStorageObjItem, getLocalStorageItem, getLocalStorageItems, removeLocalStorageItem, clearLocalStorageItem];
}