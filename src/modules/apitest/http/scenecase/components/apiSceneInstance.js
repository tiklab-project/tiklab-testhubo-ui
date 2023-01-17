import React, {useEffect, useState} from "react";
import BackCommon from "../../../../common/backCommon";
import {inject, observer} from "mobx-react";
import {processResHeader} from "../../common/response/testResponseFnCommon";
import {TextMethodType} from "../../common/methodType";
import EmptyTip from "../../common/instance/emptyTip";
import IconCommon from "../../../../common/iconCommon";
import ResponseCommon from "../../common/response/responseCommon";


const ApiSceneInstance = (props) =>{
    const {apiSceneInstanceStore,apiUnitInstanceStore} = props;
    const {
        findApiSceneInstanceList,
        apiSceneInstanceList,
        findApiSceneInstance,
        deleteApiSceneInstance
    } = apiSceneInstanceStore;
    const {findApiUnitInstance} = apiUnitInstanceStore;

    let apiSceneId = sessionStorage.getItem("apiSceneId");

    useEffect(()=>{
        findApiSceneInstanceList(apiSceneId)
    },[apiSceneId])

    const [selected, setSelected] = useState();
    const [sceneInstanceData, setSceneInstanceData] = useState();
    const [stepSelect, setStepSelect] = useState();
    const [stepData, setStepData] = useState();

    //查询当前历史项
    const clickFindInstance = id =>{
        setSelected(id)
        findApiSceneInstance(id).then(res=>{
            setSceneInstanceData(res)
        })
        setStepSelect(null)
        setStepData(null)
    }

    //点击步骤
    const clickFindStep = id =>{
        setStepSelect(id)
        findApiUnitInstance(id).then(res=>{
            setStepData(res)
        })
    }

    //删除历史
    const deleteFn = (id)=>{
        deleteApiSceneInstance(id).then(()=> findApiSceneInstanceList(apiSceneId))
    }

    //历史列表项
    const showInstanceListView = (data) =>{
        return data&&data.map(item=>{
            return (
                <div className={"history-item-box"}>
                    <div
                        className={`history-item ${selected===item.id?"history-item-selected":""}`}
                        key={item.id}
                        onClick={()=>clickFindInstance(item.id)}
                    >
                        {
                            item.result===1
                                ?<div className='history-item-result isSucceed'>通过</div>
                                :<div className='history-item-result isFailed'>未通过</div>
                        }
                        <div className='history-item-detail'>
                            <div>{item?.createTime}</div>
                            <span>{item.createUser?.name}</span>
                            <div>步骤数:{item?.testNumber}</div>
                        </div>

                    </div>
                    <IconCommon
                        style={{"top": "22px"}}
                        icon={"shanchu1"}
                        className={"history-delete-icon icon-s"}
                        onClick={()=>deleteFn(item.id)}
                    />
                </div>
            )
        })
    }

    //展示步骤列表
    const showStepListView = (data)=>{
        return data&&data.map(item=>{
            return(
                <div
                    className={`history-step-item ${stepSelect===item.id?"history-item-selected":""}`}
                    key={item.id}
                    onClick={()=>clickFindStep(item.id)}
                >
                    {
                        item.result===1
                            ?<div className='history-item-result isSucceed'>通过</div>
                            :<div className='history-item-result isFailed'>未通过</div>
                    }
                    <div>{item.name}</div>
                </div>
            )
        })
    }

    //返回场景详情页
    const toUnitDetail =()=>{
        props.history.push("/repositorypage/testcase/api-scene-detail")
    }


    //响应结果基础信息项
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
            title:"测试时间:",
            value:stepData?.createTime,
            key:"testTime"
        },
    ]


    //响应结果基础信息展示
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

    return(
        <>
            <BackCommon clickBack={toUnitDetail}/>
            <div className={"scene-instance-contant"}>
                <div className={"test-detail-history"}>
                    <div className={"header-item"}>历史列表</div>
                    <div className={"history-list"}>
                        {
                            showInstanceListView(apiSceneInstanceList)
                        }
                    </div>
                </div>

                {
                    sceneInstanceData
                        ?<div className={"history-detail history-detail-box"}>
                            <div className={"history-detail-all"}>
                                <div className={"header-item"}>测试总详情</div>
                                <div className={"history-detail-all-box"}>
                                    <div className={"history-detail-all-item"}>
                                        <div>测试结果</div>
                                        <div className={"history-detail-all-item-value"}>{sceneInstanceData?.result===1?"成功":"失败"}</div>
                                    </div>
                                    <div className={"history-detail-all-item"}>
                                        <div>耗时</div>
                                        <div className={"history-detail-all-item-value"}>{sceneInstanceData?.elapsedTime}ms</div>
                                    </div>
                                    <div className={"history-detail-all-item"}>
                                        <div>步骤数</div>
                                        <div className={"history-detail-all-item-value"}>{sceneInstanceData?.testNumber}</div>
                                    </div>
                                    <div className={"history-detail-all-item"}>
                                        <div>测试通过率</div>
                                        <div className={"history-detail-all-item-value"}>{sceneInstanceData?.passRate}</div>
                                    </div>

                                    <div className={"history-detail-all-item"}>
                                        <div>通过步骤数</div>
                                        <div className={"history-detail-all-item-value"}>{sceneInstanceData?.passNumber}</div>
                                    </div>
                                    <div className={"history-detail-all-item"}>
                                        <div>未通过步骤数</div>
                                        <div className={"history-detail-all-item-value"}>{sceneInstanceData?.failNumber}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={"history-item-box"}>
                                <div className={"scene-step-contant"}>
                                    <div className={"header-item"}>步骤列表</div>
                                    <div>
                                        {
                                            showStepListView(sceneInstanceData?.stepList)
                                        }
                                    </div>
                                </div>
                                <div className={"scene-step-detail"}>
                                    <div className={"header-item"}>场景详情</div>
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
                        :<EmptyTip />
                }


            </div>

        </>
    )
}

export default inject("apiSceneInstanceStore","apiUnitInstanceStore")(observer(ApiSceneInstance));