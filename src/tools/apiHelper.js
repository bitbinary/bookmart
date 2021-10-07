import axios from 'axios';
import qs from 'qs';
const defaultConfig = {
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'bracket' });
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
  params = { id: 1, filters: ['name', 'genre'] }
) {
  return axiosClient
    .get(`/${URL}`, { params: params })
    .then((response) => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then((response) => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then((response) => response);
}

export function putRequest(URL, payload) {
  return axiosClient.put(`/${URL}`, payload).then((response) => response);
}
