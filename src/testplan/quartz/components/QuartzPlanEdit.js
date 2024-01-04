import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Radio, Checkbox, Row, Col, TimePicker} from 'antd';
import IconCommon from "../../../common/IconCommon";
import quartzPlanStore from "../store/quartzPlanStore";
import moment from "moment";


// 添加与编辑
const QuartzPlanEdit = (props) => {
    const { type,name,testPlanId,findList,quartzPlanId } = props;
    const {createQuartzPlan,findQuartzPlan,updateQuartzPlan} = quartzPlanStore

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);
    const repositoryId = sessionStorage.getItem('repositoryId')


    // 弹框展示
    const showModal = async () => {
        if(type === "edit"){

            let info = await findQuartzPlan(quartzPlanId)

            form.setFieldsValue({
                taskType: info.exeType,
                weekList: info.weekList,
                time: moment(info.time, "HH:mm")
            })
        }
        setVisible(true);
    };


    // 提交
    const onFinish =async () => {
        let values =  await form.validateFields()
        values.testPlanId=testPlanId
        values.repositoryId=repositoryId
        values.time=values.time.format("HH:mm")

        if(type==="add"){
            await createQuartzPlan(values)
        }else {
            values.id=quartzPlanId;
            await updateQuartzPlan(values)
        }
        await findList()
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };




    return (
        <>
            {
                type === "add"
                    ? <Button className="important-btn" onClick={showModal}>{name}</Button>
                    : <IconCommon
                        icon={"bianji11"}
                        className={"icon-s edit-icon"}
                        onClick={showModal}
                    />
            }

            <Modal
                destroyOnClose={true}
                title={name}
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
                    layout={"vertical"}
                    initialValues={{exeType:1,weekList:[1],time:moment("00:00", "HH:mm")}}
                >
                    <Form.Item label="触发方式" name={"exeType"}>
                        <Radio.Group>
                            <Radio value={1}>单次触发</Radio>
                            <Radio value={2}>循环触发</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="日期选择" name={"weekList"} rules={[{required:true,message:"日期选择不能为空"}]}>
                        <Checkbox.Group>
                            <Row>
                                <Col span={8}>
                                    <Checkbox value={1} >星期一</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value={2} >星期二</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value={3} >星期三</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value={4} >星期四</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value={5} >星期五</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value={6} >星期六</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value={7} >星期天</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>

                    <Form.Item label="触发时间" name={"time"} rules={[{required:true,message:"触发时间不能为空"}]}>
                        <TimePicker placeholder="触发时间" format={"HH:mm"}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default observer(QuartzPlanEdit);
