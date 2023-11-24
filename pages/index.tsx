import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <h1>Greetings from Home page</h1>
    </>
  );
}

// This will only run on the server & it will be excluded in the NextJS client bundle
export const getStaticProps = () => {
  return {
    props: { name: "Lorem" },
  };
};
