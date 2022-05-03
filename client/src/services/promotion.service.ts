import { CreatePromotionDto } from "models/promotions/create-promotion.dto";
import api from "../api";

const createPromotion = async (formData: CreatePromotionDto) => (await api.createPromotion(formData)).data;

const getPromotions = async (schoolId: string) => (await api.getPromotions(schoolId)).data;

export default { createPromotion, getPromotions };
