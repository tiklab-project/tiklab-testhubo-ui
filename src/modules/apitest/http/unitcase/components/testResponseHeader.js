import React from "react";
import {inject, observer} from "mobx-react";
import {Input} from "antd";

const {TextArea} = Input;

const TestResponseHeader =(props)=>{
    const {headerResult} = props;


    return(
        <TextArea
            autoSize={{minRows: 4, maxRows: 10 }}
            value={headerResult}
        />
    )
}

export default TestResponseHeader;