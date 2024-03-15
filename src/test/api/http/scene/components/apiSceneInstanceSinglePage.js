import React, {useState} from "react";
import {observer} from "mobx-react";
import apiSceneInstanceStore from "../store/apiSceneInstanceStore";
import CaseBread from "../../../../../common/CaseBread";
import {Drawer} from "antd";
import ApiSceneInstanceDetail from "./apiSceneInstance";

const ApiSceneInstanceSinglePage = (props) =>{
    const {apiSceneInstanceId,name} = props
    const { findApiSceneInstance } = apiSceneInstanceStore;

    const [allData, setAllData] = useState();
    const [open, setOpen] = useState(false);

    const showDrawer = async () => {
        let res = await findApiSceneInstance(apiSceneInstanceId)
        setAllData(res)
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    };


    return(
        <>
            <span className={"link-text"} onClick={showDrawer} >{name}</span>
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                width={1000}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 50px)"}}
                closable={false}
            >
                <div style={{height: "calc(100% - 52px)"}}>
                    <CaseBread
                        breadItem={["历史详情"]}
                        icon={"api1"}
                        setOpen={setOpen}
                    />
                    <ApiSceneInstanceDetail  allData={allData}/>
                </div>
            </Drawer>
        </>
    )
}
export default observer(ApiSceneInstanceSinglePage);