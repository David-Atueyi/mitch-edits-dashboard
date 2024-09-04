import { Outlet } from "react-router-dom";
import { Header } from "../components/Pages/Auth/Layout/Header";
import { Footer } from "../components/Pages/Auth/Layout/Footer";
import { Toaster } from "sonner";

export const GlobalAuthPageLayout = () => {
  return (
    <div className="min-w-[320px] flex flex-col font-montserratFont justify-center items-center min-h-[100dvh] ">
      <Header />
      <main className="flex-1 mobile:w-full tablet:w-[430px] px-5">
        <Outlet />
      </main>
      <Footer />
      <Toaster closeButton={true} richColors />
    </div>
  );
};
