import {useState, useCallback} from 'react'
const Hook = props => {
  const {inputs, onSubmit} = props
  const [active, setActive] = useState(null)
  const submitHandler = useCallback(callbackProps => {
    callbackProps.preventDefault()
    for(let iterator = 0; iterator < inputs.length; ++iterator)
      if(!inputs[iterator].valid) {
        setActive(true)
        return
      }
    setActive(null)
    for(let iterator = 0; iterator < inputs.length; ++iterator)
      inputs[iterator].reset()
    props.onSubmit && onSubmit()
  })
  return {active, submitHandler}
}
export default Hook