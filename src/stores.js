import {EAM_STORE, EamStore} from 'doublekit-eam-ui/es/store'
// import {PluginStore, PLUGIN_STORE} from "doublekit-plugin-ui"

import {
    ENVIRONMENT_STORE, EnvironmentStore,

    REPOSITORY_STORE, RepositoryStore,

    REQUESTHEADER_STORE , RequestHeaderStore,
    QUERYPARAM_STORE, QueryParamStore,
    FORMPARAM_STORE, FormParamStore,
    FORM_URLENCODED_STORE, FormUrlencodedStore,
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

    API_UNIT_STORE,ApiUnitStore,
    APISCENE_STORE, ApiSceneStore,
    APISCENESTEP_STORE, ApiSceneStepStore,
    API_SCENEINSTANCE_STORE, ApiSceneInstanceStore,
    API_PERF_STORE, ApiPerfStore,
    API_PERF_STEP_STORE, ApiPerfStepStore,
    API_PERF_INSTANCE_STORE, ApiPerfInstanceStore,
    API_UNIT_DISPATCH_STORE,ApiUnitTestDispatchStore,
    API_SCENE_DISPATCH_STORE,ApiSceneTestDispatchStore,
    API_PERF_DISPATCH_STORE,ApiPerfTestDispatchStore,

    WEB_UNIT_STORE, WebUnitStore,
    WEB_SCENE_STORE,WebSceneStore,
    WEB_PERF_STORE,WebPerfStore,
    WEB_SCENESTEP_STORE,WebSceneStepStore,
    WEB_SCENEINSTANCE_STORE,WebSceneInstanceStore,
    WEB_PERF_STEP_STORE,WebPerfStepStore,
    WEB_PERF_INSTANCE_STORE,WebPerfInstanceStore,
    WEB_PERF_DISPATCH_STORE,WebPerfTestDispatchStore,

    APP_UNIT_STORE,AppUnitStore,
    APP_UNITSTEP_STORE,AppUnitStepStore,
    APP_SCENE_STORE,AppSceneStore,
    APP_SCENESTEP_STORE, AppSceneStepStore,
    APP_SCENEINSTANCE_STORE,AppSceneInstanceStore,
    APP_PERF_STORE,AppPerfStore,
    APP_PERF_STEP_STORE,AppPerfStepStore,
    APP_PERF_INSTANCE_STORE,AppPerfInstanceStore,
    APP_PERF_DISPATCH_STORE,AppPerfTestDispatchStore,

    FUNC_UNIT_STORE , FuncUnitStore,
    FUNC_UNITSTEP_STORE, FuncUnitStepStore,
    FUNC_SCENE_STORE, FuncSceneStore,
    FUNC_SCENESTEP_STORE, FuncSceneStepStore,

    API_ENV_STORE,ApiEnvStore,
    WEB_ENV_STORE,WebEnvStore,
    APP_ENV_STORE,AppEnvStore,


    QUARTZTASK_STORE, QuartzMasterStore,
    QUARTZTESTCASE_STORE, QuartzTestcaseStore,


    CATEGORY_STORE,CategoryStore,

    TESTPLAN_STORE, TestPlanStore,
    TESTPLANDETAIL_STORE, TestPlanDetailStore,

    USERSELECT_STORE, UserSelectStore,

} from './modules/index';

function createStores() {
    return {
        [ENVIRONMENT_STORE]: new EnvironmentStore(),
        [REPOSITORY_STORE]: new RepositoryStore(),
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

