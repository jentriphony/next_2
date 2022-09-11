import classes from './Form.module.css'
import {useState, useCallback} from 'react'
import {fetchAction as sliceFetchAction} from './../../redux/pages/list'
import {useRouter} from 'next/router'
import usePagesFetch from './../../hooks/pages/fetch'
import useUiForm from './../../hooks/ui/form'
import Input from './../UI/Input'
const Component = props => {
  const [[title, setTitle], [image, setImage], [address, setAddress], [description, setDescription]] = [
    useState({value: '', valid: null}), useState({value: '', valid: null}),
    useState({value: '', valid: null}), useState({value: '', valid: null})]
  const validationHandler = useCallback(callbackProps => callbackProps.trim() !== '', [])
  const routerHook = useRouter()
  const pagesFetchHookOnSuccess = useCallback(() => routerHook.push('/'), [routerHook])
  const pagesFetchHook = usePagesFetch({urlTail: 'add', dataTail: undefined, configuration: {
    method: 'post', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title: title.value, image: image.value, address: address.value, description: description.value})
  }, actionSliceTail: 'list', sliceTail: 'pagesList', sliceFetchAction, actionName: 'add', onSuccess: pagesFetchHookOnSuccess})
  const uiFormHook = useUiForm({inputs: [title, image, address, description], onSubmit: pagesFetchHook.handler})
  return <form className={classes.form} onSubmit={uiFormHook.submitHandler}>
    <Input label='title' input={{type: 'text', id: 'title', required: true}} value={title} setValue={setTitle}
      validationHandler={validationHandler} formActive={uiFormHook.active}/>
    <Input label='image' input={{type: 'url', id: 'image', required: true}} value={image} setValue={setImage}
      validationHandler={validationHandler} formActive={uiFormHook.active}/>
    <Input label='address' input={{type: 'text', id: 'address', required: true}} value={address} setValue={setAddress}
      validationHandler={validationHandler} formActive={uiFormHook.active}/>
    <Input label='description' textarea={{rows: '5', id: 'description', required: true}} value={description} setValue={setDescription}
      validationHandler={validationHandler} formActive={uiFormHook.active}/>
    <button type='submit'>
      add
    </button>
  </form>
}
export default Component