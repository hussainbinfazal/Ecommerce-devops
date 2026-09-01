export const getStoredWishlist = (key) => {
  if (typeof window === 'undefined') return [];

  const value = localStorage.getItem(key);

  if (!value) return [];

  try {
    const parsed = JSON.parse(value);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(`Invalid localStorage value for ${key}:`, error);
    return [];
  }
};

export const setStorageItem = (key, value) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set localStorage item ${key}:`, error);
  }
};

export const removeStorageItem = (key) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove localStorage item ${key}:`, error);
  }
};

export default getStoredWishlist;