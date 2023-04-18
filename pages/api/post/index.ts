
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { reference, name, contact, email, frameWidth, frameHeight, threshold, cill, content } = req.body;

  const session = await getSession({ req });
  const result = await prisma.quote.create({
    data: {
      reference: reference,
      name: name,
      contact: contact,
      email: email,
      frameWidth: frameWidth.toString(),
      frameHeight: frameHeight.toString(),
      threshold: threshold,
      cill: cill,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}