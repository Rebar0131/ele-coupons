import Taro from '@tarojs/taro';
import { Button, Text, View } from "@tarojs/components";
import { FC, useMemo, useState } from "react";
import dayjs from 'dayjs';

import { OperationName } from '../../../constants';
import { ICoupon, ICouponsStatus, IOperationType } from '../../../typings';
import Modal from '../../../components/Modal/Modal';
import PageHeader from "../../../components/PageHeader/PageHeader";
import { updateCouponsData } from "../../../utils/utils";

import './Detail.scss';

export interface IDetailProps {
  opened: boolean;
  item: ICoupon;
  onCancel: () => void;
}

const prefixClass = "coupons-detail";
const CouponsDetail: FC<IDetailProps> = (props: IDetailProps) => {
  const { opened, item, onCancel } = props;
  const [openModal, setOpenModal] = useState(false);
  const [openDelModal, setOpenDelModal] = useState(false);
  const del = useMemo(() => item?.status === ICouponsStatus.OFF ? 'delete' : '', [item])

  const handleConfirm = () => {
    try {
      updateCouponsData(item.id, IOperationType.USAGE)
    } catch (error) {
      return Taro.showToast({
        title: error.message,
        icon: 'none'
      })
    }
    setOpenModal(false);
    onCancel?.();
  }

  const handleDelete = () => {
    try {
      updateCouponsData(item.id, IOperationType.CANCEL)
    } catch (error) {
      return Taro.showToast({
        title: error.message,
        icon: 'none'
      })
    }
    setOpenDelModal(false);
    onCancel?.();
  }

  if (!opened) {
    return <></>
  }

  return <View className={prefixClass}>
    <PageHeader title={item.name} backEvent={onCancel} />
    <View className={`${prefixClass}__content ${prefixClass}--${del}`}>
      <View className={`${prefixClass}__header`}>
        <View className={`${prefixClass}__att`}>
          <Text className={`${prefixClass}__att-name`}>生效日期：</Text>
          {item.startTime}<Text> ~ </Text>{item.endTime}
        </View>
        <View className={`${prefixClass}__att`}>
          <Text className={`${prefixClass}__att-name`}>标签：</Text>
          {item.tag}
        </View>
        <View className={`${prefixClass}__att`}>
          <View className={`${prefixClass}__att-name`}>描述：</View>
          {item.desc}
        </View>
      </View>
      <View className={`${prefixClass}__count-wrapper`}>
        <View className={`${prefixClass}__count`}>
          <View>{item.count}</View><View className='amount'>/{item.amount}</View>
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
    {item.status === ICouponsStatus.ON && (
      <View className={`${prefixClass}__footer`}>
        <Button className={`${prefixClass}__footer-btn`} onClick={() => setOpenDelModal(true)}>作废</Button>
        <Button style={{ marginLeft: '12px' }} className={`${prefixClass}__footer-btn`} type='primary' onClick={() => setOpenModal(true)}>使用</Button>
      </View>
    )}
    <Modal opened={openModal} onCancel={() => setOpenModal(false)} onConfirm={handleConfirm}>
      确认使用吗？
    </Modal>
    <Modal opened={openDelModal} onCancel={() => setOpenDelModal(false)} onConfirm={handleDelete}>
      确认作废吗？
    </Modal>
  </View>
};

export default CouponsDetail;
