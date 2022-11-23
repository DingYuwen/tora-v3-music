/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2022-11-23 18:13:13
 * @LastEditTime: 2022-11-23 18:16:03
 * @LastEditors: dingyuwen
 * @Description:
 */
// eslint-disable-next-line
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        },
        // 小程序端样式引用本地资源内联配置
        url: {
          enable: true,
          config: {
            limit: 1024000 // 文件大小限制
          }
        }
      }
    }
  },
  h5: {}
}
