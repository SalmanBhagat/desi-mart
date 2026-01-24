import { useEffect, useState } from "react";
import myContext from "./MyContext";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  Query,
  query,
  QuerySnapshot,
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
      const q = query(collection(fireDB, "products"), orderBy("time"));
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
      // 🔹 Firestore ke liye ek query bana rahe hain
      // yahan hum bata rahe hain:
      // 1️⃣ kaunsi collection se data chahiye ("order")
      // 2️⃣ kis order me chahiye (time ke according)
      const q = query(collection(fireDB, "order"), orderBy("time"));
      // 🔴 onSnapshot Firestore ka real-time listener hai
      // jaise hi database me kuch change hota hai
      // (new order, update, delete)
      // ye function automatic dobara call ho jata hai
      const data = onSnapshot(q, (QuerySnapshot) => {
        let orderArray = [];
        // 🔁 QuerySnapshot ke andar har ek document (order) pe loop
        QuerySnapshot.forEach((doc) => {
          // 🔹 doc.data() = order ka actual data
          // 🔹 doc.id = Firestore ka unique document id
          // dono ko mila ke ek object bana rahe hain
          orderArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllOrder(orderArray);
        setLoading(false);
      });
      // 🔌 ye unsubscribe function hai
      // jab component unmount ho ya page change ho
      // to Firestore listener band karne ke kaam aata hai
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
      const q = query(collection(fireDB, "user"), orderBy("time"));
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
      toast.success("User Deleted Successfull");
      getAllUserFunction();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }




  // useEffect function
  useEffect(() => {
    getAllProductFunction();
    getAllOrderFunctiom();
    getAllUserFunction();
  }, []);

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
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default MyState;
