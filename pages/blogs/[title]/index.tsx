import Head from "next/head";
import { useRouter } from "next/router";

const BlogItem = () => {
  const router = useRouter();
  const title = router.query.title;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>Blog title:</h1>
      <p>{title}</p>
    </>
  );
};

export default BlogItem;
