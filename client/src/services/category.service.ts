import api from "api"

const getCategoriesByShop = async(shopId: string) => {
    const products = (await api.getCategoriesByShop(shopId)).data;
    return products;
}

export default {
    getCategoriesByShop,
}