import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Breadcrumb, Input} from "antd";
import IconCommon from "../../../../common/IconCommon";
import {useParams} from "react-router";
import {DrawerCloseIcon} from "../../../common/BreadcrumbCommon";
import WebSceneDetail from "./webSceneDetail";

const WebSceneContent = (props) =>{
    const {webSceneStore} = props;
    const {findWebScene,updateWebScene} = webSceneStore;

    const [caseInfo,setCaseInfo]=useState();
    const [caseName, setCaseName] = useState();

    let {id} = useParams()
    const webSceneId = sessionStorage.getItem('webSceneId') || id;

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('webSceneId',id);

        findWebScene(webSceneId).then(res=>{
            setCaseInfo(res);
            setCaseName(res?.testCase?.name)
        })
    },[webSceneId])


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
        updateWebScene(param).then(()=>{
            findWebScene(webSceneId).then(res=>{
                setCaseInfo(res);
            })
        })
    }


    return(
       <>
           <div className={"breadcrumb-title_between"}>
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
           </div>
           <WebSceneDetail/>
       </>
    )
}

export default inject('webSceneStore')(observer(WebSceneContent));