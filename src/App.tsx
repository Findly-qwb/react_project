/*
 * @Author:  qiuwenbin <qiuwenbin@wshifu.com>
 * @Date: 2023-03-28 14:11:21
 * @LastEditors: qiuwenbin
 * @LastEditTime: 2023-04-04 14:08:08
 * @Description:
 */
import styles from "./App.less";
import img from "@/assets/image/1.jpg";
import testJson from "./test.json";
import Class from "./components/Class";
import { useState } from "react";
console.log("NODE_ENV", process.env.NODE_ENV);
console.log("BASE_ENV", process.env.BASE_ENV);
console.log("process.env", process.env);
console.log("testJson====", testJson);

function App() {
  const [count, setCounts] = useState(0);
  const onChange = (e: any) => {
    setCounts(e.target.value);
  };
  return (
    <>
      <h2 className={styles["findly"]}>Hello React18!!Findly</h2>
      <img src={img} alt="哈温" />
      <div className={styles["bigImg"]}>大图片背景</div>
      <Class />
      <div>
        <p>受控组件</p>
        <input type="text" value={count} onChange={onChange} />
        <br />
        <p>非受控组件2223</p>
        <input type="text" />
        <p>邱文斌啊啊啊</p>
      </div>
    </>
  );
}

export default App;
