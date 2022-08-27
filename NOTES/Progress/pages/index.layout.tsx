import Head from "next/head";
import Banner from "~/components/Banner";
import Header from "~/components/Header";
import ProductFeed from "~/components/ProductFeed";
import type { Product } from "~/components/Product";

type PropsType = {
  products: Product[];
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

export async function getServerSideProps() {
  const products = await getProductFeedContent();

  return {
    props: {
      products,
    },
  };
}
