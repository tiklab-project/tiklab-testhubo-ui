import React from 'react';
import HeaderMenu from "./HeaderMenu";
import logo from "../../assets/img/testonheader.png";
import { SettingOutlined} from "@ant-design/icons";
import MessageDrawer from "../../setting/message/MessageDrawer";


/**
 * 页面头部
 */
const HeaderContent = props => {

    //去往系统设置页
    const toSystem = () =>{
        props.history.push("/setting/home")
    }

    return(
        <div className="frame-header">
            <div className={"pi-header-left"}>
                <div  className={"recovery-item"}>
                    {props.AppLink}
                </div>
                <div className={'frame-header-logo'}>
                    {logo && <img src={logo} alt='logo' />}
                </div>
                <HeaderMenu {...props}/>
            </div>

            <div className={'frame-header-right-box'}>
                <div className={"header-right-item"}  data-title-bottom={"设置"}>
                    <SettingOutlined className={"header-icon-item"} onClick={toSystem}/>
                </div>
                <div className={"header-right-item"} data-title-bottom={"消息"}>
                    <MessageDrawer />
                </div>
                <div className={"recovery-item"}>
                    {props.HelpLink}
                </div>
                <div >
                    {props.AvatarLink}
                </div>
            </div>
        </div>
    )
}


export default HeaderContent;
