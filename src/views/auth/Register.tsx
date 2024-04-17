import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { RegisterUserRequest, usePostRegisterMutation } from "../../services/generated";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function RegisterForm() {
  const navigate = useNavigate();


  const [formDetails, setFormDetails] = useState<RegisterUserRequest>({
    username: "",
    passwordHash: "",
    email: "",
    fullName: "",
    phoneNumber: "",
    dateOfBirth: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });



  const [postRegister, { isLoading }] = usePostRegisterMutation();

  const handleRegister = async () => {
    // Clear previous validation errors

    try {
      await postRegister(formDetails).unwrap();

      setFormDetails({
        username: "",
        passwordHash: "",
        email: "",
        fullName: "",
        phoneNumber: "",
        dateOfBirth: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      });

      navigate("/activate");
    } catch (error: unknown) {
      toast.error(error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };



  return (
    <>
      {isLoading && <Spinner />}
      <div className="flex flex-row h-full w-full">
        <div className="bg-blue flex flex-col py-4 md:py-0 box-border items-center justify-center w-full md:w-1/2">
          <div className="bg-white md:py-10 py-4 w-full md:h-full md:mt-0 rounded-[30px] md:rounded-none flex flex-col items-center justify-center">
            <div className="flex flex-col w-[80%] md:w-[60%] mx-auto ">
              {/* Your form inputs */}
              <input
                type="text"
                id="username"
                placeholder="Enter your Username"
                value={formDetails.username}
                onChange={handleInputChange}
                className="rounded-md mb-3 bg-inputColor border-none h-12"
              />
              <input
                type="text"
                id="email"
                placeholder="Enter your Username"
                value={formDetails.email}
                onChange={handleInputChange}
                className="rounded-md mb-3 bg-inputColor border-none h-12"
              />
              <input
                type="text"
                id="fullName"
                placeholder="Enter your Full Name"
                value={formDetails.fullName}
                onChange={handleInputChange}
                className="rounded-md mb-3 bg-inputColor border-none h-12"
              />
              <input
                type="number"
                id="phoneNumber"
                placeholder="Enter your phoneNumber"
                value={formDetails.phoneNumber}
                onChange={handleInputChange}
                className="rounded-md mb-3 bg-inputColor border-none h-12"
              />
              <input
                type="date"
                id="dateOfBirth"
                placeholder="Enter your D.O.B"
                value={formDetails.dateOfBirth}
                onChange={handleInputChange}
                className="rounded-md mb-3 bg-inputColor border-none h-12"
              />
              <input
                type="text"
                id="street"
                placeholder="Enter your streetname"
                value={formDetails.street}
                onChange={handleInputChange}
                className="rounded-md mb-3 bg-inputColor border-none h-12"
              />
              <input
                type="text"
                id="city"
                placeholder="Enter your city"
                value={formDetails.city}
                onChange={handleInputChange}
                className="rounded-md mb-3 bg-inputColor border-none h-12"
              />
              <input
                type="text"
                id="state"
                placeholder="Enter your state"
                value={formDetails.state}
                onChange={handleInputChange}
                className="rounded-md mb-3 bg-inputColor border-none h-12"
              />

              <input
                type="number"
                id="postalCode"
                placeholder="Enter your Postal Code"
                value={formDetails.postalCode}
                onChange={handleInputChange}
                className="rounded-md mb-3 bg-inputColor border-none h-12"
              />
              <input
                type="text"
                id="country"
                placeholder="Enter your country"
                value={formDetails.country}
                onChange={handleInputChange}
                className="rounded-md mb-3 bg-inputColor border-none h-12"
              />

              <input
                type="password"
                id="username"
                placeholder="Enter your Password"
                value={formDetails.passwordHash}
                onChange={handleInputChange}
                className="rounded-md mb-3 bg-inputColor border-none h-12"
              />
              <input
                type="text"
                id="username"
                placeholder="Confirm your Password"
                value={formDetails.passwordHash}
                onChange={handleInputChange}
                className="rounded-md mb-3 bg-inputColor border-none h-12"
              />
              {/* Other form inputs */}
              <button
                className="h-12 bg-green border-green rounded-md w-[100%] text-xl mt-6 mb-3 text-white "
                onClick={handleRegister}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
