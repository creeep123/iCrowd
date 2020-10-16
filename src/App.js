import React from 'react'
import { Layout, Breadcrumb, Input, Button, Row, Col, PageHeader } from 'antd'
import Nav from './component/Nav'
import MyRouter from './MyRouter'
import MyPageHeader from './component/MyPageHeader'
import 'antd/dist/antd.css'
import './App.css'
import './buttons.css'
import { Logo } from './component/Image';
import { createFromIconfontCN, SendOutlined, InstagramOutlined, TwitterOutlined, FacebookOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;

const App = () => {
    return (
        <Layout className="layout">
            <Header style={{ position: 'fixed', zIndex: 9, width: '100%' }}>
                <div className="logo" />
                <Nav />
            </Header>
            <Content style={{ padding: '66px 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>Task</Breadcrumb.Item>
                </Breadcrumb>
                <MyPageHeader/>
                <div className="site-layout-content">
                    <MyRouter />
                </div>
            </Content>
            <Footer className="footer" style={{ textAlign: 'center' }}>
                <Row>
                    <Col span={14} style={{ textAlign: "left" }}> NEWSLETTER SIGN &nbsp;&nbsp;<Input placeholder="Enter your email" style={{width:"160px"}} prefix={<SendOutlined />} /><Button >Subscribe</Button></Col>
                    <Col span={2}></Col>
                    <Col span={8} style={{ textAlign: "right" }}>CONNECT US&nbsp;
                            <InstagramOutlined />&nbsp;
                            <FacebookOutlined />&nbsp;
                            <TwitterOutlined />&nbsp;
                    </Col>
                </Row>
            </Footer>
        </Layout>
    )
}

export default App