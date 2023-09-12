import React, {useState} from "react";
import {Breadcrumb, Drawer} from "antd";
import {useHistory} from "react-router";
import {renderRoutes} from "react-router-config";
import {DrawerCloseIcon} from "../../test/common/BreadcrumbCommon";
import IconCommon from "../../common/IconCommon";
import {inject, observer} from "mobx-react";

const TestPlanBindCaseDrawer = (props) =>{
    const {caseData,testPlanId} = props

    const history = useHistory();
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        toDiffCase(caseData)
        setOpen(true);
    };

    //再根据不同的用例类型跳到不同的页面
    const toDiffCase = (record)=>{
        switch (record.caseType) {
            case "api-unit":
                toDetailAddRouterCommon("apiUnitId",record)
                break;
            case "api-scene":
                toDetailAddRouterCommon("apiSceneId",record)
                break;
            case "api-perform":
                toDetailAddRouterCommon("apiPerfId",record)
                break;

            case "web-scene":
                toDetailAddRouterCommon("webSceneId",record)
                break;
            case "web-perform":
                toDetailAddRouterCommon("webPerfId",record)
                break;

            case "app-scene":
                toDetailAddRouterCommon("appSceneId",record)
                break;

            case "app-perform":
                toDetailAddRouterCommon("appPerfId",record)
                break;
            case "function":
                toDetailAddRouterCommon("functionId",record)
                break
        }
    }

    //跳转路由
    const toDetailAddRouterCommon = (setId,record)=>{
        sessionStorage.setItem(`${setId}`,record.id);
        history.push(`/repository/plan-detail/${record.caseType}`)
    }

    const onClose = () => {
        history.push(`/repository/plan-detail/${testPlanId}`)
        setOpen(false);
    };


    return(
        <>
            <a onClick={showDrawer}>
                {caseData.name}
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
                    renderRoutes(props?.route?.routes)
                }
            </Drawer>
        </>
    )
}


export default inject('testPlanStore')(observer(TestPlanBindCaseDrawer));