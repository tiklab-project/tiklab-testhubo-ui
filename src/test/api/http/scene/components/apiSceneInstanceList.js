import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import InstanceListCommon from "../../../../../testreport/common/InstanceListCommon";
import {CASE_TYPE} from "../../../../../common/dictionary/dictionary";
import {findCaseInstancePage} from "../../../../../testreport/common/instanceCommonFn";
import {Select} from "antd";
const {Option} = Select;

const ApiSceneInstanceList = (props) =>{
    const apiSceneId = sessionStorage.getItem("apiSceneId")
    const [listNum, setListNum] = useState();

    useEffect(async()=>{
       await findPage()
    },[])

    const findPage = async (status) =>{
        let info = await findCaseInstancePage(apiSceneId,CASE_TYPE.API_SCENE,{status:status})
        setListNum(info.totalRecord)
    }

    return(
        <>
            <div className={"display-flex-between"} style={{margin:"10px 0"}}>
                <div className={"list-size-title"}>共{listNum}个</div>
                <Select
                    onSelect={findPage}
                    className={"filter-select-box-item"}
                    placeholder="状态"
                    bordered={false}
                >
                    <Option value={null}>所有</Option>
                    <Option value={"success"}>成功</Option>
                    <Option value={"fail"}>失败</Option>
                </Select>
            </div>
            <InstanceListCommon belongId={apiSceneId} type={CASE_TYPE.API_SCENE}/>
        </>

    )
}

export default observer(ApiSceneInstanceList);