/*
 * @Description: 本地环境
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-27 13:53:54
 */
// const apitest =  'http://192.168.2.2:8070/';

const base_url =  JSON.stringify('http://192.168.10.21:8080');
const plugin_base_url = JSON.stringify("http://192.168.10.14:8080");
const pluginAddressUrl = JSON.stringify('http://192.168.10.14:8080/config.json');
const fetchMethod = JSON.stringify("get");

const userProduction = true;

const appKey = JSON.stringify('appkey');
const appSecret = JSON.stringify('appsecret');
const version = JSON.stringify('ce');
const client = JSON.stringify('web');

const IS_DEV = true;

//用于跳转到teamwire，开发模式时需要，线上直接读页面配置的地址
const teamwireUrl =  JSON.stringify('http://192.168.10.8:3000');

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
    IS_DEV,
    teamwireUrl
}
