import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Layout, Breadcrumb, Input, Button, Row, Col } from 'antd'
import Nav from './component/Nav'
import Home from './pages/Home'
import Requesters from './pages/Requesters'
import Workers from './pages/Workers'
import Pricing from './pages/Pricing'
import 'antd/dist/antd.css'
import './App.css'
import { createFromIconfontCN, SendOutlined } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
})


const { Header, Content, Footer } = Layout;

const App = () => {
    return (
        <Router>
            <Layout className="layout">
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Nav />
                </Header>
                <Content style={{ padding: '80px 80px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <div className="site-layout-content">
                        <Route exact path="/" component={Home} />
                        <Route exact path="/Requesters" component={Requesters} />
                        <Route exact path="/Workers" component={Workers} />
                        <Route exact path="/Pricing" component={Pricing} />
                    </div>
                </Content>
                <Footer style={{ background: '#d6e4ff', textAlign: 'center' }}>
                    <Row>
                        <Col span={4} style={{ textAlign: "right" }}> NEWSLETTER SIGN &nbsp;&nbsp;</Col>
                        <Col span={4}><Input placeholder="Enter your email" prefix={<SendOutlined />} /></Col>
                        <Col span={1}><Button >Subscribe</Button></Col>
                        <Col span={10}></Col>
                        <Col span={2} style={{ textAlign: "right" }}>CONNECT US&nbsp;&nbsp;</Col>
                        <Col span={3}>
                            <div className="icons-list" style={{ textAlign: "left" }}>
                                <IconFont type="icon-tuichu" />&nbsp;
                                <IconFont type="icon-facebook" />&nbsp;
                                <IconFont type="icon-twitter" />&nbsp;
                            </div>
                        </Col>
                    </Row>
                </Footer>
            </Layout>
        </Router>
    )
}

export default App