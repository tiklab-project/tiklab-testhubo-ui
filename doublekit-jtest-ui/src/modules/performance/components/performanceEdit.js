/**
 * @description：性能测试编辑
 * @date: 2021-08-24 15:35
 */
import React, {useEffect, useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input} from 'antd';
import TestcaseAdd from "./testcaseAdd";


const layout = {
    labelCol: {span: 4,},
    wrapperCol: {span: 19,}
};

// 添加与编辑
const PerformanceEdit = (props) => {
    const { performanceStore, performanceId } = props;
    const {findPerformance, createPerformance, updatePerformance, testcaseInfo} = performanceStore;

    const [form] = Form.useForm();
    const [visible, setVisible] = React.useState(false);
    const [testcase,setTestcase] = useState();
    const repositoryId = localStorage.getItem('repositoryId')

    //关联用例变化时更新弹窗
    useEffect(() => {
        if (testcaseInfo){
            form.setFieldsValue({
                testcase:testcaseInfo.name
            })
        }
    }, [testcaseInfo])

    // 弹框展示
    const showModal = () => {
        if(props.name === "编辑"){
            findPerformance(performanceId).then((res)=>{
                setTestcase(res.testCase.id)
                form.setFieldsValue({
                    name: res.name,
                    threadCount:res.threadCount,
                    executeCount:res.executeCount,
                    testcase:res.testCase.name
                })
            })
        }
        setVisible(true);
    };

    // 提交
    const onFinish = async () => {
        let values = await form.validateFields();
        values.repository={id:repositoryId}
        if(props.name === "添加" ){
            if(testcaseInfo){
                values.testCase={id:testcaseInfo.id}
            }
            createPerformance(values).then((res)=>{
                localStorage.setItem('performanceId',res.data)
                props.history.push('/performanceDetail')
            });
        }else{
            values.id=performanceId;
            if(testcaseInfo){
                values.testCase={id:testcaseInfo.id}
            }else {
                values.testCase={id:testcase}
            }
            updatePerformance(values);
        }
        setVisible(false);
    };

    //关闭弹窗
    const onCancel = () => { setVisible(false) };

    return (
        <>
            {
                props.name === "添加"
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
                    form={form}
                    onFinish={onFinish}
                    preserve={false}
                    {...layout}
                >
                    <Form.Item
                        label="名称"
                        rules={[{ required: true, }]}
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="线程数"
                        rules={[{ required: true, }]}
                        name="threadCount"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="执行次数"
                        rules={[{ required: true, }]}
                        name="executeCount"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="关联用例"
                        name="testcase"
                    >
                        <Input addonAfter={<TestcaseAdd />}/>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default inject('performanceStore')(observer(PerformanceEdit));
