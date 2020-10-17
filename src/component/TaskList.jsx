import React, { useEffect, useState } from 'react'
import { Skeleton, Row, Card, Col, Button, message, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchTask } from './fetchTask'
import { fetchConcepts } from '../component/fetchConcepts'
import './FeaturedCardList.css'



const { Meta } = Card;
const { Paragraph,Text } = Typography;
const bubble = (list, property) => {
    for (let i = 0; i < list.length - 1; i++) {
        for (let j = 0; j < list.length - 1 - i; j++) {
            if (list[j][property] > list[j + 1][property]) {
                var temp = list[j];
                list[j] = list[j + 1];
                list[j + 1] = temp;
            }
        }
    }
    return list
}

const TaskList = (props) => {
    const [loading, setLoading] = useState(true)
    const [taskList, setTaskList] = useState([])
    const [serverMessage, setServerMes] = useState('')
    const [dataBaseChanged, setDataBaseChanged] = useState('')
    const listLength = props.listLength ? props.listLength : 0
    const handleDelete = (id) => {
        setLoading(true)
        fetch(`http://127.0.0.1:8081/task/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json,text/plain,*/*'
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setDataBaseChanged(id)
                setServerMes(data.message)
                setLoading(false)
                message.success('Delete Task Successfully')
            })
            .catch(e => {
                console.log('Error :>> ', e)
                message.error(`Error happened: ${e}`)
            })
    }


    useEffect(() => {
        (async () => {
            setLoading(true)
            let conceptsList = await fetchConcepts()
            console.log('!!!!!list:>>>>>',conceptsList)
            let data = await fetchTask()
            let filteredTasks = data.filter((task) => {
                return task.title.toLocaleLowerCase().includes(props.searchItem.toLocaleLowerCase())
            })
            filteredTasks = bubble(filteredTasks, props.order)
            // filteredTasks.splice(listLength, filteredTasks.length - listLength)
            setTaskList(filteredTasks)
            setLoading(false)
        })()
    }, [props.order, props.searchItem, listLength, dataBaseChanged])

    let loadingList = [];
    for (let i = 0; i < 12; i++) {
        loadingList.push(
            <Col className="column" key={i}>
                <Card
                    loading={true}
                    key={i}
                    hoverable
                    style={{ width: 400, margin: 15 }}
                    actions={[
                        <DeleteOutlined key="delete" />,
                        <PlusOutlined key="add" />,
                    ]}
                >
                </Card>
            </Col>
        )
    }

    return (<Row className="row">
        {
            loading ? loadingList
                :
                taskList.map((task) =>
                    <Col className="column" key={task._id}>
                        <Card
                            key={task._id}
                            title={task.title}
                            hoverable
                            style={{ width: 400, margin: 15 }}
                            extra={<a href={`/Workers/task/${task._id}`}>Detail</a>}
                            actions={[
                                <DeleteOutlined onClick={() => { handleDelete(task._id) }} key="delete" />,
                                <PlusOutlined key="add" />,
                            ]}
                        >
                            <Meta
                                title={task.expire_date.match(/(.*)T/)[1]}
                                description={<>
                                    <Text type="secondary">{task.task_type}</Text>
                                    <Paragraph ellipsis={{ rows: 1, expandable: true, symbol: 'more' }}>{task.description}</Paragraph>
                                </>}
                            />
                        </Card>
                    </Col>
                )
        }
    </Row>)

}
export default TaskList