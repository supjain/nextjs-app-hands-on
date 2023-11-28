import Head from "next/head";
import { useRouter } from "next/router";

const SSRBlogs = ({ blogs }: { blogs: { title: string; body: string }[] }) => {
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

// Special Function executed on the server each time the request comes to this route.
export async function getServerSideProps() {
  console.log(
    "---- Executed everytime a request came in to server for this page at runtime. ----"
  );
  const res = await fetch("https://dummyjson.com/posts");
  const blogsResponse = await res.json();
  const blogsList = blogsResponse.posts.map((b: any) => ({
    title: b.title,
    body: b.body,
  }));
  return {
    props: {
      blogs: blogsList.slice(5, 9),
    },
  };
}

export default SSRBlogs;
