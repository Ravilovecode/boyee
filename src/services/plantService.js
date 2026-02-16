const API_URL = import.meta.env.VITE_API_URL;

export const getAllPlants = async () => {
    const response = await fetch(`${API_URL}/api/plants`);
    if (!response.ok) {
        throw new Error('Failed to fetch plants');
    }
    const data = await response.json();
    return data.plants || data; // Handle new paginated structure or fallback
};

export const getPlantById = async (id) => {
    const response = await fetch(`${API_URL}/api/plants/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch plant');
    }
    return await response.json();
};
