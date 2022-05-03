import api from "api";

const getStarterItems = async () => (await api.getStarterItems()).data;

export default {
  getStarterItems,
};
