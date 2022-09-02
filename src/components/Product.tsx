import Image from "next/image";
import { useRef, useState } from "react";
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
  quantity: number;
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
  const [quantity, setQuantity] = useState<number>(1);
  const [rating, setRating] = useState<number>(0);
  const [hasPrime, setHasPrime] = useState<boolean>(false);
  const dispatch = useDispatch();
  const titelRef = useRef<HTMLHeadingElement>(null);
  const [hoverShowTitleTip, setHoverShowTitleTip] = useState<boolean>(false);
  const [hoeverShowDescriptionTip, setHoeverShowDescriptionTip] =
    useState<boolean>(false);

  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    setHasPrime(Math.random() < 0.5);
    // setTitleWidth(titelRef.current?.offsetWidth!);
    const CONTENT_WIDTH = titelRef.current?.offsetWidth!;
    if (title.length * 8 >= CONTENT_WIDTH) {
      setHoverShowTitleTip(true);
    }
    if (description.length * 2.93 > CONTENT_WIDTH) {
      setHoeverShowDescriptionTip(true);
    }
  }, []);

  const addItemToCart = () => {
    const product = {
      id,
      quantity,
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
      <div className="group relative">
        <h4 ref={titelRef} className=" my-3 line-clamp-1">
          {title}
        </h4>
        {hoverShowTitleTip && (
          <p className=" absolute invisible group-hover:visible bg-amazon_blue text-white opacity-80 text-center rounded-md -my-3x z-50">
            {title}
          </p>
        )}
      </div>
      <Rating rating={rating} />
      <div className="group relative">
        <p className=" my-2 text-xs line-clamp-2">{description}</p>
        {hoeverShowDescriptionTip && (
          <p className="absolute invisible group-hover:visible bg-amazon_blue text-white opacity-80 text-center rounded-md -my-3x z-50">
            {description}
          </p>
        )}
      </div>

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
