import { LoginStore,LOGIN_STATUS } from 'doublekit-portal-ui';
import {PluginStore, PLUGIN_STORE} from "doublekit-plugin-ui"

import {
    ENVIRONMENT_STORE, EnvironmentStore,

    REPOSITORY_STORE, RepositoryStore,

    TESTCASE_STORE, TestcaseStore,
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
    TESTINSTANCE_STORE, TestInstanceStore,
    PERFORMCASE_STORE, PerformCaseStore,

    APIUNIT_INSTANCE_STORE, ApiUnitInstanceStore,

    API_UNIT_STORE,ApiUnitStore,
    APISCENE_STORE, ApiSceneStore,
    APISCENESTEP_STORE, ApiSceneStepStore,
    API_SCENEINSTANCE_STORE, ApiSceneInstanceStore,
    API_PERFORM_STORE, ApiPerformStore,
    API_PERFORMSCENE_STORE, ApiPerformSceneStore,
    API_PERFORMINSTANCE_STORE, ApiPerformInstanceStore,
    API_UNIT_DISPATCH_STORE,ApiUnitTestDispatchStore,

    WEB_UNIT_STORE, WebUnitStore,
    WEB_SCENE_STORE,WebSceneStore,
    WEB_PERFORM_STORE,WebPerformStore,
    WEB_UNITSTEP_STORE,WebUnitStepStore,
    WEB_SCENESTEP_STORE,WebSceneStepStore,
    WEB_SCENEINSTANCE_STORE,WebSceneInstanceStore,
    WEB_UNITINSTANCE_STORE,WebUnitInstanceStore,
    WEB_PERFORMSCENE_STORE,WebPerformSceneStore,
    WEB_PERFORMINSTANCE_STORE,WebPerformInstanceStore,

    APP_UNIT_STORE,AppUnitStore,
    APP_UNITSTEP_STORE,AppUnitStepStore,
    APP_UNITINSTANCE_STORE,AppUnitInstanceStore,
    APP_SCENE_STORE,AppSceneStore,
    APP_SCENESTEP_STORE, AppSceneStepStore,
    APP_SCENEINSTANCE_STORE,AppSceneInstanceStore,
    APP_PERFORM_STORE,AppPerformStore,
    APP_PERFORMSCENE_STORE,AppPerformSceneStore,
    APP_PERFORMINSTANCE_STORE,AppPerformInstanceStore,

    FUNC_UNIT_STORE , FuncUnitStore,
    FUNC_UNITSTEP_STORE, FuncUnitStepStore,
    FUNC_SCENE_STORE, FuncSceneStore,
    FUNC_SCENESTEP_STORE, FuncSceneStepStore,

    API_ENV_STORE,ApiEnvStore,
    WEB_ENV_STORE,WebEnvStore,
    APP_ENV_STORE,AppEnvStore,


    QUARTZTASK_STORE, QuartzMasterStore,
    QUARTZTESTCASE_STORE, QuartzTestcaseStore,

    PERFORMANCE_STORE, PerformanceStore,
    PERFORMANCESTATISTICS_STORE, PerformanceStatisticsStore,

    FUNCTIONALTEST_STORE, TestcaseFunctionalStore,
    FUNCTIONALTESTSTEP_STORE,FunctionalTestStepStore,

    CATEGORY_STORE,CategoryStore,

    TESTPLAN_STORE, TestPlanStore,
    TESTPLANDETAIL_STORE, TestPlanDetailStore,

    USERSELECT_STORE, UserSelectStore,

} from './modules/index';

function createStores() {
    return {
        [ENVIRONMENT_STORE]: new EnvironmentStore(),
        [REPOSITORY_STORE]: new RepositoryStore(),
        [TESTCASE_STORE]: new TestcaseStore(),
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
        [TESTINSTANCE_STORE]: new TestInstanceStore(),
        [PERFORMCASE_STORE]: new PerformCaseStore(),

        [API_UNIT_STORE]: new ApiUnitStore(),
        [APIUNIT_INSTANCE_STORE]:new ApiUnitInstanceStore(),
        [APISCENE_STORE]: new ApiSceneStore(),
        [APISCENESTEP_STORE]: new ApiSceneStepStore(),
        [API_SCENEINSTANCE_STORE]: new ApiSceneInstanceStore(),
        [API_PERFORM_STORE]:new ApiPerformStore(),
        [API_PERFORMSCENE_STORE]: new ApiPerformSceneStore(),
        [API_PERFORMINSTANCE_STORE]: new  ApiPerformInstanceStore(),
        [API_UNIT_DISPATCH_STORE]: new ApiUnitTestDispatchStore(),

        [WEB_UNIT_STORE]:new WebUnitStore(),
        [WEB_SCENE_STORE]:new WebSceneStore(),
        [WEB_PERFORM_STORE]:new WebPerformStore(),
        [WEB_UNITSTEP_STORE]: new WebUnitStepStore(),
        [WEB_SCENESTEP_STORE]: new WebSceneStepStore(),
        [WEB_SCENEINSTANCE_STORE]: new WebSceneInstanceStore(),
        [WEB_UNITINSTANCE_STORE]:new WebUnitInstanceStore(),
        [WEB_PERFORMSCENE_STORE]: new WebPerformSceneStore(),
        [WEB_PERFORMINSTANCE_STORE]: new WebPerformInstanceStore(),

        [APP_UNIT_STORE]: new AppUnitStore(),
        [APP_UNITSTEP_STORE]: new AppUnitStepStore(),
        [APP_UNITINSTANCE_STORE]: new AppUnitInstanceStore(),
        [APP_SCENE_STORE]: new AppSceneStore(),
        [APP_SCENESTEP_STORE]: new AppSceneStepStore(),
        [APP_SCENEINSTANCE_STORE]: new AppSceneInstanceStore(),
        [APP_PERFORM_STORE]: new AppPerformStore(),
        [APP_PERFORMSCENE_STORE]: new AppPerformSceneStore(),
        [APP_PERFORMINSTANCE_STORE]: new AppPerformInstanceStore(),

        [FUNC_UNIT_STORE]: new FuncUnitStore(),
        [FUNC_UNITSTEP_STORE]:new FuncUnitStepStore(),
        [FUNC_SCENE_STORE]: new FuncSceneStore(),
        [FUNC_SCENESTEP_STORE]:new FuncSceneStepStore(),

        [API_ENV_STORE]: new ApiEnvStore(),
        [WEB_ENV_STORE]: new WebEnvStore(),
        [APP_ENV_STORE]: new AppEnvStore(),

        [QUARTZTASK_STORE]: new QuartzMasterStore(),
        [QUARTZTESTCASE_STORE]: new QuartzTestcaseStore(),

        [PERFORMANCE_STORE]: new PerformanceStore(),
        [PERFORMANCESTATISTICS_STORE]: new PerformanceStatisticsStore(),

        [FUNCTIONALTEST_STORE]: new TestcaseFunctionalStore(),
        [FUNCTIONALTESTSTEP_STORE]:new FunctionalTestStepStore(),

        [CATEGORY_STORE]:new CategoryStore(),

        [TESTPLAN_STORE]: new TestPlanStore(),
        [TESTPLANDETAIL_STORE]: new TestPlanDetailStore(),

        [USERSELECT_STORE]: new UserSelectStore(),
        [LOGIN_STATUS]: new LoginStore(),
        [PLUGIN_STORE]: new PluginStore(),
    };
}

const stores = createStores();

export {
    stores
}

