
import prisma from '../../../lib/prisma';

// PUT /api/edit/:id
export default async function handle(req, res) {
    const { reference, content, frameWidth, frameHeight, threshold, cill } = req.body;

  console.log(req.query.id)
  const postId = req.query.id;
  const post = await prisma.quote.update({
    where: { id: postId },
    data: { reference: reference },
  });
  res.json(post);
}