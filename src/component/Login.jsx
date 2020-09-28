import React, {useState} from 'react'
import Greeting from './Greeting'
import Input from './Input'
import Button from './Button'

function Login (props){
    const [contact, setContact] = useState({
        username:'',
        password:''
    })

    const handleChange = (e) =>{
        const {name,value} = e.target
        setContact((preValue)=>{
            return{
                ...preValue,
                [name]:value
            }
        })
    }
    
    const handleClick = (e)=>{
        fetch('http://127.0.0.1:8081/',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                username : contact.username,
                password : contact.password
                //...value?
            })
        })
        .then(response=>response.json())
        .then(data=>console.log(data))
    }

    return(<div>
        <Greeting uText = {contact.username} pText = {contact.password}/>
        <Input name="username" type="text" placeholder="username" onChange={handleChange} value={contact.username}/>
        <Input name="password" type="text" placeholder="password" onChange={handleChange} value={contact.password}/>
        <Button type="submit" text="Login" onClick={handleClick}/>
        </div>)
}

export default Login