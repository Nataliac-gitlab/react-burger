import { useLocation } from "react-router-dom";
export const useGetIsUserFeed = () => {
  const location = useLocation();
  return location.pathname.includes("/profile/orders");
};
