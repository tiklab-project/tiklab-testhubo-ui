import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import "./envStyle.scss"
import { Dropdown, Menu} from "antd";
import IconBtn from "../../../common/iconBtn/IconBtn";

const ApiEnvDropDownSelect = (props) =>{
    const {apiEnvStore} = props;
    const {findApiEnvList,apiEnvList,getTestEnvUrl,envUrl} = apiEnvStore;

    let repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(()=>{
        findApiEnvList(repositoryId)
    },[repositoryId])

    const menu = (
        <Menu>
            <Menu.Item key={"default"}  onClick={()=>{getTestEnvUrl(null)}}>无</Menu.Item>
            {
                apiEnvList&&apiEnvList.map(item=>{
                    return <Menu.Item key={item.id}  defaultValue={envUrl} onClick={()=>{getTestEnvUrl(item.preUrl)}}>{item.name}</Menu.Item>
                })
            }
        </Menu>
    );

    return(
        <Dropdown overlay={menu} >
            <div>
                <IconBtn
                    className="pi-icon-btn-grey"
                    name={"环境"}
                />
            </div>
        </Dropdown>
    )
}

export default inject("apiEnvStore")(observer(ApiEnvDropDownSelect));