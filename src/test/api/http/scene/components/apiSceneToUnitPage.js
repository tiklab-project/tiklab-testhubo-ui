import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import ApiUnitEditPageCommon from "../../unit/components/apiUnitEditPageCommon";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useHistory} from "react-router";

const ApiSceneToUnitPage = (props) =>{
    const {apiUnitStore,apiSceneStore} = props;
    const {findApiScene} = apiSceneStore;
    const {findApiUnit} = apiUnitStore;

    let history = useHistory()
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

    return(
        <div className={"content-box-center"}>

            <div
                className={"breadcrumb-title_between"}
                style={{height:"36px"}}
            >
                <ArrowLeftOutlined onClick={()=>history.goBack()} style={{cursor:"pointer"}}/>

                <DrawerCloseIcon />
            </div>
            <ApiUnitEditPageCommon {...props} />
        </div>
    )
}

export default inject("apiSceneStore","apiUnitStore")(observer(ApiSceneToUnitPage));