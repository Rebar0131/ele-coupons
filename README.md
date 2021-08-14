### 电子券

提供自定义电子券内容

送给张燕程的七夕礼物


因写的仓促，有不少bug。 有空再优化

### 效果页

[http://rebar.restartai.com](http://rebar.restartai.com)

### 技术

基于taro + 本地缓存

### 项目
`git clone xxx`
安装依赖
`yarn`
`yarn global add @tarojs/cli`
运行
`yarn dev:h5`
编译
`yarn build:h5`

## 
```ts
/** 电子券内容 */
export interface ICoupon {
  // TODO: 优化id与createTime字段复用问题， 为图方便埋的坑
  id: number;
  /** 电子券名称 */
  name: string;
  /** 生效日期 */
  startTime: string;
  /** 失效日期 */
  endTime: string;
  /** 状态 生效 失效 */
  status: ICouponsStatus;
  /** 标签 */
  tag?: string;
  /** 描述 */
  desc?: string;
  /** 待使用次数 */
  count: number;
  /** 总次数 */
  amount: number;
  /** 操作日志 */
  logs?: ILog[];
}

/** 电子券操作 */
export enum IOperationType {
  /** 作废 */
  CANCEL,
  /** 创建 */
  CREATE,
  /** 过期 */
  PAST,
  /** 使用 */
  USAGE,
}

```

### TODO
[1] 优化id生成算法
