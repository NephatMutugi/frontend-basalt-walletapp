import React, { useEffect, useState } from "react";
import { TransactionHistoryResponse, useGetTransactionHistoryQuery } from "../services/generated";

type Props = {
  accountId: string;
};

const TransactionList: React.FC<Props> = ({ accountId }) => {
  // State to store transaction history
  const [transactionHistory, setTransactionHistory] =
    useState<TransactionHistoryResponse>([]);

  // Query to fetch transaction history
  const {
    data: historyData,
    error,
    isLoading,
  } = useGetTransactionHistoryQuery({ accountId });

  // Update transaction history when data changes
  useEffect(() => {
    if (historyData) {
      setTransactionHistory(historyData);
    }
  }, [historyData]);

  return (
    <div>
      <h2>Transaction History</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {transactionHistory.map((transaction) => (
        <div key={transaction.id}>
          <p>Transaction ID: {transaction.id}</p>
          <p>Account: {transaction.account}</p>
          <p>Type: {transaction.type}</p>
          <p>Amount: {transaction.amount}</p>
          <p>Currency Code: {transaction.currencyCode}</p>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
