/*
 * @Description: 请求参数中Json的可编辑表格组件
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:56:56
 */
import React, {useState, useEffect, useCallback} from 'react';
import { observer } from "mobx-react";
import jsonParamStore from "../store/jsonParamStore";
import JsonSchemaTable from "./JsonSchemaTable";
const {findJsonParam,updateJsonParam} = jsonParamStore;

const JsonParam = (props) => {

    const [schemaData, setSchemaData] = useState();

    const apiUnitId = sessionStorage.getItem('apiUnitId');
    useEffect(async ()=>{
        let res = await findJsonParam(apiUnitId)
        if( res.code === 0){
            setSchemaData(JSON.parse(res.data.schemaText))
        }
    },[])

    const jsonSchemaUpdate = useCallback(async (updateValue)=>{
        let param = {
            id:apiUnitId,
            apiUnitId:apiUnitId,
            schemaText:JSON.stringify(updateValue),
        }

        await updateJsonParam(param)
    },[])

    return (
        <JsonSchemaTable
            schema={schemaData}
            updateFn={jsonSchemaUpdate}
        />
    );
}

export default observer(JsonParam);
