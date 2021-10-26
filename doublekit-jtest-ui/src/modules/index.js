import { Login } from './login';
import { Home } from './home';
import Repository from "./repository/components/repository";
import RepositoryList from "./repository/components/repositoryList";
import {REPOSITORY_STORE, RepositoryStore} from './repository/store/repositoryStore';
import RepositoryDetail from "./common/repositoryDetail";
import RepositoryDetailPage from "./common/repositoryDetailPage";
import {ENVIRONMENT_STORE, EnvironmentStore} from './environment/store/environmentStore';
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

    WebTestcase,
    WEBSTEP_STORE, WebStepStore,

    AppTestcase,
    APPSTEP_STORE, AppStepStore,
} from './testcase'

import TestReport from './testReport/components/testReport';

import {PERFORMANCE_STORE, PerformanceStore} from './performance/store/performanceStore';
import PerformanceList from './performance/components/performance';
import PerformanceDetail from './performance/components/performanceDetail';

import FunctionalTestDetail from './testcase/functionalTest/components/functionalTestDetail';
import {FUNCTIONALTEST_STORE, TestcaseFunctionalStore} from './testcase/functionalTest/store/testcaseFunctionalStore';
import {FUNCTIONALTESTSTEP_STORE,FunctionalTestStepStore} from './testcase/functionalTest/store/functionalTestStepStore';

import CategoryList from "./category/components/category";
import {CATEGORY_STORE,CategoryStore} from "./category/store/categoryStore";

import TestPlan  from './testPlan/components/testPlan';
import TestPlanDetail from "./testPlan/components/testPlanDetail";
import {TESTPLAN_STORE, TestPlanStore} from './testPlan/store/testPlanStore';
import {TESTPLANDETAIL_STORE, TestPlanDetailStore} from './testPlan/store/testPlanDetailStore';
import {USERSELECT_STORE, UserSelectStore} from './common/userSelect/store/userSelectStore'
export {
    Login,
    Home,
    ENVIRONMENT_STORE, EnvironmentStore,

    Repository,
    RepositoryList,
    REPOSITORY_STORE, RepositoryStore,
    RepositoryDetail,
    RepositoryDetailPage,


    Testcase,
    TESTCASE_STORE, TestcaseStore,

    Step,
    StepDetail,
    STEP_STORE,StepStore,
    REQUESTHEADER_STORE , RequestHeaderStore,
    QUERYPARAM_STORE, QueryParamStore,
    FORMPARAM_STORE, FormParamStore,
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

    WebTestcase,
    WEBSTEP_STORE, WebStepStore,

    AppTestcase,
    APPSTEP_STORE, AppStepStore,

    QuartzTaskList,
    QuartzTask,
    QUARTZTASK_STORE, QuartzMasterStore,
    QUARTZTESTCASE_STORE, QuartzTestcaseStore,

    TestReport,

    PerformanceList,PerformanceDetail,
    PERFORMANCE_STORE, PerformanceStore,

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

