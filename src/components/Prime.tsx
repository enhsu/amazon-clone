function Prime() {
  return (
    <div className=" flex items-center space-x-2">
      <picture className=" w-12">
        <source srcSet="/prime-tag.png" />
        <img loading="lazy" src="/prime-tag.png" alt="prime tag" />
      </picture>
      <p className=" text-xs text-gray-500">FREE Next-day Delivery</p>
    </div>
  );
}

export default Prime;
