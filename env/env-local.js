/*
 * @Description: 本地环境
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-27 13:53:54
 */
// const apitest =  'http://192.168.2.2:8070/';

const base_url =  JSON.stringify('http://192.168.10.17:8080');
const plugin_base_url = JSON.stringify("http://192.168.10.17:8080");
const pluginAddressUrl = JSON.stringify('http://192.168.10.17:8080/config.json');
const fetchMethod = JSON.stringify("get");

const userProduction = true;

const appKey = JSON.stringify('appkey');
const appSecret = JSON.stringify('appsecret');
const version = JSON.stringify('1.0.1');
const client = JSON.stringify('1.1.0');

const IS_DEV = true;

module.exports = {
    base_url,
    plugin_base_url,
    pluginAddressUrl,
    fetchMethod,
    userProduction,
    // accUrl_env,
    appKey,
    appSecret,
    version,
    client,
    IS_DEV
}
