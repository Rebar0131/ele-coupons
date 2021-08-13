import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import { isNil } from 'lodash-es';

import { InitCoupons, QiXiCoupons } from '../constants';
import { ICoupon, ICouponsItemPrams, ICouponsStatus, ILog, IOperationType } from '../typings';

// 正整数
const integer = /^[1-9]\d*$/;

export const updateCouponsData = (id: number, op: IOperationType) => {
  const coupons: ICoupon[] = Taro.getStorageSync('coupons') || [];
  const index = coupons?.findIndex(item => item.id === id)

  if (index === -1) {
    throw Error('找不到操作数据')
  }
  const newCoupon = {
    ...coupons[index],
  }
  switch (op) {
    case IOperationType.CANCEL:
      newCoupon.status = ICouponsStatus.OFF;
      break;
    case IOperationType.USAGE:
      if (dayjs() < dayjs(newCoupon.startTime)) {
        throw Error('还未生效, 不能使用哦')
      }
      newCoupon.count--;
      if (newCoupon.count === 0) {
        newCoupon.status = ICouponsStatus.OFF;
      }
      break;
    default:
      break;
  }
  // 兼容历史数据
  newCoupon.logs = newCoupon.logs || [];
  newCoupon.logs.push({
    time: dayjs(),
    type: op,
  })
  coupons[index] = newCoupon;

  Taro.setStorage({
    key: 'coupons',
    data: coupons,
  })
}

export const setCouponsData = (item: ICouponsItemPrams) => {
  let coupons = Taro.getStorageSync('coupons') || [];

  if (!Array.isArray(coupons)) {
    coupons = [];
  }
  if (!item.name) {
    throw Error('请输入名称')
  }
  if (!item.startTime || !item.endTime) {
    throw Error('请输入生效日期')
  }
  if (!item.count) {
    throw Error('请输入数量')
  }
  if (item.count && !integer.test(String(item.count))) {
    throw Error('数量请输入正整数')
  }
  if (item.tag && item.tag?.length > 4) {
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
    status: ICouponsStatus.ON,
    logs: [{
      time: dayjs(),
      type: IOperationType.CREATE,
    }]
  })
  Taro.setStorage({
    key: 'coupons',
    data: coupons,
  })
}

/** 获取电子券数据 */
export const getCouponsData = (status?: ICouponsStatus): ICoupon[] => {
  let coupons = Taro.getStorageSync('coupons');
  let change = false;

  // 空数据时，初始化数据
  if (!Array.isArray(coupons) || coupons.length === 0) {
    coupons = InitCoupons;
    change = true;
  }

  // 更新过期数据
  coupons.forEach((item) => {
    if (item.status === ICouponsStatus.ON && dayjs(item.endTime).valueOf() < dayjs().valueOf()) {
      item.status = ICouponsStatus.OFF;
      const log: ILog[] = item.log || [];
      log.push({
        time: dayjs(item.endTime),
        type: IOperationType.PAST,
      })
      item.logs = log;
      change = true;
    }
  })

  // 更新节日数据 TODO: 增加其它节日
  if (dayjs().startOf('day').valueOf() === dayjs('2021-08-14').valueOf()) {
    // id为创建时间 找不到七夕当天创建的七夕礼时 增加七夕礼包
    const needFlag =
      coupons.findIndex((item) => dayjs(item.id).startOf('day').valueOf() === dayjs('2021-08-14').valueOf() && item.tag === '七夕礼') === -1;

    if (needFlag) {
      coupons = coupons.concat(QiXiCoupons)
    }
  }

  if (change) {
    Taro.setStorage({
      key: 'coupons',
      data: coupons,
    })
  }
  return !isNil(status) ? coupons?.filter(item => item.status === status)?.reverse() : coupons?.reverse();
}

/** 获取电子券 */
export const getCoupon = (id: number | string): ICoupon => {
  const coupons = Taro.getStorageSync('coupons');

  return coupons.find((coupon) => coupon.id === Number(id));
}
