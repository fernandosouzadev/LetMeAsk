//Importações
import { createContext, ReactNode, useEffect, useState } from "react";
import { firebase , auth } from '../services/firebase';

//Tipagem
type User = {
    id:string;
    avatar:string;
    name:string;
  }
  type AuthContextType = {
    user:User | undefined;
    signInWithGoogle:()=> Promise<void>;
  }
  type AuthContextProviderProps = {
      children:ReactNode;
  }
  
//Exportações
export const AuthContext = createContext({} as AuthContextType);
export function AuthContextProvider(props:AuthContextProviderProps){


//Autenticação do usuario        
useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user =>{
      if (user){
        const {displayName, photoURL, uid } = user
        if(!displayName || !photoURL){
          throw new Error('Missing information from google account.');
        }
        setUser({
          id:uid,
          name:displayName,
          avatar:photoURL,
        })
      }
    })
    return()=>{
      unsubscribe();
    }
  },[])
  
  const [user,setUser] = useState<User>();
  async function signInWithGoogle(){
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await auth.signInWithPopup(provider);
  
          if (result.user){
            const {displayName, photoURL, uid } = result.user
            if(!displayName || !photoURL){
              throw new Error('missing information from google account.');
            }
            setUser({
              id:uid,
              name:displayName,
              avatar:photoURL,
            })
          };
    }
    return(
//Retornando para a Router
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
         </AuthContext.Provider>
    );
}