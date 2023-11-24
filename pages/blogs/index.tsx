import Head from "next/head";
import { useRouter } from "next/router";

const Blogs = ({ blogs }: { blogs: { title: string; body: string }[] }) => {
  const router = useRouter();

  const loadPost = (title: string) => router.push(`${router.asPath}/${title}`);

  return (
    <div>
      <Head>
        <title>Blogs</title>
      </Head>
      {blogs.map(({ body, title }) => (
        <div key={title} className="blog-item" onClick={() => loadPost(title)}>
          <h1>{title}</h1>
          <p>{body}</p>
        </div>
      ))}
    </div>
  );
};

// Special Function executed on the server at the build time.
export async function getStaticProps() {
  const res = await fetch("https://dummyjson.com/posts");
  const blogsResponse = await res.json();
  const blogsList = blogsResponse.posts.map((b: any) => ({
    title: b.title,
    body: b.body,
  }));
  return {
    props: {
      blogs: blogsList.slice(0, 4),
    },
  };
}

export default Blogs;
