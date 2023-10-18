import React, {useEffect, useRef, useState} from "react";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../../common/CaseBread";
import {Drawer, Empty, Spin, Table} from "antd";
import emptyImg from "../../../../../assets/img/empty.png";
import apiPerfTestDispatchStore from "../store/apiPerfTestDispatchStore";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import {messageFn} from "../../../../../common/messageCommon/MessageCommon";

const ApiPerfExecuteTestPage = (props) =>{
    const {apiEnvStore,apiPerfId} = props;

    const {apiPerfExecute,exeResult,apiPerfTestStatus} = apiPerfTestDispatchStore;
    const {envUrl} = apiEnvStore;

    let ref = useRef(null)
    const [spinning, setSpinning] = useState(true);
    const [result, setResult] = useState();
    const [stepList, setStepList] = useState([]);
    const [start, setStart] = useState(0)
    const [open, setOpen] = useState(false);

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

    useEffect(()=>{
        if (start=== 1) {
            ref.current =  setInterval(()=>{
                //获取结果
                exeResult(apiPerfId,envUrl).then(res=>{

                    setResult(res.apiPerfInstance)
                    setStepList(res.apiSceneInstanceList)

                    apiPerfTestStatus().then(res=>{
                        if(res.code!==0){
                            clearInterval(ref.current)
                            return
                        }
                        if(res.data===0){
                            clearInterval(ref.current)
                            setStart(0)
                            setSpinning(false)
                        }
                    })
                })
            },3000);
        }
        return () => ref.current = null
    },[start])

    const showDrawer = async () => {

        apiPerfTestStatus().then(res=>{
            if(res.code===0&&res.data===0){
                apiPerfExecute(apiPerfId,envUrl)
                setStart(1)
            }
        })

        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return(
        <>
            <a onClick={showDrawer}>
                <IconBtn
                    className="important-btn"
                    icon={"fasong-copy"}
                    name={"测试"}
                />
            </a>
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                width={"70%"}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
                closable={false}
            >
                <div className={"content-box-center"}>
                    <CaseBread
                        title={"接口性能测试"}
                        icon={"jiekou1"}
                        setOpen={setOpen}
                    />
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
                </div>
            </Drawer>
        </>
    )
}

export default inject('apiPerfStore',"apiEnvStore")(observer(ApiPerfExecuteTestPage))