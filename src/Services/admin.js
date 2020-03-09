import axios from 'axios';
import { BACK_URL } from '../constants/constants';

// export const baseURL = 'http://3.14.92.127:3000';

const instance = axios.create({
  // baseURL: 'http://3.14.92.127:3000',
  // baseURL: 'http://202.131.123.110:4000',
  // baseURL: 'http://13.235.17.74:3000',
  baseURL: `${BACK_URL}/admin`,
  headers: { 'Content-Type': 'application/json' },
});
export default instance;
// const user = axios.create({
//   baseURL,
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//   },
// });

// export default user;
