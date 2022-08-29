import React, {Fragment, useEffect, useState} from "react";
import {Breadcrumb, Button, DatePicker, Form, Input, Select} from "antd";
import {inject, observer} from "mobx-react";
import TestPlanTestcase from "./testPlanTestcase";
import EdiText from "react-editext";
import moment from "moment";

const {Option} = Select;

const TestPlanDetail = (props) =>{
    const {testPlanStore} = props;
    const {findTestPlan,updateTestPlan} = testPlanStore;
    const [form] = Form.useForm();
    const [executeDate,setExecuteData] = useState()

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
        props.history.push('/repositorypage/testplan');
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
        <div className={"teston-page-center"}>
            <div className='header-flexbox'>
                <Breadcrumb separator=">"  >
                    <Breadcrumb.Item>测试计划</Breadcrumb.Item>
                    <Breadcrumb.Item>测试计划详情</Breadcrumb.Item>
                </Breadcrumb>
                <Button onClick={goBack}>返回</Button>
            </div>
            <Form className="testplan-form-info" form={form} >
                <div className="form-header-title-btn">
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
                <div className={'form-edit-detail'}>
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
                </div>
                <div style={{width:200}}>
                    <Form.Item
                        label="进度"
                        name="state"
                    >
                        <Select onChange={changeState}>
                            <Option value='0'>未开始</Option>
                            <Option value='1'>进行中</Option>
                            <Option value='2'>结束</Option>
                        </Select>
                    </Form.Item>
                </div>

            </Form>
            <TestPlanTestcase/>

        </div>
    )
}

export default inject('testPlanStore')(observer(TestPlanDetail))