import React, {useEffect, useState} from "react";
import {Breadcrumb, Input, Tabs} from "antd";
import {DrawerCloseIcon} from "../../common/BreadcrumbCommon";
import FunctionDetail from "./FunctionDetail";
import FunctionStepList from "./FunctionStepList";
import {useParams} from "react-router";
import {inject, observer} from "mobx-react";
import IconCommon from "../../../common/IconCommon";
import CaseContentCommon from "../../common/CaseContentCommon";

const FunctionContent = (props) =>{
    const {funcUnitStore} = props;
    const {findFuncUnit,updateFuncUnit} = funcUnitStore;

    let {id} = useParams()
    const functionId = sessionStorage.getItem('functionId') || id;
    const [caseInfo,setCaseInfo]=useState();
    const [caseName, setCaseName] = useState();

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('functionId',id);

        findFuncUnit(functionId).then(res=>{
            setCaseInfo(res)
            setCaseName(res?.testCase?.name)
        })
    },[functionId])


    const updateName = (e) =>{
        let name = e.target.value
        setCaseName(name)

        const param = {
            id:caseInfo.id,
            testCase: {
                ...caseInfo.testCase,
                name:name,
            }
        }
        updateFuncUnit(param).then(()=>{
            findFuncUnit(functionId).then(res=>{
                setCaseInfo(res);
            })
        })
    }


    const tabItem = [
        {
            label: `基本信息`,
            key: '1',
            children:<FunctionDetail />
        },{
            label: `用例步骤`,
            key: '2',
            children:<FunctionStepList />
        }
    ]

    return(
        <>
            <div className={"breadcrumb-title_between"} style={{border:"none"}}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <IconCommon
                        icon={"gongneng"}
                        className="icon-s "
                        style={{margin: "3px 5px 0"}}
                    />
                    {/*<Breadcrumb.Item>详情</Breadcrumb.Item>*/}
                    <Breadcrumb.Item>
                        <Input
                            value={caseName}
                            className={"case-header_title"}
                            onChange={updateName}
                        />
                    </Breadcrumb.Item>
                </Breadcrumb>
                <DrawerCloseIcon />
            </div>
            <div className={"content-box-center case-tabs-box"} >
                <Tabs
                    defaultActiveKey="1"
                    items={tabItem}
                />
            </div>
        </>


    )
}

export default inject('funcUnitStore')(observer(FunctionContent));