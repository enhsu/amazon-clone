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
  quantity,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime,
}: PropsType) {
  const [addQuantity, setAddQuantity] = useState<number>(0);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (val: number) => {
    if (val <= 0) return;
    setAddQuantity(val - quantity);
  };
  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdateQuantity(parseInt(e.target.value));
  };

  const handleUpdateCart = () => {
    const product = {
      id,
      quantity: addQuantity,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };
    dispatch(addToCart(product));
    setAddQuantity(0);
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
          <div onClick={() => handleUpdateQuantity(quantity + addQuantity - 1)}>
            -
          </div>
          <input
            type="number"
            className=" flex-grow text-center"
            onChange={(e) => handleInputOnChange(e)}
            value={quantity + addQuantity}
          />

          <div onClick={() => handleUpdateQuantity(quantity + addQuantity + 1)}>
            +
          </div>
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
