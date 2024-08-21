import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {findCaseInstancePage} from "../../../../../../testreport/common/instanceCommonFn";
import {CASE_TYPE} from "../../../../../../common/dictionary/dictionary";
import CaseBread from "../../../../../../common/CaseBread";
import InstanceListCommon from "../../../../../../testreport/common/InstanceListCommon";
import {Select} from "antd";
const {Option} = Select;

const ApiUnitInstanceListView = (props) =>{
    const {apiUnitStore} = props
    const {testCaseInfo} = apiUnitStore
    const [listNum, setListNum] = useState();
    const apiUnitId = sessionStorage.getItem("apiUnitId")
    const repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(async()=>{
        await findPage()
    },[])

    const findPage = async (status) =>{
        let info = await findCaseInstancePage(apiUnitId,CASE_TYPE.API_UNIT,{status:status})
        setListNum(info.totalRecord)
    }

    return (
        <div className={"content-box-center"}>
            <CaseBread
                breadItem={[testCaseInfo?.name, "历史"]}
                router={`/project/${repositoryId}/testcaseList/apiUnit/${apiUnitId}`}
            />

            <div className={"display-flex-between"} style={{margin:"0 6px 10px"}}>
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
            <InstanceListCommon belongId={apiUnitId} type={CASE_TYPE.API_UNIT}/>
        </div>
    )
}

export default inject("apiUnitStore")(observer(ApiUnitInstanceListView));