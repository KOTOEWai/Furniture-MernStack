import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "sonner";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useGetCurrentUserQuery } from "@/api/UserApi";
import { useAppDispatch } from "@/hooks/redux";
import { setUser, clearUser } from "@/store/slices/userSlice";

export default function RootLayout() {
  const dispatch = useAppDispatch();
  const wasLoggedIn = localStorage.getItem('wasLoggedIn') === 'true';

  // The query will automatically attempt silent refresh if accessToken is missing
  // as long as the backend provides a valid refresh token cookie.
  const { data, isSuccess, isError} = useGetCurrentUserQuery(undefined, {
    skip: !wasLoggedIn
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser({ user: data }));
    } else if (isError) {
      localStorage.removeItem('wasLoggedIn');
      dispatch(clearUser());
    }
  }, [isSuccess, data, isError, dispatch]);

  return (
    <div className="px-6 mx-auto max-w-7xl">
      <Toaster position="top-right" richColors />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
