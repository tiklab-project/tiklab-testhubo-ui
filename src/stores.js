import {EAM_STORE, EamStore} from 'tiklab-eam-ui/es/store'
// import {PluginStore, PLUGIN_STORE} from "tiklab-plugin-ui"


import {REPOSITORY_STORE, RepositoryStore} from './modules/repository/repository/store/repositoryStore';
import {REPOSITORY_RECENT_STORE,RepositoryRecentStore} from "./modules/repository/repository/store/repositoryRecentStore";
import {REPOSITORY_FOLLOW_STORE,RepositoryFollowStore} from "./modules/repository/repository/store/repositoryFollowStore";

import {AGENT_CONFIG_STORE,AgentConfigStore} from "./modules/support/agent/store/agentConfigStore";


import {
    API_UNIT_STORE,ApiUnitStore,
    REQUESTHEADER_STORE , RequestHeaderStore,
    QUERYPARAM_STORE, QueryParamStore,
    FORMPARAM_STORE, FormParamStore,
    FORM_URLENCODED_STORE,FormUrlencodedStore,
    JSONPARAM_STORE, JsonParamStore,
    RAWPARAM_STORE, RawParamStore,
    PREPARAM_STORE, PreParamStore,
    AFTERPARAM_STORE, AfterParamStore,
    ASSERTPARAM_STORE, AssertParamStore,
    REQUESTBODY_STORE, RequestBodyStore,

    RESPONSEHEADER_STORE, ResponseHeaderStore,
    JSONRESPONSE_STORE, JsonResponseStore,
    RAWRESPONSE_STORE, RawResponseStore,
    RESPONSERESULT_STORE, ResponseResultStore,
    APIUNIT_INSTANCE_STORE, ApiUnitInstanceStore,

} from './modules/test/api/http/unit'

import {CATEGORY_STORE,CategoryStore} from "./modules/category/store/categoryStore";

import {TESTCASE_STORE,TestCaseStore} from "./modules/test/testcase/store/testcaseStore";

import {TESTPLAN_STORE, TestPlanStore} from './modules/testplan/store/testPlanStore';
import {TESTPLANDETAIL_STORE, TestPlanDetailStore} from './modules/testplan/store/testPlanDetailStore';
import {TEST_PLAN_INSTANCE_STORE,TestPlanInstanceStore} from "./modules/testplan/store/testPlanInstanceStore";
import {TEST_PLAN_BIND_CASE_INSTANCE_STORE,TestPlanBindCaseInstanceStore} from "./modules/testplan/store/testPlanBindCaseInstanceStore";

import {USERSELECT_STORE, UserSelectStore} from './modules/common/userSelect/store/userSelectStore'

import {APISCENE_STORE, ApiSceneStore} from "./modules/test/api/http/scene/store/apiSceneStore";
import {APISCENESTEP_STORE, ApiSceneStepStore} from "./modules/test/api/http/scene/store/apiSceneStepStore";
import {API_SCENEINSTANCE_STORE, ApiSceneInstanceStore} from "./modules/test/api/http/scene/store/apiSceneInstanceStore";
import {API_PERF_STORE, ApiPerfStore} from "./modules/test/api/http/perf/store/apiPerfStore"
import {API_PERF_STEP_STORE, ApiPerfStepStore} from "./modules/test/api/http/perf/store/apiPerfStepStore";
import {API_PERF_INSTANCE_STORE, ApiPerfInstanceStore} from "./modules/test/api/http/perf/store/apiPerfInstanceStore";
import {API_UNIT_DISPATCH_STORE, ApiUnitTestDispatchStore} from "./modules/test/api/http/unit/store/apiUnitTestDispatchStore";
import {API_SCENE_DISPATCH_STORE,ApiSceneTestDispatchStore} from "./modules/test/api/http/scene/store/apiSceneTestDispatchStore";
import {API_PERF_DISPATCH_STORE,ApiPerfTestDispatchStore} from "./modules/test/api/http/perf/store/apiPerfTestDispatchStore";

import {WEB_SCENE_STORE, WebSceneStore} from "./modules/test/web/scene/store/webSceneStore";
import {WEB_SCENESTEP_STORE,WebSceneStepStore} from "./modules/test/web/scene/store/webSceneStepStore";
import {WEB_SCENEINSTANCE_STORE,WebSceneInstanceStore} from "./modules/test/web/scene/store/webSceneInstanceStore";
import {WEB_PERF_STORE,WebPerfStore} from "./modules/test/web/perf/store/webPerfStore";
import {WEB_PERF_STEP_STORE,WebPerfStepStore} from "./modules/test/web/perf/store/webPerfStepStore";
import {WEB_PERF_INSTANCE_STORE,WebPerfInstanceStore} from "./modules/test/web/perf/store/webPerfInstanceStore";
import {WEB_PERF_DISPATCH_STORE,WebPerfTestDispatchStore} from "./modules/test/web/perf/store/webPerfTestDispatchStore";

import {APP_SCENE_STORE,AppSceneStore} from "./modules/test/app/scene/store/appSceneStore";
import {APP_SCENESTEP_STORE,AppSceneStepStore} from "./modules/test/app/scene/store/appSceneStepStore";
import {APP_SCENEINSTANCE_STORE,AppSceneInstanceStore} from "./modules/test/app/scene/store/appSceneInstanceStore";
import {APP_PERF_STORE,AppPerfStore} from "./modules/test/app/perf/store/appPerfStore";
import {APP_PERF_STEP_STORE,AppPerfStepStore} from "./modules/test/app/perf/store/appPerfStepStore";
import {APP_PERF_INSTANCE_STORE,AppPerfInstanceStore} from "./modules/test/app/perf/store/appPerfInstanceStore";
import {APP_PERF_DISPATCH_STORE,AppPerfTestDispatchStore} from "./modules/test/app/perf/store/appPerfTestDispatchStore";

import {FUNC_UNIT_STORE , FuncUnitStore} from "./modules/test/function/store/funcUnitStore";
import {FUNC_UNITSTEP_STORE , FuncUnitStepStore} from "./modules/test/function/store/funcUnitStepStore";

import {API_ENV_STORE,ApiEnvStore} from "./modules/support/environment/store/apiEnvStore";
import {WEB_ENV_STORE,WebEnvStore} from "./modules/support/environment/store/webEnvStore";
import {APP_ENV_STORE,AppEnvStore} from "./modules/support/environment/store/appEnvStore";


function createStores() {
    return {
        [AGENT_CONFIG_STORE]:new AgentConfigStore(),
        [REPOSITORY_STORE]: new RepositoryStore(),
        [REPOSITORY_RECENT_STORE]: new RepositoryRecentStore(),
        [REPOSITORY_FOLLOW_STORE]: new RepositoryFollowStore(),

        [REQUESTHEADER_STORE]: new RequestHeaderStore(),
        [QUERYPARAM_STORE]: new QueryParamStore(),
        [FORMPARAM_STORE]: new FormParamStore(),
        [FORM_URLENCODED_STORE]: new FormUrlencodedStore(),
        [JSONPARAM_STORE]: new JsonParamStore(),
        [RAWPARAM_STORE]: new RawParamStore(),
        [PREPARAM_STORE]: new PreParamStore(),
        [AFTERPARAM_STORE]: new AfterParamStore(),
        [ASSERTPARAM_STORE]: new AssertParamStore(),
        [REQUESTBODY_STORE]: new RequestBodyStore(),

        [RESPONSEHEADER_STORE]: new ResponseHeaderStore(),
        [JSONRESPONSE_STORE]: new JsonResponseStore(),
        [RAWRESPONSE_STORE]: new RawResponseStore(),
        [RESPONSERESULT_STORE]: new ResponseResultStore(),

        [TESTCASE_STORE]: new TestCaseStore(),

        [API_UNIT_STORE]: new ApiUnitStore(),
        [APIUNIT_INSTANCE_STORE]:new ApiUnitInstanceStore(),
        [APISCENE_STORE]: new ApiSceneStore(),
        [APISCENESTEP_STORE]: new ApiSceneStepStore(),
        [API_SCENEINSTANCE_STORE]: new ApiSceneInstanceStore(),
        [API_PERF_STORE]:new ApiPerfStore(),
        [API_PERF_STEP_STORE]: new ApiPerfStepStore(),
        [API_PERF_INSTANCE_STORE]: new  ApiPerfInstanceStore(),
        [API_UNIT_DISPATCH_STORE]: new ApiUnitTestDispatchStore(),
        [API_SCENE_DISPATCH_STORE]: new ApiSceneTestDispatchStore(),
        [API_PERF_DISPATCH_STORE]: new ApiPerfTestDispatchStore(),

        [WEB_SCENE_STORE]:new WebSceneStore(),
        [WEB_PERF_STORE]:new WebPerfStore(),
        [WEB_SCENESTEP_STORE]: new WebSceneStepStore(),
        [WEB_SCENEINSTANCE_STORE]: new WebSceneInstanceStore(),
        [WEB_PERF_STEP_STORE]: new WebPerfStepStore(),
        [WEB_PERF_INSTANCE_STORE]: new WebPerfInstanceStore(),
        [WEB_PERF_DISPATCH_STORE]: new WebPerfTestDispatchStore(),

        [APP_SCENE_STORE]: new AppSceneStore(),
        [APP_SCENESTEP_STORE]: new AppSceneStepStore(),
        [APP_SCENEINSTANCE_STORE]: new AppSceneInstanceStore(),
        [APP_PERF_STORE]: new AppPerfStore(),
        [APP_PERF_STEP_STORE]: new AppPerfStepStore(),
        [APP_PERF_INSTANCE_STORE]: new AppPerfInstanceStore(),
        [APP_PERF_DISPATCH_STORE]: new AppPerfTestDispatchStore(),

        [FUNC_UNIT_STORE]: new FuncUnitStore(),
        [FUNC_UNITSTEP_STORE]:new FuncUnitStepStore(),

        [API_ENV_STORE]: new ApiEnvStore(),
        [WEB_ENV_STORE]: new WebEnvStore(),
        [APP_ENV_STORE]: new AppEnvStore(),

        [CATEGORY_STORE]:new CategoryStore(),

        [TESTPLAN_STORE]: new TestPlanStore(),
        [TESTPLANDETAIL_STORE]: new TestPlanDetailStore(),
        [TEST_PLAN_INSTANCE_STORE]: new TestPlanInstanceStore(),
        [TEST_PLAN_BIND_CASE_INSTANCE_STORE]: new TestPlanBindCaseInstanceStore(),

        [USERSELECT_STORE]: new UserSelectStore(),
        [EAM_STORE]: new EamStore(),
    };
}

const stores = createStores();

export {
    stores
}

