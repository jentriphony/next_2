import {useState, useCallback, useEffect} from 'react'
const Hook = props => {
  const {value, setValue, validationHandler, formActive} = props
  const [active, setActive] = useState(null)
  const blurHandler = useCallback(callbackProps => {
    setActive(true)
    setValue(state => ({...state, valid: validationHandler(callbackProps.target.value)}))
  }, [setValue])
  const inputHandler = useCallback(callbackProps => setValue(state => {
    if((active || formActive) && !value.valid) return {...state,
      value: callbackProps.target.value,
      valid: validationHandler(callbackProps.target.value)}
    return {...state, value: callbackProps.target.value}
  }), [setValue, active, formActive, value, validationHandler])
  const reset = useCallback(() => {
    setActive(null)
    setValue(state => ({...state, value: '', valid: null}))
  }, [setValue])
  useEffect(() => {
    setValue(state => ({...state, reset}))
  }, [reset])
  return {showError: (active || formActive) && !value.valid, blurHandler, inputHandler}
}
export default Hook