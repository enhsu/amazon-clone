import type { IProduct } from "~/components/Product";
import Product from "~/components/Product";

export interface IProductFeedProps {
  products: IProduct[];
}

export default function ProductFeed({ products }: IProductFeedProps) {
  return (
    <div className=" grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-48 mx-auto">
      {products.map(({ id, title, price, description, category, image }) => (
        <Product
          key={id}
          id={id}
          title={title}
          price={price}
          description={description}
          category={category}
          image={image}
        />
      ))}
    </div>
  );
}
