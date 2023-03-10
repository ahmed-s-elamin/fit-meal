import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");

    window.localStorage.removeItem("userID");
    toast.success("logged out");
    navigate("/");
  };
  return (
    <div className="navbar">
      <Link to="/"> Home</Link>
      <Link to="/create-recipe"> Create Recipe</Link>
      {!cookies.access_token ? (
        <>
          <Link to="/register"> Register</Link>
          <Link to="/login"> Login</Link>
        </>
      ) : (
        <>
          <Link to="/saved-recipes"> Saved Recipes</Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};
