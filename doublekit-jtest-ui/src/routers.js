
import React from 'react'
import Poroute from './common/header';
import {LogOut} from 'doublekit-framework-ui';
import {AuthConfig} from 'doublekit-user-ui'
import {
    Login,
    Home,
    Repository,
    RepositoryList,
    RepositoryDetail,
    RepositoryDetailPage,
    Testcase,
    Step,
    StepDetail,
    WebTestcase,
    AppTestcase,

    QuartzTaskList,
    QuartzTask,
    TestReport,

    PerformanceList,
    PerformanceDetail,

    FunctionalTestDetail,
    CategoryList
} from './modules';

import {
    SystemManagement,
    Org, Usermgr,

    ProjectFeature,
    ProjectRole,
    SystemFeature,
    SystemRole,
    MessageManagement,
    MessageSendType,
    MessageTemplate,
    MessageType,
    MessageUser,

} from './modules/sysmgr'

import {Redirect} from "react-router";
import Demo from "./modules/repository/components/demo";


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
        component: Poroute,
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
                component:RepositoryDetail,
                key:'ProjectDetail',
                routes:[
                    {
                        path: "/repositorypage",
                        exact: true,
                        key:'ProjectDetailPage',
                        component: RepositoryDetailPage,
                    },
                    {
                        path: "/repositorypage/category",
                        exact: true,
                        key:'category',
                        component: CategoryList,
                    },
                    {
                        path: "/repositorypage/Testcase",
                        key:'testcase',
                        exact: true,
                        component: Testcase,
                    },
                    {
                        path: "/repositorypage/performance",
                        component: PerformanceList,
                        exact: true,
                        key:'performance',
                    },
                    {
                        path: `/repositorypage/quartzMaster`,
                        exact: true,
                        key:'quartzTask',
                        component: QuartzTaskList,
                    },
                    {
                        path: `/repositorypage/quartzTask`,
                        exact: true,
                        key:'quartzTask',
                        component: QuartzTask,
                    },
                    {
                        path: "/repositorypage/apitest",
                        exact: true,
                        key:'step',
                        component: Step,
                    },
                    {
                        path: "/repositorypage/webtest",
                        exact: true,
                        key:'webtest',
                        component: WebTestcase,
                    },
                    {
                        path: "/repositorypage/apptest",
                        exact: true,
                        key:'apptest',
                        component: AppTestcase,
                    },
                    {
                        path: "/repositorypage/steppage",
                        exact: true,
                        key:'step',
                        component: StepDetail,
                    },
                    {
                        path: "/repositorypage/functionaltest",
                        exact: true,
                        key:'functionaltest',
                        component: FunctionalTestDetail,
                    },
                    {
                        path: "/repositorypage/testReport",
                        exact: true,
                        key:'step',
                        component: TestReport,
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
                path: "/performanceDetail",
                component: PerformanceDetail,
                exact: true,
                key:'PerformanceDetail',
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
