import api from "api"

const getProducts = async() => {
    const products = (await api.getProducts()).data;
    return products;
}

const getProductsByCategory = async(categoryId: string) => {
    const products = (await api.getProductsByCategory(categoryId)).data
    return products;
}

export default {
    getProducts,
    getProductsByCategory,
}