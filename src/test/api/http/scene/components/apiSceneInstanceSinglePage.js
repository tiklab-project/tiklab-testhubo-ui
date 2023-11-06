import React, {useEffect, useState} from "react";
import {processResHeader} from "../../common/response/testResponseFnCommon";
import EmptyTip from "../../common/instance/emptyTip";
import {TextMethodType} from "../../common/methodType";
import ResponseCommon from "../../common/response/responseCommon";
import {observer} from "mobx-react";
import apiUnitInstanceStore from "../../unit/store/apiUnitInstanceStore";
import apiSceneInstanceStore from "../store/apiSceneInstanceStore";
import CaseBread from "../../../../../common/CaseBread";
import {Drawer} from "antd";

const ApiSceneInstanceSinglePage = (props) =>{
    const {apiSceneInstanceId,name} = props
    const { findApiSceneInstance } = apiSceneInstanceStore;
    const {findApiUnitInstance} = apiUnitInstanceStore;

    const [allData, setAllData] = useState();
    const [stepSelect, setStepSelect] = useState();
    const [stepData, setStepData] = useState();
    const [open, setOpen] = useState(false);

    const showDrawer = async () => {
        let res = await findApiSceneInstance(apiSceneInstanceId)
        setAllData(res)
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    };

    const detail = [
        {
            title:"请求地址:",
            value:stepData?.requestInstance?.requestUrl,
            key:"url"
        },{
            title:"请求方式:",
            value:stepData?.requestInstance?.requestType,
            key:"methodType"
        },{
            title:"状态码:",
            value:stepData?.statusCode,
            key:"statusCode"
        },{
            title:"测试结果:",
            value:stepData?.result ? '成功' : '失败',
            key:"result"
        },{
            title:"用时:",
            value:stepData?.elapsedTime+"ms",
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
                            ? <TextMethodType type={stepData?.requestInstance?.requestType} />
                            :<span className={"history-detail-item-box-value"}>{item.value}</span>
                    }

                </div>
            )
        })
    }

    //点击步骤
    const clickFindStep = id =>{
        setStepSelect(id)
        findApiUnitInstance(id).then(res=>{
            setStepData(res)
        })
    }


    //展示步骤列表
    const showStepListView = (data)=>{
        return data&&data.map(item=>{

            let apiUnitInstance = item.apiUnitInstance;
            return(
                <div
                    style={{display:"flex",alignItems:"center"}}
                    className={`history-step-item ${stepSelect===item.id?"history-item-selected":""}`}
                    key={item.id}
                    onClick={()=>clickFindStep(apiUnitInstance.id)}
                >
                    {
                        apiUnitInstance.result===1
                            ?<div style={{background: "green",width: "8px",height: "8px",borderRadius: "50%"}} />
                            :<div style={{background: "red",width: "8px",height: "8px",borderRadius: "50%"}}  />
                    }
                    <TextMethodType type={apiUnitInstance.apiUnit?.methodType} />
                    <div style={{overflow: "hidden",textOverflow: "ellipsis"}}>{apiUnitInstance.apiUnit?.path}</div>
                </div>
            )
        })
    }


    return(
        <>
            <a onClick={showDrawer} >{name}</a>
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                width={1000}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 52px)"}}
                closable={false}
            >
                <div className={"content-box-center"}  style={{height: "calc(100% - 52px)"}}>
                    <CaseBread
                        title={"历史详情"}
                        icon={"jiekou1"}
                        setOpen={setOpen}
                    />
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
                                        showStepListView(allData?.stepList)
                                    }
                                </div>
                            </div>
                            <div className={"scene-step-detail"}>
                                <div className={"header-item"}>步骤详情</div>
                                {
                                    stepData
                                        ?<ResponseCommon
                                            detail={showDetail(detail)}
                                            resBody={stepData?.responseInstance?.responseBody}
                                            resHeader={processResHeader(stepData?.responseInstance?.responseHeader)}
                                            reqHeader={processResHeader(stepData?.requestInstance?.requestHeader)}
                                        />
                                        :<EmptyTip />
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    )
}
export default observer(ApiSceneInstanceSinglePage);