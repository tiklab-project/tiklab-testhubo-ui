import {EAM_STORE, EamStore} from 'tiklab-eam-ui/es/store'
// import {PluginStore, PLUGIN_STORE} from "tiklab-plugin-ui"


import {REPOSITORY_STORE, RepositoryStore} from './modules/repository/store/repositoryStore';
import {REPOSITORY_RECENT_STORE,RepositoryRecentStore} from "./modules/repository/store/repositoryRecentStore";

import {AGENT_CONFIG_STORE,AgentConfigStore} from "./modules/integration/agentconfig/store/agentConfigStore";


import {QUARTZTASK_STORE, QuartzMasterStore} from './modules/quartzTask/store/quartzMasterStore';
import {QUARTZTESTCASE_STORE, QuartzTestcaseStore} from './modules/quartzTask/store/quartzTestcaseStore';

import {

    Step,
    StepDetail,
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

} from './modules/apitest/http/unitcase'

import {CATEGORY_STORE,CategoryStore} from "./modules/category/store/categoryStore";


import {TESTPLAN_STORE, TestPlanStore} from './modules/testplan/store/testPlanStore';
import {TESTPLANDETAIL_STORE, TestPlanDetailStore} from './modules/testplan/store/testPlanDetailStore';
import {USERSELECT_STORE, UserSelectStore} from './modules/common/userSelect/store/userSelectStore'

import {APISCENE_STORE, ApiSceneStore} from "./modules/apitest/http/scenecase/store/apiSceneStore";
import {APISCENESTEP_STORE, ApiSceneStepStore} from "./modules/apitest/http/scenecase/store/apiSceneStepStore";
import {API_SCENEINSTANCE_STORE, ApiSceneInstanceStore} from "./modules/apitest/http/scenecase/store/apiSceneInstanceStore";
import {API_PERF_STORE, ApiPerfStore} from "./modules/apitest/http/performcase/store/apiPerfStore"
import {API_PERF_STEP_STORE, ApiPerfStepStore} from "./modules/apitest/http/performcase/store/apiPerfStepStore";
import {API_PERF_INSTANCE_STORE, ApiPerfInstanceStore} from "./modules/apitest/http/performcase/store/apiPerfInstanceStore";
import {API_UNIT_DISPATCH_STORE, ApiUnitTestDispatchStore} from "./modules/apitest/http/unitcase/store/apiUnitTestDispatchStore";
import {API_SCENE_DISPATCH_STORE,ApiSceneTestDispatchStore} from "./modules/apitest/http/scenecase/store/apiSceneTestDispatchStore";
import {API_PERF_DISPATCH_STORE,ApiPerfTestDispatchStore} from "./modules/apitest/http/performcase/store/apiPerfTestDispatchStore";

import {WEB_UNIT_STORE, WebUnitStore} from "./modules/webtest/unitcase/store/webUnitStore"
import {WEB_SCENE_STORE, WebSceneStore} from "./modules/webtest/scenecase/store/webSceneStore";
import {WEB_SCENESTEP_STORE,WebSceneStepStore} from "./modules/webtest/scenecase/store/webSceneStepStore";
import {WEB_SCENEINSTANCE_STORE,WebSceneInstanceStore} from "./modules/webtest/scenecase/store/webSceneInstanceStore";
import {WEB_PERF_STORE,WebPerfStore} from "./modules/webtest/performcase/store/webPerfStore";
import {WEB_PERF_STEP_STORE,WebPerfStepStore} from "./modules/webtest/performcase/store/webPerfStepStore";
import {WEB_PERF_INSTANCE_STORE,WebPerfInstanceStore} from "./modules/webtest/performcase/store/webPerfInstanceStore";
import {WEB_PERF_DISPATCH_STORE,WebPerfTestDispatchStore} from "./modules/webtest/performcase/store/webPerfTestDispatchStore";

import {APP_UNIT_STORE,AppUnitStore} from "./modules/apptest/unitcase/store/appUnitStore";
import {APP_UNITSTEP_STORE,AppUnitStepStore} from "./modules/apptest/unitcase/store/appUnitStepStore";
import {APP_SCENE_STORE,AppSceneStore} from "./modules/apptest/scenecase/store/appSceneStore";
import {APP_SCENESTEP_STORE,AppSceneStepStore} from "./modules/apptest/scenecase/store/appSceneStepStore";
import {APP_SCENEINSTANCE_STORE,AppSceneInstanceStore} from "./modules/apptest/scenecase/store/appSceneInstanceStore";
import {APP_PERF_STORE,AppPerfStore} from "./modules/apptest/performcase/store/appPerfStore";
import {APP_PERF_STEP_STORE,AppPerfStepStore} from "./modules/apptest/performcase/store/appPerfStepStore";
import {APP_PERF_INSTANCE_STORE,AppPerfInstanceStore} from "./modules/apptest/performcase/store/appPerfInstanceStore";
import {APP_PERF_DISPATCH_STORE,AppPerfTestDispatchStore} from "./modules/apptest/performcase/store/appPerfTestDispatchStore";

import {FUNC_UNIT_STORE , FuncUnitStore} from "./modules/functest/unitcase/store/funcUnitStore";
import {FUNC_UNITSTEP_STORE , FuncUnitStepStore} from "./modules/functest/unitcase/store/funcUnitStepStore";
import { FUNC_SCENE_STORE, FuncSceneStore} from "./modules/functest/scenecase/store/funcSceneStore";
import {FUNC_SCENESTEP_STORE, FuncSceneStepStore} from "./modules/functest/scenecase/store/funcSceneStepStore"

import {API_ENV_STORE,ApiEnvStore} from "./modules/sysmgr/environment/store/apiEnvStore";
import {WEB_ENV_STORE,WebEnvStore} from "./modules/sysmgr/environment/store/webEnvStore";
import {APP_ENV_STORE,AppEnvStore} from "./modules/sysmgr/environment/store/appEnvStore";


function createStores() {
    return {
        [AGENT_CONFIG_STORE]:new AgentConfigStore(),
        [REPOSITORY_STORE]: new RepositoryStore(),
        [REPOSITORY_RECENT_STORE]: new RepositoryRecentStore(),

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

        [WEB_UNIT_STORE]:new WebUnitStore(),
        [WEB_SCENE_STORE]:new WebSceneStore(),
        [WEB_PERF_STORE]:new WebPerfStore(),
        [WEB_SCENESTEP_STORE]: new WebSceneStepStore(),
        [WEB_SCENEINSTANCE_STORE]: new WebSceneInstanceStore(),
        [WEB_PERF_STEP_STORE]: new WebPerfStepStore(),
        [WEB_PERF_INSTANCE_STORE]: new WebPerfInstanceStore(),
        [WEB_PERF_DISPATCH_STORE]: new WebPerfTestDispatchStore(),

        [APP_UNIT_STORE]: new AppUnitStore(),
        [APP_UNITSTEP_STORE]: new AppUnitStepStore(),
        [APP_SCENE_STORE]: new AppSceneStore(),
        [APP_SCENESTEP_STORE]: new AppSceneStepStore(),
        [APP_SCENEINSTANCE_STORE]: new AppSceneInstanceStore(),
        [APP_PERF_STORE]: new AppPerfStore(),
        [APP_PERF_STEP_STORE]: new AppPerfStepStore(),
        [APP_PERF_INSTANCE_STORE]: new AppPerfInstanceStore(),
        [APP_PERF_DISPATCH_STORE]: new AppPerfTestDispatchStore(),

        [FUNC_UNIT_STORE]: new FuncUnitStore(),
        [FUNC_UNITSTEP_STORE]:new FuncUnitStepStore(),
        [FUNC_SCENE_STORE]: new FuncSceneStore(),
        [FUNC_SCENESTEP_STORE]:new FuncSceneStepStore(),

        [API_ENV_STORE]: new ApiEnvStore(),
        [WEB_ENV_STORE]: new WebEnvStore(),
        [APP_ENV_STORE]: new AppEnvStore(),

        [QUARTZTASK_STORE]: new QuartzMasterStore(),
        [QUARTZTESTCASE_STORE]: new QuartzTestcaseStore(),



        [CATEGORY_STORE]:new CategoryStore(),

        [TESTPLAN_STORE]: new TestPlanStore(),
        [TESTPLANDETAIL_STORE]: new TestPlanDetailStore(),

        [USERSELECT_STORE]: new UserSelectStore(),
        [EAM_STORE]: new EamStore(),
        // [PLUGIN_STORE]: new PluginStore(),
    };
}

const stores = createStores();

export {
    stores
}

