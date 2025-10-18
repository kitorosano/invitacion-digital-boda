/**
 * Convert a File object to a data URI.
 * @param file - The File object to convert.
 * @returns A promise that resolves to the data URI string.
 * @throws An error if the file cannot be read.
 */
export const fileToUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
  });
};
