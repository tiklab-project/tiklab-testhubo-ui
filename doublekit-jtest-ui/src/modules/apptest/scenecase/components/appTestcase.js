
/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {Form, Divider, Input, Breadcrumb, Button} from "antd";
import {inject, observer} from "mobx-react";
import './appStyle.scss'
import AppStep from "./appStep";
import TestReportApp from "./testReportApp";
import ToggleItemEdit from "../../../common/toggleItemEdit";

const layout = {
    labelCol: {span:8},
    wrapperCol: {span: 18},
};

const AppTestcase = (props) => {
    const {testcaseStore} = props;
    const {findTestcase,updateTestcase} = testcaseStore;
    const [form] =  Form.useForm();
    const [editTitle,setEditTitle] = useState();
    const [executeDate,setExecuteDate] = useState();

    const testcaseId = localStorage.getItem('testcaseId')

    useEffect(()=> {
        findTestcase(testcaseId).then(res=>{
            setEditTitle(res.name);
            setExecuteDate(res);
            let testCaseApp = res.testCaseApp;
            form.setFieldsValue({
                name:res.name,
                type:res.type,
                person:res.user.name,
                updateTime:res.updateTime,
                platformName:testCaseApp.platformName,
                appiumSever:testCaseApp.appiumSever,
                deviceName:testCaseApp.deviceName,
                udId:testCaseApp.udId,
                appPackage:testCaseApp.appPackage,
                appActivity:testCaseApp.appActivity
            })
        })
    },[])

    const toTestcase = () => props.history.push('/repositorypage/Testcase');

    const itemDataObj =[
        {
            value:executeDate?.testCaseApp?.platformName,
            name:'platformName',
            title:'平台'
        },
        {
            value:executeDate?.testCaseApp?.appiumSever,
            name:'appiumSever',
            title:'appium地址'
        },
        {
            value:executeDate?.testCaseApp?.deviceName,
            name:'deviceName',
            title:'设备名'
        },
        {
            value:executeDate?.testCaseApp?.udId,
            name:'udId',
            title:'设备地址'
        },
        {
            value:executeDate?.testCaseApp?.appPackage,
            name:'appPackage',
            title:'App包名'
        },
        {
            value:executeDate?.testCaseApp?.appActivity,
            name:'appActivity',
            title:'App入口'
        },
    ]

    const itemView = (data) =>{
        return data&&data.map(item=>{
            return <ToggleItemEdit
                editValue={item.value}
                itemName={item.name}
                updataFn={updateTestcase}
                allData={executeDate}
                label={item.title}
                showUI={'input'}
            />
        })
    }

    return(
        <>
            <div className='breadcrumb'>
                <Breadcrumb separator=">" >
                    <Breadcrumb.Item ><a onClick={toTestcase}>测试用例 </a></Breadcrumb.Item>
                    <Breadcrumb.Item>APP</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Form
                className={'form-info'}
                layout="inline"
                form={form}
                {...layout}
            >
                <div className="form-header-title-btn">
                    <ToggleItemEdit
                        editValue={editTitle}
                        itemName={'name'}
                        updataFn={updateTestcase}
                        allData={executeDate}
                        showUI={'input'}
                    />
                    <div>
                        <TestReportApp testcaseId={testcaseId} name={'测试历史'} />
                        <TestReportApp testcaseId={testcaseId} name={'执行测试'} />
                    </div>
                </div>
                <div className={'form-default-detail'}>
                    <Form.Item label="类型" name="type">
                        <Input disabled bordered={false}/>
                    </Form.Item>
                    <Form.Item label="创建人" name="person">
                        <Input disabled bordered={false}/>
                    </Form.Item>
                    <Form.Item label="更新时间" name="updateTime">
                        <Input disabled bordered={false}/>
                    </Form.Item>
                </div>
                <div>
                    {
                        itemView(itemDataObj)
                    }
                </div>
            </Form>
            <Divider  />
            <AppStep/>
        </>
    )
}

export default inject('testcaseStore')(observer(AppTestcase));
