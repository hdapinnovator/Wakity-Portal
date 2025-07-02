import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from "react";
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
} from 'firebase/firestore';

import { database, auth } from '../firebase';

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, seteUser] = useState({})
    const [userdata, setUserData] = useState({})


    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            seteUser(user)

            
            if (user) {
                const data = (await getDoc(doc(database, `users/${user.uid}`))).data()
                if (data) setUserData(data)
            }

        })
    }, [])



    const createUser = async (data) => {
        return createUserWithEmailAndPassword(auth, data.email, data.confirm)
            .then(async res => {
                const userdata = {
                    firstName: data.fname,
                    lastName: data.lname,
                    createDate: new Date().toLocaleString(),
                    email: data.email,
                    normal: true,
                    approved: false
                }

                setUserData(userdata)
                await setDoc(doc(database, `users/${res.user.uid}`), userdata)
            })
    }

    const getUser = () => {
        if (user) return user
    }

    // ADD new criminal
    const deleteUser = (id) => {
        return deleteDoc(doc(database, `users/${id}`))
    }

    // approve user
    const approveUser = async (data) => {
        return updateDoc(database, doc(`users/${data.uid}`), { approved: true })
    }

    const logout = () => {
        return signOut(auth)
    }

    const getBookings = async () => {
        const data = (await getDocs(collection(database, 'bookings')))
        return data
    }

    const getStats = async () => {
        const data = (await getDocs(collection(database, 'stats')))
        return data
    }

    return (
        <UserContext.Provider value={{
            auth,
            database,
            userdata,
            user,
            createUser,
            logout,
            signIn,
            approveUser,
            getBookings,
            getUser,
            deleteUser,
            getStats,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}