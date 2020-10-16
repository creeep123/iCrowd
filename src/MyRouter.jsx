import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Requesters from './pages/Requesters'
import Workers from './pages/Workers'
import WorkersTaskDetail from './pages/WorkersTaskDetail'
import Pricing from './pages/Pricing'
import RequestersPublish from './pages/ReqeustersPublish'

const MyRouter = () => {
    return (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Requesters" component={Requesters}/>
        <Route exact path="/Requesters/Publish"  component={RequestersPublish}/>
        <Route exact path="/Workers" component={Workers} />
        <Route exact path="/Workers/task/:id" component={WorkersTaskDetail} />
        <Route exact path="/Pricing" component={Pricing} />
    </Switch>)
}

export default MyRouter