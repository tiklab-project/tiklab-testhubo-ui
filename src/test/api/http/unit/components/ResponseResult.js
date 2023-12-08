import React, {useCallback, useEffect, useState} from "react";
import {Button, Form, Input, Radio, Select, Space} from "antd"
import { observer} from "mobx-react";
import JsonSchemaTable from "./JsonSchemaTable";
import ReactMonacoEditor from "../../../../../common/ReactMonacoEditor";
import responseResultStore from "../store/responseResultStore";
const {Option} = Select

/**
 * 定义
 * http
 * 响应结果
 */
const ResponseResult = ({apiUnitId}) =>{
    const {findResponseResult,updateResponseResult} = responseResultStore;

    const [schemaData, setSchemaData] = useState();
    const [form] = Form.useForm();
    const [rawText, setRawText] = useState();
    const [dataValue, setDataValue] = useState();
    const [type, setType] = useState();


    useEffect(async ()=>{
        let res =  await findResponseResult(apiUnitId)
        form.setFieldsValue({
            name:res.name,
            httpCode:res.httpCode,
            dataType:res.dataType
        })

        if(res.dataType==="json"){
            setSchemaData(JSON.parse(res.jsonText))
        }else {
            setRawText(res.rawText)
        }
        setType(res.dataType);

        setDataValue(res)
    },[apiUnitId])

    /**
     * 值改变，更新
     */
    const onChange = async ()=>{
        let value = await form.getFieldsValue();
        value.id=apiUnitId;
        value.apiUnitId=apiUnitId;

        await updateResponseResult(value)
        setType(value.dataType)
    }

    /**
     * raw里面的数据改变，获取值
     */
    const rawChange = (value)=>{
        setRawText(value)
    }

    /**
     * 保存raw参数，防止切换类型后jsonText里面还有值
     */
    const saveRawText = async () =>{
        const param = {
            id: dataValue?.id,
            apiUnitId:dataValue?.apiUnitId,
            rawText:rawText,

            jsonText:"nullstring"
        }

        await updateResponseResult(param)

        let res = await findResponseResult(apiUnitId)
        setDataValue(res)
    }

    /**
     * raw 取消输入
     */
    const cancelRawText = () =>{
        setRawText(dataValue?.rawText)
    }

    /**
     * 当旧的数据和新的输入不一样时，显示：取消、保存  按钮
     */
    const showSaveView = () =>{
        let isTrue = dataValue?.rawText!==rawText

        if(dataValue?.dataType==="raw"&&isTrue){
            return <Space>
                <Button  onClick={cancelRawText}>取消</Button>
                <Button className={"important-btn"} onClick={saveRawText}>保存</Button>
            </Space>
        }
    }

    /**
     * jsonschemaTable组件使用的更新
     */
    const jsonSchemaUpdate = useCallback(async (updateValue)=>{
        let param = {
            id: apiUnitId,
            apiUnitId:apiUnitId,
            jsonText:JSON.stringify(updateValue)
        }
        await updateResponseResult(param)
    },[])

    const httpCodes = [200,201,403,404,410,422,500,502,503,504]

    return(
        <div className={"api-res-result"}>
            <div className={"api-res-result-top-box"}>
                <Form form={form}   layout={"inline"}  style={{margin:" 0 0 10px 0"}}>
                    <Form.Item
                        name="name"
                    >
                        <Input  onBlur={onChange}/>
                    </Form.Item>
                    <Form.Item
                        name="httpCode"
                    >
                        <Select showSearch style={{width:"150px"}} onSelect={onChange}>
                            {
                                httpCodes.map(item=>{
                                    return <Option value={item} key={item}>{item}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="数据类型"
                        name="dataType"
                    >
                        <Radio.Group onChange={onChange}>
                            <Radio value={"json"}>json</Radio>
                            <Radio value={"raw"}>raw</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
                {
                    showSaveView()
                }

            </div>
            <div style={{margin:" 0 0 0 10px"}}>
                {
                    type==="json"
                        ? <JsonSchemaTable
                            schema={schemaData}
                            updateFn={jsonSchemaUpdate}
                        />
                        :<ReactMonacoEditor
                            editorChange={rawChange}
                            value={rawText}
                            language={"text"}
                            height={"300px"}
                            width={"100%"}
                        />
                }
            </div>
        </div>
    )
}

export default observer(ResponseResult);