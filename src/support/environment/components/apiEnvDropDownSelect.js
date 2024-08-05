import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import "./envStyle.scss"
import {Divider, Select, Tooltip} from "antd";
import ApiEnvModel from "./apiEnvModel";
const { Option } = Select;

const ApiEnvDropDownSelect = (props) =>{
    const {apiEnvStore,style} = props;
    const {findApiEnvList,apiEnvSourceList,getTestEnvUrl,envUrl} = apiEnvStore;

    let repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(()=>{
        findApiEnvList(repositoryId)
    },[repositoryId])

    /**
     * 选择测试环境 input框呈现相应的地址
     */
    const onSelectChange = (value) => {
        getTestEnvUrl(value)
    }

    /**
     * 渲染环境选项
     */
    const showOption = (data)=>{

        return data&&data.map(item=>{
            return (
                <Option key={item.id} value={item.preUrl}>
                    <Tooltip placement="leftTop" title={item.preUrl}> {item.name} </Tooltip>
                </Option>
            )
        })
    }

    const onDropdownVisibleChange = async ()=>{
        await findApiEnvList(repositoryId)
    }

    return(
        <Select
            bordered={false}
            className={"select-box"}
            placeholder={"未设置环境"}
            onSelect={(value)=> onSelectChange(value)}
            defaultValue={envUrl}
            onDropdownVisibleChange={onDropdownVisibleChange}
            style={style}
            dropdownRender={item=>(
                <>
                    <div style={{"overflow":"auto","height":"100px"}}>{item}</div>

                    <Divider style={{ margin: '5px 0' }} />
                    <ApiEnvModel />
                </>
            )}
        >
            <Option value={null}>无</Option>
            {
                showOption(apiEnvSourceList)
            }
        </Select>
    )
}

export default inject("apiEnvStore")(observer(ApiEnvDropDownSelect));