import { IItemImage } from "models/items/item";
import itemsImagesJson from "../../public/itemsImages.json";

const itemsImages = itemsImagesJson as unknown as IItemImage[];

const getItemImage = (id: string): IItemImage => {
  const itemImage = itemsImages.find((itemImage2) => itemImage2.id === id);

  return (
    itemImage ?? {
      id: "0",
      image: "./images/characters/bodies/body_fallen_angel.png",
    }
  );
};

export default getItemImage;
