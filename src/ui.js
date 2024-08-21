import LazyComponent from "./module/common/Lazy";
import App from "./module/app";
import PageContent from "./module/home/header/PageContent";

let Home = LazyComponent(() => import("./module/home/Home"));

let Repository = LazyComponent(() => import("./module/repository/repository/components/Repository"));
let RepositoryEdit = LazyComponent(() => import("./module/repository/repository/components/RepositoryEdit"));
let RepositoryDetailPage = LazyComponent(() => import("./module/repository/overview/RepositoryOverView"));
let RepositoryDetailLayout = LazyComponent(() => import("./module/repository/common/RepositoryDetailLayout"));
let RepositorySettingMenu = LazyComponent(() => import("./module/repository/setting/RepositorySettingMenu"));
let RepositorySetting = LazyComponent(() => import("./module/repository/setting/RepositorySetting"));

let CategoryList = LazyComponent(() => import("./module/category/components/CategoryList"));

let TestCaseTable = LazyComponent(() => import( "./module/test/testcase/components/TestCaseTable"))
let TestcaseListMain = LazyComponent(() => import( "./module/test/testcase/components/testcaseListView/TestcaseListMain"));

let ApiUnitContent = LazyComponent(() => import("./module/test/api/http/unit/components/apiUnitContent"));
let ApiUnitInstanceList = LazyComponent(() => import("./module/test/api/http/unit/components/apiUnitInstanceList"));
let ApiUnitContentListView  = LazyComponent(() => import( "./module/test/api/http/unit/components/listView/ApiUnitContentListView"));
let ApiUnitInstanceListView = LazyComponent(() => import( "./module/test/api/http/unit/components/listView/apiUnitInstanceListView"));

let ApiSceneContent = LazyComponent(() => import("./module/test/api/http/scene/components/apiSceneContent"));
let ApiSceneContentListView = LazyComponent(() => import("./module/test/api/http/scene/components/listView/apiSceneContentListView"));

let ApiPerfContent = LazyComponent(() => import("./module/test/api/http/perf/components/ApiPerfContent"));
let ApiPerformToUnitPage =LazyComponent(() => import( "./module/test/api/http/perf/components/apiPerformToUnitPage"));
let ApiPerformToScenePage = LazyComponent(() => import("./module/test/api/http/perf/components/apiPerformToScenePage"));
let ApiPerfContentListView = LazyComponent(() => import( "./module/test/api/http/perf/components/listView/ApiPerfContentListView"));;
let ApiPerformToUnitPageListView = LazyComponent(() => import( "./module/test/api/http/perf/components/listView/ApiPerformToUnitPageListView"));
let ApiPerformToScenePageListView = LazyComponent(() => import( "./module/test/api/http/perf/components/listView/apiPerformToScenePageListView"));

let FuncUnitDetail = LazyComponent(() => import("./module/test/function/components/FunctionContent"));
let FunctionContentListView = LazyComponent(() => import("./module/test/function/components/listView/FunctionContentListView"));

let PlanDetailContent = LazyComponent(()=>import("./module/testplan/common/PlanDetailContent"))
let TestPlan = LazyComponent(() => import("./module/testplan/plan/components/testPlan"));
let TestPlanBindCaseList = LazyComponent(() => import("./module/testplan/plan/components/testPlanBindCaseList"));
let TestPlanInstanceList = LazyComponent(() => import("./module/testplan/instance/components/testPlanInstanceList"));

let PlanToApiUnitPage = LazyComponent(() => import("./module/testplan/common/planToCase/planToApiUnitPage"));
let PlanToApiScenePage = LazyComponent(() => import("./module/testplan/common/planToCase/planToApiScenePage"));
let PlanToApiPerformPage = LazyComponent(() => import("./module/testplan/common/planToCase/planToApiPerformPage"));
let PlanToFuncUnitPage = LazyComponent(() => import("./module/testplan/common/planToCase/planToFuncUnitPage"));
let PlanSetting = LazyComponent(() => import( "./module/testplan/setting/PlanSetting"));
let QuartzPlanList = LazyComponent(() => import( "./module/testplan/quartz/components/QuartzPlanList"));

let TestReportDetail = LazyComponent(() => import("./module/testreport/components/testReportDetail"));
let ProjectAllDefectList = LazyComponent(() => import( "./module/integrated/teamwire/defect/components/ProjectAllDefectList"));

let StatisticsMenu = LazyComponent(() => import( "./module/statistics/common/StatisticsMenu"));
let NewCreateCaseStatistics = LazyComponent(() => import( "./module/statistics/newcreatecase/NewCreateCaseStatistics"));
let CaseTestStatistics = LazyComponent(() => import( "./module/statistics/casetest/CaseTestStatistics"));

let EnvContent = LazyComponent(() => import("./module/support/environment/components/envContent"));
let AgentConfigList = LazyComponent(() => import("./module/support/agent/components/AgentConfigList"));
let WorkspaceBindList = LazyComponent(() => import("./module/integrated/common/integratedPage"));

let Version = LazyComponent(() => import("./module/setting/version/Version"));
let DomainRole = LazyComponent(() => import("./module/repository/setting/DomainRole"));
let DomainPrivilege = LazyComponent(() => import("./module/repository/setting/DomainPrivilege"));


let SystemContent = LazyComponent(() => import("./module/setting/system/SystemContent"));
let LoginOut = LazyComponent(() => import("./module/home/header/LoginOut"));
let AppEnvSelect = LazyComponent(() => import( "./module/support/environment/components/appEnvSelect"));
let CaseTableQuickTest = LazyComponent(() => import( "./module/test/common/CaseTableQuickTest/CaseTableQuickTest"))
let appEnvStore = LazyComponent(() => import( "./module/support/environment/store/appEnvStore"))
let {findCaseInstancePage} = LazyComponent(() => import( "./module/testreport/common/instanceCommonFn"));
let PageCenter = LazyComponent(() => import(  "./module/common/pageContent/PageCenter"))

const VariableTable  = LazyComponent(() => import( "./module/test/common/Variable/components/VariableTable"));
const CaseContentCommon  = LazyComponent(() => import( "./module/test/common/CaseContentCommon"));
const DetailCommon  = LazyComponent(() => import( "./module/common/caseCommon/DetailCommon"));
const CaseDesc  = LazyComponent(() => import( "./module/common/caseCommon/CaseDesc"));
const IconCommon  = LazyComponent(() => import( "./module/common/IconCommon"));
const {showCaseTypeView,showCaseTypeInList,showStatus}  = LazyComponent(() => import( "./module/common/caseCommon/CaseCommonFn"));
const {CASE_TYPE,testExecuteStatus,assertCompare}  = LazyComponent(() => import( "./module/common/dictionary/dictionary"));
const UIResultCommon  = LazyComponent(() => import( "./module/test/common/UIResultCommon"));
const ScriptEdit  = LazyComponent(() => import( "./module/test/common/ScriptEdit"));
const stepCommonStore  = LazyComponent(() => import( "./module/test/common/stepcommon/store/StepCommonStore"));
const IfJudgmentEdit  = LazyComponent(() => import( "./module/test/common/ifJudgment/components/IfJudgmentEdit"));
const IconBtn  = LazyComponent(() => import( "./module/common/iconBtn/IconBtn"));
const {IfStep}  = LazyComponent(() => import( "./module/test/common/caseCommonFn"));
const {messageFn}  = LazyComponent(() => import( "./module/common/messageCommon/MessageCommon"));
const CaseBread  = LazyComponent(() => import( "./module/common/CaseBread"));
const ToggleCase  = LazyComponent(() => import( "./module/test/testcase/components/ToggleCase"));
const StepAssertCommon  = LazyComponent(() => import( "./module/test/common/stepassert/StepAssertCommon"));
const InstanceListCommon  = LazyComponent(() => import( "./module/testreport/common/InstanceListCommon"));
const categoryStore  = LazyComponent(() => import( "./module/category/store/CategoryStore"));


export{
    App,
    PageContent,

    Home,
    Repository,
    RepositoryEdit,
    RepositoryDetailPage,
    RepositoryDetailLayout,
    RepositorySettingMenu,
    RepositorySetting,

    CategoryList,
    TestCaseTable,
    TestcaseListMain,

    ApiUnitContent,
    ApiUnitInstanceList,
    ApiUnitContentListView,
    ApiUnitInstanceListView,

    ApiSceneContent,
    ApiSceneContentListView,

    ApiPerfContent,
    ApiPerformToUnitPage,
    ApiPerformToScenePage,
    ApiPerfContentListView,
    ApiPerformToUnitPageListView,
    ApiPerformToScenePageListView,

    FuncUnitDetail,
    FunctionContentListView,

    PlanDetailContent,
    TestPlan,
    TestPlanBindCaseList,
    TestPlanInstanceList,

    PlanToApiUnitPage,
    PlanToApiScenePage,
    PlanToApiPerformPage,
    PlanToFuncUnitPage,
    PlanSetting,
    QuartzPlanList,

    TestReportDetail,
    ProjectAllDefectList,

    StatisticsMenu,
    NewCreateCaseStatistics,
    CaseTestStatistics,

    EnvContent,
    AgentConfigList,
    WorkspaceBindList,

    Version,
    DomainRole,
    DomainPrivilege,

    //other
    LoginOut,
    SystemContent,
    AppEnvSelect,
    CaseTableQuickTest,
    appEnvStore,
    findCaseInstancePage,
    PageCenter,

    VariableTable,
    CaseContentCommon,
    DetailCommon,
    CaseDesc,
    IconCommon,
    showCaseTypeView,showCaseTypeInList,showStatus,
    CASE_TYPE,testExecuteStatus,assertCompare,
    UIResultCommon,
    messageFn,
    IconBtn,
    IfStep,
    IfJudgmentEdit,
    ScriptEdit,
    stepCommonStore,
    CaseBread,
    ToggleCase,
    StepAssertCommon,
    InstanceListCommon,
    categoryStore
}