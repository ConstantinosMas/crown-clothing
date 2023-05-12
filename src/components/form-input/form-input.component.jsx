import './form-input.styles.scss';

const FormInput = ({label, ...otherProps}) => {

    return (
        <div className="group">

            <input className='form-input' {...otherProps}/>
            {
                label && ( //This is a short-circuit evalution. (if this part is true) && (this part executes)
            <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>)
            }
            
        </div>
    )
}

export default FormInput;