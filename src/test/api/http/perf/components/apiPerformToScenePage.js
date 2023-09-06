import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import ApiSceneStepList from "../../scene/components/apiSceneStepList";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useHistory} from "react-router";
import DetailCommon from "../../../../../common/DetailCommon";

const ApiPerformToScenePage = (props) =>{
    const {apiPerfStore,apiSceneStore} = props;
    const {findApiScene} = apiSceneStore;

    const [apiScene, setApiScene] = useState();
    const apiSceneId = sessionStorage.getItem('apiSceneId');
    const apiPerfId = sessionStorage.getItem('apiPerfId');
    let history = useHistory()

    useEffect(()=>{
        findApiScene(apiSceneId).then(res=>{
            setApiScene(res);
        })
    },[apiSceneId])



    const goBack = () =>{
        history.push(`/repository/testcase/api-perform/${apiPerfId}`)
    }

    return(
        <div className={"content-box-center"}>
            <div
                className={"breadcrumb-title_between"}
                style={{height:"36px"}}
            >
                <ArrowLeftOutlined onClick={goBack} style={{cursor:"pointer"}}/>

                <DrawerCloseIcon />
            </div>
            <DetailCommon
                detailInfo={apiScene}
                // updateTitle={updateTitle}
            />
            <ApiSceneStepList {...props}/>
        </div>
    )
}

export default inject("apiSceneStore","apiPerfStore")(observer(ApiPerformToScenePage));