import React, {useState} from "react";
import {processResHeader} from "../../common/response/testResponseFnCommon";
import EmptyTip from "../../common/instance/emptyTip";
import {TextMethodType} from "../../common/methodType";
import ResponseCommon from "../../common/response/responseCommon/responseCommon";
import {observer} from "mobx-react";
import apiUnitInstanceStore from "../../unit/store/apiUnitInstanceStore";
import {Tag} from "antd";
import IfInstance from "../../../../common/ifJudgment/components/ifInstance";

const ApiSceneInstanceDetail = (props) =>{
    const {allData} = props
    const {findApiUnitInstance} = apiUnitInstanceStore;


    const [stepSelect, setStepSelect] = useState();
    const [stepData, setStepData] = useState();
    const [ifInstance, setIfInstance] = useState();
    const [stepType, setStepType] = useState();


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
            value:stepData?.statusCode||"无",
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
    const clickFindStep = item =>{
        setStepSelect(item.id)

        if(item.type==="if"){
            setIfInstance(item.ifJudgmentInstance)
        }

        if(item.type==="api-scene"){
            findApiUnitInstance(item.id).then(res=>{
                setStepData(res)
            })
        }

        setStepType(item.type)
    }


    //展示步骤列表
    const showStepListView = (data)=>{
        return data&&data.map(item=>{
            let apiUnitInstance = item.apiUnitInstance;

            if(item.type==="api-scene"){
                return(
                    <div
                        style={{display:"flex",alignItems:"center"}}
                        className={`history-step-item ${stepSelect===item.id?"history-item-selected":""}`}
                        key={item.id}
                        onClick={()=> {
                            if(item.result===2){return}
                            clickFindStep(item)
                        }}
                    >
                        <div>{showResult(item.result)}</div>
                        <TextMethodType type={apiUnitInstance.apiUnit?.methodType} />
                        <div style={{overflow: "hidden",textOverflow: "ellipsis"}}>{apiUnitInstance.apiUnit?.path}</div>
                    </div>
                )
            }

            if(item.type==="if"){
                return(
                    <div
                        style={{display:"flex",alignItems:"center",gap:"3px"}}
                        className={`history-step-item  ${stepSelect===item.id?"history-item-selected":""}`}
                        key={item.id}
                        onClick={()=> {
                            if(item.result===2){return}
                            clickFindStep(item)
                        }}
                    >
                        <div>{showResult(item.result)}</div>
                        <div className='history-item-detail'>
                            <div  style={{overflow: "hidden",textOverflow: "ellipsis"}}>
                                <Tag color={"processing"}>if 条件判断</Tag>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    }

    /**
     * 右侧内容
     */
    const rightContent = () =>{
        if(!stepData) return

        switch (stepType) {
            case "api-scene":
                return(
                    <ResponseCommon
                        detail={showDetail(detail)}
                        reqHeader={processResHeader(stepData?.requestInstance?.requestHeader)}
                        resBody={stepData?.responseInstance?.responseBody}
                        resHeader={processResHeader(stepData?.responseInstance?.responseHeader)}
                        assertList={stepData?.responseInstance?.assertInstanceList}
                        error={stepData?.errMessage}
                    />
                )
            case "if":
                return <IfInstance ifInstance={ifInstance}/>
            default:
                return <EmptyTip />

        }
    }

    const showResult = (result) =>{
        if(result===0){
            return <div style={{background: "red",width: "8px",height: "8px",borderRadius: "50%"}}  />
        }

        if(result===1){
            return <div style={{background: "green",width: "8px",height: "8px",borderRadius: "50%"}} />
        }

        if(result===2){
            return <div style={{background: "grey",width: "8px",height: "8px",borderRadius: "50%"}}  />
        }
    }

    return(
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
                            showStepListView(allData?.stepCommonInstanceList)
                        }
                    </div>
                </div>
                <div className={"scene-step-detail"}>
                    <div className={"header-item"}>步骤详情</div>
                    {
                        rightContent()
                    }
                </div>
            </div>
        </div>
    )
}
export default observer(ApiSceneInstanceDetail);