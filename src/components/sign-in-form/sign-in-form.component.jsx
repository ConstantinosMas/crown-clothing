import { signInWithGooglePopup, signInWithGoogleRedirect, signInAuthUserWithEmailAndPassword, auth, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { useEffect, useState } from "react";
import { getRedirectResult } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { googleSignInStart, emailSignInStart, clearUserError } from "../../store/user/user.action";
import { selectUserError } from "../../store/user/user.selectors";
import FormInput from "../form-input/form-input.component";
import Button from "../../components/button/button.component";
import WarningMessage from "../warning-message/warning.component";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    // useEffect(() => {
    //     const getResultFromRedirect = async () => {
    //         const response = await getRedirectResult(auth);
    //     }

    //     getResultFromRedirect();        
    // }, []);

    const dispatch = useDispatch();

    const userError = useSelector(selectUserError);

    const logGoogleUser = async () => {
        dispatch(googleSignInStart());
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value}); 
    }

    const resetFormFields = () => setFormFields(defaultFormFields);

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(clearUserError());

        try {
            dispatch(emailSignInStart(email, password));
            console.log(userError.message);
            resetFormFields();
        } catch(error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('The password is incorrect');
                    break;
                case 'auth/user-not-found':
                    alert('Email not found');
                    break;
                default:
                    console.log(`The following error occured while logging in: ${error.message}`)
            }          
        }   
    };

    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in now</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    required
                    />
                { userError && userError.message.includes('user-not-found') && <WarningMessage warningText='Email not found' /> }
                <FormInput 
                    label='Password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    required
                    />
                { userError && userError.message.includes('wrong-password') && <WarningMessage warningText='Incorrect password' /> }
                <div className="buttons-container">
                    <Button 
                        type='submit' 
                        buttonTitle='Sign In'
                    />
                    <Button
                        type='button' 
                        buttonTitle='Google sign in'
                        buttonType='google'
                        onClick={logGoogleUser}
                    />
                </div>
                          
            </form>
            
        </div>
    )
}

export default SignInForm;