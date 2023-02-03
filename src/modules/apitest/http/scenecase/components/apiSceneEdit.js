
import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Cascader, TreeSelect} from 'antd';

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const ApiSceneEdit = (props) => {
    const { apiSceneStore,categoryStore, apiSceneId,categoryId,testType,findList } = props;
    const {findApiSceneList,findApiScene,createApiScene,updateApiScene} = apiSceneStore
    const {findCategoryListTree,findCategoryListTreeTable,categoryTableList} = categoryStore;

    const [form] = Form.useForm();

    const [cascaderCategoryId, setCascaderCategoryId] = useState();
    const [visible, setVisible] = React.useState(false);

    const repositoryId = sessionStorage.getItem("repositoryId")

    // 弹框展示
    const showModal = () => {

        findCategoryListTreeTable(repositoryId)

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
                repositoryId:repositoryId,
                name:values.name,
                testType:"api",
                caseType:"scene",
                desc:values.desc
            }
            delete values?.category
            delete values.name
            delete values.desc

            createApiScene(values).then((res)=> {
                if(res.code===0){
                    sessionStorage.setItem(`apiSceneId`,res.data);
                    props.history.push(`/repository/api-scene-detail`)
                }
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
                findList()
            })

        }

        setVisible(false);
    };

    //获取分组id
    const changeCategory=(value)=> {
        setCascaderCategoryId(value)
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