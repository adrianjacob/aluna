// pages/p/[id].tsx

import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import Layout from "../../components/Layout";
import Panel from "../../components/Panel";

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
  const [total, setTotal] = useState(props.total);
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
      }),
    });
    await Router.push("/");
  }

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

        {userHasValidSession && postBelongsToUser && (
          <button onClick={() => savePost(props.id)}>Save</button>
        )}
      </Panel>
      <style jsx>{``}</style>
    </Layout>
  );
};

export default Post;
