import SingleTeam from "@/containers/SingleTeam/SingleTeam";

interface TeamPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TeamDetail({ params }: TeamPageProps) {
  const { slug } = await params;
  return <SingleTeam slug={slug} />;
}
