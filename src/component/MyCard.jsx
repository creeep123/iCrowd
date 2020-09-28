import React from 'react'
import { Card } from 'antd'
const { Meta } = Card;

const MyCard = (props) => {
    return (<div className="column">
        <Card
            hoverable
            style={{ width: 400 }}
            cover={<img alt="avatar" src={props.avatar} />}
        >
            <Meta title={props.name} description={props.email} />
        </Card>
    </div>)
}

export default MyCard