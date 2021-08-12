import Taro from '@tarojs/taro';
import { Button, Text, View } from "@tarojs/components";
import { FC, useEffect, useMemo, useState } from "react";
import dayjs from 'dayjs';

import { OperationName } from 'constants/index';
import { ICoupon, ICouponsStatus, IOperationType } from 'typings/index';
import Modal from 'components/Modal/Modal';
import { getCoupon, updateCouponsData } from "utils/index";
import events from 'utils/events';

import './detail.scss';

const prefixClass = "coupons-detail";
const CouponsDetail: FC = () => {

  const { params } = Taro.getCurrentInstance().router;
  const [item, setItem] = useState<ICoupon>();
  const [op, setOp] = useState<IOperationType>(IOperationType.USAGE);
  const [openModal, setOpenModal] = useState(false);
  const del = useMemo(() => item?.status === ICouponsStatus.OFF ? 'delete' : '', [item])

  useEffect(() => {
    if (params.id) {
      const coupon = getCoupon(params.id);
      console.log('coupon', coupon)
      setItem(coupon);
      Taro.setNavigationBarTitle({
        title: coupon?.name,
      })
    }
  }, [params]);

  const handleConfirm = () => {
    setOp(IOperationType.USAGE);
    setOpenModal(true);
  }

  const handleOperation = () => {
    if (!item?.id) {
      return;
    }
    try {
      updateCouponsData(item.id, op)
    } catch (error) {
      return Taro.showToast({
        title: error.message,
        icon: 'none'
      })
    }
    setOpenModal(false);
    events.trigger('updateList', new Date())
    Taro.navigateBack();
  }

  const handleCancel = () => {
    setOp(IOperationType.CANCEL);
    setOpenModal(true);
  }

  return <View className={prefixClass}>
    <View className={`${prefixClass}__content ${prefixClass}--${del}`}>
      <View className={`${prefixClass}__header`}>
        <View className={`${prefixClass}__att`}>
          <Text className={`${prefixClass}__att-name`}>名称：</Text>
          {item?.name}
        </View>
        <View className={`${prefixClass}__att`}>
          <Text className={`${prefixClass}__att-name`}>生效日期：</Text>
          {item?.startTime}<Text> ~ </Text>{item?.endTime}
        </View>
        <View className={`${prefixClass}__att`}>
          <Text className={`${prefixClass}__att-name`}>标签：</Text>
          {item?.tag}
        </View>
        <View className={`${prefixClass}__att`}>
          <View className={`${prefixClass}__att-name`}>描述：</View>
          {item?.desc}
        </View>
      </View>
      <View className={`${prefixClass}__count-wrapper`}>
        <View className={`${prefixClass}__count`}>
          <View>{item?.count}</View><View className='amount'>/{item?.amount}</View>
        </View>
      </View>
      <View className={`${prefixClass}__log`}>
        {item?.logs?.reverse()?.map((log, index) => (
          <View key={index} className={`${prefixClass}__log-item`}>
            {`${dayjs(log.time).format('YYYY-MM-DD HH:mm')} ${OperationName[log.type]}`}
          </View>
        ))}
      </View>
    </View>
    {item?.status === ICouponsStatus.ON && (
      <View className={`${prefixClass}__footer`}>
        <Button className={`${prefixClass}__footer-btn`} onClick={handleCancel}>作废</Button>
        <Button style={{ marginLeft: '12px' }} className={`${prefixClass}__footer-btn`} type='primary' onClick={handleConfirm}>使用</Button>
      </View>
    )}
    <Modal opened={openModal} onCancel={() => setOpenModal(false)} onConfirm={handleOperation}>
      {`确认${OperationName[op]}吗？`}
    </Modal>
  </View>
};

export default CouponsDetail;
