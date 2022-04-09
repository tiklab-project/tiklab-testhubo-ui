/*
 * @Description: 线上环境
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-01 10:24:30
 */

const base_url =  JSON.stringify('http://192.168.10.16:8080');
const plugin_base_url = JSON.stringify("http://127.0.0.1:4000");
const pluginAddressUrl = JSON.stringify('http://127.0.0.1:4000/config.json');

//请求方式
const fetchMethod = JSON.stringify("get");

//false 为公司内部
const userProduction = false;

//本地联调，认证配置前端sso的地址
const accUrl_env = JSON.stringify('http://127.0.0.1:4000/')

const appKey =  JSON.stringify('ghuyuhh');
const appSecret = JSON.stringify('koon');
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

