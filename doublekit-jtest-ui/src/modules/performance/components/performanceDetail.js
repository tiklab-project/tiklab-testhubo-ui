import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Breadcrumb, Button, Col, Form, Input, Row} from "antd";
import ToggleItemEdit from "../common/toggleItemEdit";
import PerformanceTestResult from './performanceTestResult'
import TestResultAPI from "./testResultAPI";
import TestResultWebApp from "./testResultWebApp";

const PerformanceDetail = (props) => {
    const {performanceStore} = props;
    const {findPerformance,executeTest,endOrPauseTest,updatePerformance} = performanceStore;
    const [form] = Form.useForm();
    const [executeDate,setExecuteData] = useState()
    const performanceId = localStorage.getItem('performanceId')

    useEffect(()=>{
        findPerformance(performanceId).then((res)=>{
            setExecuteData(res)
            form.setFieldsValue({
                name: res.name,
                testType:res.testType,
                user:res.user?.name,
                threadCount:res.threadCount,
                executeCount: res.executeCount,
                testcase: res.testCase.name,
            })
        })
    },[performanceId]);

    //执行测试
    const handExecuteTest = (type) => {
        const params = {
            threadCount:executeDate.threadCount,
            executeCount:executeDate.executeCount,
            testCaseId:executeDate.testCase.id,
            environmentId:executeDate.testCase.repository.testEnvironment.id,
            repositoryId:executeDate.testCase.repository.id,
            testCaseName:executeDate.testCase.name,
            executeType:type,
            testType:executeDate.testType
        }
        executeTest(params)
    }

    //暂停或停止
    const endOrPause = (type) => {
        let params = {
            executeType:type,
            testCaseId:executeDate.testCase.id
        }
        endOrPauseTest(params)
    }

    //返回
    const goBack = () => {
        props.history.push('/repositorypage/performance');
    }

    const togglePerformanceType = (type) =>{
        switch (type) {
            case 'API':
                return(
                    <>
                        <PerformanceTestResult testCaseId={executeDate?.testCase.id}/>
                        <TestResultAPI />
                    </>
                )
            case 'WEB':
                return  <TestResultWebApp />
            case 'APP':
                return  <TestResultWebApp />
        }
    }

    const itemDataObj =[
        {
            value:executeDate?.threadCount,
            name:'threadCount',
            title:'线程数'
        },
        {
            value:executeDate?.executeCount,
            name:'executeCount',
            title:'执行次数'
        },
    ]

    const itemView = (data) =>{
        return data&&data.map(item=>{
            return <ToggleItemEdit
                editValue={item.value}
                itemName={item.name}
                updataFn={updatePerformance}
                allData={executeDate}
                label={item.title}
                showUI={'number'}
            />
        })
    }

    return(
        <Row justify="center" className="tc-row">
            <Col span={18} className="tc-col">
                <div className={'performance-box'}>
                    <div className='header-flexbox'>
                        <Breadcrumb separator=">" >
                            <Breadcrumb.Item ><a onClick={goBack}>性能测试</a></Breadcrumb.Item>
                            <Breadcrumb.Item>API</Breadcrumb.Item>
                        </Breadcrumb>
                        <Button className="important-btn" onClick={goBack}>返回</Button>
                    </div>
                    <Form className="form-info" form={form} layout="inline">
                        <div className="form-header-title-btn">
                            <ToggleItemEdit
                                editValue={executeDate?.name}
                                itemName={'name'}
                                updataFn={updatePerformance}
                                allData={executeDate}
                                showUI={'input'}
                            />
                            <div>
                                <Button className="important-btn" onClick={()=>handExecuteTest('start')}>开始</Button>
                                <Button className="important-btn" onClick={()=>endOrPause('pause')}>暂停</Button>
                                <Button className="important-btn" onClick={()=>endOrPause('continue')}>继续</Button>
                                <Button className="important-btn" onClick={()=>endOrPause('end')}>结束</Button>
                            </div>
                        </div>
                        <div className={'form-default-detail'}>
                            <Form.Item  label="类型" name="testType" >
                                <Input disabled bordered={false}/>
                            </Form.Item>
                            <Form.Item label="创建人" name="user">
                                <Input disabled  bordered={false}/>
                            </Form.Item>
                        </div>
                        <div className={'form-edit-detail'}>
                            {itemView(itemDataObj)}
                            <ToggleItemEdit
                                editValue={executeDate?.testCase.name}
                                itemName={'threadCount'}
                                updataFn={updatePerformance}
                                allData={executeDate}
                                label={'关联用例'}
                                showUI={'input'}
                            />
                        </div>
                    </Form>
                    <div className={'test-title'}>
                        <div>执行结果</div>
                    </div>
                    {togglePerformanceType(executeDate?.testType)}
                </div>
            </Col>
        </Row>
    )
}

export default inject('performanceStore')(observer(PerformanceDetail));