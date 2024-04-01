import { useState, createContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { updateMode, getMode } from "./pages/functions";
export const Context = createContext();
import "./App.css";
import Sun from "./assets/soleado.png";
import Moon from "./assets/luna.png";
import Specials from "./pages/Specials/Specials";
import Cart from "./pages/cart/Cart";
import Navbar from "./pages/navbar/Navbar";
import Login from "./pages/Login/Login";

function App() {
  const existentUSer = getMode();
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    mode: false,
    isSigned: false,
    products: {},
  });

  const toggleDarkMode = () => {
    try {
      updateMode(user);
    } catch (error) {
      console.log("error saving mode", error);
    } finally {
      setDarkMode(!darkMode);
      setUser({ ...user, mode: !darkMode });
    }
  };
  useEffect(() => {
    if (existentUSer !== null) setUser(existentUSer);
    try {
      setDarkMode(existentUSer?.mode == null ? false : existentUSer.mode);
    } catch (error) {
      console.log("error obtaining mode", error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Context.Provider value={[user, setUser]}>
      <div
        id="Allbody"
        className={`${darkMode && "dark"} `}
        style={{
          backgroundImage: darkMode
            ? "linear-gradient(to bottom, #FF9800, #181818)"
            : "linear-gradient(to bottom, #FFFFFF, #BDBDBD)",
        }}
      >
        <Navbar />
        <Routes>          
          <Route path="/menu/:id" element={<Specials />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Specials />} />
        </Routes>
        <button
          title="mode"
          className="absolute w-16 bottom-4 left-0 md:bottom-16 md:left-16"
          onClick={toggleDarkMode}
        >
          <img className="h-8 w-8" src={`${darkMode ? Sun : Moon}`} />
        </button>
      </div>
    </Context.Provider>
  );
}

export default App;
