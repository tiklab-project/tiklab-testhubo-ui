import React, {useEffect, useState} from "react";
import {Button, Col, Collapse, DatePicker, Form, Input, Row, Select, Tooltip, TreeSelect} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import moment from "moment";
import DeletePlanModal from "./DeletePlanModal";
import PageCenter from "../../common/pageContent/PageCenter";

const { Panel } = Collapse;
const {Option} = Select;
const { RangePicker } = DatePicker;

const tailLayout = {
    labelCol:{span: 6}
};

const PlanSetting = (props) =>{
    const {testPlanStore} = props;
    const {findTestPlan,updateTestPlan,deleteTestPlan} = testPlanStore;

    const [form] = Form.useForm();
    const [name, setName] = useState();
    const [rangeTime, setRangeTime] = useState();

    const testPlanId = sessionStorage.getItem('testPlanId')
    const repositoryId = sessionStorage.getItem('repositoryId')

    useEffect(()=>{
        findTestPlan(testPlanId).then((res)=>{
            setName(res.name)
            form.setFieldsValue({
                name:res.name,
                rangeTime:[moment(res.startTime,'YYYY-MM-DD'),moment(res.endTime,'YYYY-MM-DD')],
                state:res.state,
            })
        })
    },[])


    const updatePlan = async ()=>{
        let values =  await form.validateFields()

        values.startTime=values.rangeTime[0];
        values.endTime=values.rangeTime[1];
        values.repository= {id:repositoryId};

        values.id=testPlanId;
        updateTestPlan(values)

    }

    /**
     * 删除项目跳到项目页
     */
    const deleteFn = () =>{
        deleteTestPlan(testPlanId).then(()=>{
            props.history.push(`/project/${repositoryId}/plan`)
            localStorage.setItem("leftRouter",`/project/${repositoryId}/plan`);
        })
    }


    const changeRangeTime = (data,dataString) =>{
        setRangeTime(dataString)
    }

    return(
        <PageCenter>
            <div className={"content-box-center"}>
            <div  className={"header-box-space-between"}>
                <div className={'header-box-title'}>计划信息</div>
            </div>
            <Collapse  expandIconPosition={"end"} >
                <Panel header={<><EditOutlined/> <span style={{padding:"0 5px"}}>编辑计划</span></>} key="1">
                    <div className={"detail-box"}>
                        <Form
                            form={form}
                            layout="inline"
                            onFinish={updatePlan}
                            // className={"base-info-form"}
                            {...tailLayout}
                            labelAlign={"left"}
                        >
                            <Row gutter={[0,20]}>
                                <Col span={16}>
                                    <Form.Item
                                        label={"名称"}
                                        name="name"
                                    >
                                        <Input placeholder={"名称"} />
                                    </Form.Item>
                                </Col>
                                <Col span={16}>
                                    <Form.Item
                                        label={"状态"}
                                        name="state"
                                    >
                                        <Select placeholder={"无"}>
                                            <Option value={0}>未开始</Option>
                                            <Option value={1}>进行中</Option>
                                            <Option value={2}>结束</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={16}>
                                    <Form.Item
                                        label="日期范围"
                                        name="rangeTime"
                                    >
                                        <RangePicker
                                            format={'YYYY-MM-DD'}
                                            onChange={changeRangeTime}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={16} offset={4}>
                                    <Form.Item >
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            style={{ width: 100,height: 36}}
                                        >
                                            保存
                                        </Button>
                                    </Form.Item>
                                </Col>

                            </Row>
                        </Form>
                    </div>
                </Panel>
                <Panel header={<><DeleteOutlined />  <span style={{padding:"0 5px"}}>删除计划</span> </>} key="2">
                    <div>
                        <div style={{display:"flex",alignItems:"center",margin:"0 0 10px 0"}}>
                            <div  style={{fontWeight:"bold"}}>删除此计划</div>
                            <div className={"ws-setting-delete"}>(删除计划后,将无法返回)</div>
                        </div>

                        <DeletePlanModal
                            deleteFn={deleteFn}
                            name={name}
                            {...props}
                        />
                    </div>

                </Panel>
            </Collapse>
        </div>
        </PageCenter>
    )
}

export default  inject('testPlanStore')(observer(PlanSetting));