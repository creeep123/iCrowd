import React, { useState,useEffect } from 'react';
import { Menu } from 'antd'
import { NavLink ,withRouter} from 'react-router-dom'

const Nav = (props) => {
    const [selectedKey, setSelected] = useState('')
    // const [loading,setLoading] = useState(false)
    useEffect(() => {//当加载组件时执行函数
        const paths = [
            '/Requesters',
            '/Workers',
            '/Pricing'
        ]
        let path = props.history.location.pathname
        paths.map((item,i)=>{
            path = path.includes(item)? item : path 
        })
        setSelected(path)
    })
    const handleClick = (item) => {
        setSelected(item.key);
    }
    return (
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} selectedKeys={[`${selectedKey}`]} onClick={handleClick}>
            <Menu.Item key="/"><NavLink to="/">Home</NavLink></Menu.Item>
            <Menu.Item key="/Requesters"><NavLink to="/Requesters">Requesters</NavLink></Menu.Item>
            <Menu.Item key="/Workers"><NavLink to="/Workers">Workers</NavLink></Menu.Item>
            <Menu.Item key="/Pricing"><NavLink to="/Pricing">Pricing</NavLink></Menu.Item>
        </Menu>
    )
}
export default withRouter(Nav)