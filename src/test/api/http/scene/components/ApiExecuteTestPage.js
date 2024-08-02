import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import apiSceneTestDispatchStore from "../store/apiSceneTestDispatchStore";
import {TextMethodType} from "../../common/methodType";
import {Drawer, Form, Select, Spin, Tag, Tooltip} from "antd";
import {processResHeader} from "../../common/response/testResponseFnCommon";
import EmptyTip from "../../common/instance/emptyTip";
import CaseBread from "../../../../../common/CaseBread";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import {messageFn} from "../../../../../common/messageCommon/MessageCommon";
import IfInstance from "../../../../common/ifJudgment/components/ifInstance";
import ResponseCommon from "../../common/response/responseCommon/responseCommon";
import {LoadingOutlined} from "@ant-design/icons";
import CaseTableQuickTest from "../../../../common/CaseTableQuickTest/CaseTableQuickTest";
import {findCaseInstancePage} from "../../../../../testreport/common/instanceCommonFn";
import {CASE_TYPE} from "../../../../../common/dictionary/dictionary";
const {Option} = Select
const { apiSceneExecute } = apiSceneTestDispatchStore;

const ApiExecuteTestPage = (props) =>{
    const { apiEnvStore,stepNum,type,apiSceneId,apiSceneStore} = props;
    const {findApiEnvList,apiEnvList,getTestEnvUrl,envUrl} = apiEnvStore;
    const {findApiScene} = apiSceneStore;
    const repositoryId = sessionStorage.getItem("repositoryId")
    const [allData, setAllData] = useState();
    const [stepList, setStepList] = useState([]);
    const [selected, setSelected] = useState();
    const [selectedStepData, setSelectedStepData] = useState();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const showDrawer = async () => {
        if(stepNum===0){
            messageFn("warning","添加步骤")
            return
        }

        if(envUrl){
            const param = {
                apiSceneCase:{id:apiSceneId},
                apiEnv:envUrl,
                repositoryId:repositoryId
            }
            apiSceneExecute(param).then(res=>{
                if(res.code===0){

                    setAllData(res.data.apiSceneInstance);
                    setStepList(res.data.stepCommonInstanceList)

                    setLoading(false);
                    setOpen(true);

                    findApiScene(apiSceneId)
                    findCaseInstancePage(apiSceneId,CASE_TYPE.API_SCENE)
                }else {
                    let msg = res.msg
                    let errorMsg
                    if(msg) {
                        errorMsg = msg.split(":")[1]
                        if (errorMsg.includes("Could not connect")) {
                            errorMsg = "无法连接agent"
                        } else {
                            errorMsg = "执行异常"
                        }
                    }else {
                        errorMsg = "执行异常"
                    }
                    return messageFn("error",errorMsg)
                }
            })
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
                        <div>{showResult(item.result)}</div>
                        <TextMethodType type={apiUnitInstance?.requestInstance?.requestType} />
                        <div  style={{overflow: "hidden",textOverflow: "ellipsis"}}>
                            {apiUnitInstance?.apiUnit?.path}
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
     * 右侧类容
     * @returns {JSX.Element}
     */
    const showStepInstanceView = () =>{
        if(selectedStepData){
            let apiUnitInstance = selectedStepData.apiUnitInstance
            let ifJudgmentInstance = selectedStepData.ifJudgmentInstance;

            //响应结果基础信息项
            const detail = [
                {
                    title:"请求地址:",
                    value:apiUnitInstance?.requestInstance?.requestUrl,
                    key:"url"
                },{
                    title:"请求方式:",
                    value:apiUnitInstance?.requestInstance?.requestType,
                    key:"methodType"
                },{
                    title:"状态码:",
                    value:apiUnitInstance?.statusCode||"无",
                    key:"statusCode"
                },{
                    title:"测试结果:",
                    value:apiUnitInstance?.result ? '成功' : '失败',
                    key:"result"
                },
            ]

            const showDetail = (data) =>{
                return data.map(item=>{
                    return(
                        <div key={item.key} className={"history-detail-item-box"}>
                            <div style={{width:"72px",fontSize:13,color:"#a3a3a3"}}>
                                <span className={"history-detail-item-box-title"}>{item.title}</span>
                            </div>

                            {
                                item.key==="methodType"
                                    ? <TextMethodType type={apiUnitInstance?.requestInstance?.requestType} />
                                    :<span className={"history-detail-item-box-value"}>{item.value}</span>
                            }

                        </div>
                    )
                })
            }

            if(selectedStepData?.type==="api-scene"){
                return (
                    <ResponseCommon
                        detail={showDetail(detail)}
                        resBody={apiUnitInstance?.responseInstance?.responseBody}
                        resHeader={processResHeader(apiUnitInstance?.responseInstance?.responseHeader)}
                        assertList={apiUnitInstance?.responseInstance?.assertInstanceList}
                        reqHeader={processResHeader(apiUnitInstance?.requestInstance?.requestHeader)}
                        error={apiUnitInstance?.errMessage}
                    />
                )
            }

            if(selectedStepData?.type==="if"){
                return <IfInstance ifInstance={ifJudgmentInstance}/>
            }
        }else {
            return <EmptyTip />
        }
    }

    const findEnv = () =>{
        findApiEnvList(sessionStorage.getItem("repositoryId"))
        form.setFieldsValue({
            host:envUrl
        })
    }

    const showEnv = () =>{
        return  <Form.Item
            label="接口环境"
            rules={[{ required: true, message:"请选择环境"}]}
            name="host"
        >
            <Select
                bordered={false}
                className={"quartz-select-box"}
                placeholder={"未设置环境"}
                style={{width:"280px"}}
                dropdownStyle={{zIndex:1800}}
                onSelect={(value)=>getTestEnvUrl(value)}
                onClick={(e) => e.stopPropagation()}
            >
                {
                   apiEnvList&&apiEnvList.map(item=>{
                       return (
                           <Option key={item.id} value={item.preUrl}>
                              <Tooltip placement="leftTop" title={item.preUrl}> {item.name} </Tooltip>
                           </Option>
                      )
                   })
               }
            </Select>
        </Form.Item>
    }

    const showIcon=() =>{
        if(type==="quick"){
            return <CaseTableQuickTest
                form={form}
                findEnv={findEnv}
                clickTest={showDrawer}
                envSelect={showEnv}
            />
        }

        return<a onClick={showDrawer}>
            <IconBtn
                className="important-btn"
                type="primary"
                name={"测试"}
            />
        </a>;
    }


    return(
        <>
            {showIcon()}
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                width={900}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                //contentWrapperStyle={{top:48,height:"calc(100% - 40px)"}}
                closable={false}
            >
                <div style={{height: "calc(100% - 35px)"}}>
                    <CaseBread
                        breadItem={["接口场景测试"]}
                        icon={"api1"}
                        setOpen={setOpen}
                    />
                    <div  className={"result-spin-box"}>
                        <Spin spinning={loading}>
                            <div className={"history-detail history-detail-box"}>
                                <div className={"history-detail-all"}>
                                    <div className={"history-detail-all-box"}>
                                        <div className={"history-detail-all-item"}>
                                            <div>测试结果</div>
                                            <div className={"history-detail-all-item-value"}>
                                                {
                                                    allData?.status===1
                                                        ? <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} />
                                                        : <>
                                                            {
                                                                allData?.result===1&&"成功"
                                                            }
                                                            {
                                                                allData?.result===0&&"失败"
                                                            }
                                                        </>
                                                }
                                            </div>
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

export default inject("apiEnvStore","apiSceneStore")(observer(ApiExecuteTestPage))