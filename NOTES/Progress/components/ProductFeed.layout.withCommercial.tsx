import type { IProduct } from "~/components/Product";
import Product from "~/components/Product";

export interface IProductFeedProps {
  products: IProduct[];
}

export default function ProductFeed({ products }: IProductFeedProps) {
  return (
    <div className=" grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-48 mx-auto">
      {products
        .slice(0, 4)
        .map(({ id, title, price, description, category, image }) => (
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

      <picture className=" md:col-span-full">
        <source srcSet="/product-feed-commercial.jpg" />
        <img src="/product-feed-commercial.jpg" alt="commercial picture" />
      </picture>

      <div className=" md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, title, price, description, category, image }) => (
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

      {products
        .slice(5, products.length)
        .map(({ id, title, price, description, category, image }) => (
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
