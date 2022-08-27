import Image from "next/image";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import Currency from "react-currency-formatter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "~/store/slices/cartSlice";

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

type PropsType = Omit<Product, "rating">;

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
      title,
      price,
      description,
      category,
      image,
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
      <div className=" flex">
        {Array(rating)
          .fill(0)
          .map((_, i) => (
            <AiFillStar key={`${i}start`} className=" h-5 text-yellow-500" />
          ))}
      </div>
      <p className=" my-2 text-xs line-clamp-2">{description}</p>

      <div className=" mb-5">
        <Currency quantity={price} currency="USD" />
      </div>

      {hasPrime && (
        <div className=" flex items-center space-x-2 -mt-5">
          <picture className=" w-12">
            <source srcSet="/prime-tag.png" />
            <img src="/prime-tag.png" alt="prime tag" />
          </picture>
          <p className=" text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button onClick={() => addItemToCart()} className=" mt-auto button">
        Add to Cart
      </button>
    </div>
  );
}
