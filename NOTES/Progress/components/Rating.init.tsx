import { AiFillStar } from "react-icons/ai";

export type PropsType = {
  rating: number;
};

function Rating({ rating }: PropsType) {
  return (
    <div className=" flex">
      {Array(rating)
        .fill(0)
        .map((_, i) => (
          <AiFillStar key={`${i}start`} className=" h-5 text-yellow-500" />
        ))}
    </div>
  );
}

export default Rating;
