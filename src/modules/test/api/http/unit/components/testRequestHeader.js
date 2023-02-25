import React from "react";
import {inject, observer} from "mobx-react";
import {Input} from "antd";

const {TextArea} = Input;

const TestRequestHeader =(props)=>{
    const {requestHeader} = props;

    return(
        <TextArea
            autoSize={{minRows: 4, maxRows: 10 }}
            value={requestHeader}
        />
    )
}

export default TestRequestHeader;