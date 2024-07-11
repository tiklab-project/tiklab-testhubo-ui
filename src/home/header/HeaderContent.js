import React from 'react';
import MessageDrawer from "../../setting/message/MessageDrawer";
import {productImg} from "thoughtware-core-ui"
import {productTitle} from "thoughtware-core-ui/es/utils/product";

/**
 * 页面头部
 */
const HeaderContent = props => {

    //去往主页
    const goHome = () =>{
        props.history.push("/home")
        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("leftRouter","/home");
    }

    return(
        <div className="frame-header">
            <div className={"pi-header-left"}>
                {props.AppLink}
                <div className={"display-flex-gap"} style={{margin:"0 20px"}}>
                    <div className={'frame-header-logo'} onClick={goHome} style={{cursor:"pointer"}}>
                        <img src={productImg.teston} alt='logo' />
                    </div>
                    <div className={"productName"} onClick={goHome} style={{cursor:"pointer"}}>{productTitle.teston}</div>
                </div>

            </div>

            <div className={'frame-header-right-box'}>
                <div className={"header-right-item"} data-title-bottom={"消息"}>
                    <MessageDrawer />
                </div>
                <div >
                    {props.AvatarLink}
                </div>
            </div>
        </div>
    )
}


export default HeaderContent;
