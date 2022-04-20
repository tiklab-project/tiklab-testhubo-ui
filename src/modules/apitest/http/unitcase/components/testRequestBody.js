import React from 'react'
import { observer, inject } from 'mobx-react'
import {Input} from "antd";

const {TextArea} = Input;

const TestRequestBody =(props) =>{
    const { requestBody } = props;
    return(
        <TextArea
            autoSize={{minRows: 4, maxRows: 10 }}
            value={requestBody}
        />
    )
}

export default TestRequestBody