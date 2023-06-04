// pages/p/[id].tsx

import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import Layout from "../../components/Layout";
import Panel from "../../components/Panel";

import config from "../../config/index.json";
import Reference from "../../config/Reference";
import Name from "../../config/Name";
import DeliveryAddress from "../../config/DeliveryAddress";
import AddressLine1 from "../../config/AddressLine1";
import AddressLine2 from "../../config/AddressLine2";
import Town from "../../config/Town";
import County from "../../config/County";
import Postcode from "../../config/Postcode";
import ContactNumber from "../../config/ContactNumber";
import Email from "../../config/Email";
import FrameWidth from "../../config/FrameWidth";
import FrameHeight from "../../config/FrameHeight";
import Threshold from "../../config/Threshold";
import Cill from "../../config/Cill";
import DoorsLeft from "../../config/DoorsLeft";
import DoorsRight from "../../config/DoorsRight";
import OpeningDirection from "../../config/OpeningDirection";
import TrafficDoorSide from "../../config/TrafficDoorSide";
import FrameColor from "../../config/FrameColor";
import AddOnSize from "../../config/AddOnSize";
import AddOnPosition from "../../config/AddOnPosition";
import HandleColor from "../../config/HandleColor";
import InternalShootbolt from "../../config/InternalShootbolt";
import Glazing from "../../config/Glazing";
import Blinds from "../../config/Blinds";
import BlindsColor from "../../config/BlindsColor";
import TrackColor from "../../config/TrackColor";
import TrickleVents from "../../config/TrickleVents";
import DeliveryType from "../../config/DeliveryType";
import Notes from "../../config/Notes";

import Field from "../../components/Field";
import Label from "../../components/Label";
import Button from "../../components/Button";
import Banner from "../../components/Banner";
import Preview from "../../components/Preview";

import { PostProps } from "../../components/Post";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.quote.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  // Convert the total property of the post to a string
  const postWithTotalAsString = {
    ...post,
    total: post.total.toString(),
  };

  return {
    props: postWithTotalAsString,
  };
};

const Post: React.FC<PostProps> = (props) => {
  const [total, setTotal] = useState(Number(props.total));
  const [reference, setReference] = useState(props.reference);
  const [name, setName] = useState(props.name);
  const [deliveryOption, setDeliveryOption] = useState(props.deliveryOption);
  const [address1, setAddress1] = useState(props.address1);
  const [address2, setAddress2] = useState(props.address2);
  const [town, setTown] = useState(props.town);
  const [county, setCounty] = useState(props.county);
  const [postcode, setPostcode] = useState(props.postcode);
  const [contact, setContact] = useState(props.contact);
  const [email, setEmail] = useState(props.email);
  const [frameWidth, setFrameWidth] = useState(props.frameWidth);
  const [frameHeight, setFrameHeight] = useState(props.frameHeight);
  const [threshold, setThreshold] = useState(props.threshold);
  const [cill, setCill] = useState(props.cill);
  const [cillCost, setCillCost] = useState(config.cill[props.cill]);
  const [leftDoors, setLeftDoors] = useState(props.leftDoors);
  const [rightDoors, setRightDoors] = useState(props.rightDoors);
  const [openingDirection, setOpeningDirection] = useState(
    props.openingDirection
  );
  const [trafficDoorSide, setTrafficDoorSIde] = useState(props.trafficDoorSide);
  const [frameColor, setFrameColor] = useState(props.frameColor);
  const [frameColorCost, setFrameColorCost] = useState(
    config.frameColor[props.frameColor]
  );
  const [addOnSize, setAddOnSize] = useState(props.addOnSize);
  const [addOnSizeCost, setAddOnSizeCost] = useState(
    config.addOnSize[props.addOnSize]
  );
  const [addOnPositionTop, setAddOnPositionTop] = useState(
    props.addOnPositionTop
  );
  const [addOnPositionLeft, setAddOnPositionLeft] = useState(
    props.addOnPositionLeft
  );
  const [addOnPositionRight, setAddOnPositionRight] = useState(
    props.addOnPositionRight
  );
  const [handleColor, setHandleColor] = useState(props.handleColor);
  const [handleColorCost, setHandleColorCost] = useState(
    config.handleColor[props.handleColor]
  );
  const [internalShootbolt, setInternalShootbolt] = useState(
    props.internalShootbolt
  );
  const [internalShootboltCost, setInternalShootboltCost] = useState(
    config.internalShootbolt[props.internalShootbolt]
  );
  const [glazing, setGlazing] = useState(props.glazing);
  const [glazingCost, setGlazingCost] = useState(config.glazing[props.glazing]);
  const [blinds, setBlinds] = useState(props.blinds);
  const [blindsCost, setBlindsCost] = useState(config.blinds[props.blinds]);
  const [blindsColor, setBlindsColor] = useState(props.blindsColor);
  const [blindsTrack, setBlindsTrack] = useState(props.blindsTrack);
  const [trickleVents, setTrickleVents] = useState(props.trickleVents);
  const [trickleVentsCost, setTrickleVentsCost] = useState(
    config.trickleVents[props.trickleVents]
  );
  const [delivery, setDelivery] = useState(props.delivery);
  const [deliveryCost, setDeliveryCost] = useState(
    config.delivery[props.delivery]
  );
  const [content, setContent] = useState(props.content);

  const leaf = {
    min: 550,
    max: 1200,
  };

  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  // let title = props.reference;
  // if (!props.published) {
  //   title = `${title}`;
  // }

  async function savePost(id: string): Promise<void> {
    await fetch(`/api/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
        total,
      }),
    });
    await Router.push("/");
  }

  // MAKE KIT FORM DEFAULT IF LARGER DIMENSIONS
  useEffect(() => {
    if (frameWidth > 4800 || frameHeight > 2200) {
      setDelivery("Kit form");
      setDeliveryCost(7500);
    }
  }, [frameWidth, frameHeight]);

  // SET TOTAL
  useEffect(() => {
    const sumCill = (frameWidth / 1000) * (cillCost / 100);
    const doorsPerLeaf = frameHeight < 2250 ? 395 : 425;
    const sumDoors = doorsPerLeaf * (leftDoors + rightDoors);
    const sumFrameColor = (frameColorCost / 100) * (leftDoors + rightDoors);
    // const sumAddOnSize = (frameWidth / 1000) * (addOnSizeCost / 100);
    const sumAddOnSize = 0;
    const sumAddOnPositionTop = addOnPositionTop
      ? (addOnSizeCost / 100) * (frameWidth / 1000)
      : 0;
    const sumAddOnPositionLeft = addOnPositionLeft
      ? (addOnSizeCost / 100) * (frameHeight / 1000)
      : 0;
    const sumAddOnPositionRight = addOnPositionRight
      ? (addOnSizeCost / 100) * (frameHeight / 1000)
      : 0;
    const sumHandleColour = handleColorCost / 100;
    const sumInternalShootbolt = internalShootboltCost / 100;
    const sumTrickleVents = trickleVentsCost / 100;
    const sumGlazing =
      ((frameWidth * frameHeight) / 1000000) * (glazingCost / 100);
    const sumBlinds = (leftDoors + rightDoors) * (blindsCost / 100);
    const sumDelivery = deliveryCost / 100;
    setTotal(
      sumCill +
        sumDoors +
        sumFrameColor +
        sumAddOnSize +
        sumAddOnPositionTop +
        sumAddOnPositionLeft +
        sumAddOnPositionRight +
        sumHandleColour +
        sumInternalShootbolt +
        sumTrickleVents +
        sumGlazing +
        sumBlinds +
        sumDelivery
    );
  });

  return (
    <Layout title="Edit quote">
      <Panel isPadding>
        <Reference {...{ reference, setReference }} />
        <Name {...{ name, setName }} />
        <DeliveryAddress {...{ deliveryOption, setDeliveryOption }} />
        {deliveryOption === "Custom" && (
          <>
            <AddressLine1 {...{ address1, setAddress1 }} />
            <AddressLine2 {...{ address2, setAddress2 }} />
            <Town {...{ town, setTown }} />
            <County {...{ county, setCounty }} />
            <Postcode {...{ postcode, setPostcode }} />
          </>
        )}
        <ContactNumber {...{ contact, setContact }} />
        <Email {...{ email, setEmail }} />
        <FrameWidth {...{ frameWidth, setFrameWidth, leaf }} />
        <FrameHeight {...{ frameHeight, setFrameHeight, leaf }} />
        <Threshold {...{ threshold, setThreshold }} />
        <Cill {...{ cill, setCill, setCillCost }} />
        <DoorsLeft
          {...{
            leftDoors,
            setLeftDoors,
            rightDoors,
            setRightDoors,
            frameWidth,
            leaf,
          }}
        />
        <DoorsRight
          {...{
            rightDoors,
            setRightDoors,
            leftDoors,
            setLeftDoors,
            frameWidth,
            leaf,
          }}
        />
        <OpeningDirection {...{ openingDirection, setOpeningDirection }} />
        <TrafficDoorSide {...{ trafficDoorSide, setTrafficDoorSIde }} />
        <FrameColor {...{ frameColor, setFrameColor, setFrameColorCost }} />
        <AddOnSize
          {...{
            addOnSize,
            setAddOnSize,
            setAddOnSizeCost,
            setAddOnPositionTop,
            setAddOnPositionRight,
            setAddOnPositionLeft,
          }}
        />
        {addOnSize !== "None" && (
          <AddOnPosition
            {...{
              addOnPositionTop,
              setAddOnPositionTop,
              addOnPositionLeft,
              setAddOnPositionLeft,
              addOnPositionRight,
              setAddOnPositionRight,
            }}
          />
        )}
        <HandleColor
          {...{
            handleColor,
            setHandleColor,
            setHandleColorCost,
            frameColor,
          }}
        />
        <InternalShootbolt
          {...{
            internalShootbolt,
            setInternalShootbolt,
            setInternalShootboltCost,
            handleColor,
            frameColor,
          }}
        />
        <Glazing
          {...{
            glazing,
            setGlazing,
            setGlazingCost,
            setBlinds,
            setBlindsCost,
          }}
        />
        <Blinds
          {...{
            blinds,
            setBlinds,
            setBlindsCost,
            glazing,
            setBlindsColor,
            setBlindsTrack,
          }}
        />
        {blinds === "Integrated Blinds 1.2 U-value" && (
          <>
            <BlindsColor {...{ blindsColor, setBlindsColor, setBlindsTrack }} />
            <TrackColor {...{ blindsTrack, setBlindsTrack }} />
          </>
        )}
        <TrickleVents
          {...{ trickleVents, setTrickleVents, setTrickleVentsCost }}
        />
        <DeliveryType
          {...{
            delivery,
            setDelivery,
            setDeliveryCost,
            frameWidth,
            frameHeight,
          }}
        />
        <Notes {...{ content, setContent }} />
        <Field>
          <Label>Preview</Label>
          <Preview
            leftDoors={leftDoors}
            rightDoors={rightDoors}
            frameColor={frameColor}
          />
        </Field>

        <Banner>
          <Banner.Left>
            {/* <Button
              type="submit"
              variant="secondary"
              name="save"
              onClick={submitData}
            >
              Save
            </Button> */}
          </Banner.Left>
          <Banner.Right>
            <div>
              £
              {Number(total).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              <br />
              <small>(ex. VAT)</small>
            </div>
            {userHasValidSession && postBelongsToUser && (
              <Button onClick={() => savePost(props.id)}>Save</Button>
            )}
          </Banner.Right>
        </Banner>
      </Panel>
    </Layout>
  );
};

export default Post;
