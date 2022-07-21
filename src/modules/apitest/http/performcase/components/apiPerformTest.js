import React, {useEffect, useRef, useState} from "react";
import {Button, Table} from "antd";
import {inject, observer} from "mobx-react";
import "./performanceStyle.scss"
import {set} from "mobx";

const ApiPerformTest = (props) =>{
    const {apiPerfTestDispatchStore} = props;
    const {apiPerfExecute,exeResult} = apiPerfTestDispatchStore;

    const [result, setResult] = useState();
    const [stepList, setStepList] = useState([]);

    let envUrl
    try{
        envUrl =JSON.parse(localStorage.getItem("API_ENV_SELECTED")).label
    }catch (e) {
        envUrl =null
    }

    let columns= [
        {
            title: '是否通过',
            width: '8%',
            dataIndex: 'result',
            render: (text, record) => (
                text===1
                    ?<div style={{background:'#4f9854',color:'#fff'}}>通过</div>
                    :<div style={{background:'#f04949',color:'#fff'}}>未通过</div>
            )
        },
        {
            title: '步骤数',
            width: '10%',
            dataIndex: 'testNumber',
            align:'center',
        },
        {
            title: '通过数',
            width: '10%',
            dataIndex: 'passNumber',
        },
        {
            title: '失败数',
            dataIndex: 'failNumber',
            width: '10%',
        }, {
            title: '通过率',
            dataIndex: 'passRate',
            width: '10%',
        },
        {
            title: '耗时',
            dataIndex: 'elapsedTime',
            width: '15%',
            render: (text, record) => (<div>{text}ms</div>)
        },

    ]


    let apiPerfId = sessionStorage.getItem("apiPerfId");

    let ref = useRef(null)

    const [start, setStart] = useState(false);
    useEffect(()=>{
        if (start) {
            ref.current =  setInterval(()=>{
                exeResult(apiPerfId,envUrl).then(res=>{
                    if (res.resultType === "end") {
                        clearInterval(ref.current)
                        setStart(false)
                    }
                    setResult(res.apiPerfInstance)
                    setStepList(res.apiSceneInstanceList)
                })
            },8000);
        }
        return () => ref.current = null
    },[start])

    const toHistory = () =>{
        props.history.push("/repositorypage/apitest/perform-instance")
    }

    const onTest = () =>{
        apiPerfExecute(apiPerfId,envUrl)
        setStart(true)
        // setTimeout(()=>{
        //     exeResult(apiPerfId,envUrl).then(res=>{
        //         setResult(res.apiPerfInstance)
        //         setStepList(res.apiSceneInstanceList)
        //     })
        // },1000)
    }

    return(
        <>
            <div className={"api-perf-test-header-box"}>
                <a onClick={toHistory}>测试历史</a>
                <Button onClick={onTest}>执行测试</Button>
            </div>
            <div className={"history-detail-all"}>
                <div className={"header-item"}>测试总详情</div>
                <div className={"history-detail-all-box"}>
                    <div className={"history-detail-all-item"}>
                        <div>通过率</div>
                        <div className={"history-detail-all-item-value"}>{result?.passRate}</div>
                    </div>
                    <div className={"history-detail-all-item"}>
                        <div>失败率</div>
                        <div className={"history-detail-all-item-value"}>{result?.errorRate}</div>
                    </div>
                    <div className={"history-detail-all-item"}>
                        <div>总数</div>
                        <div className={"history-detail-all-item-value"}>{result?.total}</div>
                    </div>
                    <div className={"history-detail-all-item"}>
                        <div>通过数</div>
                        <div className={"history-detail-all-item-value"}>{result?.passNum}</div>
                    </div>

                    <div className={"history-detail-all-item"}>
                        <div>未通过数</div>
                        <div className={"history-detail-all-item-value"}>{result?.failNum}</div>
                    </div>
                </div>
            </div>
            <div className={"history-detail-all"}>
                <div className={"header-item"}>场景列表</div>
                <Table
                    columns={columns}
                    dataSource={stepList}
                    rowKey={record => record.id}
                    pagination={false}
                />

            </div>


        </>
    )
}

export default inject("apiPerfTestDispatchStore")(observer(ApiPerformTest));