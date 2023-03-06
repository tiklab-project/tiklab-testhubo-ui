
import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Select} from 'antd';
import IconCommon from "../../../../common/IconCommon";
import {Axios} from "tiklab-core-ui";

const {Option} = Select

// 添加与编辑
const AppSceneStepEdit = (props) => {
    const { appSceneStepStore,appSceneStepId,findList } = props;
    const {
        createAppSceneStep,
        updateAppSceneStep,
        findAppSceneStep,
    } = appSceneStepStore


    const [form] = Form.useForm();

    const [locationList, setLocationList] = useState([]);
    const [actionTypeList, setActionTypeList] = useState([]);
    const [visible, setVisible] = React.useState(false);

    const appSceneId = sessionStorage.getItem("appSceneId")

    // 弹框展示
    const showModal = async () => {
        let locationRes= await Axios.post("/location/findAllLocation");
        if(locationRes.code===0){
            setLocationList(locationRes.data)
        }

        let actionTypeRes= await Axios.post("/actionType/findActionTypeList",{"type": "WEB"});
        if(actionTypeRes.code===0){
            setActionTypeList(actionTypeRes.data)
        }

        if(props.type==="edit"){
            findAppSceneStep(appSceneStepId).then(res=>{
                form.setFieldsValue({
                    name:res.name,
                    actionType:res.actionType,
                    parameter:res.parameter,
                    location: res.location,
                    locationValue:res.locationValue,
                    expectedResult:res.expectedResult,
                })
            })
        }

        setVisible(true);
    };


    // 提交
    const onFinish = async () => {
        let values = await form.validateFields();

        values.appSceneId=appSceneId;
        if(props.type ==="add"){

            createAppSceneStep(values).then(()=> {
                findList()
            })
        }else {
            values.id=appSceneStepId


            if(!values.location){
                values.location="nullstring"
            }

            if(!values.locationValue){
                values.locationValue="nullstring"
            }

            if(!values.parameter){
                values.parameter="nullstring"
            }

            if(!values.actionType){
                values.actionType="nullstring"
            }


            updateAppSceneStep(values).then(()=> {
                findList()
            })
        }

        setVisible(false);
    };



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

    const onCancel = () => { setVisible(false) };

    return (
        <>
            {
                props.type === "add"
                    ? <Button className="important-btn" onClick={showModal}>添加步骤</Button>
                    : <IconCommon
                        icon={"bianji11"}
                        className={"icon-s edit-icon"}
                        onClick={showModal}
                    />
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
                    form={form}
                    preserve={false}
                    layout={"vertical"}
                >
                    <Form.Item
                        label="名称"
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="操作方法"
                        name="actionType"
                    >
                        {
                            functionView(actionTypeList)
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


                    {/*<Form.Item*/}
                    {/*    label="期望"*/}
                    {/*    name="expectedResult"*/}
                    {/*>*/}
                    {/*    <Input />*/}
                    {/*</Form.Item>*/}
                </Form>
            </Modal>
        </>
    );
};

export default inject("appSceneStepStore")(observer(AppSceneStepEdit));