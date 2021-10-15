/*
 * @Description: 线上环境
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-01 10:24:30
 */
const api =  'http://114.215.202.90:8050';
const base_url = JSON.stringify(api);

let plugin_base_url = "http://127.0.0.1:3001/";
plugin_base_url = JSON.stringify(plugin_base_url);

let pluginAddressUrl = 'http://127.0.0.1:3001/config.json';
pluginAddressUrl = JSON.stringify(pluginAddressUrl);

let fetchMethod = "get";
fetchMethod = JSON.stringify(fetchMethod);

//false 为公司内部
const userProduction = false;

const appKey =  JSON.stringify('ghuyuhh');
const appSecret = JSON.stringify('koon');
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

