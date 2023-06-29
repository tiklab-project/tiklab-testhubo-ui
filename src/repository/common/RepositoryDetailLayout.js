import React from "react";
import LeftNav from "./LeftNav";
import "./repositoryDetailStyle.scss"
import "../../common/commonStyle.scss"
import {renderRoutes} from "react-router-config";
import { Provider } from 'mobx-react';
import CategoryStore from "../../category/store/CategoryStore";
import ApiUnitStore from "../../test/api/http/unit/store/apiUnitStore";
import ApiPerfStore from "../../test/api/http/perf/store/apiPerfStore";
import AppSceneStore from "../../test/app/scene/store/appSceneStore";
import AppPerfStore from "../../test/app/perf/store/appPerfStore";
import ApiSceneStore from "../../test/api/http/scene/store/apiSceneStore";
import FuncUnitStore from "../../test/function/store/funcUnitStore";
import WebSceneStore from "../../test/web/scene/store/webSceneStore";
import WebPerfStore from "../../test/web/perf/store/webPerfStore";
import TestPlanStore from "../../testplan/store/testPlanStore";
import WorkItemStore from "../../integrated/teamwire/workItem/store/WorkItemStore";
import AgentConfigStore from "../../support/agent/store/AgentConfigStore";
import ApiEnvStore from "../../support/environment/store/apiEnvStore";
import AppEnvStore from "../../support/environment/store/appEnvStore";
import WebEnvStore from "../../support/environment/store/webEnvStore";


/**
 * 详情的布局，为左右结构
 */
const RepositoryDetailLayout = (props) =>{
    let store = {
        categoryStore: CategoryStore,
        apiUnitStore:ApiUnitStore,
        apiSceneStore:ApiSceneStore,
        apiPerfStore:ApiPerfStore,

        appSceneStore:AppSceneStore,
        appPerfStore:AppPerfStore,

        funcUnitStore:FuncUnitStore,

        webSceneStore:WebSceneStore,
        webPerfStore:WebPerfStore,
        testPlanStore:TestPlanStore,

        workItemStore:WorkItemStore,
        agentConfigStore:AgentConfigStore,
        apiEnvStore:ApiEnvStore,
        appEnvStore:AppEnvStore,
        webEnvStore:WebEnvStore
    }

    const routes = props.route.routes;

    return(
        <div className={"ws-detail-contant"}>
            <div className={"ws-detail-left"}>
                <LeftNav {...props} />
            </div>
            <div className={"ws-detail-right"}>
                <Provider {...store}>
                    {
                        renderRoutes(routes)
                    }
                </Provider>
            </div>
        </div>
    )
}

export default RepositoryDetailLayout;

