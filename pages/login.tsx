import { signIn, useSession, getSession } from "next-auth/react";

export default function Login() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    // If session is loading, show a loading indicator
    return <p>Loading...</p>;
  }

  if (session) {
    // If session exists, redirect to home page
    return <p>You are already signed in.</p>;
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
      <button onClick={() => signIn("github")}>Sign in with GitHub</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    // If session exists, redirect to home page
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
