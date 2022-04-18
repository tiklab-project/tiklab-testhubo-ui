
import Testcase from '../../../old/testcase/testcase/components/testcase';
import {TESTCASE_STORE, TestcaseStore} from '../../../old/testcase/testcase/store/testcaseStore';
import Step from "../scenecase/components/apiSceneDetail";
import StepDetail from './components/apiUnitDetail';
import {API_UNIT_STORE ,ApiUnitStore}from './store/apiUnitStore';
import { REQUESTBODY_STORE, RequestBodyStore } from './store/requestBodyStore';
import {REQUESTHEADER_STORE, RequestHeaderStore} from './store/requestHeaderStore';
import {QUERYPARAM_STORE, QueryParamStore} from './store/queryParamStore';
import {FORMPARAM_STORE, FormParamStore} from './store/formParamStore';
import {FORM_URLENCODED_STORE,FormUrlencodedStore} from './store/formUrlencodedStore'
import {JSONPARAM_STORE, JsonParamStore} from './store/jsonParamStore';
import {RAWPARAM_STORE, RawParamStore} from './store/rawParamStore';
import {PREPARAM_STORE, PreParamStore} from './store/preParamStore';
import {AFTERPARAM_STORE, AfterParamStore} from './store/afterParamStore';
import {ASSERTPARAM_STORE, AssertParamStore} from './store/assertParamStore';
import {RESPONSEHEADER_STORE, ResponseHeaderStore} from './store/responseHeaderStore';
import {JSONRESPONSE_STORE, JsonResponseStore} from './store/jsonResponseStore';
import {RAWRESPONSE_STORE, RawResponseStore}from './store/rawResponseStore';
import {RESPONSERESULT_STORE, ResponseResultStore} from './store/responseResultStore'
import {TESTINSTANCE_STORE, TestInstanceStore} from '../../../old/testReport/store/testInstanceStore'
import {PERFORMCASE_STORE, PerformCaseStore} from '../../../old/testcase/common/store/performCaseStore';

import {APIUNIT_INSTANCE_STORE, ApiUnitInstanceStore} from "./store/apiUnitInstanceStore";


import WebTestcase from '../../../webtest/scenecase/components/webTestcase';

import AppTestcase from "../../../apptest/scenecase/components/appTestcase";

export{

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
    REQUESTBODY_STORE, RequestBodyStore,
    ASSERTPARAM_STORE, AssertParamStore,

    RESPONSEHEADER_STORE, ResponseHeaderStore,
    JSONRESPONSE_STORE, JsonResponseStore,
    RAWRESPONSE_STORE, RawResponseStore,
    RESPONSERESULT_STORE, ResponseResultStore,
    TESTINSTANCE_STORE, TestInstanceStore,
    PERFORMCASE_STORE, PerformCaseStore,

    APIUNIT_INSTANCE_STORE, ApiUnitInstanceStore,

    WebTestcase,

    AppTestcase,
}
