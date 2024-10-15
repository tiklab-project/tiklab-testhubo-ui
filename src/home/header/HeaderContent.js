import React from 'react';
import MessageDrawer from "../../setting/message/MessageDrawer";
import {productWhiteImg} from "tiklab-core-ui"
import {productTitle} from "tiklab-core-ui/es/utils/product";
import EnterPriseEdition from "./enterpriseEdition/EnterPriseEdition";

/**
 * 页面头部
 */
const HeaderContent = props => {

    //去往主页
    const goHome = () =>{
        props.history.push("/index")
        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("leftRouter","/index");
    }

    return(
        <div className="frame-header">
            <div className={"pi-header-left"}>
                {props.AppLink}
                <div className={"display-flex-gap"} style={{margin:"0 20px"}}>
                    <div className={'frame-header-logo'} onClick={goHome} style={{cursor:"pointer"}}>
                        <img src={productWhiteImg.testhubo} alt='logo' />
                    </div>
                    <div className={"productName"} onClick={goHome} style={{cursor:"pointer"}}>{productTitle.testhubo}</div>
                </div>

            </div>

            <div className={'frame-header-right-box'}>
                <div className={"header-right-item"} data-title-bottom={"消息"}>
                    <MessageDrawer />
                </div>
                {props.HelpLink}
                <div className={"recovery-item"}>
                    <EnterPriseEdition featureType={props.featureType}/>
                </div>
                <div >
                    {props.AvatarLink}
                </div>
            </div>
        </div>
    )
}


export default HeaderContent;
