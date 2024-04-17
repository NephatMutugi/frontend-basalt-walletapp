import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { usePostLoginMutation } from "../../services/generated";
import Spinner from "../../components/Spinner";

const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    identifier: "",
    password: "",
  });
  const [isFormStateValid, setIsFormStateValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [postLoginMutation] = usePostLoginMutation();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();

    setIsFormStateValid(trimmedValue !== "");
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: trimmedValue,
    }));
  };

  const handleSubmit = useCallback(async () => {
    if (isFormStateValid) {
      try {
        const response = await postLoginMutation({
          loginRequest: {
            username: formState.identifier,
            password: formState.password,
          },
        });

        if (response.data && response.data.header?.responseCode === "200") {
          // Successful login
          response.data.data?.token;
          navigate("/dashboard")
          // You can dispatch an action here to handle storing the token in the state
        } else {
          // Failed login
          toast.error("Failed to login. Please try again.");
        }
      } catch (error) {
        console.error("Error occurred while logging in:", error);
        toast.error("Failed to login. Please try again.");
      }
    } else {
      toast.error("Please fill in all fields.");
    }
  });


  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleSubmit]);

  return (
    <>
      <div className="flex flex-row h-[100vh] w-full">
        {isLoading && <Spinner />}

        <div className=" bg-blue flex flex-col py-4 md:py-0 box-border items-center justify-center w-full md:w-1/2 h-full ">
                   <div className=" bg-white md:py-0 py-4 w-full md:h-full md:mt-0 rounded-[30px] md:rounded-none ">
            <div className="flex flex-col w-[80%] md:w-[60%] mx-auto h-full justify-center">
              <div className="mt-2">
                <p className="text-green text-3xl font-bold">Welcome to Payd</p>
                <p className="mt-2 hidden md:block">
                  Securely access your account
                </p>
                <p className="font-medium mt-2">
                  New to Payd?
                  <a href="/register" className="text-newColor ml-2">
                    Create Account
                  </a>
                </p>
              </div>

              <div className="flex flex-col mt-3 gap-2">
                <label htmlFor="identifier" className="">
                  Username or Email
                </label>
                <input
                  className="rounded-md border mb-3 bg-inputColor border-none h-12"
                  type="text"
                  placeholder="Username or Email"
                  name="identifier"
                  value={formState.identifier}
                  onChange={handleInputChange}
                />
                <label htmlFor="password" className="">
                  Password
                </label>
                <div className="relative w-[100%] border-none rounded-md">
                  <input
                    className="w-full h-12 bg-inputColor border-none rounded-md"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={formState.password}
                    onChange={handleInputChange}
                    minLength={6}
                  />
                  <button
                    className="absolute inset-y-0 right-2 rounded-md flex items-center justify-center border-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible size={20} />
                    ) : (
                      <AiFillEye size={20} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-row gap-2 mt-7">
                <p className="font-sans text-black text-center">
                  Forgot Password?
                </p>
                <a
                  href="/forgot-password"
                  className="[text-decoration:none] text-newColor text-center"
                >
                  Reset Password
                </a>
              </div>
              <div className="">
                <button
                  className="h-12 bg-green border-green rounded-md w-[100%] text-xl mt-6 mb-3 text-white"
                  type="submit"
                  onClick={handleSubmit}
                >
                  <p className="">Sign in </p>
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

export default LoginPage;
