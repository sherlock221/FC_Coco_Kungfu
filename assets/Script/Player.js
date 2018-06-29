"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameManager_1 = require("./GameManager");
var Role_1 = require("./Role");
// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        // //死亡
        // @property(cc.SpriteFrame)
        // DeadSprite : [cc.SpriteFrame]
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //出招
        _this.TrickSprite = [];
        //走路
        _this.WalkSprite = [];
        //水平垂直方向按键状态
        _this.dirX = 0;
        _this.dirY = 0;
        return _this;
    }
    Player.prototype.onLoad = function () {
        //事件监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyUp, this);
        this.currentSpr = this.getComponent(cc.Sprite);
        this.enemyNode = cc.find("Canvas/enemy");
        this.attackCollider = this.getComponentsInChildren(cc.BoxCollider)[1];
    };
    Player.prototype.start = function () {
        this.winSize = cc.view.getVisibleSize();
        this.hSpeed = this.moveSpeed;
    };
    Player.prototype.update = function (dt) {
        //移动
        if (this.state == 0) {
            //水平移动
            if (this.dirX && !this.isJump) {
                this.node.x += this.dirX * this.hSpeed * dt;
                var index = Math.floor(Math.abs(this.node.x * 0.1 % this.WalkSprite.length));
                this.currentSpr.spriteFrame = this.WalkSprite[index];
            }
            //镜像反转
            if (this.node.x <= this.enemyNode.x) {
                this.node.scaleX = 1;
            }
            else {
                this.node.scaleX = -1;
            }
        }
        //跳跃
        if (this.isJump) {
            this.vSpeed += this.gravity;
            this.node.y += this.vSpeed * dt;
            //横向跳跃距离
            this.node.x += this.dirX * this.hSpeed * dt * 1;
        }
        //出招
        if (this.state == 1) {
            this.timer--;
            if (this.timer <= 0) {
                this.state = 2;
                this.timer = 8;
                //下蹲类的收招动作
                if (this.trickIndex == 2 || this.trickIndex == 5 || this.trickIndex == 6) {
                    //飞腿空中出现一次
                    if (this.trickIndex == 6) {
                        // this.timer = 100;
                    }
                    this.currentSpr.spriteFrame = this.TrickSprite[1];
                }
                else {
                    this.currentSpr.spriteFrame = this.WalkSprite[0];
                }
                this.trickIndex = 0;
            }
        }
        //收招
        if (this.state == 2) {
            this.timer--;
            if (this.timer <= 0) {
                this.state = 0;
                // this.currentSpr.spriteFrame = this.WalkSprite[0]; 
                this.timer = 0;
            }
        }
        //边界限制(水平)
        var leftWall = -this.winSize.width / 2 + this.node.width / 2;
        var rightWall = this.winSize.width / 2 - this.node.width / 2;
        if (this.node.x < leftWall) {
            this.node.x = leftWall;
        }
        if (this.node.x > rightWall) {
            this.node.x = rightWall;
        }
        //边界限制(上下) 落地
        if (this.node.y < this.groundY) {
            this.node.y = this.groundY;
            this.vSpeed = 0;
            this.isJump = false;
            this.dirY = 0;
            this.currentSpr.spriteFrame = this.WalkSprite[0];
        }
    };
    Player.prototype.makeMove = function (imageIndex, state, timer) {
        this.trickIndex = imageIndex;
        this.currentSpr.spriteFrame = this.TrickSprite[imageIndex];
        this.state = state;
        this.timer = timer;
        // let dx = this.node.x + 26 * this.node.scaleX;
        // let dy = this.node.y - 16;
        //判断是否击中
        GameManager_1.default.GetInstance().updateHpBar('player', 0.3);
    };
    Player.prototype.keyDown = function (event) {
        switch (event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.dirX = -1;
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.dirX = 1;
                break;
            //跳跃 
            case cc.KEY.w:
            case cc.KEY.up:
                if (!this.isJump) {
                    this.dirY = -1;
                    this.isJump = true;
                    this.vSpeed = this.jumpSpeed;
                    this.currentSpr.spriteFrame = this.TrickSprite[1];
                }
                break;
            //下蹲    
            case cc.KEY.s:
            case cc.KEY.down:
                this.dirY = 1;
                this.currentSpr.spriteFrame = this.TrickSprite[1];
                break;
            //出腿     
            case cc.KEY.j:
                if (!this.isJump) {
                    console.log("j");
                    //左右腿   
                    if (this.dirX != 0) {
                        this.makeMove(4, 1, 16);
                    }
                    else if (this.dirY == 1) {
                        this.makeMove(5, 1, 16);
                    }
                    else {
                        this.makeMove(3, 1, 16);
                    }
                }
                else {
                    this.makeMove(6, 1, 16);
                }
                break;
            //出拳
            case cc.KEY.k:
                if (!this.isJump) {
                    console.log("k");
                    //蹲拳
                    if (this.dirY == 1) {
                        this.makeMove(2, 1, 16);
                    }
                    else {
                        this.makeMove(0, 1, 16);
                    }
                }
                break;
            default:
                break;
        }
    };
    Player.prototype.keyUp = function (event) {
        switch (event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.d:
            case cc.KEY.left:
            case cc.KEY.right:
                this.dirX = 0;
                break;
            //下蹲状态  跳跃由落地去判断                      
            case cc.KEY.s:
            case cc.KEY.down:
                this.dirY = 0;
                this.currentSpr.spriteFrame = this.WalkSprite[0];
                break;
            default:
                break;
        }
    };
    Player.prototype.onCollisionEnter = function (other, self) {
        //攻击
        if (self.tag == 2 && this.state == 1) {
            //产生特效
            var attackEffectNode = cc.instantiate(this.AttackEffectPrefab);
            attackEffectNode.x = this.attackCollider.offset.x;
            attackEffectNode.y = this.attackCollider.offset.y;
            attackEffectNode.parent = this.node;
        }
    };
    __decorate([
        property([cc.SpriteFrame])
    ], Player.prototype, "TrickSprite", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], Player.prototype, "WalkSprite", void 0);
    __decorate([
        property(cc.Prefab)
    ], Player.prototype, "AttackEffectPrefab", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(Role_1.default));
exports.default = Player;
