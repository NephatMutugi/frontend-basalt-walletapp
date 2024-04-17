import React, { ReactNode } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface PopupWrapperProps {
  children: ReactNode;
  title: string;
  path: string;
}

const PopupWrapper: React.FC<PopupWrapperProps> = ({
  children,
  title,
  path,
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(path);
  };

  return (
    <>
      <div className="flex flex-col lg:w-5/12 lg:h-fit mt-[2rem] w-[90%]  bg-white rounded-xl">
        <div className="flex flex-col p-4  md:p-16">
          <span
            className="mb-4 gap-2 cursor-pointer text-[#000000] flex flex-row justify-start items-start"
            onClick={handleBackClick}
          >
            {" "}
            <MdArrowBackIosNew size={20} />
            Back
          </span>
          <h2 className="text-2xl text-center font-medium mb-4">{title}</h2>
          {children}
        </div>
      </div>
    </>
  );
};

export default PopupWrapper;
