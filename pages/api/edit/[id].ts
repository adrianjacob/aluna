import prisma from "../../../lib/prisma";
import { utcToZonedTime, format } from "date-fns-tz";

// PUT /api/edit/:id
export default async function handle(req, res) {
  const currentDate = new Date();
  const britishTimeZone = "Europe/London";
  const britishTime = utcToZonedTime(currentDate, britishTimeZone);
  const britishTimeISO = format(britishTime, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", {
    timeZone: britishTimeZone,
  });

  const data = { ...req.body, dateModified: britishTimeISO };

  const postId = req.query.id;
  const post = await prisma.quote.update({
    where: { id: postId },
    data,
  });

  console.log(post)

  res.json(post);
}
