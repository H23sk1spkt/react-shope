import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const CartContext = createContext();
export function CartProvider({ children }) {
  const [totalQty, setTotalQty] = useState(()=> {
    const product=JSON.parse(localStorage.getItem('product')) || {}
    return Object.values(product).reduce((total,qty)=> total+Number(qty),0)
  });
  return (
    <>
      <CartContext.Provider value={{ totalQty, setTotalQty }}>
        {children}
      </CartContext.Provider>
    </>
  );
}
export function useCart() {
  return useContext(CartContext);
}
