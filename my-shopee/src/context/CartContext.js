import axios from "axios";
import { createContext,useContext,useEffect,useState } from "react";
const CartContext=createContext();
export function CartProvider({children}){
    const [totalQty,setTotalQty]=useState(0);
    useEffect(()=> {
        axios.get("http://localhost:8000/api/index",{
            withCredentials:true
        })
        .then((res)=> {
            setTotalQty(res.data.totalQty);
        })
        .catch((error)=> {
            console.log(error);
        })
    },[])
    return <>
        <CartContext.Provider value={{totalQty,setTotalQty}}>
            {children}
        </CartContext.Provider>
    </>
}
export function useCart(){
    return useContext(CartContext);
}