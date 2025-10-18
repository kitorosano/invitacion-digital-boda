/**
 * Utility functions for interacting with localStorage
 * @param key The key under which the value is stored
 * @param value The value to store
 * @returns void
 */
export const saveToLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

/**
 * Loads a value from localStorage
 * @param key The key under which the value is stored
 * @returns The loaded value or null if not found
 */
export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
};

/**
 * Removes a value from localStorage
 * @param key The key under which the value is stored
 * @returns void
 */
export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};
