import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpStart, clearUserError } from "../../store/user/user.action";
import { selectUserError } from "../../store/user/user.selectors";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import WarningMessage from "../warning-message/warning.component";
import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {

    const dispatch = useDispatch();

    

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    const userError = useSelector(selectUserError);
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const resetFormFields = () => setFormFields(defaultFormFields);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(clearUserError());
        setPasswordsDontMatch(false);
        setPasswordError(false);

        if (password.length < 8 ) {
            setPasswordError(true);
            return;
        }

        let number = false;
        let letter = false;
        const passwordArray = password.split('');
        for (let i=0;i < passwordArray.length; i++) {
            if (/^\d$/.test(passwordArray[i])) {
                number = true;
            } else {
                letter = true;
            }
        }

        if (!number) {
            setPasswordError(true);
            return;
        } else if (!letter) {
            setPasswordError(true);
            return;
        }


        if (password != confirmPassword) {
            setPasswordsDontMatch(true);
            return;                
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
        } catch (error) {

        }   
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with email</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Display Name'
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    required
                    />
                <FormInput 
                    label='Email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    required
                    />
                {userError && userError.message.includes('email-already-in-use') && <WarningMessage warningText="Email is already in use"/> }
                <FormInput 
                    label='Password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    required
                    />
                {passwordError && <WarningMessage warningText="Password must be at least 8 characters long and contain at least 1 number"/> }
                <FormInput 
                    label='Confirm Password'
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                    />
                {passwordsDontMatch && <WarningMessage warningText="Passwords don't match"/> }
                <Button 
                    type='submit' 
                    buttonTitle='Sign Up'
                />
            </form>
        </div>
    )
}


export default SignUpForm;