import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineBell, AiOutlineQuestion } from "react-icons/ai";
import proImage from "../../assets/profImage.jpg";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
interface NavbarProps {
  isMenuToggled: boolean;
  setIsMenuToggled(value: boolean): void;
}

function MainNavigation(props: NavbarProps) {
  const token = useSelector(
    (state: RootState) => state.userLogin.userInfo?.token
  );
  const navigate = useNavigate();

  const handleProfilePictureRouting = () => {
    navigate("my-account");
  };

  const location = useLocation();
  const { firstName, lastName, profilePhoto, isLoading } = useUserDetails();
  const name = firstName + " " + lastName;
  const getDetailtext = (): string => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/my-account":
        return "Account Information";
      case "/dashboard/kyc":
        return "KYC Verification";
      case "/dashboard/create-payment-page":
        return "Create Payment";
      case "/dashboard/generate-payment-link":
        return "Generate Payment link";
      case "/dashboard/generate-receipt":
        return "Payment Receipt";
      case "/dashboard/escrow-service":
        return "Escrow Service";
      case "/dashboard/transaction-history":
        return "View transaction history";
      case "/dashboard/deposit":
        return "Deposit";
      case "/dashboard/invoices":
        return "Invoices";
      case "/dashboard/invoices/new-invoice":
      //   return <Link
      //   to="/dashboard"
      //   className=" text-white text-2xl gap-6 flex flex-row"
      // >
      //   <svg
      //     xmlns="http://www.w3.org/2000/svg"
      //     className="h-8 w-8 mr-1"
      //     fill="none"
      //     viewBox="0 0 24 24"
      //     stroke="currentColor"
      //   >
      //     <path
      //       strokeLinecap="round"
      //       strokeLinejoin="round"
      //       strokeWidth={2}
      //       d="M15 19l-7-7 7-7"
      //     />
      //   </svg>
      //   <h2 className="font-[700] text-[1.4rem] ">Back to Dashboard</h2>
      // </Link>
      default:
        return "";
    }
  };

  const getInitials = (name: string) => {
    const names = name.split(" ");
    const initials = names.map((iterator) => iterator[0].toUpperCase());
    return initials.join("");
  };

  return (
    <>
      <div className="h-[12vh] bg-blue border-b border-b-gray sticky flex z-10 top-0">
        <div className=" flex flex-row items-center justify-between w-[90%] mx-auto">
          <div className="flex items-center md:gap-4 justify-center">
            <RxHamburgerMenu
              className="h-7 w-7 text-white cursor-pointer sm:h-4 sm:w-4 md:hidden"
              onClick={() => {
                props.setIsMenuToggled(!props.isMenuToggled);
              }}
            />
            <h2 className="text-white font-bold ml-2 md:text-2xl">
              {getDetailtext()}
            </h2>
          </div>

          <div className="flex flex-row items-center gap-4">
            <AiOutlineQuestion
              className="text-white h-8 w-8 border-2 border-green rounded p-1 "
              onClick={() => {
                window.open("https://mypayd.app/contact", "_blank");
              }}
            />
            <div
              onClick={handleProfilePictureRouting}
              className="flex items-center justify-center p-2 rounded-full cursor-pointer border-gray-200"
            >
              {!isLoading &&
                (profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt=""
                    height={60}
                    width={72}
                    className="object-cover border-2 border-green rounded-full h-12 w-12"
                  />
                ) : (
                  <div className="text-2xl md:block hidden text-white text-center">
                    {name ? getInitials(name) : ""}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainNavigation;
