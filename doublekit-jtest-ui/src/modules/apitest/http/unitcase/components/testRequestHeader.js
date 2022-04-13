import React from "react";
import {inject, observer} from "mobx-react";
import {Input} from "antd";

const {TextArea} = Input;

const TestRequestHeader =(props)=>{
    const {apiUnitStore} = props;
    const {requestHeaderData} = apiUnitStore;

    return(
        <TextArea
            autoSize={{minRows: 4, maxRows: 10 }}
            value={requestHeaderData}
        />
    )
}

export default inject("apiUnitStore")(observer(TestRequestHeader));