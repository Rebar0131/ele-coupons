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
  }, 4100)

  console.log('To 燕程:')
  console.log('    七夕快乐哟~ ')
  console.log('       by: Rebar')

  console.log('仓库地址：https://github.com/Rebar0131/ele-coupons.git')

  return (
    <View className='index'>
      { loading ? <Love /> : <List />}
    </View>
  )
}

export default Index;
