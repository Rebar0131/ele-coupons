import { FC } from '@tarojs/taro'
import { useState } from 'react'
import { View } from '@tarojs/components'

import Love from '../../components/Love/Love'
import List from '../components/List/List'

import './index.scss'

const Index: FC = () => {

  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 5000)

  return (
    <View className='index'>
      { loading ? <Love /> : <List />}
    </View>
  )
}

export default Index;
