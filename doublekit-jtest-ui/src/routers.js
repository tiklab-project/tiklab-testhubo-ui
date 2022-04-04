
import React from 'react'
import {LogOut} from 'doublekit-frame-ui';
import {AuthConfig} from 'doublekit-user-ui'
import {
    Login, Home,
    Repository,
    RepositoryList,
    RepositoryDetailPage,
    Testcase, Step, StepDetail, WebTestcase, AppTestcase,

    QuartzTaskList, QuartzTask, TestReport,

    PerformanceList, PerformanceDetail,PerformanceHistory,
    FunctionalTestDetail,
    CategoryList,
    TestPlan, TestPlanDetail,

} from './modules';

import {
    SystemManagement,
    Org, Usermgr,
    ProjectFeature, ProjectRole,
    SystemFeature, SystemRole,
    MessageManagement, MessageSendType, MessageTemplate, MessageType, MessageUser,
} from './modules/sysmgr'

import {Redirect} from "react-router";
import Demo from "./modules/repository/components/demo";
import PortalHeader from "./modules/header/portalHeader";
import RepositoryDetailLayout from "./modules/repositoryDetail/repositoryDetailLayout";
import ApiUnitcaseList from "./modules/apitest/unitcase/components/apiUnitcaseList";
import ApiScenecaseList from "./modules/apitest/scenecase/components/apiScenecaseList";
import ApiPerformList from "./modules/apitest/performcase/components/apiPerformList";
import ApiContant from "./modules/apitest/apitest/apiContant";
import WebContant from "./modules/webtest/webtest/webContant";
import FuncContant from "./modules/functest/functest/funcContant";
import AppContant from "./modules/apptest/apptest/appContant";
import AppUnitList from "./modules/apptest/unitcase/components/appUnitList";
import WebPerformList from "./modules/webtest/performcase/components/webPerformList";
import WebUnitList from "./modules/webtest/unitcase/components/webUnitList";
import WebSceneList from "./modules/webtest/scenecase/components/webSceneList";
import AppSceneList from "./modules/apptest/scenecase/components/appSceneList";
import AppPerformList from "./modules/apptest/performcase/components/appPerformList";
import FuncUnitList from "./modules/functest/unitcase/components/funcUnitList";
import FuncSceneList from "./modules/functest/scenecase/components/funcSceneList";
import ApiUnitcaseDetail from "./modules/apitest/unitcase/components/apiUnitcaseDetail";
import ApiUnitcaseInstance from "./modules/apitest/unitcase/components/apiUnitcaseInstance";
import ApiScenecaseDetail from "./modules/apitest/scenecase/components/apiScenecaseDetail";
import ApiSceneInstance from "./modules/apitest/scenecase/components/apiSceneInstance";
import ApiPerformInstance from "./modules/apitest/performcase/components/apiPerformInstance";
import ApiPerfomDetailContant from "./modules/apitest/performcase/components/apiPerfomDetailContant";
import FuncUnitDetail from "./modules/functest/unitcase/components/funcUnitDetail";
import FuncSceneDetail from "./modules/functest/scenecase/components/funcSceneDetail";
import WebUnitDetail from "./modules/webtest/unitcase/components/webUnitDetail";
import WebSceneDetail from "./modules/webtest/scenecase/components/webSceneDetail";
import WebUnitDetailContant from "./modules/webtest/unitcase/components/webUnitDetailContant";
import WebUnitInstance from "./modules/webtest/unitcase/components/webUnitInstance";
import WebSceneDetailContant from "./modules/webtest/scenecase/components/webSceneDetailContant";
import WebSceneInstance from "./modules/webtest/scenecase/components/webSceneInstance";
import WebPerformDetail from "./modules/webtest/performcase/components/webPerformDetail";
import WebPerformDetailContant from "./modules/webtest/performcase/components/webPerformDetailContant";
import WebPerformInstance from "./modules/webtest/performcase/components/webPerformInstance";
import AppUnitDetailContant from "./modules/apptest/unitcase/components/appUnitDetailContant";
import AppUnitInstance from "./modules/apptest/unitcase/components/appUnitInstance";


const routers =  [
    {
        path: "/login",
        exact: true,
        component: Login,
        key:'login',
    },
    {
        path: "/logout",
        component: LogOut,
        exact: true,
        key:'logout',
    },
    {
        component: PortalHeader,
        path: '/',
        key:'poroute',
        routes:[
            {
                path: "/",
                component: Home,
                exact: true,
                key:'Home',
            },
            {
                path: "/repository",
                component: Repository,
                key:'repository',
                routes:[
                    {
                        path: "/repository/alllist",
                        key:'projectList',
                        exact: true,
                        component: RepositoryList,
                    },
                    {
                        path: `/repository/recently`,
                        key:'recently',
                        exact: true,
                        component: Demo,
                    },
                ]
            },
            {
                path:'/repositorypage',
                component:RepositoryDetailLayout,
                key:'RepositoryDetailLayout',
                routes:[
                    {
                        path: "/repositorypage/detail",
                        exact: true,
                        key:'detail',
                        component: RepositoryDetailPage,
                    },
                    {
                        path: "/repositorypage/apitest",
                        key:'apitest',
                        component: ApiContant,
                        routes:[
                            {
                                path: "/repositorypage/apitest/unitcase",
                                key:'unitcase',
                                component: ApiUnitcaseList,
                            },{
                                path: "/repositorypage/apitest/unitdetail",
                                key:'unitdetail',
                                component: ApiUnitcaseDetail,
                            },{
                                path: "/repositorypage/apitest/unitcase-instance",
                                key:'history',
                                component: ApiUnitcaseInstance,
                            },{
                                path: "/repositorypage/apitest/scenecase",
                                key:'scenecase',
                                component: ApiScenecaseList,
                            },{
                                path: "/repositorypage/apitest/scenedetail",
                                key:'unitdetail',
                                component: ApiScenecaseDetail,
                            },{
                                path: "/repositorypage/apitest/scenecase-instance",
                                key:'history',
                                component: ApiSceneInstance,
                            },{
                                path: "/repositorypage/apitest/scenestep",
                                key:'history',
                                component: ApiUnitcaseDetail,
                            },{
                                path: "/repositorypage/apitest/performcase",
                                key:'performcase',
                                component: ApiPerformList,
                            },{
                                path: "/repositorypage/apitest/performdetail",
                                key:'performcase',
                                component: ApiPerfomDetailContant,
                            },{
                                path: "/repositorypage/apitest/perform-instance",
                                key:'history',
                                component: ApiPerformInstance,
                            },
                            {
                                path:"/repositorypage/apitest",
                                exact: true,
                                key:'ridapitest',
                                component: ()=><Redirect to='/repositorypage/apitest/unitcase'/>,
                            },
                        ]
                    },
                    {
                        path: "/repositorypage/webtest",
                        key:'webtest',
                        component: WebContant,
                        routes:[
                            {
                                path: "/repositorypage/webtest/unitcase",
                                key:'unitcase',
                                component: WebUnitList,
                            }, {
                                path: "/repositorypage/webtest/unitdetail",
                                key:'unitcase',
                                component: WebUnitDetailContant,
                            }, {
                                path: "/repositorypage/webtest/unitcase-instance",
                                key:'unitcase',
                                component: WebUnitInstance,
                            },{
                                path: "/repositorypage/webtest/scenecase",
                                key:'scenecase',
                                component: WebSceneList,
                            },{
                                path: "/repositorypage/webtest/scenedetail",
                                key:'scenecase',
                                component: WebSceneDetailContant,
                            },{
                                path: "/repositorypage/webtest/scenecase-instance",
                                key:'scenecase',
                                component: WebSceneInstance,
                            },{
                                path: "/repositorypage/webtest/performcase",
                                key:'performcase',
                                component: WebPerformList,
                            },{
                                path: "/repositorypage/webtest/performdetail",
                                key:'performcase',
                                component: WebPerformDetailContant,
                            },{
                                path: "/repositorypage/webtest/perform-instance",
                                key:'performcase',
                                component: WebPerformInstance,
                            },
                            {
                                path:"/repositorypage/webtest",
                                exact: true,
                                key:'ridapitest',
                                component: ()=><Redirect to='/repositorypage/webtest/unitcase'/>,
                            },
                        ]
                    },
                    {
                        path: "/repositorypage/apptest",
                        key:'apptest',
                        component: AppContant,
                        routes:[
                            {
                                path: "/repositorypage/apptest/unitcase",
                                key:'unitcase',
                                component: AppUnitList,
                            },{
                                path: "/repositorypage/apptest/unitdetail",
                                key:'unitcase',
                                component: AppUnitDetailContant,
                            }, {
                                path: "/repositorypage/apptest/unitcase-instance",
                                key:'unitcase',
                                component: AppUnitInstance,
                            },{
                                path: "/repositorypage/apptest/scenecase",
                                key:'scenecase',
                                component: AppSceneList,
                            },{
                                path: "/repositorypage/apptest/performcase",
                                key:'performcase',
                                component: AppPerformList,
                            },
                            {
                                path:"/repositorypage/apptest",
                                exact: true,
                                key:'ridapitest',
                                component: ()=><Redirect to='/repositorypage/apptest/unitcase'/>,
                            },
                        ]
                    },
                    {
                        path: "/repositorypage/functest",
                        key:'functest',
                        component: FuncContant,
                        routes:[
                            {
                                path: "/repositorypage/functest/unitcase",
                                key:'unitcase',
                                component: FuncUnitList,
                            },{
                                path: "/repositorypage/functest/unitdetail",
                                key:'unitcase',
                                component: FuncUnitDetail,
                            },{
                                path: "/repositorypage/functest/scenecase",
                                key:'scenecase',
                                component: FuncSceneList,
                            },
                            {
                                path: "/repositorypage/functest/scenedetail",
                                key:'scenecase',
                                component: FuncSceneDetail,
                            },
                            {
                                path:"/repositorypage/functest",
                                exact: true,
                                key:'ridapitest',
                                component: ()=><Redirect to='/repositorypage/functest/unitcase'/>,
                            },
                        ]
                    },
                    {
                        path: "/repositorypage/category",
                        exact: true,
                        key:'category',
                        component: CategoryList,
                    },
                    {
                        path: "/repositorypage/testplan",
                        key:'TestPlan',
                        exact: true,
                        component: TestPlan,
                    },
                    {
                        path: `/repositorypage/quartzTask`,
                        exact: true,
                        key:'quartzTask',
                        component: QuartzTask,
                    },
                    // {
                    //     path: "/repositorypage/testReport",
                    //     exact: true,
                    //     key:'step',
                    //     component: TestReport,
                    // },
                    // {
                    //     path: "/repositorypage/testplandetail",
                    //     key:'TestPlan',
                    //     exact: true,
                    //     component: TestPlanDetail,
                    // },
                    // {
                    //     path: "/repositorypage/performance",
                    //     component: PerformanceList,
                    //     exact: true,
                    //     key:'performance',
                    // },
                    // {
                    //     path: "/repositorypage/performancehistory",
                    //     component: PerformanceHistory,
                    //     exact: true,
                    //     key:'performancehistory',
                    // },
                    // {
                    //     path: "/repositorypage/performancedetail",
                    //     component: PerformanceDetail,
                    //     exact: true,
                    //     key:'PerformanceDetail',
                    // },
                    // {
                    //     path: `/repositorypage/quartzMaster`,
                    //     exact: true,
                    //     key:'quartzTask',
                    //     component: QuartzTaskList,
                    // },
                    //
                    // {
                    //     path: "/repositorypage/apitest",
                    //     exact: true,
                    //     key:'step',
                    //     component: Step,
                    // },
                    // {
                    //     path: "/repositorypage/webtest",
                    //     exact: true,
                    //     key:'webtest',
                    //     component: WebTestcase,
                    // },
                    // {
                    //     path: "/repositorypage/apptest",
                    //     exact: true,
                    //     key:'apptest',
                    //     component: AppTestcase,
                    // },
                    // {
                    //     path: "/repositorypage/steppage",
                    //     exact: true,
                    //     key:'step',
                    //     component: StepDetail,
                    // },
                    // {
                    //     path: "/repositorypage/functionaltest",
                    //     exact: true,
                    //     key:'functionaltest',
                    //     component: FunctionalTestDetail,
                    // },
                    {
                        path:"/repositorypage",
                        exact: true,
                        key:'ridapitest',
                        component: ()=><Redirect to='/repositorypage/detail'/>,
                    },
                ]
            },
            {
                path: "/testcase",
                component: Testcase,
                exact: true,
                key:'outTestcase',
            },
            {
                path:'/systemManagement',
                key:'systemManagement',
                component:SystemManagement,
                routes:[
                    {
                        path: "/systemManagement/organ/org",
                        key:'org',
                        exact: true,
                        component: Org,
                    },
                    {
                        path: "/systemManagement/organ/user",
                        key:'user',
                        exact: true,
                        component: Usermgr,
                    },
                    {
                        path: "/systemManagement/privilege",
                        key:'ProjectFeature',
                        exact: true,
                        component: ProjectFeature,
                    },
                    {
                        path: "/systemManagement/role",
                        key:'ProjectRole',
                        exact: true,
                        component: ProjectRole,
                    },
                    {
                        path: "/systemManagement/systemFeature",
                        key:'SystemFeature',
                        exact: true,
                        component: SystemFeature,
                    },
                    {
                        path: "/systemManagement/systemRole",
                        key:'SystemRole',
                        exact: true,
                        component: SystemRole,
                    },
                    {
                        path: "/systemManagement/messageManagement",
                        key:'MessageManagement',
                        exact: true,
                        component: MessageManagement,
                    },
                    {
                        path: "/systemManagement/messageSendType",
                        key:'MessageSendType',
                        exact: true,
                        component: MessageSendType,
                    },
                    {
                        path: "/systemManagement/messageTemplate",
                        key:'MessageTemplate',
                        exact: true,
                        component: MessageTemplate,
                    },
                    {
                        path: "/systemManagement/messageType",
                        key:'MessageType',
                        exact: true,
                        component: MessageType,
                    },
                    {
                        path: "/systemManagement/authConfig",
                        key:'authConfig',
                        exact: true,
                        component: AuthConfig,
                    },
                ]
            },
            {
                path: "/MessageUser",
                key:'MessageUser',
                exact: true,
                component: MessageUser,
            },

        ]
    },



  ];

export default routers
