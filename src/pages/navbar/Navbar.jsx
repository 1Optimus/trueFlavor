import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../App";
import "./navbar.css";
import Cancelar from "../../assets/cancelar.png";
import Menu from "../../assets/lista.png";
import TrueFlavor from "../../assets/true flavor.png";
import MainMenu from "../../assets/menu.png";
import Cookies from "../../assets/cookies.png";
import Donas from "../../assets/donas.png";
import Drinks from "../../assets/drinks.png";
import Hamburger from "../../assets/hamburger.png";
import MiniCart from "../../assets/minicart.png";
import Logout from "../../assets/logout.png";
import { logOutUser } from "../functions";

function Navbar() {
  const [user, setUser] = useContext(Context);
  const [nav, setNav] = useState(false); //to detect mobile menu
  const navigate = useNavigate();
  const handleClick = () => setNav(!nav);

  const toLogOut = () => {
    try {
      logOutUser(user.mode);
      setUser({
        name: "",
        isSigned: false,
        mode: false,
        email: "",
      });
      navigate("/");
    } catch (error) {
      alert("Couldn't log out: ");
      console.log(error);
    }
  };

  return (
    <nav className="flex justify-between p-4 items-center nav font-[Poppins]">
      <img className="h-16 w-25 rounded-lg" color="white" src={TrueFlavor} />
      <ul className="hidden  md:flex gap-6">
        <NavLink
          className="menu py-3"
          to="/menu/specials"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "gold" : "",
          })}
        >
          <li>
            <img className="h-16 w-16" src={MainMenu} />
          </li>
        </NavLink>
        <NavLink
          className="menu py-3"
          to="/menu/Donas"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "gold" : "",
          })}
        >
          <li>
            <img className="h-16 w-16" src={Donas} />
          </li>
        </NavLink>
        <NavLink
          className="menu py-3"
          to="/menu/Cookies"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "gold" : "",
          })}
        >
          <li>
            <img className="h-16 w-16" src={Cookies} />
          </li>
        </NavLink>
        <NavLink
          className="menu py-3"
          to="/menu/Drinks"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "gold" : "",
          })}
        >
          <li>
            <img className="h-16 w-16" src={Drinks} />
          </li>
        </NavLink>
        <NavLink
          className="menu py-3"
          to="/menu/Hamburger"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "gold" : "",
          })}
        >
          <li>
            <img className="h-16 w-16" src={Hamburger} />
          </li>
        </NavLink>
        <NavLink
          className="menu py-3"
          to="/cart"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "gold" : "",
          })}
        >
          <li>
            <img className="h-16 w-16" src={MiniCart} />
          </li>
        </NavLink>
        {user.isSigned == false ? (
          <Link
            className="bg-orange-300 text-white font-[Poppins] duration-500 px-6 mx-4 hover:bg-orange-500 rounded py-3 flex items-center justify-center"
            to="/login"
          >
            Login
          </Link>
        ) : (
          <Link
            className="menu bg-orange-300 text-white font-[Poppins] duration-500 px-6 mx-4 hover:bg-orange-500 rounded py-3 flex items-center justify-center"
            to="/home"
          >
            <img
              className="h-16 w-25"
              onClick={() => toLogOut()}
              src={Logout}
            />
          </Link>
        )}
      </ul>

      <div className=" md:hidden z-10" onClick={handleClick}>
        {nav ? (
          <img className="h-8 w-8" color="white" src={Cancelar} />
        ) : (
          <img className="h-8 w-8" src={Menu} />
        )}
      </div>

      <ul
        className={`${
          nav
            ? "text-white opacity-100 transform translate-x-0 z-50" // Add z-index: 50
            : "opacity-0 transform -translate-y-full"
        } transition-transform absolute top-0 left-0 w-full h-screen bg-zinc-800/80 flex flex-col justify-center items-center text-2xl`}
        onClick={() => setNav(false)}
      >
        <Link className="menu py-3" to="/menu">
          <li>
            <img className="h-16 w-25" src={MainMenu} />
          </li>
        </Link>
        <Link className="menu py-3" to="/menu/Donas">
          <li>
            <img className="h-16 w-25" src={Donas} />
          </li>
        </Link>
        <Link className="menu py-3" to="/menu/Cookies">
          <li>
            <img className="h-16 w-25" src={Cookies} />
          </li>
        </Link>
        <Link className="menu py-3" to="/menu/Drinks">
          <li>
            <img className="h-16 w-25" src={Drinks} />
          </li>
        </Link>
        <Link className="menu py-3" to="/menu/Hamburger">
          <li>
            <img className="h-16 w-25" src={Hamburger} />
          </li>
        </Link>
        <Link className="menu py-3" to="/cart">
          <li>
            <img className="h-16 w-25" src={MiniCart} />
          </li>
        </Link>
        {user.isSigned == false ? (
          <Link
            className="bg-orange-300 text-white font-[Poppins] duration-500 px-6 mx-4 hover:bg-orange-500 rounded py-3 flex items-center justify-center"
            to="/login"
          >
            Login
          </Link>
        ) : (
          <Link
            className="bg-orange-300 text-white font-[Poppins] duration-500 px-6 mx-4 hover:bg-orange-500 rounded py-3 flex items-center justify-center"
            to="/home"
          >
            <img
              className="h-16 w-25"
              onClick={() => toLogOut()}
              src={Logout}
            />
          </Link>
        )}
      </ul>
    </nav>
  );
}
export default Navbar;
