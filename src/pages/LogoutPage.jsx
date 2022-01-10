import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const LogoutPage = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
  });

  return (
    <div className="text-center my-3">
      <Link to={"/"} className="my-3 color-yellow">
        <h5 className="color-yellow">Login?</h5>
      </Link>
      <h2 className="my-3"> Thank you ! You are logged out. </h2>
    </div>
  );
};

export default LogoutPage;
