/**
 * Check if menu item is currently selected using URL
 *
 * @param {string} path
 */
export const isCurrentPath = (path: string) => {
  return String(location.pathname).includes(path);
};
