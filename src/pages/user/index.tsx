/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2022-11-23 18:19:48
 * @LastEditTime: 2022-11-23 18:48:46
 * @LastEditors: dingyuwen
 * @Description:
 */
import { Component } from 'react'
import { getCurrentInstance } from '@tarojs/taro'
import { View } from '@tarojs/components'
// @ts-ignore
import api from '@/services/api'
import './index.scss'


type PageState = {
}

class Page extends Component<{}, PageState> {

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.getUserDetail()
  }

  componentDidHide () { }

  getUserDetail() {
    const { id } = getCurrentInstance()?.router?.params || {}
    api.get('/user/detail', {
        uid: id
    }).then((res) => {
        console.log('user/detail==>', res)
    })
  }


  render () {
    return (
      <View className='user_container'>
      </View>
    )
  }
}

export default Page;
