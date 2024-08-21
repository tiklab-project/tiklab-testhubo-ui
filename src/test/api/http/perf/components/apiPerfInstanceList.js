import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import InstanceListCommon from "../../../../../testreport/common/InstanceListCommon";
import {CASE_TYPE} from "../../../../../common/dictionary/dictionary";
import {findCaseInstancePage} from "../../../../../testreport/common/instanceCommonFn";
import {Select} from "antd";
const {Option} = Select;


const ApiPerfInstanceList = ({actionTap}) =>{

    const apiPerfId = sessionStorage.getItem("apiPerfId")
    const [listNum, setListNum] = useState();

    useEffect(async()=>{
        if(actionTap==="history"){
            findPage()
        }
    },[apiPerfId,actionTap])

    const findPage = async (status) =>{
        let info = await findCaseInstancePage(apiPerfId,CASE_TYPE.API_PERFORM,{status:status})
        setListNum(info.totalRecord)
    }

    return(
        <div>
            <div className={"display-flex-between"} style={{margin:"10px 0"}}>
                <div className={"list-size-title"}>共{listNum}个</div>
                <Select
                    onSelect={findPage}
                    className={"filter-select-box-item"}
                    placeholder="状态"
                    bordered={false}
                >
                    <Option value={null}>所有</Option>
                    <Option value={"complete"}>完成</Option>
                    <Option value={"fail"}>失败</Option>
                </Select>
            </div>
            <InstanceListCommon belongId={apiPerfId} type={CASE_TYPE.API_PERFORM}/>
        </div>
    )
}

export default inject('apiPerfStore')(observer(ApiPerfInstanceList));