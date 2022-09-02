import moment from "moment";
import Stripe from "stripe";
import Currency from "react-currency-formatter";

export type OrderType = {
  id: string;
  amount: number;
  amountShipping: number;
  images: string[];
  timestamp: moment.Moment;
  items: Stripe.LineItem[];
};

function Order({
  id,
  amount,
  amountShipping,
  images,
  items,
  timestamp,
}: OrderType) {
  return (
    <div className=" relative border rounded-md">
      {/* Details */}
      <div className=" flex items-center space-x-10 p-5 bg-gray-100">
        {/* Left */}
        <div>
          <p className=" text-xs font-bold">ORDER Placed</p>
          <p>{moment(timestamp).format("DD MMM YYYY")}</p>
        </div>
        {/* Middle */}
        <div>
          <p className=" text-xs font-bold">TOTAL</p>
          <p>
            <Currency quantity={amount} currency="USD" /> - Next Day
            Delivery&nbsp;
            <Currency quantity={amountShipping} currency="USD" />
          </p>
        </div>
        {/* Right */}
        <p className=" text-sm sm:text-lg whitespace-nowrap self-end flex-1 text-right text-blue-500">
          {items.length} items
        </p>
        {/* ID */}
        <p className=" absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          ORDER # {id}
        </p>
      </div>
      {/* Images */}
      <div className=" p-5 sm:p-10">
        <div className=" flex space-x-6 overflow-x-auto">
          {images.map((image) => (
            <picture key={image}>
              <img
                className=" h-20 sm:h-32 object-contain"
                src={image}
                alt="order image"
              />
            </picture>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
