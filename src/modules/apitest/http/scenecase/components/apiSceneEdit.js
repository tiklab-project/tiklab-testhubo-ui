
import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Cascader} from 'antd';

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const ApiSceneEdit = (props) => {
    const { apiSceneStore,categoryStore, apiSceneId,caseType,categoryId } = props;
    const {findApiSceneList,findApiScene,createApiScene,updateApiScene} = apiSceneStore
    const {findCategoryListTree,findCategoryListTreeTable,categoryTableList} = categoryStore;

    const [form] = Form.useForm();

    const [cascaderCategoryId, setCascaderCategoryId] = useState();
    const [visible, setVisible] = React.useState(false);

    const testType=localStorage.getItem("testType");
    const repositoryId = sessionStorage.getItem("repositoryId")

    // 弹框展示
    const showModal = () => {
        if(props.isCategory!==true){
            findCategoryListTreeTable(repositoryId)
        }

        if(props.type==="edit"){
            findApiScene(apiSceneId).then(res=>{
                form.setFieldsValue({
                    name:res.testCase.name,
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
                category:{id:cascaderCategoryId?cascaderCategoryId:categoryId},
                name:values.name,
                testType:testType,
                caseType:caseType,
                desc:values.desc
            }
            delete values?.category
            delete values.name
            delete values.desc

            createApiScene(values).then(()=> {
                findPage();
                findCategoryPage()
            })
        }else {
            values.id=apiSceneId;
            values.testCase={
                id:apiSceneId,
                name:values.name,
                desc:values.desc
            }

            delete values.name
            delete values.desc

            updateApiScene(values).then(()=> {
                findPage()
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
        findApiSceneList(param)
    }

    const findCategoryPage = () =>{
        const params = {
            testType:testType,
            caseType:caseType,
            repositoryId:repositoryId
        }
        findCategoryListTree(params)
    }

    //获取分组id
    const changeCategory=(value)=> {
        //获取最后数组最后一位值
        const list = value.slice(-1);
        setCascaderCategoryId(list[0])
    }


    const onCancel = () => setVisible(false);

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
                    name="basic"
                    form={form}
                    onFinish={onFinish}
                    preserve={false}
                    {...layout}
                >
                    {
                        props.isCategory!==true
                            ? <Form.Item
                                label="分组"
                                rules={[{ required: true, }]}
                                name="category"
                            >
                                <Cascader
                                    fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                                    options={categoryTableList}
                                    onChange={changeCategory}
                                    changeOnSelect
                                    expandTrigger={"hover"}
                                    placeholder="请选择分组"
                                />
                            </Form.Item>
                            :null
                    }

                    <Form.Item
                        label="名称"
                        rules={[{ required: true, }]}
                        name="name"
                    >
                        <Input />
                    </Form.Item>
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

export default inject("apiSceneStore","categoryStore")(observer(ApiSceneEdit));