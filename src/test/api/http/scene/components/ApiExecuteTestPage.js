import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import apiSceneTestDispatchStore from "../store/apiSceneTestDispatchStore";
import {TextMethodType} from "../../common/methodType";
import {Drawer, Spin, Tabs, Tag} from "antd";
import ResponseBodyCommon from "../../common/response/responseBodyCommon";
import ResHeaderCommon from "../../common/response/resHeaderCommon";
import {processResHeader} from "../../common/response/testResponseFnCommon";
import EmptyTip from "../../common/instance/emptyTip";
import TabPane from "antd/es/tabs/TabPane";
import CaseBread from "../../../../../common/CaseBread";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import {messageFn} from "../../../../../common/messageCommon/MessageCommon";
import IfInstance from "../../../../common/ifJudgment/components/ifInstance";

const { apiSceneExecute } = apiSceneTestDispatchStore;

const ApiExecuteTestPage = (props) =>{
    const { apiEnvStore} = props;
    const { envUrl } =apiEnvStore;

    const repositoryId = sessionStorage.getItem("repositoryId")
    const apiSceneId = sessionStorage.getItem('apiSceneId')
    const [allData, setAllData] = useState();
    const [stepList, setStepList] = useState([]);
    const [selected, setSelected] = useState();
    const [selectedStepData, setSelectedStepData] = useState();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const showDrawer = async () => {
        if(envUrl){
            const param = {
                apiSceneCase:{id:apiSceneId},
                apiEnv:envUrl,
                repositoryId:repositoryId
            }
            apiSceneExecute(param).then(res=>{
                setAllData(res.apiSceneInstance);
                setStepList(res.stepCommonInstanceList)

                setLoading(false);
            })

            setOpen(true);
        }else {
            messageFn("error","请选择环境")
        }
    };

    const onClose = () => {
        setOpen(false);
    };

    const clickFindInstance = index =>{
        setSelected(index)

        setSelectedStepData(stepList.find((item,listIndex)=>listIndex=== index))
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

    /**
     * 左侧步骤实例列表
     * @param data
     * @returns {*}
     */
    const showStepListView = (data) =>{
        return data&&data.map((item,index)=>{
            let apiUnitInstance = item.apiUnitInstance
            let ifJudgmentInstance = item.ifJudgmentInstance;

            if(apiUnitInstance!=null){
                return (
                    <div
                        className={`history-item ${selected===index?"history-item-selected":""}`}
                        key={index}
                        onClick={()=> {
                            if(item.result===2){return}
                            clickFindInstance(index)
                        }}
                    >
                        {showResult(item.result)}
                        <div className='history-item-detail'>
                            <div  style={{overflow: "hidden",textOverflow: "ellipsis"}}>{apiUnitInstance?.apiUnit?.path}</div>
                            <div>
                                <TextMethodType type={apiUnitInstance?.requestInstance?.requestType} />
                                {/*<span style={{margin:" 0 10px 0 0"}}>{item?.requestInstance?.requestType}</span>*/}
                                {
                                    apiUnitInstance?.requestInstance?.elapsedTime
                                        ?<span>{apiUnitInstance?.requestInstance?.elapsedTime}ms</span>
                                        :null
                                }
                            </div>
                        </div>
                    </div>
                )
            }

            if(ifJudgmentInstance!=null){
                return (
                    <div
                        className={`history-item ${selected===index?"history-item-selected":""}`}
                        key={index}
                        onClick={()=> {
                            if(item.result===2){return}
                            clickFindInstance(index)
                        }}
                    >
                        {showResult(item.result)}
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
     * 右侧类容
     * @returns {JSX.Element}
     */
    const showStepInstanceView = () =>{
        if(selectedStepData){
            let apiUnitInstance = selectedStepData.apiUnitInstance
            let ifJudgmentInstance = selectedStepData.ifJudgmentInstance;

            if(selectedStepData?.type==="api-scene"){
                return (
                    <div style={{margin:"0 10px",overflow: "auto",height: "calc( 100% - 48px )"}}>
                        <div >
                            <div className={"history-detail-item-box"}>
                                <div style={{width:"70px",fontSize:13,color:"#a3a3a3"}}>
                                    <span className={"history-detail-item-box-title"}>请求地址</span>
                                </div>
                                <span className={"history-detail-item-box-value"}>{apiUnitInstance?.requestInstance?.requestUrl}</span>
                            </div>
                            <div className={"history-detail-item-box"}>
                                <div style={{width:"70px",fontSize:13,color:"#a3a3a3"}}>
                                    <span className={"history-detail-item-box-title"}>请求方式</span>
                                </div>
                                <TextMethodType type={apiUnitInstance?.requestInstance?.requestType} />
                            </div>
                            <div className={"history-detail-item-box"}>
                                <div style={{width:"70px",fontSize:13,color:"#a3a3a3"}}>
                                    <span className={"history-detail-item-box-title"}>状态码</span>
                                </div>
                                <span className={"history-detail-item-box-value"}>{apiUnitInstance?.statusCode}</span>
                            </div>
                            <div className={"history-detail-item-box"}>
                                <div style={{width:"70px",fontSize:13,color:"#a3a3a3"}}>
                                    <span className={"history-detail-item-box-title"}>测试结果</span>
                                </div>
                                <span className={"history-detail-item-box-value"}>{apiUnitInstance?.result ? '成功' : '失败'}</span>
                            </div>
                            <div className={"history-detail-item-box"}>
                                <div style={{width:"70px",fontSize:13,color:"#a3a3a3"}}>
                                    <span className={"history-detail-item-box-title"}>用时</span>
                                </div>
                                <span className={"history-detail-item-box-value"}>{apiUnitInstance?.elapsedTime}</span>
                            </div>
                        </div>

                        <Tabs defaultActiveKey="1"  >
                            <TabPane tab="响应体" key="1">
                                <ResponseBodyCommon
                                    responseBodyData={apiUnitInstance?.responseInstance?.responseBody}
                                />
                            </TabPane>
                            <TabPane tab="响应头" key="2">
                                <ResHeaderCommon
                                    headers={processResHeader(apiUnitInstance?.responseInstance?.responseHeader)}
                                />
                            </TabPane>
                            <TabPane tab="请求头" key="3">
                                <ResHeaderCommon
                                    headers={processResHeader(apiUnitInstance?.requestInstance?.requestHeader)}
                                />
                            </TabPane>
                        </Tabs>
                    </div>
                )
            }

            if(selectedStepData?.type==="if"){
                return <IfInstance ifInstance={ifJudgmentInstance}/>
            }
        }else {
            return <EmptyTip />
        }
    }

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
                width={900}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 50px)"}}
                closable={false}
            >
                <div style={{height: "calc(100% - 35px)"}}>
                    <CaseBread
                        title={"接口场景测试"}
                        icon={"jiekou1"}
                        setOpen={setOpen}
                    />
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
                                            showStepInstanceView()
                                        }
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

export default inject("apiEnvStore")(observer(ApiExecuteTestPage))