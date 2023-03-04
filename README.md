> VLayout 是一个页面可视化搭建平台，使用它搭建页面将会非常简单。

## 如何开始？

```bash
git clone https://github.com/SaebaRyoo/VLayout.git

cd VLayout

yarn init

# 依赖项打包
npx lerna run build

# 启动网站
lerna run dev --scope=website
```

然后就可以在本地开始拖拽生成页面的 JSON Schema
