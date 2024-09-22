// Example: Function to generate a unique identifier (UUID)
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Example: Function to check if an object is empty
export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

// Example: Function to deep clone an object
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Example: Function to delay execution for a given number of milliseconds
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
