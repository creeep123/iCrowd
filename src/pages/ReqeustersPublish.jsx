import React, { useState } from 'react'
import { Form, Input, Button, Select, DatePicker, Typography, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

import moment from 'moment'
import './RequestersPublish.css'
const { Option } = Select
const { Title } = Typography
const layout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const TaskSettings = {
    choice_task: (<>
        <Title style={{ background: "#f0f2f5", width: "140%", margin: "30px -40px", padding: "20px 0px 10px 0px" }} level={3}>Worker Requirement</Title>
        <Form.Item
            name="choice_task_question"
            label="Yes or No Question"
            rules={[
                {
                    required: true,
                    message: 'Please input your task question!'
                },
            ]}
        >
            <Input />
        </Form.Item></>),
    decision_making_task: (<>
        <Title style={{ background: "#f0f2f5", width: "140%", margin: "30px -40px", padding: "20px 0px 10px 0px" }} level={3}>Worker Requirement</Title>
        <Form.Item
            name="decision_making_task_question"
            label="Multiple choice Question"
            rules={[
                {
                    required: true,
                    message: 'Please input your task question!'
                },
            ]}
        >
            <Input />
        </Form.Item></>),
    sentence_level_task: (<>
        <Title style={{ background: "#f0f2f5", width: "140%", margin: "30px -40px", padding: "20px 0px 10px 0px" }} level={3}>Worker Requirement</Title>
        <Form.Item
            name="choice_task_question"
            label="sentence"
            rules={[
                {
                    required: true,
                    message: 'Please input your task question!'
                },
            ]}
        >
            <Input />
        </Form.Item></>)

}

const RequestersPublish = () => {
    const [form] = Form.useForm();
    const [message,setMessage] = useState('')

    const onFinish = (values) => {
        fetch('http://127.0.0.1:8081/create_task',{
            method:"POST",
            headers:{
                        'Content-Type':'application/json',
                        "Accept":'application/json,text/plain,*/*'
                    },
            body:JSON.stringify(values)
        }).then((res)=>res.json())
        .then((data)=>{
            setMessage(data)
            console.log('message :>> ', message)
        })
        .catch(e=>console.log('Error :>> ', e))
        
    };

    const onReset = () => {
        form.resetFields();
    };

    const onChange = (date, dateString) => {
        console.log(date, dateString)
    }

    function range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    function disabledDateTime() {
        return {
            disabledHours: () => range(0, 24).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        }
    }

    return (<>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} >
            <Form.Item
                name="task_type"
                label="Task Type"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    placeholder="Select a option"
                    allowClear
                >
                    <Option value="choice_task">Choice Task</Option>
                    <Option value="decision_making_task">Decision Making Task</Option>
                    <Option value="sentence_level_task">Sentence-Level Task</Option>
                </Select>
            </Form.Item>
            <Title style={{ background: "#f0f2f5", width: "140%", margin: "30px -40px", padding: "20px 0px 10px 0px" }} level={3}>Describe your task to workers</Title>
            <Form.Item
                name="title"
                label="Title"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="description"
                label="Description"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="expire_data"
                label="Expire Date"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    disabledDate={disabledDate}
                    disabledTime={disabledDateTime}
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                />
            </Form.Item>

            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.task_type !== currentValues.task_type}
            >
                {({ getFieldValue }) => {
                    let type = getFieldValue('task_type');
                    return type ? (
                        TaskSettings[type]
                    ) : null
                }}
            </Form.Item>

            <Title style={{ background: "#f0f2f5", width: "140%", margin: "30px -40px", padding: "20px 0px 10px 0px" }} level={3}>Worker Requirement</Title>
            <Form.Item
                name="require_master_worker"
                label="Require Master Worker"
            >
                &nbsp;&nbsp;
                <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked
                />
            </Form.Item>
            <Form.Item
                name="reward_per_person"
                label="Reward per person"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="number_of_worker"
                label="Number of worker"
            >
                <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
        </Button>
        &nbsp;&nbsp;
        <Button htmlType="button" onClick={onReset}>
                    Reset
        </Button>
            </Form.Item>
        </Form>
    </>);
};

export default RequestersPublish