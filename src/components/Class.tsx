/*
 * @Author:  qiuwenbin <qiuwenbin@wshifu.com>
 * @Date: 2023-04-04 09:30:23
 * @LastEditors: qiuwenbin
 * @LastEditTime: 2023-04-04 09:32:05
 * @Description: 
 */
import React,{PureComponent} from 'react';
function addAge(Target:Function){
  Target.prototype.age = 111;
}
@addAge
export default class Class extends PureComponent{
  age?:number
  render(){
    return (
      <h2>我是类组件---{this.age}</h2>
    )
  }
}