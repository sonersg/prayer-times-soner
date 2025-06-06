export function setItem(key: string, value: string) {
  localStorage.setItem(key, value);
}
export function getItem(key: string) {
  return localStorage.getItem(key);
}
export function deleteItem(key: string) {
  localStorage.removeItem(key);
}
