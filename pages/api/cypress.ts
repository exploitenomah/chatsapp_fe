import client from 'socket.io-client'

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    res.socket?.emit('isTaken', { path: 'nickName', isTaken: true })
    res.status(200).json({})
}
