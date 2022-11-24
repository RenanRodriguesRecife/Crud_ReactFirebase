// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, addDoc, doc, deleteDoc } from "firebase/firestore";
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

  async function criarUser(){
    const user = await addDoc(userCollectionRef,{
      name, email,
    });
    console.log(user)
  }

  async function deleteUser(id){
    const useDoc = doc(db, 'users', id);
    await deleteDoc(useDoc);
  }

 
  useEffect(()=>{
    const getUsers = async () =>{
      const data = await getDocs(userCollectionRef)
      setUsers(data.docs.map((doc)=>({...doc.data(),id: doc.id})))
    };
    getUsers();
  },[])

  return (
    <div>
      <input type="text" placeholder="Nome..."value={name} onChange={(e)=>setName(e.target.value)}/>
      <input type="text" placeholder="email..." value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <button onClick={criarUser}>Criar user</button>
      <ul>
        {users.map(user => {
          return(
            <div key={user.id}>
              <li>{user.name}</li>
              <li>{user.email}</li>
              <button onClick={()=>deleteUser(user.id)}>Deletar</button>
            </div>
          )
        })}
      </ul>
    </div>
  )
};