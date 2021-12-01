import axios from 'axios';
import qs from 'qs';
import * as firebaseAuth from "firebase/auth";

const defaultConfig = {
   baseURL: 'http://localhost:5000/',
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
axiosClient.interceptors.request.use(async function (config) {
   const user = firebaseAuth.getAuth().currentUser
   const userToken = await user.getIdToken()
   const token = userToken;
   if(token){
      config.headers.Authorization = token 
   }
   // config.headers.Authorization = token ? `JWT TOKEN` : 'No Token';
   return config;
});
// To share cookies to cross site domain, change to true.
axiosClient.defaults.withCredentials = false;

export function getRequest(URL, params = {}, config) {
   return axiosClient
      .get(`/${URL}`, { params: params, cancelToken: config?.cancelToken })
      .then((response) => response);
}

export function postRequest(URL, payload, config) {
   return axiosClient
      .post(`/${URL}`, payload, { ...config })
      .then((response) => response);
}

export function patchRequest(URL, payload, config) {
   return axiosClient
      .patch(`/${URL}`, { payload, ...config })
      .then((response) => response);
}

export function deleteRequest(URL, config) {
   return axiosClient
      .delete(`/${URL}`, { data: config })
      .then((response) => response);
}

export function putRequest(URL, payload) {
   return axiosClient.put(`/${URL}`, payload).then((response) => response);
}
