import React, {useState} from "react";
import ReactMonacoEditor from "../../common/ReactMonacoEditor";
import {Button, Space} from "antd";

const ScriptEdit = (props) =>{
    const {script,changeScript} = props

    return(
        <div style={{height: "calc(100% - 280px)"}}>
            <ReactMonacoEditor
                editorChange={changeScript}
                value={script}
                language={"javascript"}
                height={"100%"}
                width={"100%"}
            />
        </div>
    )
}

export default ScriptEdit;