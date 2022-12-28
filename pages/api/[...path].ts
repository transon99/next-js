// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
// type Data = {
//   name: string
// }
export const config = {
  api: {
    bodyPaser: false
  }
}

const proxy = httpProxy.createServer()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  req.headers.cookie = ''; //bỏ cookie đi

  proxy.web(req, res, {
    target : 'https://js-post-api.herokuapp.com/api', //chuyển qua domain này
    changeOrigin: true,
    selfHandleResponse: false //Khi proxy nhận đc data từ sever APi => chuyển về cho client luôn (ko xử lý ở proxy)
  })

  // res.status(200).json({ name: 'John Doe' })
}
