import React, { useState } from 'react'
import TaskList from '../component/TaskList'
import { Input, Row, Col, Radio } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';

const { Search } = Input;

const Workers = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [order, setOrder] = useState('title')
    const [res, setRes] = useState('')
    const onSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }
    const handleOrderChange = (e) => {
        setOrder(e.target.value)
    }

    const requestPost = ({ url, data }) => {
        // 首先创建一个用来发送数据的iframe.
        const iframe = document.createElement('iframe')
        iframe.name = 'iframePost'
        iframe.style.display = 'none'
        document.body.appendChild(iframe)
        const form = document.createElement('form')
        const node = document.createElement('input')
        // 注册iframe的load事件处理程序,如果你需要在响应返回时执行一些操作的话.
        iframe.addEventListener('load', function () {
            console.log('post success');
            // console.log(iframe)
            // setRes(iframe.contentWindow.document)
            // window.parent.postMessage(iframe.contentWindow.document, 'http://localhost:3000/Workers')
        })

        form.action = url
        // 在指定的iframe中执行form
        form.target = iframe.name
        form.method = 'post'
        for (let name in data) {
            node.name = name
            node.value = data[name].toString()
            form.appendChild(node.cloneNode())
        }
        // 表单元素需要添加到主文档中.
        form.style.display = 'none'
        document.body.appendChild(form)
        form.submit()

        // 表单提交后,就可以删除这个表单,不影响下次的数据发送.
        document.body.removeChild(form)
    }

    requestPost({
        url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=xVH70NU5LWrhA4Ma0Nzs9Bca&client_secret=sxv7sqALjfpp8B5ZHFztwFEIsdKT8fBy&',
        data: {
            msg: 'helloIframePost'
        }
    })
    let response = document.getElementsByTagName('iframe')
    console.log('response :>> ', response);


    return (<>
        <Row className="row" justify="space-between">
            <Col span={6}>
                <Search
                    onChange={onSearchChange}
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}
                />
            </Col>
            <Col span={6} offset={12}>
                <Radio.Group value={order} onChange={handleOrderChange}>
                    <Radio.Button value="title">Title</Radio.Button>
                    <Radio.Button value="expire_date">Date<ArrowDownOutlined /></Radio.Button>
                    <Radio.Button value="publish_time">Publish time<ArrowDownOutlined /></Radio.Button>
                </Radio.Group>
            </Col>
        </Row>
        <TaskList searchItem={searchTerm} listLength={1} order={order} />
    </>)
}
export default Workers