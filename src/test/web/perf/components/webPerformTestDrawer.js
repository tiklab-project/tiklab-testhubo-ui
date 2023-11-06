import React, {useEffect, useRef, useState} from "react";
import {Button, Drawer, message, Spin, Table} from "antd";
import {inject, observer} from "mobx-react";
import "./webPerfStyle.scss"
import webPerfTestDispatchStore from "../store/webPerfTestDispatchStore";

const WebPerformTestDrawer = (props) =>{
    const {webPerfExecute,exeResult,agentId} = webPerfTestDispatchStore;

    const [result, setResult] = useState();
    const [stepList, setStepList] = useState([]);

    let columns= [
        {
            title: '是否通过',
            width: '15%',
            dataIndex: 'result',
            render: (text, record) => (
                text===1
                    ?<div className={"history-item-result isSucceed"} style={{margin:0}}>通过</div>
                    :<div className={"history-item-result isFailed"} style={{margin:0}}>未通过</div>
            )
        },
        {
            title: '步骤数',
            width: '15%',
            dataIndex: 'stepNum',
        },
        {
            title: '通过数',
            width: '15%',
            dataIndex: 'passNum',
        },
        {
            title: '失败数',
            dataIndex: 'failNum',
            width: '15%',
        }, {
            title: '通过率',
            dataIndex: 'passRate',
            width: '15%',
        },
        {
            title: '耗时',
            dataIndex: 'totalDuration',
            width: '15%',
            render: (text) => (<div>{text}ms</div>)
        },

    ]


    let webPerfId = sessionStorage.getItem("webPerfId");
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(false);
    let ref = useRef(null)


    useEffect(()=>{
        if (start) {
            ref.current =  setInterval(()=>{
                exeResult(webPerfId).then(res=>{
                    if (res.status === 2) {
                        clearInterval(ref.current)
                        setStart(false)
                        setLoading(false)
                    }
                    setResult(res.webPerfInstance)
                    setStepList(res.webSceneInstanceList)
                })
            },5000);
        }
        return () => ref.current = null
    },[start])


    const showDrawer = () =>{
        webPerfExecute(webPerfId)

        setLoading(true)
        setVisible(true);
        setStart(true)
    }


    const onClose = () => {
        setVisible(false);
        setLoading(true)
        setStart(false)
    };

    return(
        <>
            <Button className={"important-btn"} onClick={showDrawer}>测试</Button>
            <Drawer
                title="测试结果"
                placement={"right"}
                onClose={onClose}
                visible={visible}
                width={1240}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 52px)"}}
            >
                <div  className={"result-spin-box"}>
                    <Spin spinning={loading}>
                        <div className={"history-detail history-detail-box"}>
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
                                <div className='table-list-box' style={{margin:"10px"}}>
                                    <Table
                                        columns={columns}
                                        dataSource={stepList}
                                        rowKey={record => record.id}
                                        pagination={false}
                                    />
                                </div>

                            </div>
                        </div>
                    </Spin>
                </div>
            </Drawer>

        </>
    )
}

export default observer(WebPerformTestDrawer);