import { useState, useContext, useEffect } from "react";
import { Context } from "../../App";
import { updateProducts } from "../functions";
import data from "../Specials/products.json";
import Delete from "../../assets/delete.png";
import More from "../../assets/more.png";
import Less from "../../assets/less.png";

function Cart() {
  const [user, setUser] = useContext(Context);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [end, setEnd] = useState(0);
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
  };
  const placeOrder = () => {
    setEnd(true);
    setTimeout(() => setEnd(false), 2000);
  };
  useEffect(() => {
    let tempTotal = 0;
    let tempQuantity = 0;
    for (const productId in user.products) {
      tempQuantity = user.products[productId] + tempQuantity;
      tempTotal =
        data[productId - 1].price * user.products[productId] + tempTotal;
    }
    setQuantity(tempQuantity);
    setTotal(tempTotal);
  }, [user]);
  return (
    <div className="flex flex-col md:flex-row dark:text-white font-sans text-lg font-bold text-center ">
      <article className="basis-full md:basis-2/6">
        <div className="flex flex-wrap md:flex-row gap-2 justify-center">
          {Object.keys(user.products).map((productId) => {
            return (
              <div
                key={productId}
                className="flex flex-col justify-items-center py-3 max-w-96 basis-full lg:basis-1/2 rounded-[16px] bg-gray-200 dark:bg-amber-600 p-[2px] "
              >
                <img
                  src={data[productId - 1].image}
                  alt="product"
                  className="w-56 h-56 object-contain place-self-center"
                />
                <p className="md:text-xl p-3">{data[productId - 1].name}</p>
                <p className="text-amber-400 md:text-2xl">
                  {`Total: $${
                    data[productId - 1].price * user.products[productId]
                  }`}
                </p>

                <div className="flex justify-around my-2">
                  <a className=" md:text-2xl">#{user.products[productId]}</a>
                  <button title="more">
                    <img
                      className="h-10 w-10"
                      src={More}
                      onClick={() => addProduct(productId)}
                    />
                  </button>
                  <button title="less">
                    <img
                      className="h-10 w-10"
                      src={Less}
                      onClick={() => lessProduct(productId)}
                    />
                  </button>
                  <button
                    title="delete"
                    className="hover:bg-rose-950 rounded-full"
                  >
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
        </div>
      </article>
      <article className="basis-full md:basis-2/6 flex-col m-2 p-2 border-gray-500/25 dark:border-gray-200/25 rounded-2xl border-solid border-2">
        <h1 className="text-4xl pt-6">Address</h1>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label htmlFor="Street" className="block mb-2 ">
              Street
            </label>
            <input
              type="text"
              id="Street"
              className="bg-gray-50 border border-gray-300 rounded-lg  block w-full p-2.5 dark:text-black"
              placeholder="0701 Miramar"
              required
            />
          </div>
          <div>
            <label htmlFor="Apartment" className="block mb-2">
              # Apartment
            </label>
            <input
              type="text"
              id="Apartment"
              className="bg-gray-50 border border-gray-300 rounded-lg  block w-full p-2.5 dark:text-black"
              placeholder="apt 10"
              required
            />
          </div>
          <div>
            <label htmlFor="Address 2" className="block mb-2">
              # Address 2
            </label>
            <input
              type="text"
              id="Address 2"
              className="bg-gray-50 border border-gray-300 rounded-lg  block w-full p-2.5 dark:text-black"
              placeholder="-----"
              required
            />
          </div>
          <div>
            <label htmlFor="Phone number" className="block mb-2">
              Phone number
            </label>
            <input
              type="text"
              id="Phone number"
              className="bg-gray-50 border border-gray-300 rounded-lg  block w-full p-2.5 dark:text-black"
              placeholder="+1 234-5678"
              required
            />
          </div>
        </div>
        <h1 className="text-4xl">Pay method</h1>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label htmlFor="Card_name" className="block mb-2 ">
              Card name
            </label>
            <input
              type="text"
              id="Card_name"
              className="bg-gray-50 border border-gray-300 rounded-lg  block w-full p-2.5 dark:text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="Card_number" className="block mb-2">
              Card number
            </label>
            <input
              type="number"
              id="Card_number"
              className="bg-gray-50 border border-gray-300 rounded-lg  block w-full p-2.5 dark:text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="CVC" className="block mb-2">
              CVC
            </label>
            <input
              type="number"
              id="CVC"
              className="bg-gray-50 border border-gray-300 rounded-lg  block w-full p-2.5 dark:text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="expiration_date" className="block mb-2">
              Expiration date
            </label>
            <input
              type="date"
              id="expiration_date"
              className="bg-gray-50 border border-gray-300 rounded-lg  block w-full p-2.5 dark:text-black"
              required
            />
          </div>
        </div>
      </article>
      <aside className="grid content-center justify-items-center basis-full md:basis-2/6 flex-col m-2 p-2 border-gray-500/25 dark:border-gray-200/25 rounded-2xl border-solid border-2 ">
        <table className="w-11/12 text-center">
          <thead>
            <tr>
              <th className="border-y dark:border-blue-gray-50 border-gray-500 p-4">
                Quantity
              </th>
              <th className="border-y dark:border-blue-gray-50 border-gray-500 p-4">
                Product
              </th>
              <th className="border-y dark:border-blue-gray-50 border-gray-500 p-4">
                Precio
              </th>
              <th className="border-y dark:border-blue-gray-50 border-gray-500 p-4">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(user.products).map((productId) => {
              return (
                <tr key={productId}>
                  <td className="p-2 border-b dark:border-blue-gray-50 border-gray-500">
                    <p className="">#{user.products[productId]}</p>
                  </td>
                  <td className="p-2 border-b dark:border-blue-gray-50 border-gray-500">
                    <p className="">{data[productId - 1].name}</p>
                  </td>
                  <td className="p-2 border-b dark:border-blue-gray-50 border-gray-500">
                    <span>$ {data[productId - 1].price}</span>
                  </td>
                  <td className="border-b dark:border-blue-gray-50 border-gray-500">
                    <p className="">
                      {`$${
                        data[productId - 1].price * user.products[productId]
                      }`}
                    </p>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td className="p-2 border-b border-blue-gray-50">
                <p className="">Total of products: {quantity}</p>
              </td>
              <td className="border-b border-blue-gray-50" colSpan={3}>
                <p className="text-right pr-8">Final price: ${total}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          title="placeOrder"
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
          onClick={()=>placeOrder()}
        >
          Place Order
        </button>
      </aside>
      {end && (
        <div className="bg-green-200/60 backdrop-blur-xl z-20 max-w-md absolute right-10 top-15 rounded-lg p-6 shadow">
          <h1 className="text-xl text-slate-700 font-medium">Order placed, end of this emulation....</h1>
          <div className="flex justify-between items-center"></div>
        </div>
      )}
    </div>
  );
}
export default Cart;
