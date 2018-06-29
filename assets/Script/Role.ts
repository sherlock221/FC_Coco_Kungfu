// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Role extends cc.Component {

//跳跃速度
@property
protected jumpSpeed = 240;

 //移动速度
 @property
 protected moveSpeed = 60;

 //重力
@property
protected gravity = -0.15 * 60;


//状态 0 移动  1 出招  2收招
protected state = 0;
//是否跳跃
protected isJump = false;
//血量
public hp = 10;
//是否被攻击
isHite = false;
//地平线
protected groundY  = -72;
//移动速度
protected hSpeed  = 0;
protected vSpeed =  0
   


}
