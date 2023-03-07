export default {
  id: '',
  type: 'Text',
  propValue: '点击编辑文本', // 组件所使用的值
  animations: [], // 动画列表
  events: {}, // 事件列表
  style: {
    // 组件样式
    boxSizing: 'border-box',
    position: 'absolute',
    left: 0,
    top: 0,
    width: 200,
    height: 34,
    borderWidth: 1,
    borderColor: '',
    borderStyle: '',
    borderRadius: '',
    fontSize: '',
    fontWeight: 400,
    lineHeight: '',
    letterSpacing: 0,
    textAlign: '',
    color: '',
    backgroundColor: '',
  },
  request: {
    method: 'GET',
    data: [],
    url: '',
    series: false, // 是否定时发送请求
    time: 1000, // 定时更新时间
    paramType: '', // string object array
    requestCount: 0, // 请求次数限制，0 为无限
  },
};
