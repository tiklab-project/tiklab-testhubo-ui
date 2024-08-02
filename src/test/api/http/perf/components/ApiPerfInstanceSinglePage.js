import React, { useState} from "react";
import {Drawer} from "antd";
import { observer} from "mobx-react";
import apiPerfInstanceStore from "../store/apiPerfInstanceStore";
import CaseBread from "../../../../../common/CaseBread";
import ApiPerfInstanceDetail from "./ApiPerfInstanceDetail";

const ApiPerfInstanceSinglePage = ({apiPerfInstanceId,name}) =>{
    const {findApiPerfInstance} = apiPerfInstanceStore;

    const [result, setResult] = useState();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const showDrawer = async () => {
        let res = await findApiPerfInstance(apiPerfInstanceId)
        setLoading(false)
        setResult(res)
        setOpen(true);
    };

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
                width={900}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                //contentWrapperStyle={{top:48,height:"calc(100% - 50px)"}}
                closable={false}
            >
                <CaseBread
                    breadItem={["历史详情"]}
                    icon={"api1"}
                    setOpen={setOpen}
                />
                <div className={"result-spin-box"} style={{margin:"0 10px",overflow: "hidden",height: "calc( 100% - 52px )"}} >
                    <ApiPerfInstanceDetail result={result} loading={loading}/>
                </div>
            </Drawer>
        </>

    )
}

export default observer(ApiPerfInstanceSinglePage);