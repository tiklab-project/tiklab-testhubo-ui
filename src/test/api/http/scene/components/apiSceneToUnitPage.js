import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import ApiUnitEditPageCommon from "../../unit/components/apiUnitEditPageCommon";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";

const ApiSceneToUnitPage = (props) =>{
    const {apiUnitStore,apiSceneStore} = props;
    const {findApiScene} = apiSceneStore;
    const {findApiUnit} = apiUnitStore;

    const [detailInfo,setDetailInfo]=useState();
    const [apiUnitName, setApiUnitName] = useState();
    const apiSceneId = sessionStorage.getItem('apiSceneId');
    const apiUnitId = sessionStorage.getItem('apiUnitId');
    useEffect(()=>{
        findApiScene(apiSceneId).then(res=>{
            setDetailInfo(res);
        })
    },[apiSceneId])

    useEffect(async ()=>{
        let res = await findApiUnit(apiUnitId)
        setApiUnitName(res.testCase.name);

    },[apiUnitId])


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
            <ApiUnitEditPageCommon {...props} />

        </div>
    )
}

export default inject("apiSceneStore","apiUnitStore")(observer(ApiSceneToUnitPage));