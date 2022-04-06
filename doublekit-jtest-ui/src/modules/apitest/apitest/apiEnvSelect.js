import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Select} from "antd";
import EnvSelectCommon from "../../common/envSelectCommon";

const {Option} = Select;

const ApiEnvSelect = (props) =>{
    const {apiEnvStore} = props;
    const {findApiEnvList,apiEnvList} = apiEnvStore;

    useEffect(()=>{
        findApiEnvList()
    },[])

    return(
        <>
            <EnvSelectCommon
                ENV_SELECTED={"API_ENV_SELECTED"}
                envList={apiEnvList}
                {...props}
            />
        </>
    )
}

export default inject("apiEnvStore")(observer(ApiEnvSelect));