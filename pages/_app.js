import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import LoadingBar from 'react-top-loading-bar'

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user,setUser]=useState({value:null})
  const[key,setKey]=useState();
  const [progress, setProgress] = useState(0)
  const router= useRouter() 

  useEffect(() => {
    router.events.on('routeChangeStart',()=>{
      setProgress(40);
    })

    router.events.on('routeChangeComplete',()=>{
      setProgress(100);
    })

    console.log("Hey I am the use Effect from the _app.js");
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
    const token=localStorage.getItem('token');
    if(token){
      setUser({value:token})
      setKey(Math.random);
    }
  }, [router.query]);

  const logout=()=>{
    localStorage.removeItem('token'); 
    setUser({value:null})
    setKey(Math.random());
    router.push('/')
  }


  const buyNow = (itemCode, qty, price, name, size, varient) => {
    let newCart = {itemCode : {qty: 1, price,name,size, varient}};
    setCart(newCart);
    saveCart(newCart);
    console.log(newCart);
    router.push("/cheakout");
  };

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  const addToCart = (itemCode, qty, price, name, size, varient) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, varient };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (itemCode, qty, price, name, size, varient) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };
  const clearCart = () => {
    setCart({});
    saveCart({});
  };
  <button>Login</button>

  return (
    <>
       <LoadingBar
        color='#ff2d55'
        waitingTime={400}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {key && <Navbar
      logout={logout}
      user={user}
        key={key}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />}
      <Component
      buyNow={buyNow}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        {...pageProps}
      />
      <Footer />
    </>
  );
}

export default MyApp;
