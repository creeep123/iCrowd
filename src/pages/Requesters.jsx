import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import CardList from '../component/CardList'

const { Search } = Input;

const Requesters = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const onSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }
    return (<>
        {/* <Search
            onChange={onSearchChange}
            placeholder="Search for our Requesters"
            prefix={<UserOutlined />}
            onSearch={value => console.log(value)}
            style={{ width: 300 }}
        /> */}
        <Link to="Requesters/Publish">
            <Button type="primary" >New Requester Task</Button>
        </Link>
        <CardList searchStaff={searchTerm} listLength = {9}/>
        
    </>)
}
export default Requesters