import { useEffect, useState } from "react";
import myContext from "./myContext";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../firebase/FirebaseConfig";

const MyState = ({ children }) => {
  // Loading state
  const [loading, setLoading] = useState(false);
  
  /* ============================================================
   📦              Get All Product Function
   ============================================================ */
  // user state
  const [getAllProduct, setGetAllProduct] = useState([]);

  // GetAll Product function
  const getAllProductFunction = async () => {
    setLoading(true);

    try {
      const q = query(collection(fireDB, "products"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllProduct(productArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  /* ============================================================
   📦              Grt All Order Function
   ============================================================ */
  // order state
  const [getAllOrder, setGetAllOrder] = useState([]);

  // get all order function
  const getAllOrderFunctiom = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "order"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let orderArray = [];
        QuerySnapshot.forEach((doc) => {
          orderArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllOrder(orderArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // delete order function
  const orderDelete = async(id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "order", id));
      toast.dismiss();
    toast.clearWaitingQueue();
      toast.success("Order Deleted Successfully");
      getAllOrderFunctiom();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  /* ============================================================
   📦              Get All User Function
   ============================================================ */

  // user State
  const [getAllUser, setGetAllUser] = useState([]);

  // Get user Function
  const getAllUserFunction = async() => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "user"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let userArray = [];
        QuerySnapshot.forEach((doc) => {
          userArray.push({...doc.data(), id: doc.id})
        })
        setGetAllUser(userArray);
        setLoading(false);
      })
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // user delete function
  const userDelete = async(id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "user", id));
      toast.dismiss();
    toast.clearWaitingQueue();
      toast.success("User Deleted Successfull");
      getAllUserFunction();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  /* ============================================================
   📦              Filter Logic
   ============================================================ */

   const [searchKey, setSearchKey] = useState("");
   const [filterType, setFilterType] = useState("");
   const [filterPrice, setFilterPrice] = useState("");

  // useEffect function
  useEffect(() => {
    getAllProductFunction();
    getAllOrderFunctiom();
    getAllUserFunction();
  },[]);

  return (
    <myContext.Provider
      value={{
        loading,
        setLoading,
        getAllProduct,
        getAllProductFunction,
        getAllOrderFunctiom,
        getAllOrder,
        orderDelete,
        getAllUser,
        getAllUserFunction,
        userDelete,
        searchKey, 
        setSearchKey,
        filterType, 
        setFilterType,
        filterPrice,
        setFilterPrice,
      }}  
    >
      {children}
    </myContext.Provider>
  );
};

export default MyState;
