import prisma from "../../../lib/prisma";
import { utcToZonedTime, format } from "date-fns-tz";

// PUT /api/edit/:id
export default async function handle(req, res) {
  const { reference, content, frameWidth, frameHeight, threshold, cill } =
    req.body;

  const currentDate = new Date();
  const britishTimeZone = "Europe/London";
  const britishTime = utcToZonedTime(currentDate, britishTimeZone);
  const britishTimeISO = format(britishTime, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", {
    timeZone: britishTimeZone,
  });

  const postId = req.query.id;
  const post = await prisma.quote.update({
    where: { id: postId },
    data: { reference: reference, dateModified: britishTimeISO },
  });

  res.json(post);
}
