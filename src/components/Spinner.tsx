const Spinner = () => {
  return (
    <div className="fixed left-0 top-0 z-50 block h-full w-full bg-white opacity-75">
      <span className="r-4 relative top-1/2 mx-auto my-0 block h-0 w-0 text-green-500 opacity-75">
        <div role="status">
          <img
            src="/images/spin.png"
            className="h-20 w-20 object-cover animate-spin"
            alt="spin"
          />
          <span className="sr-only">Loading...</span>
        </div>
      </span>
    </div>
  );
};

export default Spinner;
