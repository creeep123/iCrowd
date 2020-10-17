import React, { useState } from 'react'
import { Row, Col, message, Form, ConfigProvider, Input, InputNumber, Button, Select, DatePicker, Typography, Switch, Divider } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import moment from 'moment'
import ImageUploader from '../component/ImageUploader'
import './RequestersPublish.css'
const { Option } = Select
const { TextArea } = Input
const { Title } = Typography
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
}
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
}
const workerStyle = { 
    margin: "2em 8em", 
    background: 'rgb(247, 247, 247)', 
    border: '1px solid rgb(235, 237, 240)', 
    borderRadius: '10px',
    boxShadow: '41px 41px 82px #d2d2d2, -41px -41px 82px #ffffff'
}

const RequestersPublish = () => {
    const [form] = Form.useForm();
    const [serverMes, setServerMes] = useState('')
    const [checked, setChecked] = useState(false)

    const onFinish = (values) => {
        console.log("form data:>>" + JSON.stringify(values))
        fetch('http://127.0.0.1:8081/create_task', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json,text/plain,*/*'
            },
            body: JSON.stringify(values)
        })
            .then((res) => res.json())
            .then((data) => {
                setServerMes(data.message)
            })
            .catch(e => console.log('Error :>> ', e))
        console.log("Message from server :>> " + serverMes)
        message.success('New task created successfully')
    };

    const onReset = () => {
        form.resetFields();
    };
    const changeImg = (result) => {
        form.setFieldsValue({ image_toprocessing: result });
        // console.log('form :>> ', form.getFieldValue('image_toprocessing'));
    }

    const onChange = (data) => {
        console.log(data)
    }

    //Disable the DatePicker Range
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

    const TaskSettings = {
        choice_task: (<>
            <Divider />
            <Row style={{ width: "100%", margin: "0", padding: "16px 0px 8px 0px" }} >
                <Col span={24}>
                    <Title level={3} style={{ textAlign: 'center' }}>Setting up your task</Title>
                </Col>
            </Row>
            <Form.Item style={{ margin: '0 0 40px 0' }}
                name="question"
                label="Question"
                rules={[
                    {
                        required: true,
                        message: 'Please input your task question!'
                    },
                ]}
            >
                <Input placeholder="A question with one or several answers" />
            </Form.Item>
            <Form.Item
                name="choice_task_option_1"
                label="option 1"
                rules={[
                    {
                        required: true,
                        message: 'Please input your task option1!'
                    },
                ]}
            >
                <TextArea placeholder="" autoSize />
            </Form.Item>
            <Form.Item
                name="choice_task_option_2"
                label="option 2"
                rules={[
                    {
                        required: true,
                        message: 'Please input your task option2!'
                    },
                ]}
            >
                <TextArea placeholder="" autoSize />
            </Form.Item>
            <Form.Item
                name="choice_task_option_3"
                label="option 3"
            >
                <TextArea placeholder="" autoSize />
            </Form.Item>
            <Form.Item
                name="choice_task_option_4"
                label="option 4"
            >
                <TextArea placeholder="" autoSize />
            </Form.Item>
        </>),
        decision_making_task: (<>
            <Divider />
            <Row style={{ width: "100%", margin: "0", padding: "16px 0px 8px 0px" }} >
                <Col span={24}>
                    <Title level={3} style={{ textAlign: 'center' }}>Setting up your task</Title>
                </Col>
            </Row>            <Form.Item
                name="question"
                label="Question"
                rules={[
                    {
                        required: true,
                        message: 'Please input your task question!'
                    },
                ]}
            >
                <Input placeholder="A true or false question" />
            </Form.Item></>),
        sentence_level_task: (<>
            <Divider />
            <Row style={{ width: "100%", margin: "0", padding: "16px 0px 8px 0px" }} >
                <Col span={24}>
                    <Title level={3} style={{ textAlign: 'center' }}>Setting up your task</Title>
                </Col>
            </Row>            <Form.Item
                name="question"
                label="Question"
                rules={[
                    {
                        required: true,
                        message: 'Please input your task question!'
                    },
                ]}
            >
                <Input placeholder="Workers need to provide sentences as answers" />
            </Form.Item></>),
        image_processing: (<>
            <Divider />
            <Row style={{ width: "100%", margin: "0", padding: "16px 0px 8px 0px" }} >
                <Col span={24}>
                    <Title level={3} style={{ textAlign: 'center' }}>Setting up your task</Title>
                </Col>
            </Row>            <Form.Item
                name="image_toprocessing"
                label="Upload your image"
                rules={[
                    {
                        required: true,
                        message: 'Please upload your image!'
                    },
                ]}
            >
                {/* <Input id="input_image" name="image_toprocessing" style={{opacity: 0}} type ="file" accept=".png,image/png" /> */}
                <ImageUploader onChangeImg={changeImg} />
            </Form.Item></>)
    }
    const validateMessages = {
        required: "'${name}' cannot be empty",
    }

    
    return (<div style={workerStyle}>
        <ConfigProvider form={{ validateMessages }}>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} action="">
                <Row style={{ width: "100%", margin: "0", padding: "16px 0px 8px 0px" }} >
                    <Col span={24}>
                        <Title level={3} style={{ textAlign: 'center' }}>Task type</Title>
                    </Col>
                </Row>
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
                        placeholder="Select a task type"
                        allowClear
                    >
                        <Option value="choice_task">Choice Task</Option>
                        <Option value="decision_making_task">Decision Making Task</Option>
                        <Option value="sentence_level_task">Sentence-Level Task</Option>
                        <Option value="image_processing">Image Processing</Option>
                    </Select>
                </Form.Item>
                <Divider />
                <Row style={{ width: "100%", margin: "0", padding: "16px 0px 8px 0px" }} >
                    <Col span={24}>
                        <Title level={3} style={{ textAlign: 'center' }}>Describe your task to workers</Title>
                    </Col>
                </Row>
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
                    <TextArea placeholder="" autoSize />
                </Form.Item>
                <Form.Item
                    name="expire_date"
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
                        // disabledTime={disabledDateTime}
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
                <Divider />
                <Row style={{ width: "100%", margin: "0", padding: "16px 0px 8px 0px" }} >
                    <Col span={24}>
                        <Title level={3} style={{ textAlign: 'center' }}>Worker requirement</Title>
                    </Col>
                </Row>
                <Form.Item
                    name="require_master_worker"
                    label="Require Master Worker"
                >
                    &nbsp;&nbsp;
                <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={(checked) => {
                            setChecked(checked)
                            form.setFieldsValue({ require_master_worker: checked })
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="reward_per_person"
                    label="Reward per person"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber
                        defaultValue={1}
                        min={1}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        onChange={onChange}
                    />
                </Form.Item>
                <Form.Item
                    name="number_of_worker"
                    label="Number of worker"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber
                        defaultValue={1}
                        min={1}
                        max={99999}
                        onChange={onChange}
                    />
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
        </ConfigProvider></div>);
};

export default RequestersPublish