import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import "./envStyle.scss"
import {Divider, Select, Tooltip} from "antd";
const {Option} = Select

const AppEnvSelect = (props) =>{
    const {appEnvStore} = props;
    const {findAppEnvList,appEnvList,getAppEnv,appEnv} = appEnvStore;

    let repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(()=>{
        findAppEnvList(repositoryId)
    },[repositoryId])

    // 选择测试环境 input框呈现相应的地址
    const onSelectChange = (value) => {
        getAppEnv(value)
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
        props.history.push("/setting/envMana")
    }


    return(
        <Select
            placeholder={"未设置环境"}
            bordered={false}
            className={"env-select-box"}
            onChange={(value)=> onSelectChange(value)}
            defaultValue={appEnv}
            style={{width:"200px"}}
            // dropdownRender={item=>(
            //     <>
            //         <div style={{"overflow":"auto","height":"100px"}}>{item}</div>
            //
            //         <Divider style={{ margin: '5px 0' }} />
            //         <ApiEnvModel />
            //     </>
            // )}
        >
            <Option value={null}>无</Option>
            {
                showOption(appEnvList)
            }
        </Select>
    )
}

export default inject("appEnvStore")(observer(AppEnvSelect));