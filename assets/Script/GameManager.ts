import Player from "./Player";
import Enemy from "./Enemy";

// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property(cc.ProgressBar)
    playerHpBar : cc.ProgressBar

    @property(cc.ProgressBar)
    enemyHpBar : cc.ProgressBar

    
    player : Player;
    enemy : Enemy;

    private static m_instance : GameManager;
    

    onLoad () {                
        GameManager.m_instance = this;         
        
        this.enemy = cc.find("/Canvas/enemy").getComponent(Enemy);
    }

        
    start () {
          //开启物理
          var manager = cc.director.getCollisionManager();
          manager.enabled = true;   

        //满hp
        this.playerHpBar.progress = 1;
        this.enemyHpBar.progress = 1;
        // manager.enabledDebugDraw = true;
    }


    public static GetInstance():GameManager{
        return GameManager.m_instance;
    }


    public updateHpBar(type,value){



        if(type == 'player'){
            this.player.hp -= value;
            this.playerHpBar.progress =   this.player.hp/10;
        }
        else{
            this.enemy.hp -= value;
            this.enemyHpBar.progress =  this.enemy.hp/10;
        }
    }

    update (dt) {
               
    }
}
