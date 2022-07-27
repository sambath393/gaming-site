import axios from 'axios';
import { getTelegrameBot } from '../utilities/dev';

// const convertObjectToString = (obj) => {
//   let newString = '';
//   const keys = Object.keys(obj);
//   if (keys.length > 0) {
//     newString += '?';
//     keys.map((key, idx) => {
//       newString += `${key}=${obj[key]}`;
//       if (idx > 0) {
//         newString += '&';
//       }
//       return null;
//     });
//   }
//   return newString;
// };

export const getTelegramApi = async (url = '', params = {}) => {
  return axios({
    method: 'GET',
    baseURL: 'https://api.telegram.org',
    url: `/bot${getTelegrameBot()}${url}`,
    params,
  });
};
