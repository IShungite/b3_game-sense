import api from "api"

const getProducts = async() => {
    const products = (await api.getProducts()).data;
    return products;
}

export default {
    getProducts,
}