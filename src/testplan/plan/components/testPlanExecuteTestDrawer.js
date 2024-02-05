import React, {useEffect, useRef, useState} from "react";
import {Drawer, Empty, Spin, Table, Tag} from "antd";
import {inject, observer} from "mobx-react";
import {messageFn} from "../../../common/messageCommon/MessageCommon";
import emptyImg from "../../../assets/img/empty.png";
import {showCaseTypeTable,  showTestTypeView} from "../../../common/caseCommon/CaseCommonFn";
import {Axios} from "thoughtware-core-ui";
import CaseBread from "../../../common/CaseBread";
import {LoadingOutlined} from "@ant-design/icons";


const TestPlanExecuteTestDrawer = (props) =>{
    const {apiEnvStore,appEnvStore,webEnvStore,testPlanStore} = props;
    const {envUrl} = apiEnvStore
    const {appEnv} = appEnvStore
    const {webEnv} = webEnvStore
    const {setTestDrawerVisible,testDrawerVisible} = testPlanStore

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
            render: (text) =>(<div className={"case-table-case-type"}>{showCaseTypeTable(text)}</div>)
        },
        {
            title: '是否通过',
            width: 150,
            dataIndex: 'result',
            render: (text, record) => (showCaseResult(record))
        },
    ]


    const testPlanId = sessionStorage.getItem('testPlanId')
    let repositoryId = sessionStorage.getItem("repositoryId")
    const [result, setResult] = useState();
    const [start, setStart] = useState(false);
    const [testPlanInstanceInfo, setTestPlanInstanceInfo] = useState();
    let ref = useRef(null)

    useEffect( ()=>{
        if(testDrawerVisible){
             showModal()
        }
    },[testDrawerVisible])

    useEffect(()=>{
        if (start) {
            ref.current =  setInterval(()=>{
                // setSpinning(true)

                let param = new FormData()
                param.append("testPlanId", testPlanId)
                Axios.post("/testPlanTestDispatch/exeResult",param).then(res=>{
                    if(res.code===0){
                        if (res.data.status === 0) {
                            messageFn("success","执行完毕")
                            clearInterval(ref.current)
                            setStart(false)

                            //最后一次执行清楚后端缓存数据
                            Axios.post("/testPlanTestDispatch/cleanUpExecutionData",param)
                        }

                        setSpinning(false)
                        setTestPlanInstanceInfo(res.data.testPlanInstance)
                        setResult(res.data)
                        setCaseList(res.data.testPlanCaseInstanceList)
                    }else {
                        setTestDrawerVisible(false)
                        setStart(false)
                        clearInterval(ref.current)

                        let msg = res.msg
                        let errorMsg;
                        if(msg){
                            if(msg.includes("Could not connect")){
                                errorMsg="无法连接agent"
                            }

                            if(msg.includes("配置agent")){
                                errorMsg="不是内嵌agent，请到设置中配置agent"
                            }
                        }else {
                            errorMsg="执行失败"
                        }


                        return messageFn("error",errorMsg)
                    }
                })
            },1000);

            setSpinning(true)
        }
        return () => ref.current = null
    },[start])

    const showModal =  () =>{
        let params = {
            apiEnv: envUrl,
            testPlanId:testPlanId,
            repositoryId:repositoryId,
            appEnv:appEnv,
            webEnv:webEnv,
        }

        Axios.post("/testPlanTestDispatch/execute",params)
        setStart(true)
    }

    const onClose = () => {
        setTestDrawerVisible(false);
        setCaseList([])
        setSpinning(true)
        setResult(null)
        setTestPlanInstanceInfo(null)
    };


    const showCaseResult = (record)=>{
        //状态为 1 说明正在执行
        switch (record.status) {
            case 0:
                return showResult(record.result)
            case 1:
                return <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} />
            default:
                return <Tag color="error">状态异常</Tag>
        }
    }

    const showResult = (type)=>{
        if(type){
            return <Tag color="success">通过</Tag>
        }else{
            return <Tag color="error">未通过</Tag>
        }
    }


    return(
        <>
            <Drawer
                placement="right"
                onClose={onClose}
                visible={testDrawerVisible}
                width={900}
                destroyOnClose={true}
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
                closable={false}
            >
                <Spin spinning={spinning}>
                    <CaseBread breadItem={["测试"]} icon={"ceshi"}/>
                    <div className={"unit-instance-detail"}>
                        <div className={"header-item"}>测试详情</div>
                        <div className={"history-detail-all-box"}>
                            <div className={"history-detail-all-item"}>
                                <div>测试结果</div>
                                <div className={"history-detail-all-item-value"}>
                                    {
                                        result?.status===1
                                            ? <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} />
                                            : <>
                                                {
                                                    testPlanInstanceInfo?.result===1&&"成功"
                                                }
                                                {
                                                    testPlanInstanceInfo?.result===0&&"失败"
                                                }
                                            </>
                                    }
                                </div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>可执行用例</div>
                                <div className={"history-detail-all-item-value"}>{testPlanInstanceInfo?.total}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>测试通过率</div>
                                <div className={"history-detail-all-item-value"}>{testPlanInstanceInfo?.passRate}</div>
                            </div>

                            <div className={"history-detail-all-item"}>
                                <div>通过步骤数</div>
                                <div className={"history-detail-all-item-value"}>{testPlanInstanceInfo?.passNum}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>未通过步骤数</div>
                                <div className={"history-detail-all-item-value"}>{testPlanInstanceInfo?.failNum}</div>
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

export default inject("apiEnvStore","appEnvStore","webEnvStore","testPlanStore")(observer(TestPlanExecuteTestDrawer));