/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-27 15:43:43
 */
const base_url = JSON.stringify( '/' );
let plugin_base_url = JSON.stringify( '/');
let pluginAddressUrl = JSON.stringify('/pluginConfig/getPluginConfig');
let fetchMethod = JSON.stringify("post");

//判断是否是用户环境，公司内部切为false用于调试
const userProduction = true;

const appKey =  JSON.stringify('tiklab');
const appSecret = JSON.stringify('tiklab');
const version = JSON.stringify('ee');
const client = JSON.stringify('web');

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
