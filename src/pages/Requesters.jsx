import React, { useState } from 'react'
import CardList from '../component/CardList'
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Search } = Input;

const Requesters = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const onSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return (<>
        <h1>Requester Page</h1>
        <Search
            onChange={onSearchChange}
            placeholder="Search for our Requesters"
            prefix={<UserOutlined />}
            onSearch={value => console.log(value)}
            style={{ width: 300 }}
        />
        <CardList searchStaff={searchTerm} />
    </>)
}
export default Requesters