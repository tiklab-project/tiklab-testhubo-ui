/*
 * @Description: 接口定义 后置脚本
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:42:56
 */

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import afterScriptStore from "../store/afterScriptStore";
import ReactMonacoEditor from "../../../../../common/ReactMonacoEditor";

const AfterScript = ({apiUnitId}) => {

    const { 
        createAfterScript, 
        updateAfterScript, 
        findAfterScript
    } = afterScriptStore;


    const [showBtn, setShowBtn] = useState(false);
    const [dataSource, setDataSource] = useState();
    const [editValue, setEditValue] = useState();


    useEffect(()=>{
        findAfterScript(apiUnitId).then((data)=>{
            if(data){
                setDataSource(data)
            }

        })
    },[apiUnitId])

    /**
     * 提交数据
     * @param {*} values 
     */
    const onFinish = async () => {
        let values = {scriptex:editValue}
        if(dataSource){
            let param = {
                ...dataSource,
                ...values
            }
            await updateAfterScript(param)
        }else{
            values.apiUnitId=apiUnitId;
            values.id =apiUnitId;
            await createAfterScript(values)
        }

        setShowBtn(false)
        setEditValue(null)
    }

    const editChange = (value) =>{
        setEditValue(value)
        setShowBtn(true)
    }

    return (
        <div className={"api-script-box"}>
            <div className={"api-script-pre-header"}> </div>
            <div >
                <div style={{border:"1px solid #f0f0f0"}}>
                    <ReactMonacoEditor
                        editorChange={editChange}
                        value={dataSource?.scriptex}
                        language={"javascript"}
                        height={"200px"}
                        width={"100%"}
                    />
                </div>
                <div className={`action-btn-box ${showBtn?"testhubo-show":"testhubo-hide"}`}>
                    <Button onClick={()=>setShowBtn(false)} style={{marginRight:"10px"}}> 取消</Button>
                    <Button onClick={onFinish} className={"important-btn"} type="primary"> 保存</Button>
                </div>
            </div>
        </div>
    )
}

export default observer(AfterScript);
