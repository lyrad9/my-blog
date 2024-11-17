import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
 req: NextApiRequest,
 res: NextApiResponse
 ) {
 try {
const result="good"
 res.status(200).json({ result })
 } catch (err) {
 res.status(500).json({ error: 'failed to load data' })
 }
}