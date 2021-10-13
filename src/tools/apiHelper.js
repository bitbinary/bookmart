import axios from 'axios';
import qs from 'qs';
const defaultConfig = {
  baseURL: 'http://127.0.0.1:5000/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
};

const axiosClient = axios.create(defaultConfig);
// Set the AUTH token for any request
axiosClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  //   config.headers.Authorization = token ? `JWT ${token}` : 'No Token';
  config.headers.Authorization = token ? `JWT TOKEN` : 'No Token';
  return config;
});
// To share cookies to cross site domain, change to true.
axiosClient.defaults.withCredentials = false;

export function getRequest(
  URL,
  params = {},
  config
) {
  return axiosClient
    .get(`/${URL}`, { params: params, cancelToken: config?.cancelToken })
    .then((response) => response);
}

export function postRequest(URL, payload, config) {
  return axiosClient.post(`/${URL}`, payload, { ...config }).then((response) => response);
}

export function patchRequest(URL, payload, config) {
  return axiosClient.patch(`/${URL}`, { payload, ...config }).then((response) => response);
}

export function deleteRequest(URL, config) {
  return axiosClient.delete(`/${URL}`, { ...config }).then((response) => response);
}

export function putRequest(URL, payload) {
  return axiosClient.put(`/${URL}`, payload).then((response) => response);
}
