import React, {useState} from 'react';
import { observer } from "mobx-react";
import {Form, Input, Modal, Select, Col, Row} from 'antd';
import appSceneStepStore from "../store/appSceneStepStore";
import {Axios} from "tiklab-core-ui";

let {Option}  =  Select;
/**
 * 添加
 */
const AppSceneStepEdit = ({findList}) => {
    const {createAppSceneStep} = appSceneStepStore;

    const [form] = Form.useForm();
    const [visible, setVisible] = React.useState(false);
    const appSceneId = sessionStorage.getItem('appSceneId')
    const [locationList, setLocationList] = useState([]);
    const [actionTypeList, setActionTypeList] = useState([]);

    /**
     * 展示添加项
     */
    const showModal = async () => {
        let locationRes= await Axios.post("/location/findAllLocation");
        if(locationRes.code===0){
            setLocationList(locationRes.data)
        }

        let actionTypeRes= await Axios.post("/actionType/findActionTypeList",{"type": "WEB"});
        if(actionTypeRes.code===0){
            setActionTypeList(actionTypeRes.data)
        }


        setVisible(true)
    };


    /**
     * 提交
     */
    const onFinish =async () => {
        let values =  await form.validateFields();
        values.appSceneId=appSceneId

        await createAppSceneStep(values)
        await findList();

        setVisible(false)
    };


    const onCancel = () => { setVisible(false) };

    //定位器下拉选择框渲染
    const locationView = (data) => {
        return(
            <Select
                showSearch={true}
                allowClear={true}
                placeholder={"定位器"}
            >
                {
                    data&&data.map(item=>{
                        return <Option key={item} value={item}>{item}</Option>
                    })
                }

            </Select>
        )
    }


    //操作方法下拉选择框渲染
    const functionView = (data) => {
        return(
            <Select
                showSearch={true}
                allowClear={true}
                placeholder={"操作方法"}
                className={"form-select"}
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


    return (
        <>
            <a onClick={showModal}>添加步骤</a>
            <Modal
                destroyOnClose={true}
                title={"添加步骤"}
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
                width={500}

            >
                <div className={"case-step-form"}>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        preserve={false}
                        layout={"vertical"}
                    >
                        <Row gutter={[0]}>
                            <Col span={24}>
                                <Form.Item  name="name" label="名称" labelCol={{span: 4}}>
                                    <Input placeholder={"名称"} />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item  name="actionType" label="操作方法" >
                                    {
                                        functionView(actionTypeList)
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item  name="parameter" label=" " >
                                    <Input
                                        placeholder={"参数"}
                                        className={"form-input"}
                                    />
                                </Form.Item>
                            </Col>
                            <Col  span={8}>
                                <Form.Item  name="location" label="定位器" >
                                    {
                                        locationView(locationList)
                                    }
                                </Form.Item>
                            </Col>
                            <Col  span={16}>
                                <Form.Item  name="locationValue" label=" " >
                                    <Input placeholder={"参数"} className={"form-input"}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>
        </>

    );
};

export default observer(AppSceneStepEdit);
