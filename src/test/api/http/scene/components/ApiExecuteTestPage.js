import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";
import apiSceneTestDispatchStore from "../store/apiSceneTestDispatchStore";
import {TextMethodType} from "../../common/methodType";
import {Spin, Tabs} from "antd";
import ResponseBodyCommon from "../../common/response/responseBodyCommon";
import ResHeaderCommon from "../../common/response/resHeaderCommon";
import {processResHeader} from "../../common/response/testResponseFnCommon";
import EmptyTip from "../../common/instance/emptyTip";
import TabPane from "antd/es/tabs/TabPane";

const { apiSceneExecute } = apiSceneTestDispatchStore;

const ApiExecuteTestPage = (props) =>{
    const { apiEnvStore} = props;
    const { envUrl } =apiEnvStore;

    const apiSceneId = sessionStorage.getItem('apiSceneId')
    const [allData, setAllData] = useState();
    const [stepList, setStepList] = useState([]);
    const [selected, setSelected] = useState();
    const [selectedStepData, setSelectedStepData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        apiSceneExecute(apiSceneId, envUrl).then(res=>{
            setAllData(res.apiSceneInstance);
            setStepList(res.apiUnitInstanceList)

            setLoading(false);
        })
    },[])

    const clickFindInstance = index =>{
        setSelected(index)
        setSelectedStepData(stepList.find((item,index)=>index=== index))
    }

    const showStepListView = (data) =>{
        return data&&data.map((item,index)=>{
            return (
                <div className={`history-item ${selected===index?"history-item-selected":""}`} key={index} onClick={()=>clickFindInstance(index)}>
                    {
                        item.result===1
                            ?<div className='history-item-result '>
                                <div className={"isSucceed"}>通过</div>
                            </div>
                            :<div className='history-item-result '>
                                <div className={"isFailed"}>未通过</div>
                            </div>
                    }
                    <div className='history-item-detail'>
                        <div>{item.apiUnit.path}</div>
                        <div>
                            <TextMethodType type={item?.requestInstance?.requestType} />
                            {/*<span style={{margin:" 0 10px 0 0"}}>{item?.requestInstance?.requestType}</span>*/}
                            <span>{item.elapsedTime} ms</span>
                        </div>
                    </div>
                </div>

            )
        })
    }

    const detail = [
        {
            title:"请求地址:",
            value:selectedStepData?.requestInstance?.requestUrl,
            key:"url"
        },{
            title:"请求方式:",
            value:selectedStepData?.requestInstance?.requestType,
            key:"methodType"
        },{
            title:"状态码:",
            value:selectedStepData?.statusCode,
            key:"statusCode"
        },{
            title:"测试结果:",
            value:selectedStepData?.result ? '成功' : '失败',
            key:"result"
        },{
            title:"用时:",
            value:selectedStepData?.elapsedTime+"ms",
            key:"testTime"
        },
    ]

    const showDetail = (data) =>{
        return data.map(item=>{
            return(
                <div key={item.key} className={"history-detail-item-box"}>
                    <div style={{width:"70px",fontSize:13,color:"#a3a3a3"}}>
                        <span className={"history-detail-item-box-title"}>{item.title}</span>
                    </div>

                    {
                        item.key==="methodType"
                            ? <TextMethodType type={selectedStepData?.requestInstance?.requestType} />
                            :<span className={"history-detail-item-box-value"}>{item.value}</span>
                    }

                </div>
            )
        })
    }

    const goBack = () =>{
        props.history.push(`/repository/testcase/api-scene/${apiSceneId}`)
    }

    return(
        <div className={"content-box-center"}>
            <div
                className={"breadcrumb-title_between"}
                style={{height:"36px"}}
            >
                <ArrowLeftOutlined onClick={goBack} style={{cursor:"pointer"}}/>

                <DrawerCloseIcon />
            </div>
            <div  className={"result-spin-box"}>
                <Spin spinning={loading}>
                    <div className={"history-detail history-detail-box"}>
                        <div className={"history-detail-all"}>
                            <div className={"history-detail-all-box"}>
                                <div className={"history-detail-all-item"}>
                                    <div>测试结果</div>
                                    <div className={"history-detail-all-item-value"}>{allData?.result===1?"成功":"失败"}</div>
                                </div>
                                <div className={"history-detail-all-item"}>
                                    <div>耗时</div>
                                    <div className={"history-detail-all-item-value"}>{allData?.elapsedTime}ms</div>
                                </div>
                                <div className={"history-detail-all-item"}>
                                    <div>步骤数</div>
                                    <div className={"history-detail-all-item-value"}>{allData?.testNumber}</div>
                                </div>
                                <div className={"history-detail-all-item"}>
                                    <div>测试通过率</div>
                                    <div className={"history-detail-all-item-value"}>{allData?.passRate}</div>
                                </div>

                                <div className={"history-detail-all-item"}>
                                    <div>通过步骤数</div>
                                    <div className={"history-detail-all-item-value"}>{allData?.passNumber}</div>
                                </div>
                                <div className={"history-detail-all-item"}>
                                    <div>未通过步骤数</div>
                                    <div className={"history-detail-all-item-value"}>{allData?.failNumber}</div>
                                </div>
                            </div>
                        </div>
                        <div className={"history-item-box"}>
                            <div className={"scene-step-contant"}>
                                <div className={"header-item"}>步骤列表</div>
                                <div>
                                    {
                                        showStepListView(stepList)
                                    }
                                </div>
                            </div>
                            <div className={"scene-step-detail"}>
                                <div className={"header-item"}>步骤详情</div>
                                {
                                    selectedStepData
                                        ?<div style={{margin:"0 10px",overflow: "auto",height: "calc( 100% - 48px )"}}>
                                            <div >{showDetail(detail)}</div>
                                            <Tabs defaultActiveKey="1"  >
                                                <TabPane tab="响应体" key="1">
                                                    <ResponseBodyCommon
                                                        responseBodyData={selectedStepData?.responseInstance?.responseBody}
                                                    />
                                                </TabPane>
                                                <TabPane tab="响应头" key="2">
                                                    <ResHeaderCommon
                                                        headers={processResHeader(selectedStepData?.responseInstance?.responseHeader)}
                                                    />
                                                </TabPane>
                                                <TabPane tab="请求头" key="3">
                                                    <ResHeaderCommon
                                                        headers={processResHeader(selectedStepData?.requestInstance?.requestHeader)}
                                                    />
                                                </TabPane>
                                            </Tabs>
                                        </div>
                                        :<EmptyTip />
                                }
                            </div>
                        </div>
                    </div>
                </Spin>
            </div>
        </div>

    )
}

export default inject("apiEnvStore")(observer(ApiExecuteTestPage))