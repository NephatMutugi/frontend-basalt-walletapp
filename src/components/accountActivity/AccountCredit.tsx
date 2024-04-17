import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usePostTransactionMutation } from "src/services/apiServices"; // Import the mutation hook

const AccountCredit = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [postTransactionMutation] = usePostTransactionMutation(); // Use the mutation hook

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCredit = async () => {
    if (!amount) {
      toast.error("Please enter the amount to credit.");
      return;
    }

    try {
      const response = await postTransactionMutation({
        // Call the mutation with the transaction data
        accountId: "your_account_id_here", // Replace with actual account ID
        type: "credit", // Specify the transaction type
        amount: parseFloat(amount), // Convert amount to float
      });

      if (response.data?.header?.responseCode === "200") {
        toast.success("Account credited successfully.");
        navigate("/dashboard"); // Redirect to dashboard or appropriate page
      } else {
        toast.error("Failed to credit account. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred while crediting account:", error);
      toast.error("Failed to credit account. Please try again.");
    }
  };

  return (
    <div>
      <h2>Account Credit</h2>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
        />
      </div>
      <button onClick={handleCredit}>Credit Account</button>
    </div>
  );
};

export default AccountCredit;
