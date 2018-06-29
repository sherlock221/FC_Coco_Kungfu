import Role from "./Role";
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
export default class Enemy extends Role {


    @property(cc.SpriteFrame)
    DeadSpr : cc.SpriteFrame;

    
    spr : cc.Sprite;

    onLoad () {
        this.spr = this.getComponent(cc.Sprite);
    }

    start () {
        
    }



    update (dt) {

        if(this.hp <= 0){
            this.spr.spriteFrame = this.DeadSpr;
        }

    }
}
