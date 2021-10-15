/**
 * @description：
 * @date: 2021-08-24 15:52
 */
import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import {Button, Tabs, Row, Col, Form, Input} from "antd";
import PerformanceTestResult from "./performanceTestResult";
import PerformanceTestHistory from './performanceTestHistory'
import './performanceStyle.scss'
import TaskResult from "./taskResult";

const {TabPane} = Tabs;

const PerformanceDetail = (props) => {
    const {performanceStore} = props;
    const {findPerformance,executeTest,endOrPauseTest} = performanceStore;

    const [form] = Form.useForm()
    const [executeDate,setExecuteData] = useState()

    const performanceId = localStorage.getItem('performanceId')

    useEffect(()=>{
        findPerformance(performanceId).then((res)=>{
            setExecuteData(res);
            form.setFieldsValue({
                name: res.name,
                threadCount:res.threadCount,
                executeCount: res.executeCount,
                testcase: res.testCase.name,
            })
        })
    },[performanceId])

    //执行测试
    const handExecuteTest = (type) => {
        const params = {
            threadCount:executeDate.threadCount,
            executeCount:executeDate.executeCount,
            testCaseId:executeDate.testCase.id,
            environmentId:executeDate.testCase.repository.testEnvironment.id,
            repositoryId:executeDate.testCase.repository.id,
            testCaseName:executeDate.testCase.name,
            executeType:type
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
        props.history.push('/repositorypage/performance')
    }

    return(
        <Row justify="center" className="tc-row">
            <Col span={18} className="tc-col">
                <div className={'performance-box'}>
                <div className='header-flexbox'>
                    <Button className="important-btn" onClick={goBack}>返回</Button>
                </div>
                <div className="apidetail-header-btn">
                    <div className="title">基本信息</div>
                    <div>
                        <Button className="important-btn" onClick={()=>handExecuteTest('start')}>开始</Button>
                        <Button className="important-btn" onClick={()=>endOrPause('pause')}>暂停</Button>
                        <Button className="important-btn" onClick={()=>endOrPause('continue')}>继续</Button>
                        <Button className="important-btn" onClick={()=>endOrPause('end')}>结束</Button>
                    </div>

                </div>
                <Form className="apx-form form-info" form={form} layout="inline">
                    <Form.Item label="名称" name="name" >
                        <Input  disabled bordered={false}/>
                    </Form.Item>
                    <Form.Item label="线程数" name="threadCount">
                        <Input disabled  bordered={false}/>
                    </Form.Item>
                    <Form.Item label="执行次数" name="executeCount">
                        <Input  disabled  bordered={false}/>
                    </Form.Item>
                    <Form.Item  label="关联用例" name='testcase'>
                        <Input style={{width:150}} disabled  bordered={false}/>
                    </Form.Item>
                </Form>
                <Tabs type={'card'} >
                    <TabPane tab="测试结果" key="testResult">
                        <PerformanceTestResult testCaseId={executeDate?executeDate.testCase.id:null}/>
                    </TabPane>
                    <TabPane tab="历史记录" key="history">
                        <PerformanceTestHistory/>
                    </TabPane>
                </Tabs>
                <TaskResult />
                </div>
            </Col>
        </Row>
    )
}

export default  inject('performanceStore')(observer(PerformanceDetail));
