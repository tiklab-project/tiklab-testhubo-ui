import React from "react";
import ReactJson from "react-json-view";
import {Input} from "antd";
import {inject, observer} from "mobx-react";

const {TextArea} = Input;

const TestResponseBody =(props)=>{
    const {stepStore} = props;
    const {responseBodyData} = stepStore;


    let dataType = responseBodyData instanceof Object;

    return(
        <>
            {
                dataType
                    ?<ReactJson
                        src={responseBodyData}
                        name={null}
                        style={{fontFamily:"sans-serif"}}
                        displayDataTypes={false}
                        enableClipboard={false}
                        displayObjectSize={false}
                    />
                    :<TextArea
                        autoSize={{minRows: 4, maxRows: 10 }}
                        value={responseBodyData}
                    />
            }
        </>
    )

}

export default inject("stepStore")(observer(TestResponseBody));
