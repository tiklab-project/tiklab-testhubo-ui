import React from "react";
import {Select} from "antd";

const {Option} = Select;

const EnvSelectCommon = (props) =>{
    const {envList,ENV_SELECTED} = props;


    const selectedId = JSON.parse(localStorage.getItem(ENV_SELECTED)).key

    const showListView = (data)=>{
        return data&&data.map(item=>{
            return <Option key={item.id} value={item.id}>{item.url}</Option>
        })
    }

    const onChange = (value) =>{
        localStorage.setItem(ENV_SELECTED,JSON.stringify(value));
    }

    const toEnvMana= () =>{
        props.history.push("/systemManagement/envMana")
    }



    return(
        <>
            <Select
                labelInValue
                style={{width:200}}
                className={'env-select'}
                onChange={onChange}
                defaultValue={selectedId?selectedId:null}
                dropdownRender={(list)=>
                    <div>
                        {list}
                        <div className={'env-click'} onClick={toEnvMana}>环境管理</div>
                    </div>
                }
            >
                {
                    showListView(envList)
                }
            </Select>
        </>
    )
}

export default EnvSelectCommon;