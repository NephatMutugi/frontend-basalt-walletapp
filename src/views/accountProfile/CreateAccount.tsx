import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usePostRegisterMutation } from "../../services/generated";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    // Add other fields as needed
  });

  const [postRegisterMutation, { isLoading }] = usePostRegisterMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postRegisterMutation({
        registerUserRequest: formState,
      });
      if (response.data && response.data.header?.responseCode === "200") {
        // Registration successful
        toast.success("Account created successfully");
        navigate("/login");
      } else {
        // Registration failed
        toast.error("Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred during account creation:", error);
      toast.error("Failed to create account. Please try again."|| error);
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
          />
        </div>
        {/* Add other fields for account creation */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
