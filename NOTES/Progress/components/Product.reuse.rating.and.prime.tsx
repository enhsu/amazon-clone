import Image from "next/image";
import { useState } from "react";
import Currency from "react-currency-formatter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "~/store/slices/cartSlice";
import Rating from "~/components/Rating";
import Prime from "./Prime";

export type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

export type PropsType = Omit<Product, "rating">;

export type AddProduct = PropsType & {
  count: number;
  rating: number;
  hasPrime: boolean;
};

const MAX_RATING: number = 5;
const MIN_RATING: number = 1;

export default function Product({
  id,
  title,
  price,
  description,
  category,
  image,
}: PropsType) {
  const [count, setCount] = useState<number>(1);
  const [rating, setRating] = useState<number>(0);
  const [hasPrime, setHasPrime] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    setHasPrime(Math.random() < 0.5);
  }, []);

  const addItemToCart = () => {
    const product = {
      id,
      count,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
    };

    dispatch(addToCart(product));
  };

  return (
    <div className=" flex flex-col m-5 p-10 z-30 bg-white  relative">
      <p className=" absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image
        src={image}
        alt={`image: ${description}`}
        height={200}
        width={200}
        objectFit="contain"
      />
      <h4 className=" my-3">{title}</h4>
      <Rating rating={rating} />
      <p className=" my-2 text-xs line-clamp-2">{description}</p>

      <div className=" mb-5">
        <Currency quantity={price} currency="USD" />
      </div>

      {hasPrime && <Prime />}

      <button onClick={() => addItemToCart()} className=" mt-auto button">
        Add to Cart
      </button>
    </div>
  );
}
