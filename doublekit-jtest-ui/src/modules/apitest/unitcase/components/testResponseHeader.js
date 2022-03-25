import React from "react";
import {inject, observer} from "mobx-react";
import {Input} from "antd";

const {TextArea} = Input;

const TestResponseHeader =(props)=>{
    const {stepStore} = props;
    const {responseHeaderData} = stepStore;


    return(
        <TextArea
            autoSize={{minRows: 4, maxRows: 10 }}
            value={responseHeaderData}
        />
    )
}

export default inject("stepStore")(observer(TestResponseHeader));