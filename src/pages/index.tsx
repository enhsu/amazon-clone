import Head from "next/head";
import Banner from "~/components/Banner";
import Header from "~/components/Header";
import ProductFeed from "~/components/ProductFeed";
import type { Product } from "~/components/Product";
import { GetServerSideProps } from "next";
// import { getSession } from "next-auth/react";
// import { DefaultSession } from "next-auth";

type PropsType = {
  products: Product[];
  // session: DefaultSession;
};

const Home = ({ products }: PropsType) => {
  return (
    <div className=" bg-gray-100">
      <Head>
        <title>Amazon clone</title>
      </Head>

      <Header />

      <main className=" max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />
        {/* Products feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
};

export default Home;

async function getProductFeedContent() {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => {
      return res.json();
    }
  );

  return products;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const session = await getSession(context);
  const products = await getProductFeedContent();

  return {
    props: {
      products,
    },
  };
};
