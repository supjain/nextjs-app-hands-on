import { POSTS_API } from "@/constants/http-constants";
import { IPost } from "@/models/post";
import Head from "next/head";
import { useRouter } from "next/router";

const BlogItem = ({ id, body, title }: IPost) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>Blog title:</h1>
      <p>{title}</p>

      <hr />
      <p>{body}</p>
    </>
  );
};

export async function getStaticPaths() {
  console.log("From [getStaticPaths] dynamic route");
  const res = await fetch(POSTS_API);
  const json = await res.json();
  const posts = json.slice(0, 4);
  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post: { id: string }) => ({
    params: { id: post.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.

  return { paths, fallback: true };
}

export async function getStaticProps(context: any) {
  const postId = context.params?.id;
  console.log("From [getStaticProps] dynamic route, postId: ", postId);
  const res = await fetch(`${POSTS_API}/${postId}`);
  const { title, id, body } = (await res.json()) as IPost;

  return {
    props: {
      title,
      id,
      body,
    },
  };
}

export default BlogItem;
