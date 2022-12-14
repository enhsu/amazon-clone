import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "~/components/CheckoutProduct";
import Header from "~/components/Header";
import { selectItems, selectTotal } from "~/store/slices/cartSlice";
import Currency from "react-currency-formatter";

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();

  return (
    <div className=" bg-gray-100">
      <Header />
      <main className=" max-w-screen-2xl mx-auto lg:flex">
        {/* Left */}
        <div className=" flex-grow m-5 shadow-sm">
          {/* Advertisement */}
          <Image
            src="/checkout-advertisement.png"
            alt="advertisement"
            width={1020}
            height={250}
            objectFit="contain"
          />
          {/* Shopping Cart */}
          <div className=" flex flex-col p-5 space-y-10 bg-white">
            {/* Title */}
            <h1 className=" text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Cart is empty."
                : "Shopping Cart"}
            </h1>
            {/* Items list */}
            {items.map((item, idx) => (
              <CheckoutProduct key={item.id} {...item} />
            ))}
          </div>
        </div>
        {/* Right */}
        <div className=" flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2>
                Subtotal {items.length} items:{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="USD" />
                </span>
              </h2>
              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Process to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
