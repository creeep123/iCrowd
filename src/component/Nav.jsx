import React, { useState,useEffect } from 'react';
import { Menu } from 'antd'
import { NavLink ,withRouter} from 'react-router-dom'

const Nav = (props) => {
    const [selectedKey, setSelected] = useState('')
    useEffect(() => {//当加载组件时执行函数
        props.history.listen((routeInfo) => {
            const pathname = routeInfo.pathname.split('/');
            const path = '/' + pathname[pathname.length - 1];
            console.log('path :>> ', path);
            setSelected(path)
        })
    })
    const handleClick = (item) => {
        setSelected(item.key);
        console.log('props.history :>> ', props.history);
    }
    return (
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} selectedKeys={[selectedKey]} onClick={handleClick}>
            <Menu.Item key="/"><NavLink to="/">Home</NavLink></Menu.Item>
            <Menu.Item key="/Requesters"><NavLink to="/Requesters">Requesters</NavLink></Menu.Item>
            <Menu.Item key="/Workers"><NavLink to="/Workers">Workers</NavLink></Menu.Item>
            <Menu.Item key="/Pricing"><NavLink to="/Pricing">Pricing</NavLink></Menu.Item>
        </Menu>
    )
}
export default withRouter(Nav)