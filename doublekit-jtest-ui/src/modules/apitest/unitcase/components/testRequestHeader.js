import React from "react";
import {inject, observer} from "mobx-react";
import {Input} from "antd";

const {TextArea} = Input;

const TestRequestHeader =(props)=>{
    const {stepStore} = props;
    const {requestHeaderData} = stepStore;

    return(
        <TextArea
            autoSize={{minRows: 4, maxRows: 10 }}
            value={requestHeaderData}
        />
    )
}

export default inject("stepStore")(observer(TestRequestHeader));