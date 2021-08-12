import Taro, { FC } from '@tarojs/taro'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'

import Love from '../../components/Love/Love'

import './index.scss'

const WeekName = {
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
}

const Index: FC = () => {

  setTimeout(() => {
    Taro.redirectTo({
      url: '/pages/coupons/list/list',
    });
  }, 4100)

  console.log('To 燕程:')
  console.log('    七夕快乐哟~ ')
  console.log('       by: Rebar')

  console.log('仓库地址：https://github.com/Rebar0131/ele-coupons.git')

  const getName = () => {
    if (dayjs().startOf('day').valueOf() === dayjs('2021-08-14').valueOf()) {
      return '七夕'
    }
    return `周${WeekName[dayjs().day()]}`
  }

  return (
    <View className='index'>
      <Love />
      <View className='loading-text'>燕程, {getName()}快乐哟~</View>
    </View>
  )
}

export default Index;
