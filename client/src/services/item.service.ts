import api from "api";

const getItems = async() => {
    const items = (await api.getStarterItems()).data;
    return items;
}

export default {
    getItems,
}