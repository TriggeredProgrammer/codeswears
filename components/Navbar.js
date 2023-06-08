// Cheak video 50 later
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";

import { BsFillBagCheckFill } from "react-icons/bs";
import { BsBagXFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/Md";
import { useRef } from "react";
const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [dropdown, setDropdown] = useState(false);

  // console.log(cart, addToCart, removeFromCart, clearCart, subTotal);
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();
  return (
    <div className="flex flex-col  md:flex-row md:justify-start justify-center items-center my-2 shadow-md sticky top-0 bg-white z-10 ">
      <div className="logo mr-5 md:mx-5 cursor-pointer ">
        <Link href={"/"}>
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <Image src="/logo.webp" alt="" width={200} height={40} />
          </a>
        </Link>
      </div>

      <div className="nav">
        <ul className="flex items-center space-x-2 font-bold md: text-sm">
          <Link href={"/tshirts"}>
            <a>
              <li>Tshirts</li>
            </a>
          </Link>
          <Link href={"/hoodies"}>
            <a>
              <li>Hoodies</li>
            </a>
          </Link>
          <Link href={"/stickers"}>
            <a>
              <li>Stickers</li>
            </a>
          </Link>
          <Link href={"/mugs"}>
            <a>
              <li>Mugs</li>
            </a>
          </Link>
        </ul>
      </div>

      <div className="cursor-pointer  items-center cart absolute right-0 top-0 mx-5 flex">
        <span
          onMouseOver={() => {
            setDropdown(true);
          }}
          onMouseLeave={() => {
            setDropdown(false);
          }}
        >
          {dropdown && (
            <div
              onMouseOver={() => {
                setDropdown(true);
              }}
              onMouseLeave={() => {
                setDropdown(false);
              }}
              className="absolute right-8 rounded-md px-5 w-36 bg-white shadow-lg border top-6 py-4"
            >
              <ul>
                <Link href={"/myaccount"}>
                  <a>
                    <li className="py-1 hover:text-pink-700 text-sm  font-bold">
                      My Account
                    </li>
                  </a>
                </Link>
                <Link href={"/orders"}>
                  <a>
                    <li className="py-1 hover:text-pink-700 text-sm  font-bold">
                      Orders
                    </li>
                  </a>
                </Link>
             
                    <li onClick={logout} className="py-1 hover:text-pink-700 text-sm  font-bold ">
                      Logout
                    </li>
              </ul>
            </div>
          )}
          {user.value && (
            <MdAccountCircle className="text-xl md:text-2xl mx-2" />
          )}
        </span>
        {!user.value && (
          <Link href={"/login"}>
            <a>
              <button
                className="bg-pink-600 px-2 py-1 rounded-md text-sm
           text-white "
              >
                Login
              </button>
            </a>
          </Link>
        )}
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="text-xl md:text-2xl"
        />
      </div>

      <div
        ref={ref}
        className={`w-72 h-[100vh] overflow-y-scroll sideCart absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform ${
          Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2>
          <div className="font-bold text-xl">Shoping cart</div>
        </h2>
        <span
          onClick={toggleCart}
          className="absolute top-2 right-0 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="my-4 text-base font-semibold ">
              Your cart wale empty. please add a few items to cheakout{" "}
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5 ">
                  <div className="w-2/3 font-semibold">
                    {cart[k].name}({cart[k].size}/{cart[k].varient})
                  </div>
                  <div className=" flex items-center font-semiboldjustify-center w-1/3 space-x-3">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,

                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].varient
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                    <span>{cart[k].qty}</span>
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(
                          k,
                          1,

                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].varient
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="font-bold my-2">subTotal:{subTotal}</div>
        <div className="flex">
          <Link href={"/cheakout"}>
            <button className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
              <BsFillBagCheckFill className="m-1" />
              CheakOut
            </button>
          </Link>

          <button
            onClick={clearCart}
            className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
          >
            <BsBagXFill className="m-1" />
            ClearCart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
