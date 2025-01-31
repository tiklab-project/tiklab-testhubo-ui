import React, {useEffect, useState} from "react";
import { observer} from "mobx-react";
import RequestBodyCom from "./requestBodyCom";
import FormParam from "./formParam";
import FormUrlencoded from "./formUrlencoded";
import JsonParam from "./jsonParam";
import RawParam from "./rawParam";
import requestBodyStore from "../store/requestBodyStore";


/**
 *接口定义中的请求体
 */
const RequestBody  = ({apiUnitId}) =>{
    const {
        findRequestBody,
        updateRequestBody,
        bodyType
    } = requestBodyStore;

    const [radioType, setRadioType] = useState("none");

    useEffect(()=>{
        findRequestBody(apiUnitId).then((res) => {
            setRadioType(res.bodyType)
        })
    },[bodyType,apiUnitId])


    const updateBodyType = async (data)=>{
        data.apiUnitId=apiUnitId
        data.id=apiUnitId
        await updateRequestBody(data)
    }

    return(
        <RequestBodyCom
            radioValue={radioType}
            updateFn={updateBodyType}
            setRadioType={setRadioType}
            form={<FormParam  apiUnitId={apiUnitId} />}
            formUrlencoded={<FormUrlencoded apiUnitId={apiUnitId} />}
            json={<JsonParam apiUnitId={apiUnitId} />}
            raw={<RawParam apiUnitId={apiUnitId} />}
        />
    )
}

export default observer(RequestBody);