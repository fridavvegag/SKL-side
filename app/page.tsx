import { LoadingExperience } from "@/components/loading/LoadingExperience";

export default function Home() {
  return (
    <>
      {/* Home placeholder: el Hero y las secciones aún no se construyen.
          El Loading se renderiza por encima y hace reveal hacia este contenido. */}
      <main aria-label="Home" />
      <LoadingExperience />
    </>
  );
}
