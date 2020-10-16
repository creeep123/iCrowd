import React, { useState } from 'react'
import TaskList from '../component/TaskList'
import { Input, Row, Col, Radio  } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import '../component//FeaturedCardList.css'

const { Search } = Input;

const Workers = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [order, setOrder] = useState('title')
    const onSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }
    const handleOrderChange = (e) => {
        setOrder(e.target.value )
    }

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
        <TaskList searchItem={searchTerm} listLength={1} order={order}/>
    </>)
}
export default Workers