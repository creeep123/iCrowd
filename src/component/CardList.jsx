import React, { useEffect, useState } from 'react'
import MyCard from './MyCard'
import { fetchRequester } from './fetchRequester'
import './FeaturedCardList.css'

fetchRequester()
const CardList = (props) => {
    const [loading, setLoading] = useState(true)
    const [reqList, setList] = useState('')

    useEffect(() => {
        (async () => {
            let data = await fetchRequester()
            const filteredRequester = data.filter((requester) => {
                return requester.name.toLocaleLowerCase().includes(props.searchStaff.toLocaleLowerCase())
            })
            filteredRequester.splice(8, filteredRequester.length - 8)
            setList(filteredRequester)
            setLoading(false)
        })()
    }, [props.searchStaff])
    const loadingCards = [1,2,3,4,5,6,7,8]
    return (<div className="row">
        {loading ?
            loadingCards.map((index) =>
                <MyCard
                    key={index}
                    avatar= {require('../img/avatar.png')}
                    name='loading'
                    email="...@..."
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
    </div>)

}
export default CardList