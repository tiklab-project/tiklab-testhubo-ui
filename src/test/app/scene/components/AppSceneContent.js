import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Breadcrumb, Input} from "antd";
import IconCommon from "../../../../common/IconCommon";
import CaseContentCommon from "../../../common/CaseContentCommon";
import { useParams} from "react-router";
import {DrawerCloseIcon} from "../../../common/BreadcrumbCommon";
import AppSceneInstanceList from "./appSceneInstanceList";
import AppSceneDetail from "./appSceneDetail";

const AppSceneContent = (props) =>{
    const {appSceneStore} = props;
    const {findAppScene,updateAppScene} = appSceneStore;

    const [caseInfo,setCaseInfo]=useState();
    const [caseName, setCaseName] = useState();

    let {id} = useParams()
    const appSceneId = sessionStorage.getItem('appSceneId') || id;

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('appSceneId',id);

        findAppScene(appSceneId).then(res=>{
            setCaseInfo(res);
            setCaseName(res?.testCase?.name)
        })
    },[appSceneId])


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
        updateAppScene(param).then(()=>{
            findAppScene(appSceneId).then(res=>{
                setCaseInfo(res);
            })
        })
    }


    const tabItem=[
        {
            label: `基本信息`,
            key: '1',
            children: <AppSceneDetail/>
        }, {
            label: `测试历史`,
            key: '2',
            children:<AppSceneInstanceList />
        },
    ]

    return(
        <CaseContentCommon
            breadcrumb={
                <>
                    <Breadcrumb className={"breadcrumb-box"}>
                        <IconCommon
                            icon={"shouji"}
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
                </>
            }
            tabItem={tabItem}
        />
    )
}

export default inject('appSceneStore')(observer(AppSceneContent));