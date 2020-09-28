import React, { useState } from 'react'
import CardList from '../component/CardList'
// import { Input } from 'antd';
import { Carousel, PageHeader, Typography } from 'antd'
import Image, { Image2, Image3, Image4 } from '../component/Image'
import "./Home.css"

const { Title, Paragraph, Text } = Typography;
const contentStyle = {
    height: '18em',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
}

const Home = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const onSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return (<>
        <Carousel autoplay>
            <div>
                <h3 style={contentStyle}><Image /></h3>
            </div>
            <div>
                <h3 style={contentStyle}><Image2 /></h3>
            </div>
            <div>
                <h3 style={contentStyle}><Image3 /></h3>
            </div>
            <div>
                <h3 style={contentStyle}><Image4 /></h3>
            </div>
        </Carousel>
        <br/>
        <Title className="site-page-header">Featured Requesters</Title>
        <CardList searchStaff={searchTerm} />
    </>)
}
export default Home