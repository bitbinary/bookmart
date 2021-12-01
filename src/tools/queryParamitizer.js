import qs from 'qs';

export const paramsToQueryParams = (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
}