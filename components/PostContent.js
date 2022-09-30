import NextLink from "next/Link";
import ReactMarkdown from "react-markdown";

// UI component for when post is focus
export default function PostContent({ post }) {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Written by{" "}
        <NextLink href={`/${post.username}/`}>
          <a className="text-info">@{post.username}</a>
        </NextLink>{" "}
        on {createdAt.toISOString()}
      </span>

      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
}
