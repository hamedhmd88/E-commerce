import { BlogPost } from "@/components/blog/blog-post";
import { PageLayout } from "@/components/layout/page-layout";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <PageLayout customLastLabel={params.slug}>
      <BlogPost slug={params.slug} />
    </PageLayout>
  );
}
