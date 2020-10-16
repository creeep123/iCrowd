import React from 'react'
import { Card, Col } from 'antd'
const { Meta } = Card;

const MyCard = (props) => {
    return (<Col className="column">
        <Card
            hoverable
            style={{ width: 400, margin: 15 }}
            cover={<img alt="avatar" src={props.avatar} />}
        >
            <Meta title={props.name} description={props.email} />
        </Card>
    </Col>)
}

export default MyCard