import { cookies } from "next/headers";

import CompensationTable from "@/components/CompensationTable";
import CompensationPassword from "@/components/CompensationPassword";

import {
  electronicsData,
  appliancesData,
  furnitureData,
} from "@/lib/compensation-data";

export default async function CompensationPage() {
  const cookieStore = await cookies();

  const hasAccess = cookieStore.get("compensation_access")?.value === "allowed";

  if (!hasAccess) {
    return <CompensationPassword />;
  }

  return (
    <main>
      <section id="electronics" className="scroll-mt-30">
        <CompensationTable
          title={electronicsData.title}
          subtitle={electronicsData.subtitle}
          categoryLink={electronicsData.categoryLink}
          sections={electronicsData.sections}
        />
      </section>

      <section id="appliances" className="scroll-mt-30">
        <CompensationTable
          title={appliancesData.title}
          subtitle={appliancesData.subtitle}
          categoryLink={appliancesData.categoryLink}
          sections={appliancesData.sections}
        />
      </section>

      <section id="furniture" className="scroll-mt-30">
        <CompensationTable
          title={furnitureData.title}
          subtitle={furnitureData.subtitle}
          categoryLink={furnitureData.categoryLink}
          sections={furnitureData.sections}
        />
      </section>
    </main>
  );
}
