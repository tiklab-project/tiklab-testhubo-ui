import React, {Fragment, useEffect, useState} from "react";
import {Breadcrumb, Button, DatePicker, Form, Input, Select, Space} from "antd";
import {inject, observer} from "mobx-react";
import TestPlanTestcase from "./testPlanBindCaseList";
import EdiText from "react-editext";
import moment from "moment";
import {CaretDownOutlined} from "@ant-design/icons";
import TestPlanExecuteTestDrawer from "./testPlanExecuteTestDrawer";
import TestPlanENVModal from "./testPlanENVModal";

const {Option} = Select;

const TestPlanDetail = (props) =>{
    const {testPlanStore} = props;
    const {findTestPlan,updateTestPlan} = testPlanStore;
    const [form] = Form.useForm();
    const [executeDate,setExecuteData] = useState()

    const [showValidateStatus, setShowValidateStatus ] = useState()
    const testPlanId = sessionStorage.getItem('testPlanId')

    useEffect(()=>{
        findTestPlan(testPlanId).then((res)=>{
            setExecuteData(res)
            form.setFieldsValue({
                startTime:moment(res.startTime,'YYYY-MM-DD'),
                endTime:moment(res.endTime,'YYYY-MM-DD'),
                state:stateView(res.state),
            })
        })
    },[testPlanId]);


    //返回
    const goBack = () => {
        props.history.push('/repository/plan');
    }

    //去往历史页
    const toHistory = () => {
        props.history.push('/repository/plan-instance');
    }


    //编辑名字
    const editName = (value) => {
        let param = {
            id:testPlanId,
            name:value
        }
        updateTestPlan(param)
    };


    const changeStartTime = (data,dataString) =>{
        const param={
            id:testPlanId,
            startTime:dataString
        }
        updateTestPlan(param)
    }

    const changeEndTime = (data,dataString) =>{
        const param={
            id:testPlanId,
            endTime:dataString
        }
        updateTestPlan(param)
    }


    const stateView = (type)=>{
        switch (type){
            case 0 :
                return '未开始'
            case 1 :
                return '进行中'
            case 2 :
                return '结束'
        }
    }

    const changeState = (value) =>{

        const param={
            id:testPlanId,
            state:value
        }
        updateTestPlan(param)
    }


    return(
        <div className={"testcase-box"}>
            <Breadcrumb className={"breadcrumb-box"}>
                <Breadcrumb.Item onClick={goBack} className={"first-item"}>测试计划</Breadcrumb.Item>
                <Breadcrumb.Item>计划详情</Breadcrumb.Item>
            </Breadcrumb>

            <Form className="testplan-form-info" form={form} labelAlign={"left"} >
                <div className="display-flex-between">
                    <div style={{width:200,height: 32}}>
                        <EdiText
                            value={executeDate?.name}
                            tabIndex={2}
                            onSave={editName}
                            startEditingOnFocus
                            submitOnUnfocus
                            showButtonsOnHover
                            viewProps={{ className: 'edit-api-name' }}
                            editButtonClassName="ediText-edit"
                            saveButtonClassName="ediText-save"
                            cancelButtonClassName="ediText-cancel"
                            editButtonContent={
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref= {`#icon-bianji1`} />
                                </svg>
                            }
                            hideIcons
                        />
                    </div>
                    <div className={"display-flex-between"} style={{width: 220}}>
                        <a onClick={toHistory}>测试历史</a>
                        <TestPlanENVModal {...props}/>
                        <TestPlanExecuteTestDrawer testPlanId={testPlanId} />
                    </div>

                </div>
                <div className={'form-edit-detail'}>
                    <Form.Item
                        label="起始时间"
                        name="startTime"
                    >
                        <DatePicker
                            format={'YYYY-MM-DD'}
                            onChange={changeStartTime}
                            bordered={false}
                            // suffixIcon={showValidateStatus === "startTime"?<CaretDownOutlined />:null}
                            onMouseEnter={()=>{setShowValidateStatus("startTime")}}
                            onMouseLeave={()=>{setShowValidateStatus("")}}

                        />
                    </Form.Item>
                    <Form.Item
                        label="结束时间"
                        name="endTime"
                    >
                        <DatePicker
                            format={'YYYY-MM-DD'}
                            onChange={changeEndTime}
                            bordered={false}
                            // suffixIcon={showValidateStatus === "endTime"?<CaretDownOutlined />:null}
                            onMouseEnter={()=>{setShowValidateStatus("endTime")}}
                            onMouseLeave={()=>{setShowValidateStatus("")}}
                        />
                    </Form.Item>
                    <div className={"test-plan-select"}>
                        <Form.Item
                            label="进度"
                            name="state"
                        >
                            {/*<Select onChange={changeState}>*/}
                            <Select
                                style={{width:120,height:32}}
                                // value={executeDate?.data}
                                onChange={changeState}
                                showArrow={showValidateStatus === "state"}
                                suffixIcon={showValidateStatus === "state"?<CaretDownOutlined />:null}
                                onMouseEnter={()=>{setShowValidateStatus("state")}}
                                onMouseLeave={()=>{setShowValidateStatus("")}}
                            >
                                <Option value={0}>未开始</Option>
                                <Option value={1}>进行中</Option>
                                <Option value={2}>结束</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
            </Form>

            <TestPlanTestcase/>

        </div>
    )
}

export default inject('testPlanStore')(observer(TestPlanDetail))