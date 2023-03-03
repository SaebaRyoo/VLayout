import { rest } from 'msw'
export const todo = [
  // mock 获取todo
  rest.get('/api/todo', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        status: 200,
        data: [
          {
            id: '1',
            name: 'To learn node',
            done: false
          }
        ],
        msg: ''
      }),
    )
  }),

  // mock 添加 todo
  rest.post('/api/todo', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        status: 200,
        data: [
          {
            id: '1',
            name: 'learning react test',
            done: false
          }
        ],
        msg: ''
      }),
    )
  }),


  // mock 修改 todo
  rest.patch('/api/todo', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        status: 200,
        data: [
          {
            id: '1',
            name: 'learning react test',
            done: true
          }
        ],
        msg: ''
      }),
    )
  }),

  // mock 添加 todo
  rest.delete('/api/todo', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        status: 200,
        data: [],
        msg: ''
      }),
    )
  }),

]
