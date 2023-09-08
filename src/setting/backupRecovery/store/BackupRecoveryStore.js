import {action} from "mobx";
import {Axios} from "tiklab-core-ui";

class BackupRecoveryStore {

    /**
     * 手动备份
     * @returns {Promise<unknown>}
     */
    @action
    backups = async () =>{
        const data = Axios.post('/teston/backups/backups')
        return data
    }

    /**
     * 获取备份数据
     * @returns {Promise<unknown>}
     */
    @action
    findBackups = async () =>{
        const data = Axios.post('/teston/backups/findBackups')
        return data
    }

    /**
     * 更新定时备份
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    updateBackups = async value =>{
        const param = new FormData();
        param.append("scheduled",value)
        const data = Axios.post('/teston/backups/updateBackups',param)
        return data
    }

    /**
     * 恢复
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    restore = async value =>{
        const param = new FormData();
        param.append("path",value)
        const data = Axios.post('/teston/backups/restore',param)
        return data
    }

    /**
     * 获取恢复数据
     * @returns {Promise<unknown>}
     */
    @action
    findRestore = async () =>{
        const data = Axios.post('/teston/backups/findRestore')
        return data
    }

}

export default new BackupRecoveryStore();