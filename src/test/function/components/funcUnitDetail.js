/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../common/DetailCommon";
import {Breadcrumb, Tabs} from "antd";
import Demand from "../../../integrated/teamwire/workItem/components/Demand";
import {useParams} from "react-router";
import WorkItemBindList from "../../../integrated/teamwire/defect/components/WorkItemBindList";
import {DrawerCloseIcon} from "../../common/BreadcrumbCommon";
import FuncUnitStepTable from "./FuncUnitStepTable";
import "./functionStyle.scss"

const FuncUnitDetail = (props) => {
    const {funcUnitStore} = props;
    const {findFuncUnit,updateFuncUnit} = funcUnitStore;

    const [caseInfo,setCaseInfo]=useState();
    const [workItemId, setWorkItemId] = useState();

    let {id} = useParams()
    const functionId = sessionStorage.getItem('functionId') || id;

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('functionId',id);

        findFuncUnit(functionId).then(res=>{
            setCaseInfo(res);
            setWorkItemId(res?.testCase?.workItemId)
        })
    },[functionId])


    /**
     * 更新名称
     * @param value
     */
    const updateTitle = (value) =>{
        const param = {
            id:caseInfo.id,
            testCase: {
                ...caseInfo.testCase,
                name:value,
            }
        }
        updateFuncUnit(param).then(()=>{
            findFuncUnit(functionId).then(res=>{
                setCaseInfo(res);
            })
        })
    }


    return(
        <div className={"content-box-center"} style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <div style={{flex: 'none'}}>
                <div className={"breadcrumb-title_between"}>
                    <Breadcrumb className={"breadcrumb-box"}>
                        <Breadcrumb.Item>用例详情</Breadcrumb.Item>
                    </Breadcrumb>
                    <DrawerCloseIcon />
                </div>

            </div>
            <div style={{flex: 'auto', overflow: 'hidden'}}>
                <Tabs
                    defaultActiveKey="1"
                    items={[
                        {
                            label: `场景步骤`,
                            key: '1',
                            children:  <FuncUnitStepTable />,
                        },
                        {
                            label: `关联需求`,
                            key: '2',
                            children:  <Demand
                                workItemId={workItemId}
                                caseInfo={caseInfo}
                                updateFn={updateFuncUnit}
                            />
                        },
                        {
                            label: `关联缺陷`,
                            key: '3',
                            children:        <WorkItemBindList caseId={functionId} /> ,
                        },
                    ]}
                />

            </div>

        </div>
    )
}

export default inject('funcUnitStore',"workItemStore")(observer(FuncUnitDetail));
