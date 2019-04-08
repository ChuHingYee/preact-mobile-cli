import axios from 'axios';
import { baseUrl } from '../config/index';
// create an axios instance
const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 10000, // request timeout
});

const err = (error) => {
  return Promise.reject(error);
};

service.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json;charset=utf-8';
  config.headers['rqs-header'] = JSON.stringify({ version: 'web_1.0.0' });
  return config;
}, err);

service.interceptors.response.use(response => response, err);

function fetch(data,) {
  return new Promise((resolve, reject) => {
    // const config = { ...data, withCredentials: true };
    const config = {
      url: data.url,
      method: data.method,
      data: data.data,
      withCredentials: true,
    };
    service(config).then(
      (res) => {
        const { data } = res;
        if (data.success) {
          resolve(data.data ? data.data : data);
        } else {
          reject(data);
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export default fetch;
