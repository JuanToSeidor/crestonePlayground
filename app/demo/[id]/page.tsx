import DemoClientPage from "./DemoClientPage";

export function generateStaticParams() {
  return [
    { id: "sales-dashboard" },
    { id: "saas-wizard" },
  ];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <DemoClientPage id={id} />;
}
