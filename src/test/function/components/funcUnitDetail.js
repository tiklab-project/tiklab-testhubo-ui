/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../common/DetailCommon";
import {Breadcrumb, Tabs} from "antd";
import WorkItemSelect from "../../../integrated/teamwire/workItem/components/WorkItemSelect";
import Demand from "../../../integrated/teamwire/workItem/components/Demand";
import {useParams} from "react-router";
import WorkItemBindList from "../../../integrated/teamwire/defect/components/WorkItemBindList";
import {DrawerCloseIcon} from "../../common/BreadcrumbCommon";
import FuncUnitStepTable from "./FuncUnitStepTable";
import "./functionStyle.scss"

const FuncUnitDetail = (props) => {
    const {funcUnitStore,workItemStore} = props;
    const {findFuncUnit,updateFuncUnit} = funcUnitStore;
    const {findWorkItem,getDemandInfo,demandInfo} =workItemStore

    const [detailInfo,setDetailInfo]=useState();
    const [workItemId, setWorkItemId] = useState();

    let {id} = useParams()
    const functionId = sessionStorage.getItem('functionId') || id;

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('functionId',id);

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


    return(
        <div className={"content-box-center"}>
            <div className={"breadcrumb-title_between"}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <Breadcrumb.Item>用例详情</Breadcrumb.Item>
                </Breadcrumb>
                <DrawerCloseIcon />
            </div>
            <DetailCommon
                detailInfo={detailInfo}
                updateTitle={updateTitle}
            />
            <Tabs
                defaultActiveKey="1"
                // onChange={onChange}
                items={[
                    {
                        label: `场景步骤`,
                        key: '1',
                        children:  <FuncUnitStepTable />,
                    },
                    {
                        label: `关联需求`,
                        key: '2',
                        children: <Demand
                                    workItemInfo={demandInfo}
                                    caseId={functionId}
                                    workItemSelect={
                                        <WorkItemSelect
                                            caseInfo={detailInfo}
                                            updateCase={updateFuncUnit}
                                        />
                                    }
                                />
                    },
                    {
                        label: `关联缺陷`,
                        key: '3',
                        children:   <WorkItemBindList caseId={functionId} />,
                    },
                ]}
            />

        </div>
    )
}

export default inject('funcUnitStore',"workItemStore")(observer(FuncUnitDetail));
