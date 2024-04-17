
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import TransactionList from "../components/TransactionList";
import BalanceCard from "../components/BalancaCard";

const Dashboard = () => {
  // initialize reactive variables
  const navigate = useNavigate();
    const [transactionType, setTransactionType] = useState("recent");


     const handleTabClick = (tab: SetStateAction<string>) => {
       setActiveTab(tab);
       setTransactionType(tab);
     };

  return (
    <div className="bg-blue h-fit  p-4 ">
      
      <div className="flex flex-col-reverse md:flex-row lg:w-[100%] mx-auto mt-4">
        <div className="lg:w-full md:w-[60%] md:mt-0">
          <div className="w-[95%] mx-auto mt-5 md:lg-0">
            <div className="flex xsm:flex-row md:flex-row md:font-medium md:text-xl justify-evenly md:justify-between gap-4 mt-4">
              <Link
                to={"/dashboard/send"}
                className="w-[25%] sm:w-[22%] sm:border-solid sm:border-green sm:border-[1px] flex md:flex-row items-center hover:scale-105 duration-500 cursor-pointer ease-in-out transition-all justify-center p-2 md:gap-4 md:py-3 rounded-md xsm:flex-col xsm:py-0.5 xsm:pr-2 xsm:gap-0"
              >
                <span className="border-solid border-green border-[1px] p-2 rounded-lg sm:border-none sm:p-0">
                  <img
                    src="/images/send-new.png"
                    className="h-[40px] w-[40px] object-cover"
                  />
                </span>
                <span className="xsm:text-xs text-white lg:text-lg pt-1">
                  Send
                </span>
              </Link>
              <Link
                to="/dashboard/generate-payment-link"
                className="w-[25%] sm:w-[22%] sm:border-solid sm:border-green sm:border-[1px] flex md:flex-row items-center hover:scale-105 duration-500 cursor-pointer ease-in-out transition-all justify-center md:gap-4 md:py-3 rounded-md xsm:flex-col xsm:py-0 xsm:px-2 xsm:gap-0"
              >
                <span className="border-solid border-green border-[1px] p-2 rounded-lg sm:border-none sm:p-0">
                  <img
                    src="/images/request-new.png"
                    className="w-[40px] h-[40px] object-cover"
                  />
                </span>
                <span className="xsm:text-xs text-white pt-1 lg:text-lg">
                  Receive
                </span>
              </Link>
              <Link
                // onClick={handleMaintenance}
                to={"/dashboard/withdraw"}
                className="w-[25%] sm:w-[22%] sm:border-solid sm:border-green sm:border-[1px] flex md:flex-row items-center hover:scale-105 duration-500 cursor-pointer ease-in-out transition-all justify-center md:gap-4 md:py-3 rounded-md xsm:flex-col xsm:py-0 xsm:px-2 xsm:gap-0"
              >
                <span className="border-solid border-green border-[1px] p-2 rounded-lg sm:border-none sm:p-0">
                  <img
                    src="/images/withdraw-new.png"
                    className="w-[40px] h-[40px] object-cover"
                  />
                </span>
                <span className="xsm:text-xs text-white pt-1 lg:text-lg">
                  Withdraw
                </span>
              </Link>
              <Link
                className="w-[25%] sm:w-[22%] sm:border-solid sm:border-green sm:border-[1px] flex md:flex-row items-center hover:scale-105 duration-500 cursor-pointer ease-in-out transition-all justify-center md:gap-4 md:py-3 rounded-md xsm:flex-col xsm:py-0 xsm:gap-0"
                to={"/dashboard/deposit"}
              >
                <span className="border-solid border-green border-[1px] p-2 rounded-lg sm:border-none sm:p-0">
                  <img
                    src="/images/deposit-new.png"
                    className="w-[40px] h-[40px] object-cover"
                  />
                </span>
                <span className="xsm:text-xs text-white pt-1 sm:pt-0 lg:text-lg">
                  Deposit
                </span>
              </Link>
            </div>
            <div className="gap-3">
              <h2 className="text-white font-bold mt-6">Transaction Trend</h2>
              <div className="bg-white rounded-md mt-4">
              </div>
              <div className="mt-6">
                {transactionType === "recent" && <TransactionList accountId={""} />}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto md:w-[40%] md:mt-5 2xl:mt-5">
          <div className="w-[96%] mx-auto">
            BalanceCard
            {/* <BalanceCard accountData={accountData} /> */}
            <div className=" hidden md:block bg-green-dark max-h-fit box-border p-4 mt-4 rounded-t-xl">
              <h3 className="text-white text-xl font-semibold">
                Amount spent for previous months
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
