import React, {useEffect} from 'react';
import RequestHeader from "./requestHeader";
import QueryParam from './queryParam';
import PreParam from './preParam';
import AssertParam from './assertParam';
import RequestTab from "./requestTab";
import RequestBody from "./requestBody";
import AfterScript from "./afterScript";

// 输出参数 请求头部与请求参数的切换
const Request = ({apiUnitId}) => {

    return(
        <RequestTab
            header={<RequestHeader apiUnitId={apiUnitId}/>}
            query={<QueryParam apiUnitId={apiUnitId}/>}
            body={<RequestBody apiUnitId={apiUnitId}/>}
            pre={<PreParam apiUnitId={apiUnitId} />}
            after={<AfterScript apiUnitId={apiUnitId} />}
            assert={<AssertParam apiUnitId={apiUnitId} />}
        />
    )

}

export default Request;
