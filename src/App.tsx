/*
 * @Author:  qiuwenbin <qiuwenbin@wshifu.com>
 * @Date: 2023-03-28 14:11:21
 * @LastEditors: qiuwenbin
 * @LastEditTime: 2023-03-29 15:05:41
 * @Description: 
 */
import styles from './App.less';
import img from '@/assets/image/1.jpg'
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)
console.log("process.env", process.env);


function App() {
  return <>
  <h2 className={styles['findly']}>Hello React18!!Findly</h2>
  <img src={img} alt="哈温" />
  <div className={styles['bigImg']}>大图片背景</div> 
  </>
}

export default App