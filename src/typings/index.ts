import { Dayjs } from "dayjs";

export enum ICouponsStatus {
  /** 生效 */
  ON,
  /** 失效/作废 */
  OFF,
}

export interface ICouponsItemPrams {
  id?: number;
  name: string;
  startTime: string;
  endTime: string;
  status?: ICouponsStatus;
  tag?: string;
  desc?: string;
  count: number;
  amount?: number;
}

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
  logs: ILog[];
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

export interface ILog {
  time: Dayjs;
  type: IOperationType
}
