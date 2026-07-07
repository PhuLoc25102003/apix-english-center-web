import { redirect } from "next/navigation";
export default async function LegacyStudentVideosPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; redirect(`/students/${id}/video-deliveries`); }
