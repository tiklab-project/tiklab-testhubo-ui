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
    STEP_STORE,StepStore,
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
    WEBSTEP_STORE, WebStepStore,

    AppTestcase,
    APPSTEP_STORE, AppStepStore,
} from './apitest/unitcase'

import TestReport from './old/testReport/components/testReport';

import {PERFORMANCE_STORE, PerformanceStore} from './old/performance/store/performanceStore';
import {PERFORMANCESTATISTICS_STORE, PerformanceStatisticsStore} from './old/performance/store/PerformanceStatisticsStore';
import PerformanceList from './common/performCommon/performListCommon';
import PerformanceDetail from './old/performance/components/performanceDetail';
import PerformanceHistory from "./old/performance/components/performanceHistory";

import FunctionalTestDetail from './functest/scenecase/components/functionalTestDetail';
import {FUNCTIONALTEST_STORE, TestcaseFunctionalStore} from './functest/scenecase/store/testcaseFunctionalStore';
import {FUNCTIONALTESTSTEP_STORE,FunctionalTestStepStore} from './functest/scenecase/store/functionalTestStepStore';

import CategoryList from "./category/components/category";
import {CATEGORY_STORE,CategoryStore} from "./category/store/categoryStore";

import TestPlan  from './testplan/components/testPlan';
import TestPlanDetail from "./testplan/components/testPlanDetail";
import {TESTPLAN_STORE, TestPlanStore} from './testplan/store/testPlanStore';
import {TESTPLANDETAIL_STORE, TestPlanDetailStore} from './testplan/store/testPlanDetailStore';
import {USERSELECT_STORE, UserSelectStore} from './common/userSelect/store/userSelectStore'

import {APISCENE_STORE, ApiSceneStore} from "./apitest/scenecase/store/apiSceneStore";
import {APISCENESTEP_STORE, ApiSceneStepStore} from "./apitest/scenecase/store/apiSceneStepStore";
import {API_SCENEINSTANCE_STORE, ApiSceneInstanceStore} from "./apitest/scenecase/store/apiSceneInstanceStore";
import { API_PERFORM_STORE, ApiPerformStore} from "./apitest/performcase/store/apiPerformStore"
import {API_PERFORMSCENE_STORE, ApiPerformSceneStore} from "./apitest/performcase/store/apiPerformSceneStore";
import {API_PERFORMINSTANCE_STORE, ApiPerformInstanceStore} from "./apitest/performcase/store/apiPerformInstanceStore";


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
    STEP_STORE,StepStore,
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


    APISCENE_STORE, ApiSceneStore,
    APISCENESTEP_STORE, ApiSceneStepStore,
    API_SCENEINSTANCE_STORE, ApiSceneInstanceStore,
    API_PERFORM_STORE, ApiPerformStore,
    API_PERFORMSCENE_STORE, ApiPerformSceneStore,
    API_PERFORMINSTANCE_STORE, ApiPerformInstanceStore,

    WebTestcase,
    WEBSTEP_STORE, WebStepStore,

    AppTestcase,
    APPSTEP_STORE, AppStepStore,

    QuartzTaskList, QuartzTask,
    QUARTZTASK_STORE, QuartzMasterStore,
    QUARTZTESTCASE_STORE, QuartzTestcaseStore,

    TestReport,

    PerformanceList,PerformanceDetail, PerformanceHistory,
    PERFORMANCE_STORE, PerformanceStore,
    PERFORMANCESTATISTICS_STORE, PerformanceStatisticsStore,

    FunctionalTestDetail,
    FUNCTIONALTEST_STORE, TestcaseFunctionalStore,
    FUNCTIONALTESTSTEP_STORE,FunctionalTestStepStore,

    CategoryList,
    CATEGORY_STORE,CategoryStore,

    TestPlan,TestPlanDetail,
    TESTPLAN_STORE, TestPlanStore,
    TESTPLANDETAIL_STORE, TestPlanDetailStore,

    USERSELECT_STORE, UserSelectStore,



}

