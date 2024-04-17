import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePostActivateMutation } from "../../services/generated";

const DeactivateAccount = () => {
  const navigate = useNavigate();
  const [postActivateMutation, { isLoading, isError, isSuccess }] =
    usePostActivateMutation();

  useEffect(() => {
    if (isError) {
      // Handle error, maybe show a toast or error message
      console.error("Failed to deactivate account");
    }
    if (isSuccess) {
      // Account deactivated successfully, navigate to a different page or show a success message
      console.log("Account deactivated successfully");
      navigate("/login"); // Example: Redirect to login page after deactivation
    }
  }, [isError, isSuccess, navigate]);

  const handleDeactivateAccount = async () => {
    try {
      // Make the API call to deactivate the account
      await postActivateMutation({
        activateUserRequest: {
          // You may need to provide the user ID and other necessary information
          // based on your API requirements
          // Example: userId: '123',
          // activationCode: 'your-activation-code',
          // transactionType: 'deactivate',
        },
      });
    } catch (error) {
      console.error("Error deactivating account:", error);
    }
  };

  return (
    <div>
      <h1>Deactivate Account</h1>
      <button onClick={handleDeactivateAccount} disabled={isLoading}>
        {isLoading ? "Deactivating..." : "Deactivate Account"}
      </button>
    </div>
  );
};

export default DeactivateAccount;
