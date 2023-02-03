import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Select, message, Cascader, TreeSelect} from 'antd';

const {Option} = Select;

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const ApiUnitEdit = (props) => {
    const { apiUnitStore, apiUnitId,categoryStore,categoryId,testType,findList } = props;
    const {
        findApiUnitList,
        findApiUnit,
        createApiUnit,
        updateApiUnit,
    } = apiUnitStore;
    const {findCategoryListTree,findCategoryListTreeTable,categoryTableList} = categoryStore;

    const [form] = Form.useForm();

    const [cascaderCategoryId, setCascaderCategoryId] = useState();
    const [visible, setVisible] = React.useState(false);

    const repositoryId = sessionStorage.getItem("repositoryId")

    // 弹框展示
    const showModal = () => {
        findCategoryListTreeTable(repositoryId)

        if(props.type === "edit"){
            findApiUnit(apiUnitId).then((res)=>{
                form.setFieldsValue({
                    name: res.testCase.name,
                    methodType:res.methodType,
                    path:res.path,
                    desc:res.testCase.desc
                })
            })
        }

        setVisible(true);
    };

    // 提交
    const onFinish = async () => {
        let values = await form.validateFields();

        if(props.type !== "edit" ){
            values.testCase={
                category:{id:cascaderCategoryId?cascaderCategoryId:categoryId},
                repositoryId:repositoryId,
                name:values.name,
                testType:"api",
                caseType:"unit",
                desc:values.desc
            }

            delete values?.category
            delete values.name
            delete values.desc

            createApiUnit(values).then(res=>{
                if(res.code===0){
                    sessionStorage.setItem(`apiUnitId`,res.data);
                    props.history.push(`/repository/api-unit-detail`)
                }else {
                    message.error('This is an error message');
                }
            });
        }else{
            values.id=apiUnitId;
            values.testCase={
                id:apiUnitId,
                name:values.name,
                desc:values.desc
            }

            delete values.name
            delete values.desc

            updateApiUnit(values).then(res=>{
                if(res.code===0){
                    findList()
                }else {
                    message.error('This is an error message');
                }
            });
        }
        setVisible(false);
    };



    const changeCategory=(value)=> {
        setCascaderCategoryId(value)
    }


    const onCancel = () => { setVisible(false) };

    return (
        <>
            {
                props.btn === "btn"
                    ? <Button onClick={showModal}>{props.name}</Button>
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
                        label="类型"
                        rules={[{ required: true, }]}
                        name="methodType"
                    >
                        <Select>
                            <Option value='post'>post</Option>
                            <Option value='get'>get</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        rules={[{ required: true }]}
                        name="path"
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

export default inject('apiUnitStore',"categoryStore")(observer(ApiUnitEdit));
