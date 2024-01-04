import React,{useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, DatePicker, Select} from 'antd';
import moment from "moment";
import IconCommon from "../../../common/IconCommon";

const { RangePicker } = DatePicker;


// 添加与编辑
const TestPlanEdit = (props) => {
    const { testPlanStore, testPlanId,findPage } = props;
    const {findTestPlan, createTestPlan, updateTestPlan} = testPlanStore;



    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);
    const [rangeTime, setRangeTime] = useState();
    const [endTime, setEndTime] = useState();
    const [principal,setPrincipal] = useState('')
    const repositoryId = sessionStorage.getItem('repositoryId')

    // 弹框展示
    const showModal = () => {
        if(props.type === "edit"){
            findTestPlan(testPlanId).then((res)=>{
                setRangeTime(res.startTime);
                setEndTime(res.endTime);
                // setPrincipal(res.principal)
                form.setFieldsValue({
                    name: res.name,
                    rangeTime:[moment(res.startTime,'YYYY-MM-DD'),moment(res.endTime,'YYYY-MM-DD')],
                })
            })
        }
        setVisible(true);
    };


    // 提交
    const onFinish =async () => {
        let values =  await form.validateFields()

        values.startTime=values.rangeTime[0];
        values.endTime=values.rangeTime[1];
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


    const changeRangeTime = (data,dataString) =>{
        setRangeTime(dataString)
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
                width={500}
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
                        label="日期范围"
                        name="rangeTime"
                        rules={[{ required: true, message:'日期范围未添加'}]}
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }}
                    >
                        <RangePicker
                            format={'YYYY-MM-DD'}
                            onChange={changeRangeTime}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default inject('testPlanStore')(observer(TestPlanEdit));
