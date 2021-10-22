import React,{useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, DatePicker, Select} from 'antd';

const {Option} = Select;
const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const TestPlanEdit = (props) => {
    const { testPlanStore, testPlanId } = props;
    const {
        findTestPlan,
        createTestPlan,
        updateTestPlan
    } = testPlanStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const repositoryId = localStorage.getItem('repositoryId')
    // 弹框展示
    const showModal = () => {
        if(props.name === "编辑"){
            findTestPlan(testPlanId).then((res)=>{
                form.setFieldsValue({
                    name: res.name,
                    master:res.master,
                    desc:res.desc
                })
            })
        }
        setVisible(true);
    };

    // 提交
    const onFinish =async () => {
        let values =  await form.validateFields()
        values.startTime=startTime;
        values.endTime=endTime;
        values.repository={id:repositoryId}
        if(props.name === "添加计划" ){
            createTestPlan(values);
        }else{
            values.id=testPlanId;
            updateTestPlan(values);
        }
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };


    const changeStartTime = (data,dataString) =>{
        setStartTime(dataString)
    }

    const changeEndTime = (data,dataString) =>{
        setEndTime(dataString)
    }

    return (
        <>
            {
                props.name === "添加计划"
                    ? <Button className="important-btn" onClick={showModal}>{props.name}</Button>
                    : <a onClick={showModal}>{props.name}</a>
            }

            <Modal
                destroyOnClose={true}
                title={props.name}
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
            >
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    form={form}
                    onFinish={onFinish}
                    preserve={false}
                    {...layout}
                >
                    <Form.Item
                        label="名称"
                        rules={[{ required: true, message:'名称未添加'}]}
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="起始时间"
                        name="startTime"
                    >
                        <DatePicker onChange={changeStartTime} />
                    </Form.Item>
                    <Form.Item
                        label="结束时间"
                        name="endTime"
                    >
                        <DatePicker onChange={changeEndTime} />
                    </Form.Item>
                    <Form.Item
                        label="进度"
                        name="state"
                    >
                        <Select>
                            <Option value='0'>未开始</Option>
                            <Option value='1'>进行中</Option>
                            <Option value='2'>结束</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="负责人"
                        name="user"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="说明"
                        name="desc"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default inject('testPlanStore')(observer(TestPlanEdit));
