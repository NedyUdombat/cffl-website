import { Suspense } from "react";
import Footer from "@/containers/Footer/Footer";
import SingleTeam from "@/containers/SingleTeam/SingleTeam";

interface TeamPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TeamDetail({ params }: TeamPageProps) {
  const { slug } = await params;
  return (
    <>
      <Suspense>
        <SingleTeam slug={slug} />
      </Suspense>
      <Footer />
    </>
  );
}
