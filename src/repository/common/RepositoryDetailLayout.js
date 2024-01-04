import React from "react";
import LeftNav from "./LeftNav";
import "./repositoryDetailStyle.scss"
import "../../common/commonStyle.scss";
import "../../test/common/styles/testcaseStyle.scss";
import "../../test/common/styles/caseContantStyle.scss";
import "../../test/common/styles/unitcase.scss";
import "../../testplan/plan/components/testPlanStyle.scss"
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
import TestPlanStore from "../../testplan/plan/store/testPlanStore";
import WorkItemStore from "../../integrated/teamwire/workItem/store/WorkItemStore";
import AgentConfigStore from "../../support/agent/store/AgentConfigStore";
import ApiEnvStore from "../../support/environment/store/apiEnvStore";
import AppEnvStore from "../../support/environment/store/appEnvStore";
import WebEnvStore from "../../support/environment/store/webEnvStore";
import ContentPageCommon from "../../common/ContentPageCommon/ContentPageCommon";


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

    return(
        <Provider {...store}>
            <ContentPageCommon
                left={<LeftNav {...props} />}
                {...props}
            />
        </Provider>
    )
}

export default RepositoryDetailLayout;

