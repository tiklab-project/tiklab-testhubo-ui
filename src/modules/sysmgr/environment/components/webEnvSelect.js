import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import "./envStyle.scss"
import {Divider, Select, Tooltip} from "antd";
const {Option} = Select

const WebEnvSelect = (props) =>{
    const {webEnvStore} = props;
    const {findWebEnvList,webEnvList,getTestEnvUrl,envUrl} = webEnvStore;

    let repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(()=>{
        findWebEnvList(repositoryId)
    },[repositoryId])

    // 选择测试环境 input框呈现相应的地址
    const onSelectChange = (value) => {
        getTestEnvUrl(value)
    }

    const showOption = (data)=>{
        return data&&data.map(item=>{

            return (
                <Option key={item.id} value={item.id}>
                    <Tooltip placement="leftTop" title={item.id}> {item.name} </Tooltip>
                </Option>
            )
        })
    }

    const toEnvMana= () =>{
        props.history.push("/systemManagement/envMana")
    }


    return(
        <Select
            style={{width:200}}
            onChange={(value)=> onSelectChange(value)}
            defaultValue={envUrl}
            dropdownRender={item=>(
                <>
                    <div style={{"overflow":"auto","height":"100px"}}>{item}</div>

                    <Divider  />
                    <div className={'env-click'} onClick={toEnvMana}>环境管理</div>
                </>
            )}
        >
            {
                showOption(webEnvList)
            }
        </Select>
    )
}

export default inject("webEnvStore")(observer(WebEnvSelect));