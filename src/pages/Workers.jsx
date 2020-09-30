import React, { useState } from 'react'
import CardList from '../component/CardList'
import { Input } from 'antd';

const { Search } = Input;

const Workers = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const onSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return (<>
        <Search
            onChange={onSearchChange}
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
        />
        <CardList searchStaff={searchTerm} listLength = {9}/>
    </>)
}
export default Workers