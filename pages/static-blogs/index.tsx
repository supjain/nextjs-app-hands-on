import { POSTS_API } from "@/constants/http-constants";
import { IPost } from "@/models/post";
import {
  generateRandomNumber,
  generateUpperLowerNumbers,
} from "@/utils/random-number";
import Head from "next/head";
import { useRouter } from "next/router";

const StaticBlogs = ({ blogs }: { blogs: IPost[] }) => {
  const router = useRouter();

  const loadPost = (id: string) => router.push(`${router.asPath}/${id}`);

  return (
    <div>
      <Head>
        <title>Blogs</title>
      </Head>
      {blogs.map(({ body, title, id }) => (
        <div key={title} className="blog-item" onClick={() => loadPost(id)}>
          <h1>{title}</h1>
          <p>Id: {id}</p>
          <p>{body}</p>
        </div>
      ))}
    </div>
  );
};

// Special Function executed on the server at the build time.
export async function getStaticProps() {
  console.log("Executing");
  const res = await fetch(POSTS_API);
  const blogsResponse = await res.json();
  const blogsList = blogsResponse.map(({ body, id, title }: IPost) => ({
    title,
    body,
    id,
  }));
  const { floor, ceil } = generateUpperLowerNumbers(4);
  return {
    props: {
      blogs: blogsList.slice(floor, ceil),
    },
    revalidate: 10,
  };
}

export default StaticBlogs;
