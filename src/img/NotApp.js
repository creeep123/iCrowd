import React ,{useState} from 'react'
import Image from '../component/Image'
import CardList from '../component/CardList'
import Greeting from '../component/Greeting'
import Login from '../component/Login'
import './component/FeaturedCardList.css'

const isLoggedIn = true
// const time = new Date().getHours()


function App2(){
    const [searchTerm,setSearchTerm] = useState('')
    const onSearchChange = (e) =>{
        setSearchTerm(e.target.value)
    }

    return(
    < > 
        {
            isLoggedIn?
            <Login/>
            :
            <Greeting text="Welcome to iCrowd"/>
        }
        <input
            type='text'
            placeholder = 'search staff'
            onChange = {onSearchChange}
            value = {searchTerm}
        />
        <CardList searchStaff = {searchTerm}/>
        <Image/>
    </>)
}
export default App2