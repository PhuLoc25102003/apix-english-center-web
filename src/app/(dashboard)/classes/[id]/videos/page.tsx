import { redirect } from "next/navigation";
export default async function LegacyClassVideosPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; redirect(`/classes/${id}/video-deliveries`); }
