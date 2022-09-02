import Header from "~/components/Header";
import { AiFillCheckCircle } from "react-icons/ai";
import { useRouter } from "next/router";

function Success() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/user/orders");
  };

  return (
    <div className=" bg-green-100 h-screen">
      <Header />
      <main className=" max-w-screen-lg mx-auto">
        <div className=" flex flex-col p-10 bg-white">
          <div className=" flex items-center space-x-2 mb-5">
            <AiFillCheckCircle className=" text-green-500 h-10 w-10" />
            <h1 className=" text-3xl">
              Thank you, your order has been confirmed!
            </h1>
          </div>
          <p>
            Thank you for shpping with us. We&apos;ll send a confirmation once
            your item has shipped, if you would like to check the status of your
            order(s) plaease press the link below.
          </p>
          <button onClick={() => handleRedirect()} className="button mt-8">
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
}

export default Success;
