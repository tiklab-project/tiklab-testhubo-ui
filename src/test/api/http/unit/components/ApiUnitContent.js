import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Breadcrumb, Input} from "antd";
import { useParams} from "react-router";
import ApiUnitInstanceList from "./apiUnitInstanceList";
import ApiUnitEditPageCommon from "./apiUnitEditPageCommon";
import CaseContentCommon from "../../../../common/CaseContentCommon";
import IconCommon from "../../../../../common/IconCommon";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";


const ApiUnitContent = (props) =>{
    const {apiUnitStore} = props;
    const {findApiUnit,updateApiUnit} = apiUnitStore;

    const [caseInfo,setCaseInfo]=useState();
    const [caseName, setCaseName] = useState();

    let {id} = useParams()
    const apiUnitId = sessionStorage.getItem('apiUnitId') || id;

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('apiUnitId',id);

        findApiUnit(apiUnitId).then(res=>{
            setCaseInfo(res);
            setCaseName(res?.testCase?.name)
        })
    },[apiUnitId])


    //更新名称
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
        updateApiUnit(param).then(()=>{
            findApiUnit(apiUnitId).then(res=>{
                setCaseInfo(res);
            })
        })
    }


    const tabItem=[
        {
            label: `设计`,
            key: '1',
            children: <ApiUnitEditPageCommon/>
        }, {
            label: `测试历史`,
            key: '2',
            children:<ApiUnitInstanceList />
        },
    ]

    return(
        <CaseContentCommon
            breadcrumb={
                <>
                    <Breadcrumb className={"breadcrumb-box"}>
                        <IconCommon
                            icon={"jiekou1"}
                            className="icon-s "
                            style={{margin: "3px 5px 0"}}
                        />
                        <Breadcrumb.Item>
                            <Input
                                value={caseName}
                                className={"case-header_title"}
                                onChange={updateName}
                            />
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <DrawerCloseIcon />
                </>
            }
            tabItem={tabItem}
        />
    )
}

export default inject('apiUnitStore')(observer(ApiUnitContent));