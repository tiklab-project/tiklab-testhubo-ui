import React,{useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, DatePicker, Select} from 'antd';
import UserSelect from "../../common/userSelect/components/UserSelect";
import moment from "moment";
import IconCommon from "../../common/IconCommon";

const {Option} = Select;
const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const TestPlanEdit = (props) => {
    const { testPlanStore, userSelectStore, testPlanId,findPage } = props;
    const {findTestPlan, createTestPlan, updateTestPlan} = testPlanStore;
    const {userSelectId} = userSelectStore;


    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [principal,setPrincipal] = useState('')
    const repositoryId = sessionStorage.getItem('repositoryId')

    // 弹框展示
    const showModal = () => {
        if(props.type === "edit"){
            findTestPlan(testPlanId).then((res)=>{
                setStartTime(res.startTime);
                setEndTime(res.endTime);
                setPrincipal(res.principal)
                form.setFieldsValue({
                    name: res.name,
                    startTime:moment(res.startTime,'YYYY-MM-DD'),
                    endTime:moment(res.endTime,'YYYY-MM-DD'),
                    state:res.state,
                })
            })
        }
        setVisible(true);
    };


    // 提交
    const onFinish =async () => {
        let values =  await form.validateFields()

        values.startTime=startTime;
        values.endTime=endTime;
        values.repository= {id:repositoryId};
        // values.principal = {id:userSelectId?userSelectId:principal};
        if(props.type === "add" ){
            createTestPlan(values).then(()=>{
                findPage()
            });
        }else{
            values.id=testPlanId;
            updateTestPlan(values).then(()=>{
                findPage()
            });
        }
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };


    const changeStartTime = (data,dataString) =>{
        setStartTime(dataString)
    }

    const changeEndTime = (data,dataString) =>{
        setEndTime(dataString)
    }

    return (
        <>
            {
                props.name === "添加计划"
                    ? <Button className="important-btn" onClick={showModal}>{props.name}</Button>
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
                        rules={[{ required: true, message:'名称未添加'}]}
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="起始时间"
                        name="startTime"
                    >
                        <DatePicker
                            format={'YYYY-MM-DD'}
                            onChange={changeStartTime}
                        />
                    </Form.Item>
                    <Form.Item
                        label="结束时间"
                        name="endTime"
                    >
                        <DatePicker
                            format={'YYYY-MM-DD'}
                            onChange={changeEndTime}
                        />
                    </Form.Item>
                    <Form.Item
                        label="进度"
                        name="state"
                    >
                        <Select>
                            <Option value={0}>未开始</Option>
                            <Option value={1}>进行中</Option>
                            <Option value={2}>结束</Option>
                        </Select>
                    </Form.Item>
                    {/*<Form.Item*/}
                    {/*    label="负责人"*/}
                    {/*    name="user"*/}
                    {/*>*/}
                    {/*    <UserSelect/>*/}
                    {/*</Form.Item>*/}
                </Form>
            </Modal>
        </>
    );
};

export default inject('testPlanStore',"userSelectStore")(observer(TestPlanEdit));
