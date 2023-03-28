/*
 * @Author:  qiuwenbin <qiuwenbin@wshifu.com>
 * @Date: 2023-03-28 14:11:28
 * @LastEditors: qiuwenbin
 * @LastEditTime: 2023-03-28 14:13:03
 * @Description: 
 */
import {createRoot} from 'react-dom/client'
import App from './App';

const root = document.querySelector('#root');

root && createRoot(root).render(<App/>)