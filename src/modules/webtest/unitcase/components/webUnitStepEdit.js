/**
 * @description：webUI的添加与编辑
 * @date: 2021-09-06 16:16
 */
import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Select} from 'antd';

const {Option} = Select;

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};


const WebUnitStepEdit = (props) => {
    const { webUnitStepStore, webUnitStepId ,findPage} = props;
    const {
        findWebUnitStep,
        createWebUnitStep,
        updateWebUnitStep,
        findAllLocation,
        findActionTypeList,
        locationList,
        fuctionList
    } = webUnitStepStore;

    const [form] = Form.useForm();


    const [visible, setVisible] = React.useState(false);

    //定位器下拉选择框渲染
    const locationView = (data) => {
        return(
            <Select
                showSearch={true}
                allowClear={true}
            >
                {
                    data&&data.map(item=>{

                        return <Option key={item} value={item}>{item}</Option>
                    })
                }
                {/*<Option>{' '}</Option>*/}
            </Select>
        )
    }

    //操作方法下拉选择框渲染
    const functionView = (data) => {
        return(
            <Select
                showSearch={true}
                allowClear={true}
            >
                {
                    data&&data.map(item=>{
                        return (
                            <Option key={item.id} value={item.name}>
                                <div>{item.name}</div>
                                <div style={{color:'#a9a9a9',fontSize:12}}>{item.description}</div>
                            </Option>
                        )
                    })
                }
            </Select>
        )
    }

    // 弹框展示
    const showModal = () => {
        findAllLocation();
        findActionTypeList({"type": "WEB"});
        if(props.type === "edit"){
            findWebUnitStep(webUnitStepId).then((res)=>{
                form.setFieldsValue({
                    actionType:res.actionType,
                    location: res.location,
                    locationValue:res.locationValue,
                    parameter:res.parameter,
                    expectedResult:res.expectedResult
                })
            })
        }

        setVisible(true);
    };

    const webUnitId = sessionStorage.getItem('webUnitId')

    // 提交
    const onFinish = async () => {
        let values = await form.validateFields();
        values.webUnitId=webUnitId;

        if(props.name === "添加步骤" ){
            createWebUnitStep(values).then(()=> findPage(webUnitId));
        }else{

            values.id=webUnitStepId;
            updateWebUnitStep(values).then(()=>findPage(webUnitId));
        }
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
            {
                props.btn === "btn"
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
                width={600}
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    preserve={false}
                    {...layout}
                >
                    <Form.Item
                        label="操作方法"
                        name="actionType"
                    >
                        {
                            functionView(fuctionList)
                        }
                    </Form.Item>
                    <Form.Item
                        label="参数"
                        name="parameter"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="定位器"
                        name="location"
                    >
                        {
                            locationView(locationList)
                        }
                    </Form.Item>
                    <Form.Item
                        label="定位器的值"
                        name="locationValue"
                    >
                        <Input />
                    </Form.Item>
                    

                    <Form.Item
                        label="期望"
                        name="expectedResult"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default inject('webUnitStepStore')(observer(WebUnitStepEdit));
