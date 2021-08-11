import dayjs from "dayjs";

import { ICouponsStatus, IOperationType } from "../typings";

export const InitCoupons = [{
  id: new Date().getTime(),
  name: '按摩服务',
  startTime: dayjs().format("YYYY-MM-DD"),
  endTime: dayjs().add(1, 'months').format("YYYY-MM-DD"),
  status: ICouponsStatus.ON,
  tag: '新人礼',
  desc: '任提要求，每次不少于10分钟哦~',
  count: 1,
  amount: 1,
  logs: [{
    time: dayjs(),
    type: IOperationType.CREATE,
  }]
}, {
  id: new Date().getTime(),
  name: '做饭服务',
  startTime: dayjs().format("YYYY-MM-DD"),
  endTime: dayjs().add(1, 'months').format("YYYY-MM-DD"),
  status: ICouponsStatus.ON,
  tag: '新人礼',
  desc: '可随意点菜哦~',
  count: 1,
  amount: 1,
  logs: [{
    time: dayjs(),
    type: IOperationType.CREATE,
  }]
}]


export const QiXiCoupons = [{
  id: new Date().getTime(),
  name: '按摩服务',
  startTime: dayjs().format("YYYY-MM-DD"),
  endTime: dayjs().add(6, 'months').format("YYYY-MM-DD"),
  status: ICouponsStatus.ON,
  tag: '七夕礼',
  desc: '任提要求，每次不少于10分钟哦~',
  count: 8,
  amount: 8,
  logs: [{
    time: dayjs(),
    type: IOperationType.CREATE,
  }]
}, {
  id: new Date().getTime(),
  name: '做饭服务',
  startTime: dayjs().format("YYYY-MM-DD"),
  endTime: dayjs().add(6, 'months').format("YYYY-MM-DD"),
  status: ICouponsStatus.ON,
  tag: '七夕礼',
  desc: '可随意点菜哦~',
  count: 8,
  amount: 8,
  logs: [{
    time: dayjs(),
    type: IOperationType.CREATE,
  }]
}]


export const OperationName = {
  0: '作废',
  1: '创建',
  2: '过期',
  3: '使用',
}

