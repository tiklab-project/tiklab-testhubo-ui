import React from 'react';
import {UserVerify} from "thoughtware-eam-ui";
import {connect} from 'thoughtware-plugin-core-ui';
import PageContent from "./PageContent";
import {AppLink, AvatarLink, HelpLink} from "thoughtware-licence-ui";

/**
 * 用于个性化配置
 */
const Page = (props)=>{

    return(
        <PageContent
            AppLink={<AppLink/>}
            HelpLink={<HelpLink/>}
            AvatarLink={<AvatarLink {...props}/>}
            {...props}
        />
    )
}


/**
 * 获取connect传递过来的pluginStore，返回一个对象
 */
function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

/**
 * 再把对象，使用平台高阶组件传递给verifyUser，验证用户
 */
export default connect(mapStateToProps)(UserVerify(Page,"/no-auth"));



