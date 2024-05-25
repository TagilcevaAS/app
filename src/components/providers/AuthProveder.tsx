import { FC, createContext, useState, ReactNode, useEffect, useMemo } from "react";
import { IUser, TypeSetState } from "../../types";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { doc, setDoc } from 'firebase/firestore';

interface IContext {
    user: IUser | null;
    setUser: TypeSetState<IUser | null>;
    ga: Auth;
    db: Firestore;
    updateUser: (updatedUser: IUser) => void;
}


interface AuthContextProps {
    children: ReactNode;
}

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider: FC<AuthContextProps> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null)
    const ga = getAuth()
    const db = getFirestore()

    const updateUser = async (updatedUser: IUser) => {
        setUser(updatedUser);
    
        try {
            const userDocRef = doc(db, 'users', updatedUser._id); 
            await setDoc(userDocRef, updatedUser);
        } catch (error) {
            console.error('Error updating user in Firestore:', error);
        }
    };
    

    useEffect(() => {
        const unListen = onAuthStateChanged(ga, authUser => {
            if (authUser)
                setUser(
                    {
                        _id: authUser.uid,
                        email: authUser.email || '',
                        avatar: '',
                        name: authUser.displayName || '',
                    }
                )
            else setUser(null)
        })
        return () => {
            unListen()
        }
    }, [])

    const values = useMemo(() => ({
        user,
        setUser,
        ga,
        db,
        updateUser,
    }), [user])

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}