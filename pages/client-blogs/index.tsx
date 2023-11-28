import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ClientBlogs = () => {
  const [blogs, setBlogs] = useState<{ body: string; title: string }[]>([]);
  const router = useRouter();

  const loadPost = (title: string) => router.push(`${router.asPath}/${title}`);

  const fetchBlogs = async () => {
    const res = await fetch("https://dummyjson.com/posts");
    const blogsResponse = await res.json();
    const blogsList = blogsResponse.posts.map((b: any) => ({
      title: b.title,
      body: b.body,
    }));
    setBlogs(blogsList.slice(9, 13));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
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

export default ClientBlogs;
