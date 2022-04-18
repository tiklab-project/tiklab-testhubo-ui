import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import EnvSelectCommon from "../../common/envSelectCommon";

const AppEnvSelect = (props) =>{
    const {appEnvStore} = props;
    const {findAppEnvList,appEnvList} = appEnvStore;

    useEffect(()=>{
        findAppEnvList()
    },[])

    return(
        <>
            <EnvSelectCommon
                ENV_SELECTED={"APP_ENV_SELECTED"}
                envList={appEnvList}
                {...props}
            />
        </>
    )
}

export default inject("appEnvStore")(observer(AppEnvSelect));