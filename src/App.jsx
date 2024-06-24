import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [passlength, setpasslength] = useState(8);
  const [numbersallowed, setnumbersallowed] = useState(false);
  const [specialcharsallowed, setspecialcharsallowed] = useState(false);
  const [password, setpassword] = useState("");

  const PasswordGen = useCallback(()=>{
    let pass =""
    let str = "QWERTYUIOPASDFGHJKLMNBVCXZqwertyuioplkjhgfdsazxcvbnm"
    if(numbersallowed) str+= "0987654321"
    if(specialcharsallowed) str+= "~!@#$%^&*(){}[]?/.>,<;:+_-="

    for (let i = 1; i <= passlength; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    } 
    setpassword(pass)


  },[numbersallowed,passlength,specialcharsallowed]);




//copybutton
  const passwordRef = useRef(null)

  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    navigator.clipboard.writeText(password)
  },[password])

 useEffect(()=>{
  PasswordGen()},[passlength,numbersallowed,specialcharsallowed]
 )
  return (
    <div>
     <h1 className='text-4xl text-center'>Pawwsord Generatorrrrrr</h1>
     <div className='flex overflow-hidden mb-4 bg-white'>
      <input
      type='text'
      value={password}
      className='outline-none w-full py-1 px-3 ' 
      placeholder='password'
      readOnly
      ref={passwordRef}
      />
      <button 
      onClick={copyToClipboard()
        }
      className='outline-none bg-blue-500 text-white px-3 py-1'>
      COPY</button>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
          type='range'
          min={8}
          max={100}
          value={passlength}
          className='cursor-pointer'
          onChange={(e)=>{setpasslength(e.target.value)}}>

          </input>
         
          <label>length:{passlength}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type='checkbox'
          defaultChecked={numbersallowed}
          id='numberInput'
          onChange={()=>{
            setnumbersallowed((prev)=>!prev);
          }}/><label htmlFor='numberInput'>Numbers</label>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-x-1'>
          <input 
          type='checkbox'
          defaultChecked={numbersallowed}
          id='numberInput'
          onChange={()=>{
            setnumbersallowed((prev)=>!prev);
          }}/><label htmlFor='numberInput'>Characters</label>
          </div>
        </div>
    
    
        )

}

export default App
