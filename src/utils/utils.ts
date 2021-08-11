import Taro from '@tarojs/taro';
import dayjs from 'dayjs';

export enum ICouponsStatus {
  /** 生效 */
  ON = 1,
  /** 失效/作废 */
  OFF = 2,
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

export interface ICouponsItem {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  status: ICouponsStatus;
  tag?: string;
  desc?: string;
  count: number;
  amount: number;
  log?: string[];
}

const integer = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;

export const updateCouponsData = (id: number, data: ICouponsItem) => {
  const coupons: ICouponsItem[] = Taro.getStorageSync('coupons') || [];
  const index = coupons?.findIndex(item => item.id === id)

  if(index > -1) {
    coupons[index] = data;
  }
  Taro.setStorage({
    key: 'coupons',
    data: coupons,
  })
}

export const setCouponsData = (item: ICouponsItemPrams) => {
  let coupons = Taro.getStorageSync('coupons') || [];
  console.log('item', item)
  if (!Array.isArray(coupons)) {
    coupons = [];
  }
  if(!item.name) {
    throw Error('请输入名称')
  }
  if(!item.startTime || !item.endTime) {
    throw Error('请输入生效日期')
  }
  if(!item.count) {
    throw Error('请输入数量')
  }
  if(item.count && !integer.test(String(item.count))) {
    throw Error('数量请输入正整数')
  }
  if(item.tag && item.tag?.length > 4) {
    throw Error('便签字数仅支持4位')
  }
  coupons.push({
    id: new Date().getTime(),
    name: item.name,
    count: item.count,
    amount: item.count,
    startTime: item.startTime,
    endTime: item.endTime,
    tag: item.tag,
    desc: item.desc,
    status: item.status || 1,
    log: [`${dayjs().format('YYYY-MM-DD HH:mm')} 创建`]
  })
  Taro.setStorage({
    key: 'coupons',
    data: coupons,
  })
}
export const getCouponsData = (status?: ICouponsStatus): ICouponsItem[] => {
  const coupons = Taro.getStorageSync('coupons') || [];

  if (!Array.isArray(coupons)) {
    return [];
  }
  let change = false;

  coupons.forEach((item) => {
    if (item.status === 1 && dayjs(item.endTime).valueOf() < dayjs().valueOf()) {
      item.status = 2;
      const log = item.log || [];
      log.push(`${dayjs(item.endTime).format('YYYY-MM-DD HH:mm')} 失效`)
      item.log = log;
      change = true;
    }
  })

  if (change) {
    Taro.setStorage({
      key: 'coupons',
      data: coupons,
    })
  }

  return status ? coupons?.filter(item => item.status === status)?.reverse() : coupons?.reverse();
}
