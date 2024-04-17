import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/store";
import { toast } from "react-toastify";
import { usePostRegisterMutation } from "../../services/generated";

type Props = {};

const UpdateAccountDetails: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    // Add other fields as needed
  });

  const { loading } = useAppSelector((state) => state.someSlice); // Replace someSlice with your relevant slice

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Dispatch your thunk action here
      // Replace 'updateAccount' with your actual action creator function
      // You may need to adjust the payload and API call according to your specific API requirements
      // dispatch(updateAccount(formData));

      // Example using usePostRegisterMutation
      // Replace 'postRegisterMutation' with the appropriate mutation hook and 'registerUserRequest' with the correct payload structure
      const response = await usePostRegisterMutation({
        registerUserRequest: formData,
      });

      // Handle response
      if (response.data && response.data.header?.responseCode === "200") {
        // Account updated successfully
        toast.success("Account updated successfully");
        // Redirect or perform any additional actions
      } else {
        // Handle unsuccessful response
        toast.error("Failed to update account. Please try again.");
      }
    } catch (error) {
      // Handle error
      console.error("Error updating account:", error);
      toast.error("Failed to update account. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {/* Add other input fields */}
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Account"}
        </button>
      </form>
    </div>
  );
};

export default UpdateAccountDetails;
