import React, { Fragment, useState, useEffect } from 'react';
import RequestHeader from "./requestHeader";
import QueryParam from './queryParam';
import PreParam from './preParam';
import AssertParam from './assertParam';
import RequestTab from "./requestTab";
import RequestBody from "./requestBody";
import AfterScript from "./afterScript";

// 输出参数 请求头部与请求参数的切换
const Request = (props) => {


    return(
        <RequestTab
            header={<RequestHeader />}
            query={<QueryParam />}
            body={<RequestBody />}
            pre={<PreParam />}
            after={<AfterScript />}
            assert={<AssertParam />}
        />
    )

}

export default Request;
