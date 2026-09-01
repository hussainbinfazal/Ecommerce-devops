const getStoredWishlist = (key) => {
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

module.exports = getStoredWishlist;