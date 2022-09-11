import classes from './Input.module.css'
import useUiInput from './../../hooks/ui/input'
import Error from './Error'
const Component = props => {
  const {label, input, textarea, value, setValue, validationHandler, formActive} = props
  const uiInputHook = useUiInput({value, setValue, validationHandler, formActive})
  return <div className={classes.input}>
    <label htmlFor={input ? input.id : textarea.id}>
      {label}
    </label>
    {input ? <input
      {...input}
      value={value.value}
      onBlur={uiInputHook.blurHandler}
      onInput={uiInputHook.inputHandler}
    /> : <textarea
      {...textarea}
      value={value.value}
      onBlur={uiInputHook.blurHandler}
      onInput={uiInputHook.inputHandler}
    />}
    {uiInputHook.showError && <Error message='error_input'/>}
  </div>
}
export default Component