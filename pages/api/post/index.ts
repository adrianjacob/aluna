
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
 import { utcToZonedTime, format } from "date-fns-tz";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { reference, name, contact, email, frameWidth, frameHeight, threshold, cill, leftDoors, rightDoors, content } = req.body;

  const session = await getSession({ req });

  const currentDate = new Date();
  const britishTimeZone = 'Europe/London';
  const britishTime = utcToZonedTime(currentDate, britishTimeZone);
  const britishTimeISO = format(britishTime, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", { timeZone: britishTimeZone });


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
      leftDoors: leftDoors.toString(),
      rightDoors: rightDoors.toString(),
      content: content,
      author: { connect: { email: session?.user?.email } },
      datePublished: britishTimeISO,
      dateModified: britishTimeISO,
    },
  });
  console.log(result)
  res.json(result);
}