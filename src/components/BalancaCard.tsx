import React, { useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";


const BalanceCard: React.FC<BalanceCardProps> = ({ accountData }) => {
  const [isVisible, toggleVisibility] = useVisibility("visibility", false);
  const [profileName, setProfileName] = useState({
    first_name: "",
    full_name: "",
    last_name: "",
  });
  const { userInfo } = useAppSelector((state) => state.userLogin);
  const token = userInfo?.token;
  const authenticatedApiClient = APIClient(token, {});
  const userId = useAppSelector((state) => state.userLogin.userInfo?.user_id);

  const date = new Date();

  const currentHour = date.getHours();

  let greeting;

  if (currentHour >= 0 && currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const cardContainerStyles = {
    background: "linear-gradient(90deg, #18D26E 0%, #10263E 100%)",
    backdropFilter: "blur(15px)",
  };
  const fetchUserProfileData = async () => {
    try {
      const response = await authenticatedApiClient.get(`/users/${userId}`);
      const userProfileData = response.data;
      setProfileName({
        full_name: userProfileData.first_name + " " + userProfileData.last_name,
        first_name: userProfileData.first_name,
        last_name: userProfileData.last_name,
      });
    } catch (error) {
      handleErrorResponse(error);
    }
  };
  useEffect(() => {
    fetchUserProfileData();
  }, [userId]);

  return (
    <div
      className="rounded-xl box-border text-white border-[1px] border-solid border-green p-5 h-fit"
      style={cardContainerStyles}
    >
      {/* <img
      src={splashImage}
      alt="Background Image"
      className="absolute xsm:right-[0.01rem] xl:right-1 top-[10px] lg:h-52 xsm:h-[9.25rem] object-cover"
    />               */}
      <div className="relative z-10 flex flex-col space-y-12 md:space-y-16 xl:space-y-12">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col justify-start">
            <p className="xl:text-base lg:text-base sm:text-[12px] text-sm leading-5">
              {greeting}, <br />
            </p>
            <p className="relative text-left md:text-[1.5rem] xl:text-lg font-[700] sm:text-[12px] leading-5">
              {profileName.full_name}
            </p>
          </div>
          <img
            className="w-[auto] h-10 object-cover"
            alt="Payd Logo Blue Background"
            src={paydImage}
          />
        </div>

        <div className="flex flex-row justify-between items-end">
          <div className="flex flex-row gap-2">
            <div className="flex flex-col">
              <div className="relative font-medium md:text-[18px] text-[16px] sm:text-[12px] sm:text-sm text-sm md:mt-0 mt-12 leading-5">
                <span className="4xl: hidden">Available</span> Balance
              </div>
              {isVisible ? (
                <b className="relative md:text-[1.5rem] xl:text-lg font-[700] sm:text-[12px] leading-5">
                  {accountData.currency}{" "}
                  <span>{accountData.available_balance.toLocaleString()}</span>
                </b>
              ) : (
                <div className="text-md md:text-lg bg-gray opacity-60 flex justify-center">
                  XXXX
                </div>
              )}
            </div>
            <div className=" mt-12 md:mt-0 flex items-end">
              {isVisible ? (
                <IoEyeOutline
                  className="text-3xl cursor-pointer"
                  onClick={toggleVisibility}
                />
              ) : (
                <IoEyeOffOutline
                  className="text-3xl cursor-pointer ml-3"
                  onClick={toggleVisibility}
                />
              )}
            </div>
          </div>
          <div className="flex justify-end ">
            <p className="relative text-left md:text-[1.2rem] text-[15px]">
              @{userInfo?.username}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
