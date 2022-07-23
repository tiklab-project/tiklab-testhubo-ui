import React, {useEffect, useRef, useState} from "react";
import {Button, Table} from "antd";
import {inject, observer} from "mobx-react";
import "./webPerfStyle.scss"

const WebPerformTest = (props) =>{
    const {webPerfTestDispatchStore} = props;
    const {webPerfExecute,exeResult} = webPerfTestDispatchStore;

    const [result, setResult] = useState();
    const [stepList, setStepList] = useState([]);

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
            dataIndex: 'stepNum',
            align:'center',
        },
        {
            title: '通过数',
            width: '10%',
            dataIndex: 'passNum',
        },
        {
            title: '失败数',
            dataIndex: 'failNum',
            width: '10%',
        }, {
            title: '通过率',
            dataIndex: 'passRate',
            width: '10%',
        },
        {
            title: '耗时',
            dataIndex: 'totalDuration',
            width: '15%',
            render: (text, record) => (<div>{text}ms</div>)
        },

    ]


    let webPerfId = sessionStorage.getItem("webPerfId");

    let ref = useRef(null)

    const [start, setStart] = useState(false);
    useEffect(()=>{
        if (start) {
            ref.current =  setInterval(()=>{
                exeResult(webPerfId).then(res=>{
                    if (res.resultType === "end") {
                        clearInterval(ref.current)
                        setStart(false)
                    }
                    setResult(res.webPerfInstance)
                    setStepList(res.webSceneInstanceList)
                })
            },5000);
        }
        return () => ref.current = null
    },[start])

    const toHistory = () =>{
        props.history.push("/repositorypage/webtest/perform-instance")
    }

    const onTest = () =>{
        webPerfExecute(webPerfId)

        setStart(true)
    }

    return(
        <>
            <div className={"web-perf-test-header"}>
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

export default inject("webPerfTestDispatchStore")(observer(WebPerformTest));