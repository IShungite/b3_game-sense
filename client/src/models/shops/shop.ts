export interface IShop {
    _id: string;
    school_id: string;
    name: string;
}

export interface IProduct {
    shop_id: string;
    name: string;
    price: number;
    description: string;
} 