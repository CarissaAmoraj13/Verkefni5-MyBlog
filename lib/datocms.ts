import { GraphQLClient } from "graphql-request";

const API_TOKEN = process.env.DATOCMS_API_TOKEN!;
const endpoint = "https://graphql.datocms.com/";

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${API_TOKEN}`,
  },
});

type Article = {
  id: string;
  title: string;
  slug: string;
};

type StructuredTextValue = {
  schema: string;
  document: object;
};

type ArticleDetail = {
  title: string;
  content: {
    value: StructuredTextValue;
  };
  image?: {
    url: string;
  };
};

export async function getAllArticles(): Promise<Article[]> {
  const query = `
    {
      allArticles {
        id
        title
        slug
      }
    }
  `;
  const data: { allArticles: Article[] } = await client.request(query);
  return data.allArticles;
}

export async function getArticleBySlug(slug: string): Promise<ArticleDetail | null> {
  const query = `
    query ArticleBySlug($slug: String) {
      article(filter: {slug: {eq: $slug}}) {
        title
        content {
          value
        }
        image {
          url
        }
      }
    }
  `;
  const variables = { slug };
  const data: { article: ArticleDetail | null } = await client.request(query, variables);
  return data.article;
}
