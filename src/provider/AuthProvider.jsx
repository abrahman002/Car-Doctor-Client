import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

export const  AuthContext = createContext()
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider=new GoogleAuthProvider()

    const createUser=(email,password)=>{
        setLoading(true)
        return  createUserWithEmailAndPassword(auth,email,password);
    }

    const login=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password);
    }


    const googleSignIn=()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider);
    }

    const logOut=()=>{
        return signOut(auth);
    }
        
    

    useEffect(()=>{
        const unSubscriber =onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            setLoading(false);

           if(currentUser && currentUser.email){
            const loggedUSer={
                email:currentUser.email
            }
            fetch('http://localhost:500/jwt',{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(loggedUSer)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                localStorage.setItem('car-token',data.token)
            })
           }
           else{
            localStorage.removeItem('car-token')
           }
        })

        return ()=>{
            return unSubscriber();
        }
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        login,
        googleSignIn,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;