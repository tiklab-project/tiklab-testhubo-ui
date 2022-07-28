
import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Select} from 'antd';


const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const WebUnitEdit = (props) => {
    const { webUnitStore,webUnitId,categoryStore} = props;
    const {
        findWebUnitList,
        createWebUnit,
        updateWebUnit,
        findWebUnit,
        findAllLocation,
        findActionTypeList,
        locationList,
        functionList
    } = webUnitStore
    const {findCategoryListTree} = categoryStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);

    const caseType=localStorage.getItem("caseType");
    const testType=localStorage.getItem("testType");
    const categoryId = sessionStorage.getItem("categoryId")
    const repositoryId = sessionStorage.getItem("repositoryId")

    // 弹框展示
    const showModal = () => {
        findAllLocation();
        findActionTypeList({"type": "WEB"});

        if(props.type==="edit"){
            findWebUnit(webUnitId).then(res=>{
                form.setFieldsValue({
                    name:res.testCase.name,
                    actionType:res.actionType,
                    parameter:res.parameter,
                    location: res.location,
                    locationValue:res.locationValue,
                    expectedResult:res.expectedResult,
                    desc:res.testCase.desc
                })
            })
        }

        setVisible(true);
    };


    // 提交
    const onFinish = async () => {
        let values = await form.validateFields();

        if(props.type!=="edit"){
            values.testCase={
                category:{id:categoryId},
                name:values.name,
                testType:testType,
                caseType:caseType,
                desc:values.desc
            }
            delete values.name
            delete values.desc

            createWebUnit(values).then(()=> {
                findPage()
                findCategoryPage()
            })
        }else {
            values.id=webUnitId;
            values.testCase={
                id:webUnitId,
                name:values.name,
                desc:values.desc
            }
            delete values.name
            delete values.desc

            values.location=values.location?values.location:""

            updateWebUnit(values).then(()=> {
                findPage();
                findCategoryPage()
            })
        }

        setVisible(false);
    };

    const findPage=()=>{
        const param = {
            caseType:caseType,
            testType:testType,
            categoryId:categoryId
        }
        findWebUnitList(param)
    }

    const findCategoryPage = () =>{
        const params = {
            testType:testType,
            caseType:caseType,
            repositoryId:repositoryId
        }
        findCategoryListTree(params)
    }

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
            >
                <Form
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
                        label="操作方法"
                        name="actionType"
                    >
                        {
                            functionView(functionList)
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
                    <Form.Item
                        label="描述"
                        name="desc"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default inject("webUnitStore","categoryStore")(observer(WebUnitEdit));