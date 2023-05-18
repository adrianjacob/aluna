import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { utcToZonedTime, format } from "date-fns-tz";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const {
    reference,
    name,
    deliveryOption,
    address1,
    address2,
    town,
    county,
    postcode,
    contact,
    email,
    frameWidth,
    frameHeight,
    threshold,
    cill,
    leftDoors,
    rightDoors,
    openingDirection,
    trafficDoorSide,
    frameColor,
    addOnSize,
    addOnPositionTop,
    addOnPositionLeft,
    addOnPositionRight,
    handleColor,
    internalShootbolt,
    glazing,
    blinds,
    blindsColor,
    blindsTrack,
    trickleVents,
    delivery,
    content,
    published,
    total,
  } = req.body;

  const session = await getSession({ req });

  const currentDate = new Date();
  const britishTimeZone = "Europe/London";
  const britishTime = utcToZonedTime(currentDate, britishTimeZone);
  const britishTimeISO = format(britishTime, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", {
    timeZone: britishTimeZone,
  });

  const result = await prisma.quote.create({
    data: {
      reference: reference,
      name: name,
      deliveryOption: deliveryOption,
      address1: address1,
      address2: address2,
      town: town,
      county: county,
      postcode: postcode,
      contact: contact,
      email: email,
      frameWidth: frameWidth.toString(),
      frameHeight: frameHeight.toString(),
      threshold: threshold,
      cill: cill,
      leftDoors: leftDoors.toString(),
      rightDoors: rightDoors.toString(),
      openingDirection: openingDirection,
      trafficDoorSide: trafficDoorSide,
      frameColor: frameColor,
      addOnSize: addOnSize,
      addOnPositionTop: addOnPositionTop.toString(),
      addOnPositionLeft: addOnPositionLeft.toString(),
      addOnPositionRight: addOnPositionRight.toString(),
      handleColor: handleColor,
      internalShootbolt: internalShootbolt,
      glazing: glazing,
      blinds: blinds,
      blindsColor: blindsColor,
      blindsTrack: blindsTrack,
      trickleVents: trickleVents,
      delivery: delivery,
      content: content,
      author: { connect: { email: session?.user?.email } },
      datePublished: britishTimeISO,
      dateModified: britishTimeISO,
      published: published,
      total: total.toLocaleString('en-GB', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }),
    },
  });
  console.log(result);
  res.json(result);
}
