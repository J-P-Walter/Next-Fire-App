import NextLink from "next/Link";

export default function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
}

function PostItem({ post, admin = false }) {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  return (
    <div className="card">
      <NextLink href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </NextLink>
      <NextLink
        href={admin ? `/admin/${post.slug}` : `/${post.username}/${post.slug}`}
      >
        <h2>
          <a>{post.title}</a>
        </h2>
      </NextLink>

      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read
        </span>
        <span>❤️ {post.heartCount} Hearts</span>
      </footer>
    </div>
  );
}
