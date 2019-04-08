import Mock from 'mockjs';
import infoAPI from './info';

Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;

Mock.setup({
  timeout: '3500-4000',
});
// table
Mock.mock(/(.*?)\/info\/detail/, 'get', infoAPI.detail);

export default Mock;
