import React from "react";
import ReactJson from "react-json-view";
import {Input} from "antd";
import {inject, observer} from "mobx-react";
import {toJS} from "mobx";

const {TextArea} = Input;

const TestResponseBody =(props)=>{
    const {bodyResult} = props;

    let dataType = bodyResult instanceof Object;



    return(
        <>
            {
                dataType
                    ?<ReactJson
                        src={bodyResult}
                        name={null}
                        style={{fontFamily:"sans-serif"}}
                        displayDataTypes={false}
                        enableClipboard={false}
                        displayObjectSize={false}
                    />
                    :<TextArea
                        autoSize={{minRows: 4, maxRows: 10 }}
                        value={bodyResult}
                    />
            }
        </>
    )

}

export default TestResponseBody;
