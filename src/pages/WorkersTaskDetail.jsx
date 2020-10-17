import React, { useState, useEffect } from 'react'
import { fetchTask } from '../component/fetchTask'
import { Row, Card, Image } from 'antd';

const WorkersTaskDetail = (props) => {
    const [task, setTask] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let id = window.location.pathname.replace("/Workers/task/", "");
        (async () => {
            let data = await fetchTask(id)
            setTask(data)
            setLoading(false)
        })()
    }, [])
    return (<>
        <Row justify="space-between">
            <Card title={`${task.title ? task.title : "loading..."}`} style={{ width: '100%', margin: '2%' }}>
                <p>{loading ? null : (<b>Expire Date: </b>)}{loading ? null : (task.expire_date)}</p>
                <Card
                    loading={loading}
                    style={{ marginTop: 16 }}
                    type="inner"
                    title="Task Description"
                >
                    {task.description}
                </Card>
                <Card
                    loading={loading}
                    style={{ marginTop: 16 }}
                    type="inner"
                    title="Requirement"
                >
                    <ul>
                        <li><p>{task.require_master_worker ? <b>Require Master Worker</b> : null}</p></li>
                        <li><p><b>Reward/Person: </b>{task.reward_per_person}</p></li>
                        <li><p><b>Number of worker: </b>{task.number_of_worker}</p></li>
                    </ul>
                </Card>
                <Card
                    loading={loading}
                    style={{ marginTop: 16 }}
                    type="inner"
                    title="Task Description"
                >
                    <p>{task.question ? <b>Question: </b> : null}{task.question ? (task.question) : null}</p>
                    <ul>
                        {task.choice_task_option_1 ? (<li>A: {task.choice_task_option_1}</li>) : null}
                        {task.choice_task_option_2 ? (<li>B: {task.choice_task_option_2}</li>) : null}
                        {task.choice_task_option_3 ? (<li>C: {task.choice_task_option_3}</li>) : null}
                        {task.choice_task_option_4 ? (<li>D: {task.choice_task_option_4}</li>) : null}
                        {task.image_toprocessing ? (<Image
                            width={200}
                            src={task.image_toprocessing}
                        />) : null}
                    </ul>
                </Card>
            </Card>
        </Row>
    </>)
}
export default WorkersTaskDetail