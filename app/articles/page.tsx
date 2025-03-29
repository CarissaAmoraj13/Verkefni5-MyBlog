import Link from "next/link";
import { getAllArticles } from "@/lib/datocms";

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>My Blog Posts ✨</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {articles.map((article) => (
          <li key={article.id} style={{ margin: "1rem 0" }}>
            <Link href={`/articles/${article.slug}`}>
              <strong>{article.title}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
