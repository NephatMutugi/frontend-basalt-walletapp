import React from 'react'
import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetTransactionHistoryQuery, usePostActivateMutation } from '../../services/generated';


type Props = {
  accountId: string; // Assuming you pass the accountId as props
};

const AccountDebit: FunctionComponent<Props> = ({ accountId }) => {
  const navigate = useNavigate();
  const [debitAmount, setDebitAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [postActivateMutation] = usePostActivateMutation();
  const {
    data: transactionHistory,
    isLoading,
    isError,
  } = useGetTransactionHistoryQuery({ accountId });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch transaction history.");
    }
  }, [isError]);

  const handleDebit = async () => {
    if (!debitAmount) {
      toast.error("Please enter the debit amount.");
      return;
    }

    try {
      setIsSubmitting(true);
      // Perform the debit transaction
      const response = await postActivateMutation({
        activateUserRequest: {
          userId: accountId, // Assuming accountId is the user ID
          amount: parseFloat(debitAmount),
          transactionType: "debit", // Assuming debit transaction type
        },
      });

      if (response.data?.header?.responseCode === "200") {
        toast.success("Debit transaction successful.");
        // Optionally, you can navigate the user to another page upon successful transaction
        // navigate("/dashboard");
      } else {
        toast.error("Failed to perform debit transaction.");
      }
    } catch (error) {
      console.error("Error occurred during debit transaction:", error);
      toast.error("Failed to perform debit transaction.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Account Debit</h2>
      <div>
        <label htmlFor="debitAmount">Debit Amount:</label>
        <input
          type="number"
          id="debitAmount"
          value={debitAmount}
          onChange={(e) => setDebitAmount(e.target.value)}
        />
      </div>
      <button onClick={handleDebit} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Debit"}
      </button>
      <div>
        {/* Display transaction history */}
        {isLoading ? (
          <p>Loading transaction history...</p>
        ) : (
          <ul>
            {transactionHistory?.map((transaction) => (
              <li key={transaction.id}>
                Transaction ID: {transaction.id}, Amount: {transaction.amount},
                Type: {transaction.type}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AccountDebit;
