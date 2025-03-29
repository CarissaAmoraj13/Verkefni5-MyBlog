import { getArticleBySlug } from "@/lib/datocms";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return <p>Article not found 😢</p>;
  }

  // Extract plain text from structured content
  const rawText = article.content.value?.document?.children
    ?.map((block: any) =>
      block.children?.map((child: any) => child.value).join(" ")
    )
    .join("\n\n");

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{article.title}</h1>

      {/* Show image if it exists */}
      {article.image?.url && (
        <img
          src={article.image.url}
          alt={article.title}
          style={{
            maxWidth: "100%",
            borderRadius: "1rem",
            marginBottom: "1.5rem",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
          }}
        />
      )}

      <p>{rawText}</p>

      <p style={{ marginTop: "2rem" }}>
        <a href="/" style={{ color: "#cc3366" }}>← Back to homepage</a> |{" "}
        <a href="/articles" style={{ color: "#cc3366" }}>← Back to articles</a>
      </p>
    </main>
  );
}
