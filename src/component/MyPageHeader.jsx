import React, { useState,useEffect } from 'react';
import { PageHeader } from 'antd'
import { withRouter } from 'react-router-dom'

const MyPageHeader = (props) => {
    const [title, setTitle] = useState('')
    // const [loading,setLoading] = useState(false)
    useEffect(() => {//当加载组件时执行函数
        const paths = [
            'Requesters',
            'Workers',
            'Pricing'
        ]
        let path = props.history.location.pathname
        paths.map((item,i)=>{
            path = path.includes(item)? item : path 
        })
        path = path === '/' ? 'Home':path
        setTitle(path)
    })
    return (
        <PageHeader
        className="site-page-header"
        title={title}
        subTitle="This is a subtitle"
    />
    )
}
export default withRouter(MyPageHeader)