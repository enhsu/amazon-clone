import Image from "next/image";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineMenu,
} from "react-icons/ai";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "~/store/slices/cartSlice";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header className=" bg-gray-400">
      {/* Top nav */}
      <div className=" flex items-center bg-amazon_blue p-1 py-2 flex-grow">
        {/* Icon */}
        <div className=" flex items-center flex-grow mt-2 sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="/amazon-logo-white-text.png"
            alt="amazon icon"
            width={150}
            height={40}
            objectFit="contain"
            className=" cursor-pointer"
          />
        </div>
        {/* Search */}
        <div className=" hidden sm:flex items-center h-10 rounded-md cursor-pointer bg-yellow-400 hover:bg-yellow-500 flex-grow">
          <input
            className=" p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
            type="text"
          />
          <div className=" h-12 p-4">
            <AiOutlineSearch />
          </div>
        </div>
        {/* Account & Orders & Cart */}
        <div className=" flex items-center text-white text-xs space-x-6 mx-6 whitespace-nowrap">
          {/* Account */}
          <div
            className="link"
            onClick={() => {
              if (!session) {
                signIn();
              } else {
                signOut();
              }
            }}
          >
            <p>{session ? `Hello, ${session.user?.name}` : "Hello there"}</p>
            <p className=" font-extrabold md:text-sm">
              {!session ? "SignIn" : "SignOut"}
            </p>
          </div>
          {/* Orders */}
          {session && (
            <div
              onClick={() => session && router.push("/user/orders")}
              className="link"
            >
              <p>Go to</p>
              <p className=" font-extrabold md:text-sm">Orders</p>
            </div>
          )}

          {/* Cart */}
          <div
            onClick={() => router.push("/checkout")}
            className=" relative flex items-center link"
          >
            <span className=" absolute top-0 -right-1 md:right-6 h-4 w-4 bg-yellow-400 text-center text-black font-bold rounded-full">
              {items.length}
            </span>
            <AiOutlineShoppingCart className=" w-10 h-10" />
            <p className=" hidden md:inline mt-7 font-extrabold md:text-sm">
              Cart
            </p>
          </div>
        </div>
      </div>
      {/* Bottom nav */}
      <div className=" flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className=" link flex items-center">
          <AiOutlineMenu className=" h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today&apos; s Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food &amp; Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health &amp; Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
