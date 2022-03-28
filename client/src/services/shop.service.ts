import api from "api"

const getShops = async() => {
    await api.getShops();
}

export default {
    getShops,
}