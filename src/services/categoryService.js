const API_URL = import.meta.env.VITE_API_URL;

export const getCategoryAvatars = async () => {
    const response = await fetch(`${API_URL}/api/category-avatars`);
    if (!response.ok) {
        throw new Error('Failed to fetch category avatars');
    }
    return await response.json();
};
