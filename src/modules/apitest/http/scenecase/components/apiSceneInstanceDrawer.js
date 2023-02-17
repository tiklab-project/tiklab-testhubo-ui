import React, {useState} from "react";
import {Button, Drawer, Tabs} from "antd";
import {processResHeader} from "../../common/response/testResponseFnCommon";
import EmptyTip from "../../common/instance/emptyTip";
import {TextMethodType} from "../../common/methodType";
import ResponseCommon from "../../common/response/responseCommon";
import {inject, observer} from "mobx-react";
import IconCommon from "../../../../common/iconCommon";

const ApiSceneInstanceDrawer = (props) =>{
    const {apiSceneInstanceStore,apiUnitInstanceStore,apiSceneInstanceId} = props
    const { findApiSceneInstance } = apiSceneInstanceStore;
    const {findApiUnitInstance} = apiUnitInstanceStore;
    
    const [visible, setVisible] = useState(false);
    const [allData, setAllData] = useState();
    const [stepSelect, setStepSelect] = useState();
    const [stepData, setStepData] = useState();
    
    const showDrawer = async () =>{
        let res = await findApiSceneInstance(apiSceneInstanceId)

        setAllData(res)

        setVisible(true);
    }

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
                    className={`history-step-item ${stepSelect===item.id?"history-item-selected":""}`}
                    key={item.id}
                    onClick={()=>clickFindStep(apiUnitInstance.id)}
                >
                    {
                        apiUnitInstance.result===1
                            ?<div className='history-item-result isSucceed'>通过</div>
                            :<div className='history-item-result isFailed'>未通过</div>
                    }
                    <div>{item.name}</div>
                </div>
            )
        })
    }

    const onClose = () => {
        setVisible(false);
    };


    return(
        <>
            <a onClick={showDrawer} style={{fontWeight:"bold"}}>#{props.name}</a>
            <Drawer
                title="测试结果"
                placement={"right"}
                onClose={onClose}
                visible={visible}
                width={1240}
                destroyOnClose={true}
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
            >
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
            </Drawer>
        </>
    )
}
export default inject("apiSceneInstanceStore","apiUnitInstanceStore")(observer(ApiSceneInstanceDrawer));