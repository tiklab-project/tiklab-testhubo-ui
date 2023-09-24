import React, {useEffect, useRef, useState} from "react";
import {Empty, Spin, Table} from "antd";
import {inject, observer} from "mobx-react";

import emptyImg from "../../../../../assets/img/empty.png";
import apiPerfTestDispatchStore from "../store/apiPerfTestDispatchStore";

const ApiPerfExecuteTestCommon = (props) =>{
    const {apiEnvStore,apiPerfId,setStart,start} = props;
    const {apiPerfExecute,exeResult} = apiPerfTestDispatchStore;
    const {envUrl} = apiEnvStore;

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
            dataIndex: 'testNumber',
        },
        {
            title: '通过数',
            width: '15%',
            dataIndex: 'passNumber',
        },
        {
            title: '失败数',
            dataIndex: 'failNumber',
            width: '15%',
        }, {
            title: '通过率',
            dataIndex: 'passRate',
            width: '15%',
        },
        {
            title: '耗时',
            dataIndex: 'elapsedTime',
            width: '15%',
            render: (text, record) => (<div>{text}ms</div>)
        },

    ]
    let ref = useRef(null)
    const [spinning, setSpinning] = useState(true);

    useEffect(()=>{
        if (start) {
            ref.current =  setInterval(()=>{
                //获取结果
                exeResult(apiPerfId,envUrl).then(res=>{
                    //状态为2:结束
                    if (res.status === 2) {
                        clearInterval(ref.current)
                        setStart(false)
                        setSpinning(false)
                    }
                    setResult(res.apiPerfInstance)
                    setStepList(res.apiSceneInstanceList)
                })
            },1000);
        }
        return () => ref.current = null
    },[start])


    return(
        <div  className={"result-spin-box"}>
            <Spin spinning={spinning}>
                <div className={"history-detail history-detail-box"}>
                    <div className={"history-detail-all"}>
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
                        <div style={{fontWeight:"bold",padding:"6px"}}>场景列表</div>
                        <div className='table-list-box' style={{margin: "10px"}}>
                            <Table
                                columns={columns}
                                dataSource={stepList}
                                rowKey={record => record.id}
                                pagination={false}
                                locale={{
                                    emptyText: <Empty
                                        imageStyle={{ height: 120}}
                                        description={<span>暂无测试步骤</span>}
                                        image={emptyImg}
                                    />,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    )
}

export default inject("apiEnvStore")(observer(ApiPerfExecuteTestCommon));