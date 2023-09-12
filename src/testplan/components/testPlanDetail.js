import React, { useEffect, useState} from "react";
import {Breadcrumb,  DatePicker, Form, Select} from "antd";
import {inject, observer} from "mobx-react";
import TestPlanBindCaseList from "./testPlanBindCaseList";
import moment from "moment";
import EdiText from "react-editext";
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

    //编辑名字
    const editName = (value) => {
        let param = {
            id:testPlanId,
            name:value
        }
        updateTestPlan(param).then(()=>{
            findTestPlan(testPlanId)
        })
    };


    return(
        <div className={"plan-box"}>
            <Breadcrumb className={"breadcrumb-box  header-bread"}>
                <Breadcrumb.Item onClick={goBack} className={"first-item"}>计划</Breadcrumb.Item>
                <Breadcrumb.Item>{executeDate?.name}</Breadcrumb.Item>
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
                    <div className={"display-flex-between"} style={{width: 200}}>
                        <IconBtn
                            className="pi-icon-btn-grey"
                            name={"历史"}
                            onClick={()=> history.push('/repository/plan-instance')}
                        />
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

            <TestPlanBindCaseList {...props}/>

        </div>
    )
}

export default inject('testPlanStore')(observer(TestPlanDetail))