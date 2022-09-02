function Prime() {
  return (
    <div className=" flex items-center space-x-2">
      <picture>
        {/* <source srcSet="/prime-tag.png" /> */}
        <img
          className=" h-8"
          loading="lazy"
          src="/prime-tag.png"
          alt="prime tag"
        />
      </picture>
      <p className=" text-xs text-gray-500">FREE Next-day Delivery</p>
    </div>
  );
}

export default Prime;
