import axios from 'axios';
import { BACK_URL } from '../constants/constants';


const instance = axios.create({
  baseURL: BACK_URL,
  headers: { 'Content-Type': 'application/json' },
});
export default instance;
