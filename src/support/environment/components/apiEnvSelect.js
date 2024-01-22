import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import "./envStyle.scss"
import {Divider, Select, Tooltip} from "antd";
const {Option} = Select

const ApiEnvSelect = (props) =>{
    const {apiEnvStore} = props;
    const {findApiEnvList,apiEnvList,getTestEnvUrl,envUrl} = apiEnvStore;

    let repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(()=>{
        findApiEnvList(repositoryId)
    },[repositoryId])

    // 选择测试环境 input框呈现相应的地址
    const onSelectChange = (value) => {
        getTestEnvUrl(value)
    }

    const showOption = (data)=>{
        return data&&data.map(item=>{

            return (
                <Option key={item.id} value={item.preUrl}>
                    <Tooltip placement="leftTop" title={item.preUrl}> {item.name} </Tooltip>
                </Option>
            )
        })
    }

    const toEnvMana= () =>{
        props.history.push("/repository/setting/envMana")
    }


    return(
        <Select
            bordered={false}
            className={"env-select-box"}
            placeholder={"未设置环境"}
            onChange={(value)=> onSelectChange(value)}
            defaultValue={envUrl}
            // dropdownRender={item=>(
            //     <>
            //         <div style={{"overflow":"auto","height":"100px"}}>{item}</div>
            //
            //         <Divider style={{ margin: '8px 0' }} />
            //         <div className={'env-click'} onClick={toEnvMana}>环境管理</div>
            //     </>
            // )}
        >
            <Option value={null}>无</Option>
            {
                showOption(apiEnvList)
            }
        </Select>
    )
}

export default inject("apiEnvStore")(observer(ApiEnvSelect));