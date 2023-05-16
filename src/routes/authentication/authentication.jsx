import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import './authentication.styles.scss'


const Authentication = () => {

    const {currentUser} = useContext(UserContext);

    if (currentUser) {
        return <Navigate replace to="/" />
    }
    
    // ********** The commented code is used for Google sign-in with Popup. The currently enabled method is redirect.
    // const logGoogleUser = async () => {
    //     const {user} = await signInWithGooglePopup();
    //     const userDocRef = await createUserDocumentFromAuth(user);
    // }

    return (
        <div className="authentication-container">
            {/* <button onClick={logGoogleUser}>
                Sign in with Google
            </button> */}
            
            <SignInForm />
            <SignUpForm />
        </div>
    )
}


export default Authentication;