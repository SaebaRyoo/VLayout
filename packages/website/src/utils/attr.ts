// 样式数据
export const styleMap: any = {
  // left: { label: 'x坐标', type: 'number' },
  // top: { label: 'y坐标', type: 'number' },
  rotate: { label: '旋转角度', type: 'number' },
  width: { label: '宽', type: 'number' },
  height: { label: '高', type: 'number' },
  color: { label: '颜色', type: 'text' },
  backgroundColor: { label: '背景色', type: 'text' },
  borderWidth: { label: '边框宽度', type: 'number' },
  borderStyle: { label: '边框风格', type: 'select' },
  borderColor: { label: '边框颜色', type: 'text' },
  borderRadius: { label: '边框半径', type: 'number' },
  fontSize: { label: '字体大小', type: 'number' },
  fontWeight: { label: '字体粗细', type: 'number' },
  lineHeight: { label: '行高', type: 'number' },
  letterSpacing: { label: '字间距', type: 'number' },
  textAlign: { label: '左右对齐', type: 'select' },
  verticalAlign: { label: '上下对齐', type: 'select' },
  opacity: { label: '不透明度', type: 'number' },
};

// 水平方向
export const textAlignOptions = [
  {
    label: '左对齐',
    value: 'left',
  },
  {
    label: '居中',
    value: 'center',
  },
  {
    label: '右对齐',
    value: 'right',
  },
];

// 水平垂直方向
export const verticalAlignOptions = [
  {
    label: '上对齐',
    value: 'top',
  },
  {
    label: '居中对齐',
    value: 'middle',
  },
  {
    label: '下对齐',
    value: 'bottom',
  },
];

export const borderStyleOptions = [
  {
    label: '实线',
    value: 'solid',
  },
  {
    label: '虚线',
    value: 'dashed',
  },
];

export const optionMap: any = {
  textAlign: textAlignOptions,
  borderStyle: borderStyleOptions,
  verticalAlign: verticalAlignOptions,
};
