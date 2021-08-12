import classNames from 'classnames';
import Taro from '@tarojs/taro';
import { Button, Text, View } from "@tarojs/components";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";

import IconFont from "components/iconfont/h5";
import { getCouponsData } from "utils/index";
import { ICouponsStatus, ICoupon } from "typings/index";
import events from 'utils/events';

import "./list.scss";

const prefixClass = "coupons-list";
const List: FC = () => {
  const [tab, setTab] = useState(ICouponsStatus.ON);
  const [coupons, setCoupons] = useState<ICoupon[]>([]);

  useEffect(() => {
    const data = getCouponsData(tab);
    setCoupons(data);
  }, [tab]);

  // 监听一个事件，接受参数
  events.on('updateList', (arg) => {
    console.log('updateList time', arg?.[0])
    const data = getCouponsData(tab);
    setCoupons(data);
  })

  const handleSwitchTab = () => {
    tab === ICouponsStatus.ON ? setTab(ICouponsStatus.OFF) : setTab(ICouponsStatus.ON);
  }
  const tabClassName = (mode) => {
    if (mode === tab) {
      return `${prefixClass}__tab-item ${prefixClass}__tab-item--active`;
    }
    return `${prefixClass}__tab-item`;
  }
  const couponsClassName = (status, index) => {
    return classNames(`${prefixClass}__item`, {
      [`${prefixClass}__item--off`]: status === ICouponsStatus.OFF,
      [`${prefixClass}__item--even`]: status !== ICouponsStatus.OFF && index % 2 !== 0,
    });
  }

  const openAddPage = () => {
    Taro.navigateTo({
      url: `/pages/coupons/add/add`,
    })
  }

  const handleClick = (item: ICoupon) => {
    Taro.navigateTo({
      url: `/pages/coupons/detail/detail?id=${item.id}`,
    })
  }
  console.log('xxcoupons', coupons)
  return (
    <View className={prefixClass}>
      <View className={`${prefixClass}__tab`} style={{ backgroundColor: 'rgb(255 255 255 / 0.5)' }}>
        <View className={tabClassName(ICouponsStatus.ON)} onClick={handleSwitchTab}>已生效</View>
        <View className={tabClassName(ICouponsStatus.OFF)} onClick={handleSwitchTab}>已失效</View>
      </View>
      <View className={`${prefixClass}__content`}>
        <View className={`${prefixClass}__list`}>
          {coupons?.length > 0 ? coupons?.map((item, index) => (
            <View key={item.id} className={couponsClassName(item.status, index)} onClick={() => handleClick(item)}>
              {item?.tag && <View className={`${prefixClass}__item-tag`}>{item.tag}</View>}
              <View className={`${prefixClass}__item-name`}>{item.name}</View>
              {item.desc && <View className={`${prefixClass}__item-desc`}>{item.desc}</View>}
              <View className={`${prefixClass}__item-text`}>
                <View>截至日期：{dayjs(item.endTime).format('YYYY-MM-DD')}</View>
                <View>剩余次数：{item.count}/{item.amount}</View>
              </View>
            </View>
          )) : (
            <View className='empty-block'>
              暂无数据哦^ ^
            </View>
          )}
        </View>
      </View>
      {tab === ICouponsStatus.ON && (
        <View className={`${prefixClass}__add`}>
          <Button type='primary' className={`${prefixClass}__add-btn`} onClick={openAddPage}>
            <IconFont color='white' size={30} name='add' />
            <Text style={{ marginLeft: '3px' }}>新增服务</Text>
          </Button>
        </View>
      )}
    </View>
  )
};

export default List;
