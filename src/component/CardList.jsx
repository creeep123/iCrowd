import React, { useEffect, useState } from 'react'
import { Row } from 'antd';
import MyCard from './MyCard'
import { fetchRequester } from './fetchRequester'
import './FeaturedCardList.css'

const CardList = (props) => {
    const [loading, setLoading] = useState(true)
    const [reqList, setList] = useState('')
    const listLength = props.listLength? props.listLength : 0
    useEffect(() => {
        (async () => {
            let data = await fetchRequester()
            const filteredRequester = data.filter((requester) => {
                return requester.name.toLocaleLowerCase().includes(props.searchItem.toLocaleLowerCase())
            })
            if (filteredRequester.length>listLength) filteredRequester.splice(listLength, filteredRequester.length - listLength)
            setList(filteredRequester)
            setLoading(false)
        })()
    }, [props.searchStaff,listLength,props.searchItem])
    let arr = new Array(listLength).keys()
    let loadingCards = Array.from(arr)
    return (<Row className="row">
        {loading ?
            loadingCards.map((index) =>
                <MyCard
                    key={index}
                    avatar= {require('../img/avatar.png')}
                    name='loading'
                    email="......."
                />
            )
            :
            reqList.map((requester) =>
                <MyCard
                    key={requester.key}
                    avatar={requester.avatar}
                    name={requester.name}
                    email={requester.email}
                />
            )
        }
    </Row>)

}
export default CardList