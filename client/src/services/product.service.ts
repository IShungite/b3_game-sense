import api from "api"

const getProducts = async() => {
    const products = (await api.getProducts()).data;
    return products;
}

const getProductsByShop = async(shopId: string) => {
    const products = (await api.getProductsByShop(shopId)).data
    return products;
}

export default {
    getProducts,
    getProductsByShop,
}