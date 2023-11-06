import React, {useEffect, useState} from "react";
import {applyJump} from "tiklab-core-ui";
import DemandSelect from "./DemandSelect";
import "./demandStyle.scss"
import {inject, observer} from "mobx-react";
import {Descriptions, Space} from "antd";

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
                if(res.code === 0) {
                    setDemandInfo(res.data)
                    setBinded(true)
                }else {
                    // messageFn("error","TeamWire连接失败!")
                }

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
                <Space>
                    <span style={{fontSize: "13px", color: "#9b9b9b", margin: "0 43px 0 0"}}>需求 :</span>
                    <div
                        style={{
                            display: "flex",
                            gap: "25px",
                            alignItems: "center",
                        }}
                    >
                        <span>{demandInfo?.name}</span>
                        <span onClick={unBind} style={{fontSize:"12px"}}>解绑</span>
                    </div>
                </Space>

            )
        }else {
            return (
                <>
                    <div className={` ${showSelect?"demand_hide":"demand_show"}`}>
                        <span style={{fontSize: "13px", color: "#9b9b9b", margin: "0 75px 0 0"}}>需求 :</span>
                        <span className={"demand-content_add"} onClick={()=>setShowSelect(true)}>未关联</span>
                    </div>
                    <div style={{height:"400px"}} className={`demand_project_select ${showSelect?"demand_show":"demand_hide"}` }>
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
        <div className={"detail-box "}>
            <div style={{height:"100%",padding: "0 0 20px"}}>
                {isBind()}
            </div>
        </div>
    )
}

export default inject("workItemStore")(observer(Demand));