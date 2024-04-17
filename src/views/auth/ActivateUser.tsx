import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { usePostActivateMutation } from "../../services/generated";

const Activate: FunctionComponent = () => {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => state.userLogin);
  const [formState, setFormState] = useState({
    code: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [postActivate] = usePostActivateMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await postActivate({
        activateUserRequest: {
          userId: userInfo?.id,
          activationCode: formState.code,
        },
      });
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to activate account. Please try again." || error);
    }
  };

  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <>
      <div className="flex flex-row h-[100vh] w-full">
        {isLoading && <Spinner />}

        <div className="bg-blue flex flex-col py-4 md:py-0 box-border items-center justify-center w-full md:w-1/2 h-full ">

          <div className="bg-white md:py-0 py-4 w-full md:h-full md:mt-0 rounded-[30px] md:rounded-none ">
            <div className="flex flex-col w-[80%] md:w-[60%] mx-auto h-full justify-center">
              <div className="mt-2">
                <p className="text-green text-3xl font-bold">
                  Activate your account
                </p>
                <p className="font-medium mt-2">
                  New to Payd?
                  <a href="/" className="text-newColor ml-2">
                    Create Account
                  </a>
                </p>
              </div>

              <div className="flex flex-col mt-10 gap-2">
                <label htmlFor="code" className="">
                  Activation Code
                </label>
                <input
                  className="rounded-md border mb-3 bg-inputColor border-none h-12"
                  type="text"
                  placeholder="Activate Code"
                  name="code"
                  value={formState.code}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-row gap-2 mt-7">
                <p className="font-sans text-black text-center">
                  Not received code?
                </p>
                <button
                  type="button"
                  className="[text-decoration:none] text-newColor text-center"
                  disabled={seconds > 0}
                >
                  {seconds > 0 ? `Resend in ${seconds}s` : "Resend"}
                </button>
              </div>
              <div className="">
                <button
                  className="h-12 bg-green border-green rounded-md w-[100%] text-xl mt-6 mb-3 text-white"
                  type="submit"
                  onClick={handleSubmit}
                >
                  <p className="">Activate Account</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center bg-blue w-1/2 h-[100vh]">
          <img src={logo} className="" alt="my logo" />
        </div>
      </div>
    </>
  );
};

export default Activate;
