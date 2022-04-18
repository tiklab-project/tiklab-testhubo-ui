import React, {Fragment, useEffect, useState} from "react";
import {Breadcrumb, Button, Form, Input} from "antd";
import ToggleItemEdit from "../../common/toggleItemEdit";
import {inject, observer} from "mobx-react";
import TestPlanTestcase from "./testPlanTestcase";

const TestPlanDetail = (props) =>{
    const {testPlanStore} = props;
    const {findTestPlan,updateTestPlan} = testPlanStore;
    const [form] = Form.useForm();
    const [executeDate,setExecuteData] = useState()
    const testPlanId = localStorage.getItem('testPlanId')

    useEffect(()=>{
        findTestPlan(testPlanId).then((res)=>{
            setExecuteData(res)
            form.setFieldsValue({
                name: res.name,
                startTime:res.startTime,
                endTime:res.endTime,
                principal:res.principal,
                state: res.state,
            })
        })
    },[testPlanId]);


    const itemDataObj =[
        {
            value:executeDate?.startTime,
            name:'startTime',
            title:'起始时间'
        },
        {
            value:executeDate?.endTime,
            name:'endTime',
            title:'结束时间'
        },
        // {
        //     value:executeDate?.principal,
        //     name:'principal',
        //     title:'结束时间'
        // },
        {
            value:executeDate?.state,
            name:'state',
            title:'状态'
        },
    ]

    const itemView = (data) =>{
        return data&&data.map(item=>{
            return <ToggleItemEdit
                key={item.name}
                editValue={item.value}
                itemName={item.name}
                updataFn={updateTestPlan}
                allData={executeDate}
                label={item.title}
                showUI={'input'}
            />
        })
    }

    //返回
    const goBack = () => {
        props.history.push('/repositorypage/testplan');
    }

    return(
        <Fragment>
            <div className='header-flexbox'>
                <Breadcrumb separator=">"  >
                    <Breadcrumb.Item>用例步骤</Breadcrumb.Item>
                    <Breadcrumb.Item>步骤详情</Breadcrumb.Item>
                </Breadcrumb>
                <Button onClick={goBack}>返回</Button>
            </div>
            <Form className="form-info" form={form} layout="inline">
                <div className="form-header-title-btn">
                    <ToggleItemEdit
                        editValue={executeDate?.name}
                        itemName={'name'}
                        updataFn={updateTestPlan}
                        allData={executeDate}
                        showUI={'input'}
                    />
                </div>
                <div className={'form-edit-detail'}>
                    {itemView(itemDataObj)}
                </div>
            </Form>
            <TestPlanTestcase/>

        </Fragment>
    )
}

export default inject('testPlanStore')(observer(TestPlanDetail))