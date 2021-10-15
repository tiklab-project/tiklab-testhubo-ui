/*
 * @Description: 本地环境
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-27 13:53:54
 */
// const api =  'http://192.168.2.2:8070/';
const api =  'http://192.168.2.8:8050/';
const base_url = JSON.stringify(api);

let plugin_base_url = "http://127.0.0.1:3001/";
plugin_base_url= JSON.stringify(plugin_base_url);

let pluginAddressUrl = 'http://127.0.0.1:3001/config.json';
pluginAddressUrl = JSON.stringify(pluginAddressUrl);

let fetchMethod = "get";
fetchMethod = JSON.stringify(fetchMethod);

const userProduction = false;

const appKey = JSON.stringify('appkey');
const appSecret = JSON.stringify('appsecret');
const version = JSON.stringify('1.0.1');
const client = JSON.stringify('1.1.0');


module.exports = {
    base_url,
    plugin_base_url,
    pluginAddressUrl,
    fetchMethod,
    userProduction,
    appKey,
    appSecret,
    version,
    client,

}
