import React, {useEffect, useState} from "react";
import {applyJump} from "tiklab-core-ui";
import DemandSelect from "./DemandSelect";
import "./demandStyle.scss"
import {inject, observer} from "mobx-react";
import emptyImg from "../../../../assets/img/empty.png"
import {Descriptions} from "antd";
import IconBtn from "../../../../common/iconBtn/IconBtn";

/**
 * 关联需求
 */
const Demand = (props)=>{
    const {workItemId,workItemStore,caseInfo,updateFn} = props
    const {findWorkItem} =workItemStore

    const [demandInfo, setDemandInfo] = useState();
    const [showSelect, setShowSelect] = useState(false);
    const [binded, setBinded] = useState(false);

    useEffect(()=>{
        if(workItemId){
            findWorkItem(workItemId).then(res=>{
                setDemandInfo(res)
                setBinded(true)
            })
        }
    },[workItemId])

    const toWorkItem = (record)=>{
        try{
            if(IS_DEV){
                applyJump(`${teamwireUrl}/#/index/projectDetail/${record.projectId}/workDetail/${record.id}`,'_blank')
            }else {
                applyJump(`${record.projectUrl}/#/index/projectDetail/${record.projectId}/workDetail/${record.id}`,'_blank')
            }
        }catch {
            applyJump(`${record.projectUrl}/#/index/projectDetail/${record.projectId}/workDetail/${record.id}`,'_blank')
        }
    }

    const unBind = ()=>{
        let param = {
            id:caseInfo.id,
            testCase:{
                ...caseInfo.testCase,
                workItemId : "nullstring",
            }
        }

        updateFn(param).then(()=>{
            setBinded(false)
        })
    }

    const isBind = () =>{
        if(binded){
            return(
                <div style={{padding:"10px 0"}}>
                    <Descriptions
                        title={
                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    alignItems: "center"
                                }}
                            >
                                <a>{demandInfo?.name}</a>
                                <IconBtn
                                    className="pi-icon-btn-grey"
                                    onClick={unBind}
                                    name={"解绑"}
                                />
                            </div>

                        }
                        onClick={()=>toWorkItem(demandInfo)}
                        column={4}
                    >
                        <Descriptions.Item label="项目名">{demandInfo?.projectName}</Descriptions.Item>
                        <Descriptions.Item label="负责人">{demandInfo?.director || "未设置"}</Descriptions.Item>
                        <Descriptions.Item label="状态">{demandInfo?.status || "未设置"}</Descriptions.Item>
                        <Descriptions.Item label="优先级">{demandInfo?.priority || "未设置"}</Descriptions.Item>
                    </Descriptions>
                </div>
            )
        }else {
            return (
                <>
                    <div className={` ${showSelect?"demand_hide":"demand_show"}`}>
                        <div className={`demand-content_empty`}>
                            <img src={emptyImg} alt={"empty"} width={100} height={100}/>
                            <span style={{"color": "grey","fontSize":"13px"}}>
                            <span>未关联需求 </span>
                            <span className={"demand-content_add"} onClick={()=>setShowSelect(true)}>请关联</span></span>
                        </div>
                    </div>
                    <div className={`demand_project_select ${showSelect?"demand_show":"demand_hide"}` }>
                        <DemandSelect
                            setShowSelect={setShowSelect}
                            caseInfo={caseInfo}
                            updateFn={updateFn}
                            setBinded={setBinded}
                            setDemandInfo={setDemandInfo}
                        />
                    </div>
                </>
            )
        }
    }

    return(
        <div style={{height: "100%"}} className={"detail-box "}>
            <div style={{height:"100%",padding: "0 0 20px"}}>
                {isBind()}

            </div>
        </div>
    )
}

export default inject("workItemStore")(observer(Demand));