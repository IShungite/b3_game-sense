import api from "api"

const getShops = async() => {
    const shops = (await api.getShops()).data;
    return shops;
}

export default {
    getShops,
}