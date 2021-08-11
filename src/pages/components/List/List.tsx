import { Button, Text, View } from "@tarojs/components";
import dayjs from "dayjs";
import { FC, useState } from "react";

import IconFont from "../../../components/iconfont/h5";
import { getCouponsData } from "../../../utils/utils";
import { ICouponsStatus, ICoupon } from "../../..//typings";
import AddComponents from "../Add/Add";
import CouponsDetail from "../Detail/Detail";

import "./List.scss";

const prefixClass = "coupons-list";
const List: FC = () => {
  const [tab, setTab] = useState(ICouponsStatus.ON);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [curItem, setCurItem] = useState<ICoupon>();

  const handleSwitchTab = () => {
    tab === ICouponsStatus.ON ? setTab(ICouponsStatus.OFF) : setTab(ICouponsStatus.ON);
  }
  const tabClassName = (mode) => {
    if (mode === tab) {
      return `${prefixClass}__tab-item ${prefixClass}__tab-item--active`;
    }
    return `${prefixClass}__tab-item`;
  }
  const couponsClassName = (status) => {
    if (status === ICouponsStatus.OFF) {
      return `${prefixClass}__item ${prefixClass}__item--off`;
    }
    return `${prefixClass}__item`;
  }

  const openAddPage = () => {
    setOpenAdd(true);
  }

  const handleClick = (item: ICoupon) => {
    setCurItem(item)
    setOpenDetail(true);
  }

  return (
    <View className={prefixClass}>
      <View className={`${prefixClass}__tab`} style={{ backgroundColor: 'rgb(255 255 255 / 0.5)' }}>
        <View className={tabClassName(ICouponsStatus.ON)} onClick={handleSwitchTab}>已生效</View>
        <View className={tabClassName(ICouponsStatus.OFF)} onClick={handleSwitchTab}>已失效</View>
      </View>
      {/* {!openDetail && !openAdd && ( */}
        <View className={`${prefixClass}__content`}>
          <View className={`${prefixClass}__list`}>
            {getCouponsData(tab)?.map((item) => (
              <View key={item.id} className={couponsClassName(item.status)} onClick={() => handleClick(item)}>
                {item?.tag && <View className={`${prefixClass}__item-tag`}>{item.tag}</View>}
                <View className={`${prefixClass}__item-name`}>{item.name}</View>
                <View className={`${prefixClass}__item-desc`}>{item.desc}</View>
                <View className={`${prefixClass}__item-text`}>
                  <View>截至日期：{dayjs(item.endTime).format('YYYY-MM-DD')}</View>
                  <View>剩余次数：{item.count}/{item.amount}</View>
                </View>
              </View>
            ))}
          </View>
        </View>
      {/* )} */}
      {tab === ICouponsStatus.ON && (
        <View className={`${prefixClass}__add`}>
          <Button type='primary' className={`${prefixClass}__add-btn`} onClick={openAddPage}>
            <IconFont color='white' size={30} name='add' />
            <Text style={{ marginLeft: '3px' }}>新增服务</Text>
          </Button>
        </View>
      )}
      <AddComponents opened={openAdd} onCancel={() => { setOpenAdd(false) }} />
      <CouponsDetail opened={openDetail} item={curItem} onCancel={() => { setOpenDetail(false) }} />
    </View>
  )
};

export default List;
