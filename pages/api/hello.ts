// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import csrf from '../../csrf'
type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
		await csrf(req, res)
	} catch (e) {
		res.status(401).json({ name: 'Fuck off' })
	}
	res.status(200).json({ name: 'John Doe' })
}

 