import { Login } from './login';
import { Home } from './home';
import Repository from "./repository/components/repository";
import RepositoryList from "./repository/components/repositoryList";
import {REPOSITORY_STORE, RepositoryStore} from './repository/store/repositoryStore';

import RepositoryDetailPage from "./repositoryDetail/repositoryDetailPage";
import {ENVIRONMENT_STORE, EnvironmentStore} from './integration/environment/store/environmentStore';
import QuartzTaskList from './quartzTask/components/quartzMaster';
import QuartzTask from "./quartzTask/components/quartzTask";
import {QUARTZTASK_STORE, QuartzMasterStore} from './quartzTask/store/quartzMasterStore';
import {QUARTZTESTCASE_STORE, QuartzTestcaseStore} from './quartzTask/store/quartzTestcaseStore';
import {
    Testcase,
    TESTCASE_STORE, TestcaseStore,

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
    TESTINSTANCE_STORE, TestInstanceStore,
    PERFORMCASE_STORE, PerformCaseStore,
    APIUNIT_INSTANCE_STORE, ApiUnitInstanceStore,

    WebTestcase,
    AppTestcase,
} from './apitest/http/unitcase'

import TestReport from './old/testReport/components/testReport';

import {PERFORMANCE_STORE, PerformanceStore} from './old/performance/store/performanceStore';
import {PERFORMANCESTATISTICS_STORE, PerformanceStatisticsStore} from './old/performance/store/PerformanceStatisticsStore';
import PerformanceList from './common/performCommon/performListCommon';
import PerformanceDetail from './old/performance/components/performanceDetail';
import PerformanceHistory from "./old/performance/components/performanceHistory";

import FunctionalTestDetail from './functest/scenecase/components/functionalTestDetail';

import CategoryList from "./category/components/category";
import {CATEGORY_STORE,CategoryStore} from "./category/store/categoryStore";

import TestPlan  from './testplan/components/testPlan';
import TestPlanDetail from "./testplan/components/testPlanDetail";
import {TESTPLAN_STORE, TestPlanStore} from './testplan/store/testPlanStore';
import {TESTPLANDETAIL_STORE, TestPlanDetailStore} from './testplan/store/testPlanDetailStore';
import {USERSELECT_STORE, UserSelectStore} from './common/userSelect/store/userSelectStore'

import {APISCENE_STORE, ApiSceneStore} from "./apitest/http/scenecase/store/apiSceneStore";
import {APISCENESTEP_STORE, ApiSceneStepStore} from "./apitest/http/scenecase/store/apiSceneStepStore";
import {API_SCENEINSTANCE_STORE, ApiSceneInstanceStore} from "./apitest/http/scenecase/store/apiSceneInstanceStore";
import {API_PERF_STORE, ApiPerfStore} from "./apitest/http/performcase/store/apiPerfStore"
import {API_PERF_STEP_STORE, ApiPerfStepStore} from "./apitest/http/performcase/store/apiPerfStepStore";
import {API_PERF_INSTANCE_STORE, ApiPerfInstanceStore} from "./apitest/http/performcase/store/apiPerfInstanceStore";
import {API_UNIT_DISPATCH_STORE, ApiUnitTestDispatchStore} from "./apitest/http/unitcase/store/apiUnitTestDispatchStore";
import {API_SCENE_DISPATCH_STORE,ApiSceneTestDispatchStore} from "./apitest/http/scenecase/store/apiSceneTestDispatchStore";
import {API_PERF_DISPATCH_STORE,ApiPerfTestDispatchStore} from "./apitest/http/performcase/store/apiPerfTestDispatchStore";

import {WEB_UNIT_STORE, WebUnitStore} from "./webtest/unitcase/store/webUnitStore"
import {WEB_UNITSTEP_STORE,WebUnitStepStore} from "./webtest/unitcase/store/webUnitStepStore";
import {WEB_UNITINSTANCE_STORE,WebUnitInstanceStore} from "./webtest/unitcase/store/webUnitInstanceStore";
import {WEB_SCENE_STORE, WebSceneStore} from "./webtest/scenecase/store/webSceneStore";
import {WEB_SCENESTEP_STORE,WebSceneStepStore} from "./webtest/scenecase/store/webSceneStepStore";
import {WEB_SCENEINSTANCE_STORE,WebSceneInstanceStore} from "./webtest/scenecase/store/webSceneInstanceStore";
import {WEB_PERF_STORE,WebPerfStore} from "./webtest/performcase/store/webPerfStore";
import {WEB_PERF_STEP_STORE,WebPerfStepStore} from "./webtest/performcase/store/webPerfStepStore";
import {WEB_PERF_INSTANCE_STORE,WebPerfInstanceStore} from "./webtest/performcase/store/webPerfInstanceStore";
import {WEB_PERF_DISPATCH_STORE,WebPerfTestDispatchStore} from "./webtest/performcase/store/webPerfTestDispatchStore";

import {APP_UNIT_STORE,AppUnitStore} from "./apptest/unitcase/store/appUnitStore";
import {APP_UNITSTEP_STORE,AppUnitStepStore} from "./apptest/unitcase/store/appUnitStepStore";
import {APP_UNITINSTANCE_STORE,AppUnitInstanceStore} from "./apptest/unitcase/store/appUnitInstanceStore";
import {APP_SCENE_STORE,AppSceneStore} from "./apptest/scenecase/store/appSceneStore";
import {APP_SCENESTEP_STORE,AppSceneStepStore} from "./apptest/scenecase/store/appSceneStepStore";
import {APP_SCENEINSTANCE_STORE,AppSceneInstanceStore} from "./apptest/scenecase/store/appSceneInstanceStore";
import {APP_PERF_STORE,AppPerfStore} from "./apptest/performcase/store/appPerfStore";
import {APP_PERF_STEP_STORE,AppPerfStepStore} from "./apptest/performcase/store/appPerfStepStore";
import {APP_PERF_INSTANCE_STORE,AppPerfInstanceStore} from "./apptest/performcase/store/appPerfInstanceStore";
import {APP_PERF_DISPATCH_STORE,AppPerfTestDispatchStore} from "./apptest/performcase/store/appPerfTestDispatchStore";

import {FUNC_UNIT_STORE , FuncUnitStore} from "./functest/unitcase/store/funcUnitStore";
import {FUNC_UNITSTEP_STORE , FuncUnitStepStore} from "./functest/unitcase/store/funcUnitStepStore";
import { FUNC_SCENE_STORE, FuncSceneStore} from "./functest/scenecase/store/funcSceneStore";
import {FUNC_SCENESTEP_STORE, FuncSceneStepStore} from "./functest/scenecase/store/funcSceneStepStore"

import {API_ENV_STORE,ApiEnvStore} from "./sysmgr/environment/store/apiEnvStore";
import {WEB_ENV_STORE,WebEnvStore} from "./sysmgr/environment/store/webEnvStore";
import {APP_ENV_STORE,AppEnvStore} from "./sysmgr/environment/store/appEnvStore";

export {
    Login, Home,
    ENVIRONMENT_STORE, EnvironmentStore,

    Repository, RepositoryList,
    REPOSITORY_STORE, RepositoryStore,
    RepositoryDetailPage,

    Testcase,
    TESTCASE_STORE, TestcaseStore,

    Step,
    StepDetail,

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
    TESTINSTANCE_STORE, TestInstanceStore,
    PERFORMCASE_STORE, PerformCaseStore,

    API_UNIT_STORE,ApiUnitStore,
    APIUNIT_INSTANCE_STORE, ApiUnitInstanceStore,
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
    WEB_UNITSTEP_STORE,WebUnitStepStore,
    WEB_UNITINSTANCE_STORE,WebUnitInstanceStore,
    WEB_SCENE_STORE,WebSceneStore,
    WEB_SCENESTEP_STORE,WebSceneStepStore,
    WEB_SCENEINSTANCE_STORE,WebSceneInstanceStore,
    WEB_PERF_STORE,WebPerfStore,
    WEB_PERF_STEP_STORE,WebPerfStepStore,
    WEB_PERF_INSTANCE_STORE,WebPerfInstanceStore,
    WEB_PERF_DISPATCH_STORE,WebPerfTestDispatchStore,

    APP_UNIT_STORE,AppUnitStore,
    APP_UNITSTEP_STORE,AppUnitStepStore,
    APP_UNITINSTANCE_STORE,AppUnitInstanceStore,
    APP_SCENE_STORE,AppSceneStore,
    APP_SCENESTEP_STORE, AppSceneStepStore,
    APP_SCENEINSTANCE_STORE,AppSceneInstanceStore,
    APP_PERF_STORE,AppPerfStore,
    APP_PERF_STEP_STORE,AppPerfStepStore,
    APP_PERF_INSTANCE_STORE,AppPerfInstanceStore,
    APP_PERF_DISPATCH_STORE,AppPerfTestDispatchStore,


    FUNC_UNIT_STORE, FuncUnitStore,
    FUNC_UNITSTEP_STORE, FuncUnitStepStore,
    FUNC_SCENE_STORE, FuncSceneStore,
    FUNC_SCENESTEP_STORE, FuncSceneStepStore,

    API_ENV_STORE,ApiEnvStore,
    WEB_ENV_STORE,WebEnvStore,
    APP_ENV_STORE,AppEnvStore,

    WebTestcase,
    AppTestcase,



    QuartzTaskList, QuartzTask,
    QUARTZTASK_STORE, QuartzMasterStore,
    QUARTZTESTCASE_STORE, QuartzTestcaseStore,

    TestReport,

    PerformanceList,PerformanceDetail, PerformanceHistory,
    PERFORMANCE_STORE, PerformanceStore,
    PERFORMANCESTATISTICS_STORE, PerformanceStatisticsStore,

    FunctionalTestDetail,


    CategoryList,
    CATEGORY_STORE,CategoryStore,

    TestPlan,TestPlanDetail,
    TESTPLAN_STORE, TestPlanStore,
    TESTPLANDETAIL_STORE, TestPlanDetailStore,

    USERSELECT_STORE, UserSelectStore,




}

