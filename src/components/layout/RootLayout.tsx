import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function Root() {
  return (
    <div className="bg-gradient-to-b from-sky-300 via-sky-100 to-white bg-fixed relative flex min-h-screen items-center justify-center px-4 py-10">
      <Outlet />
      <Toaster richColors />
    </div>
  );
}
