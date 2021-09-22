
import React, { useState, useEffect, createContext } from 'react'
import firebase from '@firebase/app-compat'
import { database } from '../firebase';
import { auth } from '../firebase';

export const StateContext = createContext();


export const StateProvider = (props) =>{
    const [user, setUser] = useState()
    const [dataMens, setDataMens] = useState([])
    const [dataWomens, setDataWomens] = useState([])
    const [dataMobile, setDataMobile] = useState([])
    const [dataCart, setDataCart] = useState([])
    const [dataWishlist, setDataWishlist] = useState([])
    const [cartTotal, setcartTotal] = useState()
    const [cartSave, setcartSave] = useState()
    const [wishTotal, setWishTotal] = useState()
    const [wishSave, setWishSave] = useState()

    useEffect(() => {
        auth.onAuthStateChanged(usr => {
         
            if (usr) setUser(usr.uid)
            else setUser(null)
          }
          )
 
       //Mens Data Fetching
       const getMensDataFromFirebase = [];
       database.collection('collection').doc("mens").collection("lists").onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
             getMensDataFromFirebase.push({ ...doc.data(), key: doc.id });
          });
          setDataMens(getMensDataFromFirebase);
       });
 
       //Womens Data Fetching
       const getWomenDataFromFirebase = [];
       database.collection('collection').doc("womens").collection("lists").onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
             getWomenDataFromFirebase.push({ ...doc.data(), key: doc.id });
          });
          setDataWomens(getWomenDataFromFirebase);
       });
 
       //Mobile Data Fetching
       const getMobileDataFromFirebase = [];
       database.collection('collection').doc("mobile").collection("lists").onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
             getMobileDataFromFirebase.push({ ...doc.data(), key: doc.id });
          });
          setDataMobile(getMobileDataFromFirebase);
       });
 
       //Cart Data Fetching
       if(user!==null){
      const getCartDataFromFirebase = [];
      database.collection('users').doc(user).collection("cart").onSnapshot((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            getCartDataFromFirebase.push({ ...doc.data(), key: doc.id });
         });
         setDataCart(getCartDataFromFirebase);
      });

      //Wishlist Data from Firebase
      const getWishDataFromFirebase = [];
      database.collection('users').doc(user).collection("wish").onSnapshot((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            getWishDataFromFirebase.push({ ...doc.data(), key: doc.id });
         });
         setDataWishlist(getWishDataFromFirebase);
      });

      
      database.collection('users').doc(user).collection('cart').onSnapshot((a) => {
         let total = 0;
         let save = 0;
         a.forEach((item) => {
            total = total + Number(item.data().price)
            save = save + Number(item.data().oldPrice - item.data().price)
         })
         setcartSave(save)
         setcartTotal(total)
      })
      database.collection('users').doc(user).collection('wish').onSnapshot((a) => {
         let total = 0;
         let save = 0;
         a.forEach((item) => {
            total = total + Number(item.data().price)
            save = save + Number(item.data().oldPrice - item.data().price)
         })
         setWishSave(save)
         setWishTotal(total)
      })
   }
 
    }, [user])
 

    return (
        <StateContext.Provider value={{
                            userdata:[user,setUser],
                            mens:[dataMens,setDataMens],
                            womens:[dataWomens,setDataWomens],
                            mobile:[dataMobile,setDataMobile],
                            cart: [dataCart, setDataCart],
                            wish: [dataWishlist, setDataWishlist],
                            wishsave: [wishSave, setWishSave],
                            wishtotal: [wishTotal, setWishTotal],
                            cartsave: [cartSave, setcartSave],
                            carttotal: [cartTotal, setcartTotal],
                        }}>
            {props.children}
        </StateContext.Provider>
    )
}