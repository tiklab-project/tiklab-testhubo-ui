
import {REPOSITORY_STORE, RepositoryStore} from './repository/repository/store/RepositoryStore';
import {TESTCASE_STORE,TestCaseStore} from "./test/testcase/store/testcaseStore";


function createStores() {
    return {
        [REPOSITORY_STORE]: new RepositoryStore(),
        [TESTCASE_STORE]: new TestCaseStore()
    };
}

const stores = createStores();

export {
    stores
}

