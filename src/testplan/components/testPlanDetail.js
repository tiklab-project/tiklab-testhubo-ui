import React, { useEffect, useState} from "react";
import {Breadcrumb,  DatePicker, Form, Select} from "antd";
import {inject, observer} from "mobx-react";
import TestPlanBindCaseList from "./testPlanBindCaseList";
import moment from "moment";
import {CaretDownOutlined} from "@ant-design/icons";
import TestPlanExecuteTestDrawer from "./testPlanExecuteTestDrawer";
import TestPlanENVModal from "./testPlanENVModal";
import IconBtn from "../../common/iconBtn/IconBtn";
import {useHistory, useParams} from "react-router";

const {Option} = Select;

const TestPlanDetail = (props) =>{
    const {testPlanStore} = props;
    const {findTestPlan,updateTestPlan} = testPlanStore;
    const [form] = Form.useForm();
    const [executeDate,setExecuteData] = useState()

    const [showValidateStatus, setShowValidateStatus ] = useState()

    let history = useHistory()
    let {id} = useParams()
    const testPlanId = sessionStorage.getItem('testPlanId') || id


    useEffect(()=>{
        //获取路由id存入
        sessionStorage.setItem('testPlanId',id);

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
       history.push('/repository/plan');
    }


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
        <div className={"plan-box"}>
            <Form className="testplan-form-info" form={form} labelAlign={"left"} >
                <div className="display-flex-between">
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
                    <div className={"display-flex-between"} style={{width: 200}}>
                        <IconBtn
                            className="pi-icon-btn-grey"
                            name={"历史"}
                            onClick={()=> history.push('/repository/plan/instance')}
                        />
                        <TestPlanENVModal {...props}/>
                        <TestPlanExecuteTestDrawer testPlanId={testPlanId} />
                    </div>
                </div>

            </Form>

            <TestPlanBindCaseList {...props}/>

        </div>
    )
}

export default inject('testPlanStore')(observer(TestPlanDetail))