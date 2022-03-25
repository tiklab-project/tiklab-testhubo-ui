/**
 * @description：web测试详情页
 * @date: 2021-09-7 11:13
 */
import React, {useEffect,useState} from 'react';
import {Drawer, Button, Divider, Spin} from 'antd'
import {inject, observer} from "mobx-react";
import TestResultAPI from "./testResultAPI";
import TestResultWebApp from "./testResultWebApp";

const PerformanceReport= (props) => {
    const {performanceStore,performanceId,executeDate} = props;
    const {executeTest,taskResult,endOrPauseTest,testResultInfo,mergeList,executeType,clearData} = performanceStore;
    const [visible, setVisible] = useState(false);
    const [spin,setSpin]=useState(true)

    //弹窗显示
    const showDrawer = () => {
        if(props.name === '执行测试'){
            handExecuteTest('start',executeDate);
        }
        setVisible(true);
    };

    //执行测试
    const handExecuteTest = (type,executeDate) => {
        const param = {
            threadCount:executeDate.threadCount,
            executeCount:executeDate.executeCount,
            testCaseId:executeDate.testCase.id,
            repositoryId:executeDate.testCase.repository.id,
            testCaseName:executeDate.testCase.name,
            executeType:type,
            testType:executeDate.testType
        }
        if(executeDate.testType==='API'){
            let env = { environmentId:executeDate.testCase.repository.testEnvironment.id,}
            let params = {...param,...env}
            executeTest(params)
        }else {
            executeTest(param)
        }
    }

    useEffect(() => {
        let timer
        if(executeType==='start'||executeType==='continue'){
            timer = setInterval(()=>{
                let param ={
                    testCaseId:executeDate.testCase.id,
                    performanceTestId:performanceId
                }
                taskResult(param).then((res)=>{
                    if(res){
                        setSpin(false)
                        // clearInterval(timer)
                    }
                })
            },1000)
        }
        return () => {
            //清除定时器
            clearInterval(timer)
        }
    },[executeType])

    //暂停或停止
    const endOrPause = (type) => {
        let params = {
            executeType:type,
            testCaseId:executeDate.testCase.id
        }
        endOrPauseTest(params)
    }

    // 关闭弹框
    const onClose = () => {
        setVisible(false);
        clearData()
    }

    //汇总的信息数据
    const testResultInfoObj = [
        {
            title:'总耗时',
            value:testResultInfo?.allResponseTime,
            key:'allResponseTime',
        },{
            key:'averageResponseTime',
            title:'平均响应时间',
            value:testResultInfo?.averageResponseTime
        },{
            key:'errorRate',
            title:'错误率',
            value:testResultInfo?.errorRate
        },{
            key:'maxuimumResponseTime',
            title:'最大响应时间',
            value:testResultInfo?.maxuimumResponseTime
        },{
            key:'middleResponseTime',
            title:'中位数',
            value:testResultInfo?.middleResponseTime
        },{
            key:'minimumResponseTime',
            title:'最小响应时间',
            value:testResultInfo?.minimumResponseTime
        },{
            key:'requestData',
            title:'执行次数',
            value:testResultInfo?.requestData
        },{
            key:'result',
            title:'结果',
            value:testResultInfo?.result
        }
    ]

    //汇总信息的每项界面
    const resultView = (data) => {
        return data&&data.map(item=>{
            return(
                <div className={'task-result-info-item'} key={item.key}>
                    <div>{item.title}</div>
                    <div>{item.value}</div>
                </div>
            )
        })
    }

    const togglePerformanceType = (type) =>{
        switch (type) {
            case 'API':
                return <TestResultAPI dataSource={mergeList}/>
            case 'WEB':
                return  <TestResultWebApp dataSource={mergeList}/>
            case 'APP':
                return  <TestResultWebApp dataSource={mergeList}/>
        }
    }

    return (
        <>
            {
                props.name==='执行测试'
                    ?<Button className="important-btn" onClick={showDrawer}>{props.name}</Button>
                    :<a style={{marginRight:10}}  onClick={showDrawer}>{props.name}</a>
            }
            <Drawer
                title={props.name}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width={1300}
                destroyOnClose={true}
            >
                <div className='test-detail-contant'>
                    <div className='test-report-detail'>
                        <div style={{display:"flex",justifyContent:'flex-end'}}>
                            <Button className="important-btn" onClick={()=>endOrPause('pause')}>暂停</Button>
                            <Button className="important-btn" onClick={()=>endOrPause('continue')}>继续</Button>
                            <Button className="important-btn" onClick={()=>endOrPause('end')}>结束</Button>
                        </div>
                        <Spin spinning={spin}>
                        <div className={'task-result-info'}>
                            {
                                resultView(testResultInfoObj)
                            }
                        </div>
                        <Divider />
                        {togglePerformanceType(executeDate?.testType)}
                        </Spin>
                    </div>
                </div>
            </Drawer>
        </>
    );
}

export default inject('performanceStore')(observer(PerformanceReport));
