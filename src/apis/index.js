import fetch from '../utils/request';

export const GetDetail = data => fetch({
  url: '/info/detail',
  method: 'get',
  data,
});
