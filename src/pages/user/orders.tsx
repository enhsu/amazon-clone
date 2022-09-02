import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Header from "~/components/Header";
import Stripe from "stripe";
import db from "~/utils/db/firebase";
import { query, orderBy, limit, collection, getDocs } from "firebase/firestore";
import moment from "moment";
import Order from "~/components/Order";
import type { OrderType } from "~/components/Order";

type PropsType = {
  orders: OrderType[];
};

function Orders({ orders }: PropsType) {
  const { data: session } = useSession();

  return (
    <div>
      <Header />

      <main className=" max-w-screen-lg mx-auto p-10">
        <h1 className=" text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>

        {/* Subtitle */}
        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        {/* Orders */}
        <div className=" mt-5 space-y-4">
          {orders?.map((order) => (
            <Order key={order.id} {...order} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Orders;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-08-01",
  });

  // Get the user's logged in credentials
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const orderRef = collection(
    db,
    "users",
    session.user?.email as string,
    "orders"
  );
  const orderQuery = query(orderRef, orderBy("timestamp", "desc"), limit(100));
  // Needed snapshot
  const orderSnapshot = await getDocs(orderQuery);

  // Stripe orders
  const orders = await Promise.all(
    orderSnapshot.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      // timestamp: order.data().timestamp.toDate().getTime(),
      timestamp: moment(order.data().timestamp.toDate()).valueOf(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders: orders,
    },
  };
};
