
import Home from './home/home';
import HeaderContent from "./header/headerContent";
import PageContent from "./header/pageContent";
import Repository from "./repository/components/repository";
import RepositoryList from "./repository/components/repositoryList";
import RepositoryDetailPage from "./repositoryDetail/repositoryDetailPage";
import {SystemManagement} from "./sysmgr";
import TestPlan  from './testplan/components/testPlan';
import TestPlanDetail from "./testplan/components/testPlanDetail";

import QuartzTaskList from './quartzTask/components/quartzMaster';
import QuartzTask from "./quartzTask/components/quartzTask";

import FunctionalTestDetail from './functest/scenecase/components/functionalTestDetail';

import CategoryList from "./category/components/category";
import {

    Step,
    StepDetail,
}from './apitest/http/unitcase'


export {
    Home,PageContent,HeaderContent,
    SystemManagement,
    Repository, RepositoryList,
    RepositoryDetailPage,

    Step,
    StepDetail,

    QuartzTaskList, QuartzTask,

    FunctionalTestDetail,

    CategoryList,

    TestPlan,TestPlanDetail,


}

