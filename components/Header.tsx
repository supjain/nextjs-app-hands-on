import Link from "next/link";

const Header = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      {/* <Link href="/client-blogs">Client Blogs</Link> */}
      <Link href="/static-blogs">Static Blogs</Link>
      {/* <Link href="/ssr-blogs">SSR Blogs</Link> */}
    </nav>
  );
};

export default Header;
