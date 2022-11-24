// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";



const firebaseApp = initializeApp({
  apiKey: "AIzaSyDNJOeSD4E_yAGRnUnur_9gXxynu8lsfEg",
  authDomain: "reactfirebase-f2980.firebaseapp.com",
  projectId: "reactfirebase-f2980",
});


export const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const db = getFirestore(firebaseApp);
  const userCollectionRef = collection(db, "users");

  useEffect(()=>{
    const getUsers = async () =>{
      const data = await getDocs(userCollectionRef)
      setUsers(data.docs.map((doc)=>({...doc.data(),id: doc.id})))
    };
    getUsers();
  },[])

  return (
    <div>
      <ul>
        {users.map(user => {
          return(
            <div key={user.id}>
              <li>{user.name}</li>
              <li>{user.email}</li>
            </div>
          )
        })}
      </ul>
    </div>
  )
};