import axios from "axios";

export const getProduct = async () => {
    try {
        const response = await axios.get('https://dummyjson.com/products')
        return response.data
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}