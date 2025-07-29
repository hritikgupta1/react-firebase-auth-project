import { useState } from "react";
import { auth, googleprovider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import '../App.css';



export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    console.log(auth?.currentUser?.email)

    const signIn = async () => {

        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleprovider);
        } catch (err) {
            console.error(err);
        }
    }
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="auth-bar">
            <input
                type="text"
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn-primary" onClick={signIn}>Sign In</button>
            <button className="btn-secondary" onClick={signInWithGoogle}>Google</button>
            <button className="btn-logout" onClick={logout}>Logout</button>
        </div>
    );

}