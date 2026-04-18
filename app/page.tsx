import Hero from "@/components/Hero";
import Info from "@/components/Info";
import Timeline from "@/components/Timeline";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";
import { getParticipantCount } from "./actions";

export const revalidate = 0;

export default async function HomePage() {
  const initialCount = await getParticipantCount();

  return (
    <main className="relative">
      <Hero initialCount={initialCount} />
      <Info />
      <Timeline />
      <RegistrationForm />
      <Footer />
    </main>
  );
}
