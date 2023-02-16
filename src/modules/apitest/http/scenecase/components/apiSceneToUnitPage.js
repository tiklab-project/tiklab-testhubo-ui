import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import ApiUnitEditPageCommon from "../../unitcase/components/apiUnitEditPageCommon";

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


    const toTestCase = () =>{
        props.history.push("/repository/testcase")
    }


    const toApiScene = () =>{
        props.history.push("/repository/api-scene-detail")
    }



    return(
        <div className={"content-box-center"}>
            <div style={{"display":"flex","justifyContent":"space-between","margin":"5px  0 0 0"}}>
                <Breadcrumb className={"breadcrumb-box"} style={{padding: "10px 0"}}>
                    <Breadcrumb.Item onClick={toTestCase} className={"first-item"}>测试用例</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={toApiScene} className={"first-item"}>{detailInfo?.testCase.name}</Breadcrumb.Item>
                    <Breadcrumb.Item>{apiUnitName}</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <ApiUnitEditPageCommon {...props} />

        </div>
    )
}

export default inject("apiSceneStore","apiUnitStore")(observer(ApiSceneToUnitPage));