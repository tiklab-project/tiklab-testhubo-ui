import React, { useState} from "react";
import { Drawer,} from "antd";
import ApiUnitEditPageCommon from "../../unit/components/apiUnitEditPageCommon";
import IconCommon from "../../../../../common/IconCommon";

const ApiSceneStepDrawer = (props) =>{
    const {name} =props

    const [open, setOpen] = useState(false);

    const showDrawer = async () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return(
        <>
            <div
                className={"link-text"}
                onClick={showDrawer}
                style={{flexGrow: 1}}
            >
                {name}
            </div>
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                width={"70%"}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
                closable={false}
            >
                <div className={"content-box-center"}>
                    <div className={"breadcrumb-title_between"} style={{borderBottom: "1px solid var(--pi-border-color)"}}>
                        <div className={"breadcrumb-left"}>

                            <div className={"case-header_title"}>步骤详情</div>
                        </div>
                        <IconCommon
                            className={"icon-s edit-icon"}
                            icon={"shanchu2"}
                            onClick={()=>setOpen(false)}
                        />
                    </div>
                    <ApiUnitEditPageCommon {...props} />
                </div>

            </Drawer>
        </>
    )
}


export default ApiSceneStepDrawer;