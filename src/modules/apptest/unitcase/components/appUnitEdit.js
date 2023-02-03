
import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Select, Cascader, TreeSelect} from 'antd';
import {Option} from "antd/es/mentions";


const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const AppUnitEdit = (props) => {
    const {appUnitStore,appUnitId ,categoryStore,categoryId,findList } = props;
    const {
        findAppUnitList,
        createAppUnit,
        updateAppUnit ,
        findAppUnit,
        findAllLocation,
        findActionTypeList,
        locationList,
        functionList
    } = appUnitStore
    const {findCategoryListTree,findCategoryListTreeTable,categoryTableList} = categoryStore;

    const [form] = Form.useForm();

    const [cascaderCategoryId, setCascaderCategoryId] = useState();
    const [visible, setVisible] = React.useState(false);

    const repositoryId = sessionStorage.getItem("repositoryId")
    
    // 弹框展示
    const showModal = () => {
        findAllLocation();
        findActionTypeList({"type": "APP"});

        findCategoryListTreeTable(repositoryId)

        if(props.type === "edit"){
            findAppUnit(appUnitId).then(res=>{
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
        
        if(props.type !=="edit"){
            values.testCase={
                category:{id:cascaderCategoryId?cascaderCategoryId:categoryId},
                repositoryId:repositoryId,
                name:values.name,
                testType:"app",
                caseType:"unit",
                desc:values.desc
            }

            delete values?.category
            delete values.name
            delete values.desc
            
            createAppUnit(values).then((res)=> {
                if(res.code===0){
                    sessionStorage.setItem(`appUnitId`,res.data);
                    props.history.push(`/repository/app-unit-detail`)
                }
            })
        }else {
            values.id=appUnitId;
            values.testCase={
                id:appUnitId,
                name:values.name,
                desc:values.desc
            }
            delete values.name
            delete values.desc

            values.location=values.location?values.location:""

            updateAppUnit(values).then(()=> {
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

    //获取分组id
    const changeCategory=(value)=> {
        //获取最后数组最后一位值
        setCascaderCategoryId(value)
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
                    layout={"vertical"}
                >
                    <Form.Item
                        label="名称"
                        rules={[{ required: true, }]}
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="模块"
                        name="category"
                    >
                        <TreeSelect
                            fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                            style={{  width: '100%'}}
                            value={cascaderCategoryId}
                            dropdownStyle={{
                                maxHeight: 400,
                                overflow: 'auto',
                            }}
                            placeholder="请选择模块"
                            allowClear
                            treeDefaultExpandAll
                            onChange={changeCategory}
                            treeData={categoryTableList}
                        />
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

export default inject("appUnitStore","categoryStore")(observer(AppUnitEdit));