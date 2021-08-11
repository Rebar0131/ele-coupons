import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import { Button, Text, View } from "@tarojs/components";
import { FC, useMemo, useState } from "react";

import Modal from '../../../components/Modal/Modal';
import PageHeader from "../../../components/PageHeader/PageHeader";
import { ICouponsItem, updateCouponsData } from "../../../utils/utils";

import './Detail.scss';

export interface IDetailProps {
  opened: boolean;
  item: ICouponsItem;
  onCancel: () => void;
}

const prefixClass = "coupons-detail";
const CouponsDetail: FC<IDetailProps> = (props: IDetailProps) => {
  const { opened, item, onCancel } = props;
  const [openModal, setOpenModal] = useState(false);
  const [openDelModal, setOpenDelModal] = useState(false);
  const del = useMemo(() => item?.status === 2 ? 'delete' : '', [item])

  const handleConfirm = () => {
    console.log('handleConfirm')
    const log = item.log || [];
    log.push(`${dayjs().format('YYYY-MM-DD HH:mm')} 使用`)

    try {
      updateCouponsData(item.id, {
        ...item,
        count: item.count - 1,
        log,
      })
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
    const log = item.log || [];
    log.push(`${dayjs().format('YYYY-MM-DD HH:mm')} 作废`)

    try {
      updateCouponsData(item.id, {
        ...item,
        status: 2,
        log,
      })
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
          <Text className={`${prefixClass}__att-name`}>券名：</Text>
          {item.name}
        </View>
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
        {item?.log?.reverse()?.map((str, index) => (
          <View key={index} className={`${prefixClass}__log-item`}>
            {str}
          </View>
        ))}
      </View>
    </View>
    {item.status === 1 && (
      <View className={`${prefixClass}__footer`}>
        <Button className={`${prefixClass}__footer-btn`} onClick={() => setOpenDelModal(true)}>作废</Button>
        <Button style={{ marginLeft: '12px' }} className={`${prefixClass}__footer-btn`} type='primary' onClick={() => setOpenModal(true)}>确定</Button>
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
