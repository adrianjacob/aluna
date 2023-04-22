import prisma from "../../../lib/prisma";
import { utcToZonedTime, format } from "date-fns-tz";

// PUT /api/publish/:id
export default async function handle(req, res) {
  const postId = req.query.id;

  const currentDate = new Date();
  const britishTimeZone = "Europe/London";
  const britishTime = utcToZonedTime(currentDate, britishTimeZone);
  const britishTimeISO = format(britishTime, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", {
    timeZone: britishTimeZone,
  });

  const post = await prisma.quote.update({
    where: { id: postId },
    data: { published: true, dateModified: britishTimeISO },
  });
  res.json(post);
}
