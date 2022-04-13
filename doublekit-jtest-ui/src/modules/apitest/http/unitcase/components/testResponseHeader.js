import React from "react";
import {inject, observer} from "mobx-react";
import {Input} from "antd";

const {TextArea} = Input;

const TestResponseHeader =(props)=>{
    const {apiUnitStore} = props;
    const {responseHeaderData} = apiUnitStore;


    return(
        <TextArea
            autoSize={{minRows: 4, maxRows: 10 }}
            value={responseHeaderData}
        />
    )
}

export default inject("apiUnitStore")(observer(TestResponseHeader));