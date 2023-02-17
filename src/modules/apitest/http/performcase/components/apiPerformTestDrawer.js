import React, {useEffect, useRef, useState} from "react";
import {Button, Drawer, Empty, Spin, Table} from "antd";
import {inject, observer} from "mobx-react";
import "./performanceStyle.scss"
import emptyImg from "../../../../../assets/img/empty.png";
import {messageFn} from "../../../../common/messageCommon/messageCommon";

const ApiPerformTestDrawer = (props) =>{
    const {apiPerfTestDispatchStore,apiEnvStore} = props;
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

    let apiPerfId = sessionStorage.getItem("apiPerfId");

    let ref = useRef(null)
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(false);


    useEffect(()=>{
        if (start) {
            ref.current =  setInterval(()=>{
                exeResult(apiPerfId,envUrl).then(res=>{
                    if (res.status === 2) {
                        clearInterval(ref.current)
                        setStart(false)
                        setLoading(false)
                    }
                    setResult(res.apiPerfInstance)
                    setStepList(res.apiSceneInstanceList)
                })
            },1000);
        }
        return () => ref.current = null
    },[start])


    const showDrawer = async () =>{
        if(envUrl){
            setVisible(true);

            apiPerfExecute(apiPerfId,envUrl);
            setStart(true)
            // if(res.code===0){
            //
                setLoading(true)
            // }else {
            //     messageFn("error","Agent执行错误！")
            // }

        }else {
            messageFn("error","请选择环境地址")
        }

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
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
            >
                <div  className={"result-spin-box"}>
                    <Spin spinning={loading}>
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
            </Drawer>
        </>
    )
}

export default inject("apiPerfTestDispatchStore","apiEnvStore")(observer(ApiPerformTestDrawer));