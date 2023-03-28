/*
 * @Author:  qiuwenbin <qiuwenbin@wshifu.com>
 * @Date: 2023-03-28 14:11:21
 * @LastEditors: qiuwenbin
 * @LastEditTime: 2023-03-28 16:31:10
 * @Description: 
 */
import './App.css'
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)
console.log("process.env", process.env);


function App() {
  return <h2>Hello React18!!Findly</h2>
}

export default App