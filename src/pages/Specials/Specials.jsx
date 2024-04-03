import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../App";
import { updateProducts } from "../functions";
import data from "./products.json";
import Delete from "../../assets/delete.png";
import More from "../../assets/more.png";
import Less from "../../assets/less.png";
//just for now everything is in the same file, the range is this one: 1-20 donuts, 21-40 food, 41-60 drinks
function Specials() {
  const [user, setUser] = useContext(Context);
  const [filteredProducts, setfilteredProducts] = useState(data);
  const [showAdded, setShowAdded] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  //diferents types of products
  const donuts = data.filter((product) => product.id >= 1 && product.id <= 10);
  const cookies = data.filter((product) => product.id >= 11 && product.id <= 20);
  const drinks = data.filter((product) => product.id >= 21 && product.id <= 30);
  const hamburger = data.filter((product) => product.id >= 31 && product.id <= 40);
  const specials = data.filter((product) => product.id % 2);
  const { id } = useParams();

  const addProduct = (idProduct) => {
    let currentProduct = {};
    let trigger = 0;
    if (user.products != false) {
      currentProduct = user.products;
    }
    for (const property in currentProduct) {
      if (idProduct == property) {
        trigger = 1;
        currentProduct[property] = currentProduct[property] + 1;
      }
    }
    if (trigger == 0) {
      Object.assign(currentProduct, { [idProduct]: 1 });
    }
    setUser({
      ...user,
      products: currentProduct,
    });
    updateProducts(user);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };
  const lessProduct = (idProduct) => {
    let auxProduct = user.products;
    for (const current in user.products) {
      if (idProduct == current) {
        if (auxProduct[idProduct] != 1) {
          auxProduct[idProduct] = auxProduct[idProduct] - 1;
          break;
        } else {
          delete auxProduct[current];
          setShowDeleted(true);
          setTimeout(() => setShowDeleted(false), 2000);
          break;
        }
      }
    }
    setUser({
      ...user,
      products: auxProduct,
    });
    updateProducts(user);
  };
  const deleteProduct = (idProduct) => {
    let auxProduct = user.products;
    for (const current in user.products) {
      if (idProduct == current) {
        delete auxProduct[current];
        break;
      }
    }
    setUser({
      ...user,
      products: auxProduct,
    });
    updateProducts(user);
    setShowDeleted(true);
    setTimeout(() => setShowDeleted(false), 2000);
  };

  useEffect(() => {
    if (id == "Donas") {
      setfilteredProducts(donuts);
    }
    if (id == "Cookies") {
      setfilteredProducts(cookies);
    }
    if (id == "Drinks") {
      setfilteredProducts(drinks);
    }
    if (id == "Hamburger") {
      setfilteredProducts(hamburger);
    }
    if (id == "specials") {
      setfilteredProducts(specials);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div className="flex flex-row">
      <article className="basis-full md:basis-4/5">
        <div className="flex flex-wrap gap-2 justify-center">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="max-w-96 basis-full md:basis-1/3 lg:basis-1/4 group relative overflow-hidden rounded-[16px] bg-gray-200 dark:bg-amber-600 p-[2px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-green-500 hover:via-purple-50 hover:to-green-500"
            >
              <div className="group-hover:animate-spin-slow invisible absolute -top-20 -bottom-20 left-5 right-5 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible"></div>
              <div className="relative rounded-[15px] bg-white dark:bg-amber-600 p-2 flex flex-col items-center ">
                <img
                  className="w-56 h-56 object-contain"
                  src={product.image}
                  alt="product"
                />
                <div className="flex flex-col w-full">
                  <p className="dark:text-white font-sans text-lg md:text-xl font-bold text-center">
                    {product.name}
                  </p>
                  <p className="text-amber-400 font-sans text-lg md:text-2xl font-bold py-1">
                    {`$${product.price}`}
                  </p>
                  <button
                    className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                    data-ripple-light="true"
                    onClick={() => addProduct(product.id)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>

      <aside className="hidden flex-col md:block basis-1/5 m-2 p-2 border-gray-500/25 dark:border-gray-200/25 rounded-2xl border-solid border-2 divide-y-4 divide-lime-600 dark:divide-green-400 ">
        {Object.keys(user.products).map((productId) => {
          return (
            <div
              className="flex flex-col justify-items-center py-3"
              key={productId}
            >
              <img
                src={data[productId - 1].image}
                alt="product"
                className="w-56 h-56 object-contain place-self-center"
              />
              <div className="flex justify-around my-2">
                <a className="text-center dark:text-white font-sans text-lg md:text-2xl">
                  #{user.products[productId]}
                </a>
                <button className="">
                  <img
                    className="h-10 w-10"
                    src={More}
                    onClick={() => addProduct(productId)}
                  />
                </button>
                <button className="">
                  <img
                    className="h-10 w-10"
                    src={Less}
                    onClick={() => lessProduct(productId)}
                  />
                </button>
                <button className="hover:bg-rose-950 rounded-full">
                  <img
                    className="h-10 w-10"
                    src={Delete}
                    onClick={() => deleteProduct(productId)}
                  />
                </button>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center py-3">
          <a
            className="group inline-block rounded-full bg-gradient-to-r from-blue-500 via-green-300 to-green-500 p-[2px] focus:outline-none focus:ring active:text-opacity-75"
            href="#"
          >
            <span className="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
              Go to cart
            </span>
          </a>
        </div>
      </aside>

      {showAdded && (
        <div className="bg-green-200/60 backdrop-blur-xl z-20 max-w-md absolute right-5 top-15 rounded-lg p-6 shadow">
          <h1 className="text-xl text-slate-700 font-medium">Product added!</h1>
          <div className="flex justify-between items-center"></div>
        </div>
      )}
      {showDeleted && (
        <div className="bg-red-200/60 backdrop-blur-xl z-20 max-w-md absolute right-5 top-15 rounded-lg p-6 shadow">
          <h1 className="text-xl text-slate-700 font-medium">
            Product deleted!
          </h1>
          <div className="flex justify-between items-center"></div>
        </div>
      )}
    </div>
  );
}
export default Specials;
/*

   <div className="rounded-xl py-3 px-3 basis-full md:basis-1/3">
            <img
              src="https://media.istockphoto.com/id/1467339432/video/retro-buffering-circular-loading-bar-rotating-on-black-background.jpg?s=640x640&k=20&c=jOF3pEBv3EaXlgPHoa8CsOwOIg9gBNEPrXztQ_PXidQ="
              alt="product"
            />
            <div className="flex flex-col p-1 md:p-2">
              <p className="dark:text-white font-sans text-base md:text-xl font-bold text-center">
                Pudin
              </p>
              <p className="text-amber-400 font-sans text-base md:text-2xl font-bold py-1">
                Pudin
              </p>
              <button
                className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                Button
              </button>
            </div>
          </div>
                  <div className="flex flex-col justify-items-center py-3">
          <img
            src="https://media.istockphoto.com/id/1467339432/video/retro-buffering-circular-loading-bar-rotating-on-black-background.jpg?s=640x640&k=20&c=jOF3pEBv3EaXlgPHoa8CsOwOIg9gBNEPrXztQ_PXidQ="
            alt="product"
            className="box-content w-9/12 place-self-center"
          />
          <div className="flex justify-around my-2">
            <a className="text-center dark:text-white font-sans text-lg md:text-2xl">
              #
            </a>
            <button className="hover:bg-amber-500 rounded-full">
              <img className="h-10 w-10" src={More} />
            </button>
            <button className="hover:bg-amber-500 rounded-full">
              <img className="h-10 w-10" src={Less} />
            </button>
            <button className="hover:bg-rose-950 rounded-full">
              <img className="h-10 w-10" src={Delete} />
            </button>
          </div>
        </div>

*/
