/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import FuncUnitStepList from "./funcUnitStepList";
import DetailCommon from "../../../common/DetailCommon";
import {Breadcrumb, Tabs} from "antd";
import WorkItemSelect from "../../../integrated/teamwire/workItem/components/WorkItemSelect";
import ConnectionCommon from "../../common/connenctionCommon/ConnectionCommon";

const FuncUnitDetail = (props) => {
    const {funcUnitStore,workItemStore} = props;
    const {findFuncUnit,updateFuncUnit} = funcUnitStore;
    const {findWorkItem,getDemandInfo,demandInfo} =workItemStore

    const [detailInfo,setDetailInfo]=useState();
    const [workItemId, setWorkItemId] = useState();

    const functionId = sessionStorage.getItem('functionId');

    useEffect(()=> {
        findFuncUnit(functionId).then(res=>{
            setDetailInfo(res);
            setWorkItemId(res?.testCase?.workItemId)
        })
    },[functionId])

    useEffect(()=>{
        if(workItemId){
            findWorkItem(workItemId).then(res=>{
                getDemandInfo(res)
            })
        }else {
            getDemandInfo(null)
        }
    },[workItemId])

    /**
     * 更新名称
     * @param value
     */
    const updateTitle = (value) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:value,
            }
        }
        updateFuncUnit(param).then(()=>{
            findFuncUnit(functionId).then(res=>{
                setDetailInfo(res);
            })
        })
    }

    /**
     * 返回到用例列表
     */
    const goBack = () =>{
        props.history.push("/repository/testcase")
    }



    return(
        <div className={"content-box-center"}>
            <Breadcrumb className={"breadcrumb-box"}>
                <Breadcrumb.Item onClick={goBack} className={"first-item"}>测试用例</Breadcrumb.Item>
                <Breadcrumb.Item>{detailInfo?.testCase.name}</Breadcrumb.Item>
            </Breadcrumb>

            <DetailCommon
                detailInfo={detailInfo}
                updateTitle={updateTitle}
            />
            <FuncUnitStepList />
            <div className='title-space-between'>
                <div className={'test-title'}>
                    <div>关联</div>
                </div>
            </div>

            <ConnectionCommon
                workItemInfo={demandInfo}
                caseId={functionId}
                workItemSelect={
                    <WorkItemSelect
                        caseInfo={detailInfo}
                        updateCase={updateFuncUnit}

                    />
                }
            />

        </div>
    )
}

export default inject('funcUnitStore',"workItemStore")(observer(FuncUnitDetail));
