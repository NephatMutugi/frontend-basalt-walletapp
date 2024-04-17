import { Outlet } from "react-router-dom";
import { useState } from "react";
import MainNavigation from "./Navbar";
import SideNavbar from "./SideNavbar";

const DashboardLayout = () => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  return (
    <div className="flex flex-row w-full">
      <div className=" transition-all duration-500 ease-in-out">
        <SideNavbar
        //   isMenuToggled={isMenuToggled}
        //   setIsMenuToggled={setIsMenuToggled}
        />
      </div>

      <div className="flex flex-col w-[100%]  md:ml-[340px]">
        <MainNavigation
          isMenuToggled={isMenuToggled}
          setIsMenuToggled={setIsMenuToggled}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
