import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import EnvSelectCommon from "../../common/envSelectCommon";

const WebEnvSelect = (props) =>{
    const {webEnvStore} = props;
    const {findWebEnvList,webEnvList} = webEnvStore;

    useEffect(()=>{
        findWebEnvList()
    },[])

    return(
        <>
            <EnvSelectCommon
                ENV_SELECTED={"WEB_ENV_SELECTED"}
                envList={webEnvList}
                {...props}
            />
        </>
    )
}

export default inject("webEnvStore")(observer(WebEnvSelect));