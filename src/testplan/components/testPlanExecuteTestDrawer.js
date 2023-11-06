import React, {useEffect, useRef, useState} from "react";
import IconBtn from "../../common/iconBtn/IconBtn";
import {Drawer, Empty, Spin, Table} from "antd";
import {inject, observer} from "mobx-react";
import {messageFn} from "../../common/messageCommon/MessageCommon";
import emptyImg from "../../assets/img/empty.png";
import {showCaseTypeView, showTestTypeView} from "../../common/caseCommon/CaseCommonFn";
import {Axios} from "tiklab-core-ui";
import CaseBread from "../../common/CaseBread";


const TestPlanExecuteTestDrawer = (props) =>{
    const {apiEnvStore,appEnvStore,webEnvStore,testPlanId} = props;
    const {envUrl} = apiEnvStore
    const {appEnv} = appEnvStore
    const {webEnv} = webEnvStore


    const [visible, setVisible] = useState(false);
    const [spinning, setSpinning] = useState(true);
    const [caseList, setCaseList] = useState();


    let columns= [
        {
            title: '名称',
            width: '25%',
            dataIndex: 'name',
        },
        {
            title: '测试类型',
            width: '25%',
            dataIndex: 'testType',
            render: (text) =>(showTestTypeView(text))
        },
        {
            title: '用例类型',
            dataIndex: 'caseType',
            width: '25%',
            render: (text) =>(showCaseTypeView(text))
        },
        {
            title: '是否通过',
            width: 150,
            dataIndex: 'result',
            render: (text, record) => (
                text===1
                    ?<div className={"history-item-result isSucceed"} style={{margin:0}}>通过</div>
                    :<div className={"history-item-result isFailed"} style={{margin:0}}>未通过</div>
            )
        },
    ]

    let repositoryId = sessionStorage.getItem("repositoryId")
    const [result, setResult] = useState();
    const [start, setStart] = useState(false);
    let ref = useRef(null)

    useEffect(()=>{
        if (start) {
            ref.current =  setInterval(()=>{
                Axios.post("/testPlanTestDispatch/exeResult").then(res=>{
                    if(res.code===0){
                        if (res.data.status === 0) {
                            messageFn("success","执行完毕")

                            clearInterval(ref.current)

                            setStart(false)
                        }
                        setSpinning(false)
                        setResult(res.data.testPlanInstance)
                        setCaseList(res.data.testPlanCaseInstanceList)
                    }else {
                        setStart(false)
                    }

                })
            },1500);

            setSpinning(true)
        }
        return () => ref.current = null
    },[start])

    const showModal =  () =>{
        if(envUrl) {
            setVisible(true)

            let params = {
                apiEnv: envUrl,
                testPlanId:testPlanId,
                repositoryId:repositoryId,
                appEnv:appEnv,
                webEnv:webEnv,
            }

            Axios.post("/testPlanTestDispatch/execute",params)

            setStart(true)
        }else {
            messageFn("error","请选择环境")
        }
    }

    const onClose = () => {
        setVisible(false);
        setCaseList([])
        setSpinning(true)
        setResult(null)
    };

    return(
        <>
            <IconBtn
                className="important-btn"
                name={"测试"}
                onClick={showModal}
            />
            <Drawer
                placement="right"
                onClose={onClose}
                visible={visible}
                width={900}
                destroyOnClose={true}
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
                closable={false}
            >
                <Spin spinning={spinning}>
                    <CaseBread title={"测试"} icon={"ceshi"}/>
                    <div className={"unit-instance-detail"}>
                        <div className={"header-item"}>测试详情</div>
                        <div className={"history-detail-all-box"}>
                            <div className={"history-detail-all-item"}>
                                <div>测试结果</div>
                                <div className={"history-detail-all-item-value"}>{result?.result===1?"成功":"失败"}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>步骤数</div>
                                <div className={"history-detail-all-item-value"}>{result?.total}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>测试通过率</div>
                                <div className={"history-detail-all-item-value"}>{result?.passRate}</div>
                            </div>

                            <div className={"history-detail-all-item"}>
                                <div>通过步骤数</div>
                                <div className={"history-detail-all-item-value"}>{result?.passNum}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>未通过步骤数</div>
                                <div className={"history-detail-all-item-value"}>{result?.failNum}</div>
                            </div>
                        </div>
                        <div className={"header-item"}>用例列表</div>
                        <div className='table-list-box' style={{margin: "10px"}}>
                            <Table
                                columns={columns}
                                dataSource={caseList}
                                rowKey={record => record.id}
                                pagination={false}
                                locale={{
                                    emptyText: <Empty
                                        imageStyle={{ height: 120}}
                                        description={<span>暂无测试用例</span>}
                                        image={emptyImg}
                                    />,
                                }}
                            />
                        </div>
                    </div>
                </Spin>
            </Drawer>
        </>
    )
}

export default inject("apiEnvStore","appEnvStore","webEnvStore")(observer(TestPlanExecuteTestDrawer));