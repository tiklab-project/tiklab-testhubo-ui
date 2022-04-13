import React from 'react'
import { observer, inject } from 'mobx-react'
import {Input} from "antd";

const {TextArea} = Input;

const TestRequestBody =(props) =>{
    const { apiUnitStore } = props;
    const { requestBodyData } = apiUnitStore;

    return(
        <TextArea
            autoSize={{minRows: 4, maxRows: 10 }}
            value={requestBodyData}
        />
    )
}

export default inject("apiUnitStore")(observer(TestRequestBody))