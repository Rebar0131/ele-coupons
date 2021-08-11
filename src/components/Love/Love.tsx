import { View } from "@tarojs/components";
import { FC } from "@tarojs/taro";

import './Love.scss';

const prefixClass = 'love-com'
const Love: FC = () => {
  return (
    <View className={prefixClass}>
      <View className='back' />
      <View className='love' />
      <View className='love-1' />
      <View className='love-2' />
    </View>
  )
}

export default Love;
