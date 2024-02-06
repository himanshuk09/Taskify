import React, { useRef } from 'react'
import "./style.css"

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {

  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <form className='input' onSubmit={(e) => {
      handleAdd(e)
      inputRef.current?.blur();
      //inputRef.current.value=
    }}>
      <input
        ref={inputRef} type="text" placeholder='Enter a task'
        onChange={(e) => {
          setTodo(e.target.value)
        }} className='input__box' />
      <button type='submit'
        className='input_submit'>Go</button>
    </form>
  )
}

export default InputField