import React from 'react'
import { observer, inject } from 'mobx-react'
import {Input} from "antd";

const {TextArea} = Input;

const TestRequestBody =(props) =>{
    const { apiUnitTestDispatchStore } = props;
    const { responseResult } = apiUnitTestDispatchStore;

    return(
        <TextArea
            autoSize={{minRows: 4, maxRows: 10 }}
            value={responseResult?.requestBody}
        />
    )
}

export default inject("apiUnitTestDispatchStore")(observer(TestRequestBody))