/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-27 15:43:43
 */
const api =  '/';
const base_url = JSON.stringify(api);

let plugin_base_url = '/';
plugin_base_url = JSON.stringify(plugin_base_url);

let pluginAddressUrl = '/plugin/getPluginConfig';
pluginAddressUrl = JSON.stringify(pluginAddressUrl);

let fetchMethod = "post";
fetchMethod = JSON.stringify(fetchMethod);

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
