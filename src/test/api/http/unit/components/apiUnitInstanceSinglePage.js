import React, {useState} from "react";
import {observer} from "mobx-react";
import apiUnitInstanceStore from "../store/apiUnitInstanceStore";
import CaseBread from "../../../../../common/CaseBread";
import {Drawer} from "antd";
import ApiUnitInstanceDetail from "./apiUnitInstanceDetail";

const ApiUnitInstanceSinglePage = (props) =>{
    const {apiUnitInstanceId,name} = props
    const {findApiUnitInstance} = apiUnitInstanceStore;

    const [allData, setAllData] = useState();
    const [open, setOpen] = useState(false);

    const showDrawer = async () => {
        findApiUnitInstance(apiUnitInstanceId).then(res=>{
            setAllData(res)
        })
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    };


    //响应结果基础信息项
    const detail = [
        {
            title:"请求地址:",
            value:allData?.requestInstance?.requestUrl,
            key:"url"
        },{
            title:"请求方式:",
            value:allData?.requestInstance?.requestType,
            key:"methodType"
        },{
            title:"状态码:",
            value:allData?.statusCode||"无",
            key:"statusCode"
        },{
            title:"测试结果:",
            value:allData?.result ? '成功' : '失败',
            key:"result"
        },{
            title:"测试时间:",
            value:allData?.createTime,
            key:"testTime"
        },
    ]


    return(
        <>
            <span className={"link-text"} onClick={showDrawer} >{name}</span>
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                width={800}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                //contentWrapperStyle={{top:48,height:"calc(100% - 50px)"}}
                closable={false}
                className={"api-unit-drawer"}
            >
                <CaseBread
                    breadItem={["历史详情"]}
                    icon={"api1"}
                    setOpen={setOpen}
                />

                <ApiUnitInstanceDetail
                    detail={detail}
                    allData={allData}
                />
            </Drawer>
        </>
    )

}

export default observer(ApiUnitInstanceSinglePage);