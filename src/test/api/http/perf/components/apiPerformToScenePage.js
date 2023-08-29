import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../../../common/DetailCommon";
import ApiSceneStepList from "../../scene/components/apiSceneStepList";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";

const ApiPerformToScenePage = (props) =>{
    const {apiPerfStore,apiSceneStore} = props;
    const {findApiScene,updateApiScene} = apiSceneStore;
    const {findApiPerf} = apiPerfStore;

    const [apiScene, setApiScene] = useState();
    const [apiPerfName, setApiPerfName] = useState();
    const apiSceneId = sessionStorage.getItem('apiSceneId');
    const apiPerfId = sessionStorage.getItem('apiPerfId');


    useEffect(()=>{
        findApiScene(apiSceneId).then(res=>{
            setApiScene(res);
        })
    },[apiSceneId])

    useEffect(async ()=>{
        let res = await findApiPerf(apiPerfId)
        setApiPerfName(res.testCase.name);

    },[apiPerfId])


    //更新名称
    const updateTitle = (value) =>{
        const param = {
            id:setApiScene.id,
            testCase: {
                ...setApiScene.testCase,
                name:value,
            }
        }
        updateApiScene(param).then(()=>{
            findApiScene(apiSceneId).then(res=>{
                setApiScene(res);
            })
        })
    }




    const toApiScene = () =>{
        props.history.push(`/repository/testcase/api-scene/${apiSceneId}`)
    }



    return(
        <div className={"content-box-center"}>
            <div className={"breadcrumb-title_between"}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <Breadcrumb.Item onClick={toApiScene} className={"first-item"}>用例详情</Breadcrumb.Item>
                    <Breadcrumb.Item >步骤详情</Breadcrumb.Item>
                </Breadcrumb>
                <DrawerCloseIcon />
            </div>

            <DetailCommon
                detailInfo={apiScene}
                updateTitle={updateTitle}
            />

            <ApiSceneStepList {...props}/>
        </div>
    )
}

export default inject("apiSceneStore","apiPerfStore")(observer(ApiPerformToScenePage));