import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MenuBarIcon } from "../icons/MenuBarIcon";
import { CancelIcon } from "../icons/CancelIcon";

export const GeneralHeaderLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [dropDownVisible, setDropDownVisible] = useState<Boolean>(false);

  const handleDropDown = () => {
    setDropDownVisible(!dropDownVisible);
  };

  useEffect(() => {
    const handleOverflow = () => {
      if (window.innerWidth <= 765) {
        if (dropDownVisible) {
          document.body.classList.add("overflow-hidden");
        } else {
          document.body.classList.remove("overflow-hidden");
        }
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    };

    handleOverflow();
    window.addEventListener("resize", handleOverflow);

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("resize", handleOverflow);
    };
  }, [dropDownVisible]);

  return (
    <div className="bg-black sticky top-0 z-50 pc:hidden">
      <header className="text-white flex items-center justify-between p-6 pc:pt-10 relative max-w-[1200px] m-auto">
        <Link
          to={"/home"}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-bold flex items-center gap-2"
        >
          <div className="w-8 h-8">
            <img
              src="/image/mitchLogo.jpg"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="tracking-wider">MitchEdits</span>
        </Link>

        <div className="block mediumPc:hidden">
          <button
            onClick={handleDropDown}
            className="text-white focus:outline-none"
          >
            <MenuBarIcon className="w-5 h-5 stroke-white" />
          </button>
        </div>
      </header>
      <div
        className={`${
          !dropDownVisible ? "hidden" : "flex"
        } mediumPc:hidden absolute top-0 left-0 w-full h-[100dvh] bg-black/90 flex-col z-20`}
        onClick={handleDropDown}
      >
        <div
          onClick={handleDropDown}
          className=" w-fit place-content-end place-self-end mt-6 mx-5"
        >
          <CancelIcon className="stroke-white w-6 h-6" />
        </div>
        <div className="text-white flex flex-col justify-center items-center h-full gap-6 px-5 py-5 text-center">
          <Link
            to={"/home"}
            className={`font-bold w-full rounded-none p-5 ${
              currentPath === "/home" ? "text-[#38b6ff]" : "text-white"
            } justify-normal`}
          >
            Manage Projects
          </Link><Link
            to={"/home/add-project"}
            className={`font-bold w-full rounded-none p-5 ${
              currentPath === "/home/add-project" ? "text-[#38b6ff]" : "text-white"
            } justify-normal`}
          >
           Add Project
          </Link>
          <Link
            to={"client-table"}
            className={`font-bold w-full rounded-none p-5 ${
              currentPath === "/home/client-table"
                ? "text-[#38b6ff]"
                : "text-white"
            } justify-normal`}
          >
            Manage Clients
          </Link>
          <Link
            to={"add-client"}
            className={`font-bold w-full rounded-none p-5 ${
              currentPath === "/home/add-client"
                ? "text-[#38b6ff]"
                : "text-white"
            } justify-normal`}
          >
            Add Client
          </Link>
        </div>
      </div>
    </div>
  );
};
