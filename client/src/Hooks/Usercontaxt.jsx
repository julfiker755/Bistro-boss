import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword,signInWithPopup, FacebookAuthProvider, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from './useFirebase';
import useIncaptorPublic from './useIncaptorPublic';

export const Authconext = createContext(null)
const facebookprovider = new FacebookAuthProvider();

const Usercontaxt = ({ children }) => {
    const [user, setuser] = useState({})
    const [loading, setloading] = useState(true)
    const incaptorpublic=useIncaptorPublic()
 

    // create user
    const createUser = (email, password) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //  sign in user
    const signinUser = (email, password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // facebook user
    const facebooklogin=()=>{
        return signInWithPopup(auth,facebookprovider)
    }
    const Updateprfile=(name,photo)=>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo,
          })
    }
    // log out
    const logOut = () => {
        setloading(true)
        return signOut(auth)
    }
    //  unsubscribe for  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setuser(currentUser);
           
            if (currentUser) {
                const userinfo={email: currentUser?.email}
                incaptorpublic.post('https://bistro-boss-sable.vercel.app/jwt', userinfo)
                .then(result => {
                       localStorage.setItem('access-token',result.data.token)
                       setloading(false)
                    })
            } else {
                localStorage.removeItem('access-token')
                setloading(false)
            }
        })

        return () => {
            unsubscribe();
        }

    }, [])
    // auth information
    const authinfo = { user, createUser,facebooklogin, signinUser, logOut, loading,Updateprfile}
    return (
        <Authconext.Provider value={authinfo}>
            {children}
        </Authconext.Provider>
    );
};




export default Usercontaxt;