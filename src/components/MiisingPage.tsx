import PopupWrapper from "./PopupWrapper";

function NotFound() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center items-center md:mt-52 md:ml-10">
          <PopupWrapper title={"Page Not Found"} path={"/"}>
            <div className="flex flex-col justify-center items-center mt-16 h-fit">
              <h1 className="text-9xl text-blue">404</h1>
              <p className="mt-16 mb-10 text-center">
                Oops! The page you are trying to access cannot be found
              </p>
            </div>
          </PopupWrapper>
        </div>
      </div>
    </>
  );
}

export default NotFound;
