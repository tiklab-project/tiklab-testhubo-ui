import React, {useEffect, useState} from "react";
import {Breadcrumb, Drawer, Input} from "antd";
import {useHistory, useLocation} from "react-router";
import {renderRoutes} from "react-router-config";
import {DrawerCloseIcon} from "../../test/common/BreadcrumbCommon";
import IconCommon from "../../common/IconCommon";
import {inject, observer} from "mobx-react";
import {ArrowLeftOutlined} from "@ant-design/icons";

const TestPlanDrawer = (props) =>{
    const {testPlanStore,planData,findPage} = props
    const {updateTestPlan} = testPlanStore

    const history = useHistory();
    const [open, setOpen] = useState(false);
    let pathname = useLocation().pathname;

    useEffect(()=>{
        if(open&&pathname==="/repository/plan"){
            setOpen(false)
        }
    },[pathname,open])

    const showDrawer = () => {
        sessionStorage.setItem('testPlanId',planData.id);
        history.push(`/repository/plan/detail/${planData.id}`);
        setOpen(true);
    };

    const onClose = () => {
        history.push("/repository/plan")
        setOpen(false);
    };

    //更新名称
    const updateName = (e) =>{
        let name = e.target.value
        const param = {
            ...planData,
            name:name
        }
        updateTestPlan(param).then(()=>{
            findPage()
        })
    }

    const showBreadcrumb = () =>{
        if(pathname.includes("/repository/plan/detail")){
            return <div className={"breadcrumb-title_between"}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <IconCommon
                        icon={"jiekou1"}
                        className="icon-s "
                        style={{margin: "3px 5px 0"}}
                    />
                    <Breadcrumb.Item>
                        <Input
                            value={planData?.name}
                            className={"case-header_title"}
                            onChange={updateName}
                        />
                    </Breadcrumb.Item>
                </Breadcrumb>
                <DrawerCloseIcon />
            </div>
        }else {
            return <div
                className={"breadcrumb-title_between"}
                style={{height:"36px"}}
            >
                <ArrowLeftOutlined
                    onClick={()=>history.goBack()}
                    style={{cursor:"pointer",margin:"0 10px"}}
                />

                <DrawerCloseIcon />
            </div>
        }

    }

    return(
        <>
            <a onClick={showDrawer}>
                {planData.name}
            </a>
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
                {
                    showBreadcrumb()
                }

                {
                    renderRoutes(props?.route?.routes)
                }
            </Drawer>
        </>
    )
}


export default inject('testPlanStore')(observer(TestPlanDrawer));