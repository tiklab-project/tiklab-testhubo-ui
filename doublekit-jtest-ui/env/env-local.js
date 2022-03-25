/*
 * @Description: 本地环境
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-27 13:53:54
 */
// const apitest =  'http://192.168.2.2:8070/';

const base_url =  JSON.stringify('http://192.168.10.16:8050');
const plugin_base_url = JSON.stringify("http://127.0.0.1:4000");
const pluginAddressUrl = JSON.stringify('http://127.0.0.1:4000/config.json');
const fetchMethod = JSON.stringify("get");

const userProduction = false;

//本地联调，认证配置前端sso的地址
const accUrl_env = JSON.stringify('http://192.168.2.7:8090/')

const appKey = JSON.stringify('appkey');
const appSecret = JSON.stringify('appsecret');
const version = JSON.stringify('1.0.1');
const client = JSON.stringify('1.1.0');

const ISCEEESAAS = JSON.stringify('ce');

module.exports = {
    base_url,
    plugin_base_url,
    pluginAddressUrl,
    fetchMethod,
    userProduction,
    accUrl_env,
    appKey,
    appSecret,
    version,
    client,
    ISCEEESAAS
}
