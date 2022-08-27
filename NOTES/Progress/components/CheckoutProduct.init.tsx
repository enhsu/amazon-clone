import type { AddProduct } from "~/components/Product";
import Currency from "react-currency-formatter";
import Image from "next/image";
import Rating from "./Rating";
import Prime from "./Prime";
import React, { useState } from "react";
import { addToCart, removeFromCart } from "~/store/slices/cartSlice";
import { useDispatch } from "react-redux";

type PropsType = AddProduct;

function CheckoutProduct({
  id,
  count,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime,
}: PropsType) {
  const [addCount, setAddCount] = useState<number>(0);
  const dispatch = useDispatch();

  const handleUpdateCount = (val: number) => {
    if (val <= 0) return;
    setAddCount(val - count);
  };
  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdateCount(parseInt(e.target.value));
  };

  const handleUpdateCart = () => {
    const product = {
      id,
      count: addCount,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };
    dispatch(addToCart(product));
    setAddCount(0);
  };
  const handleRemoveItemFromCart = () => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <div className=" grid grid-cols-5">
      {/* Left: Image */}
      <Image
        src={image}
        alt={`${title} image`}
        height={200}
        width={200}
        objectFit="contain"
      />
      {/* Middle: title, rating, description, price, hasPrime*/}
      <div className=" col-span-3 mx-5">
        {/* Title */}
        <p>{title}</p>
        {/* Rating */}
        <Rating rating={rating} />
        {/* Description */}
        <p className=" text-xs my-2 line-clamp-3">{description}</p>
        {/* Price */}
        <Currency quantity={price} currency="USD" />
        {/* Prime */}
        {hasPrime && <Prime />}
      </div>
      {/* Right: Add & Remove */}
      <div className=" flex flex-col space-y-2 my-auto justify-self-center">
        <div className=" flex">
          <div onClick={() => handleUpdateCount(count + addCount - 1)}>-</div>
          <input
            type="number"
            className=" flex-grow text-center"
            onChange={(e) => handleInputOnChange(e)}
            value={count + addCount}
          />

          <div onClick={() => handleUpdateCount(count + addCount + 1)}>+</div>
        </div>
        <button onClick={() => handleUpdateCart()} className="button">
          Update Cart
        </button>
        <button onClick={() => handleRemoveItemFromCart()} className="button">
          Remove from Cart
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
