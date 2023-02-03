
import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Cascader, TreeSelect} from 'antd';

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const FuncUnitEdit = (props) => {
    const { funcUnitStore,funcUnitId,categoryStore,findList} = props;
    const {findFuncUnitList, createFuncUnit,updateFuncUnit ,findFuncUnit} = funcUnitStore
    const {findCategoryListTree,findCategoryListTreeTable,categoryTableList} = categoryStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);

    const categoryId = sessionStorage.getItem("categoryId")
    const repositoryId = sessionStorage.getItem("repositoryId")

    // 弹框展示
    const showModal = () => {
        findCategoryListTreeTable(repositoryId)

        if(props.type==="edit"){
            findFuncUnit(funcUnitId).then(res=>{
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
                testType:"func",
                caseType:"unit",
                desc:values.desc
            }
            delete values.name
            delete values.desc

            createFuncUnit(values).then((res)=> {
                if(res.code===0){
                    sessionStorage.setItem(`funcUnitId`,res.data);
                    props.history.push(`/repository/func-unit-detail`)
                }
            })
        }else {
            values.id=funcUnitId;
            values.testCase={
                id:funcUnitId,
                name:values.name,
                desc:values.desc
            }
            delete values.name
            delete values.desc


            updateFuncUnit(values).then(()=> {
                findList()
            })
        }

        setVisible(false);
    };


    const [cascaderCategoryId, setCascaderCategoryId] = useState();
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

export default inject("funcUnitStore","categoryStore")(observer(FuncUnitEdit));