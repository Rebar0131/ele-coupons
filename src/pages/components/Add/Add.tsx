import Taro from '@tarojs/taro';
import { Button, Input, Picker, Text, Textarea, View } from "@tarojs/components";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";

import PageHeader from "../../../components/PageHeader/PageHeader";
import { setCouponsData } from "../../../utils/utils";

import './Add.scss';

export interface IAddProps {
  opened: boolean;
  onCancel: () => void;
}

const prefixClass = "coupons-add";
const AddComponents: FC<IAddProps> = (props: IAddProps) => {
  const { opened, onCancel } = props;
  const [startTime, setStartTime] = useState(dayjs().format("YYYY-MM-DD"));
  const [endTime, setEndTime] = useState(dayjs().add(6, 'months').format("YYYY-MM-DD"));
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [tag, setTag] = useState('');
  const [count, setCount] = useState();

  useEffect(() => {
    handleClear()
  }, [opened])

  const handleNameChange = (e: any) => {
    setName(e?.detail?.value)
  }
  const handleDateChange = (e: any) => {
    setStartTime(e?.detail?.value);
  }

  const handleEndDateChange = (e: any) => {
    setEndTime(e?.detail?.value);
  }

  const handleTagChange = (e: any) => {
    setTag(e?.detail?.value)
  }

  const handleTextChange = (e: any) => {
    console.log('name', e)
    setText(e?.detail?.value)
  }

  const handleCountChange = (e: any) => {
    setCount(e?.detail?.value)
  }

  const handleClear = () => {
    setName('')
    setCount(undefined)
    setTag('')
    setText('')
    setStartTime(dayjs().format("YYYY-MM-DD"))
    setEndTime(dayjs().add(1, 'years').format("YYYY-MM-DD"))
  }

  const handleConfirm = () => {
    try {
      setCouponsData({
        name,
        startTime,
        endTime,
        desc: text,
        tag,
        count: count || 0,
      })
    } catch (error) {
      return Taro.showToast({
        title: error.message,
        icon: 'none'
      })
    }
    onCancel?.();
  }

  if (!opened) {
    return <></>
  }
  console.log('endTime', endTime)
  return <View className={prefixClass}>
    <PageHeader title='新增服务' backEvent={onCancel} />
    <View className={`${prefixClass}__content`}>
      <View className={`${prefixClass}__header`}>
        <View className={`${prefixClass}__att`}>
          <Text className={`${prefixClass}__att-name`}>券名：</Text>
          <Input value={name} onInput={handleNameChange} placeholder='请输入' />
        </View>
        <View className={`${prefixClass}__att`}>
          <Text className={`${prefixClass}__att-name`}>生效日期：</Text>
          <Picker value={startTime} mode='date' onChange={handleDateChange}>
            {startTime}
          </Picker>
          <Text> ~ </Text>
          <Picker value={endTime} mode='date' onChange={handleEndDateChange}>
            {endTime}
          </Picker>
        </View>
        <View className={`${prefixClass}__att`}>
          <Text className={`${prefixClass}__att-name`}>标签：</Text>
          <Input value={tag} onInput={handleTagChange} placeholder='请输入' />
        </View>
        <View className={`${prefixClass}__att`}>
          <View className={`${prefixClass}__att-name`}>描述：</View>
          <Textarea className={`${prefixClass}__att-text`} value={text} onInput={handleTextChange} placeholder='请输入' />
        </View>
      </View>
      <View className={`${prefixClass}__count-wrapper`}>
        <View className={`${prefixClass}__count`}>
          <Input type='number' value={count} onInput={handleCountChange} placeholder='数量' />
        </View>
      </View>
    </View>
    <View className={`${prefixClass}__footer`}>
      <Button className={`${prefixClass}__footer-btn`} onClick={onCancel}>取消</Button>
      <Button style={{ marginLeft: '12px' }} className={`${prefixClass}__footer-btn`} type='primary' onClick={handleConfirm}>确定</Button>
    </View>
  </View>
};

export default AddComponents;
