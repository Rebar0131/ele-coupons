### 电子券

提供自定义电子券内容

送给张燕程的七夕礼物


```ts
/** 电子券内容 */
export interface ICoupon {
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
  log?: ILog[];
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
