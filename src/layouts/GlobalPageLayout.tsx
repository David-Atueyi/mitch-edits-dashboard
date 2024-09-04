import { Link, Outlet, useLocation } from "react-router-dom";
import { GeneralHeaderLayout } from "../components/Global/Layout/GeneralHeaderLayout";
import { Toaster } from "sonner";

export const GlobalPageLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="min-w-[320px] font-montserratFont">
      <GeneralHeaderLayout />
      <div className="text-white grid grid-cols-1 pc:grid-cols-4 mediumPc:grid-cols-5 h-[100dvh] max-w-[2000px] m-auto">
        <div className="bg-zinc-900 mobile:hidden pc:block">
          <div className="w-full flex justify-center items-center gap-2 py-7 mt-1 text-white">
            <div className="w-9 h-9">
              <img
                src="/image/mitchLogo.jpg"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="tracking-wider font-bold">MitchEdits</span>
          </div>
          <div className="flex flex-col gap-4 mt-5">
            <Link
              to={"/home"}
              className={`font-bold rounded-none p-5 ${
                currentPath === "/home" ? "bg-[#38b6ff]" : "bg-zinc-900"
              } justify-normal`}
            >
              Manage Projects
            </Link>
            <Link
              to={"/home/add-project"}
              className={`font-bold rounded-none p-5 ${
                currentPath === "/home/add-project"
                  ? "bg-[#38b6ff]"
                  : "bg-zinc-900"
              } justify-normal`}
            >
              Add Project
            </Link>
            <Link
              to={"client-table"}
              className={`font-bold rounded-none p-5 ${
                currentPath === "/home/client-table"
                  ? "bg-[#38b6ff]"
                  : "bg-zinc-900"
              } justify-normal`}
            >
              Manage Clients
            </Link>
            <Link
              to={"add-client"}
              className={`font-bold rounded-none p-5 ${
                currentPath === "/home/add-client"
                  ? "bg-[#38b6ff]"
                  : "bg-zinc-900"
              } justify-normal`}
            >
              Add Client
            </Link>
          </div>
        </div>
        <>
          <Outlet />
        </>
      </div>
      <Toaster closeButton={true} richColors />
    </div>
  );
};
