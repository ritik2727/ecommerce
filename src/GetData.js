import  { useState, useEffect } from "react";
import { database } from './firebase'

function GetData() {
    const [docs, setDocs] = useState([]);
    const [document, setDocument] = useState([]);
    useEffect(() => {
        const getDataFromFirebase = [];
        const subscriber = database.
        collection('collection').
        doc("mens").
        collection("lists").
        onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                getDataFromFirebase.push({ ...doc.data(), key: doc.id });
            });
            setDocs(getDataFromFirebase);
            setDocument(getDataFromFirebase);
        });
        return () => subscriber();
    }, [])

    return { docs };
}
export default GetData;

