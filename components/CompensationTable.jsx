export default function CompensationTable({ title, subtitle, sections }) {
  return (
    <main className=" px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-300">
        <div className="mb-7 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#777]">
            Protect yourself with &quot;Tru Life&quot; Experiences
          </p>

          <h1 className="mt-2 text-2xl font-bold text-[#111] md:text-3xl">
            {title}
          </h1>

          <p className="mt-2 text-md font-medium text-[#444]">{subtitle}</p>
        </div>

        <div className="space-y-7">
          {sections.map((section) => (
            <section
              key={section.title}
              className="overflow-hidden border border-black bg-white"
            >
              <div className="bg-[#d9d9d9] px-3 py-2 text-center text-sm font-bold text-black">
                {section.title}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-230 border-collapse text-md">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="border border-[#555] px-2 py-2">
                        {section.category}
                      </th>

                      <th className="border border-[#555] px-2 py-2">Term</th>

                      <th className="border border-[#555] px-2 py-2">
                        Min. Coverage
                      </th>

                      <th className="border border-[#555] px-2 py-2">
                        Max. Coverage
                      </th>

                      <th className="border border-[#555] px-2 py-2">
                        TC - Master Cost
                      </th>

                      <th className="border border-[#555] px-2 py-2">
                        TC - Dealer Cost
                      </th>

                      <th className="border border-[#555] px-2 py-2">
                        Store Suggested Retail Price
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {section.rows.map((row, index) => (
                      <tr key={index}>
                        <td className="border border-[#777] px-2 py-1.5 text-center">
                          {section.category}
                        </td>

                        <td className="border border-[#777] px-2 py-1.5 text-center">
                          {row.term}
                        </td>

                        <td className="border border-[#777] px-2 py-1.5 text-center">
                          {row.min}
                        </td>

                        <td className="border border-[#777] px-2 py-1.5 text-center">
                          {row.max}
                        </td>

                        <td className="border border-[#777] bg-[#fff200] px-2 py-1.5 text-center font-semibold">
                          {row.master}
                        </td>

                        <td className="border border-[#777] bg-[#b7e4c7] px-2 py-1.5 text-center font-semibold">
                          {row.dealer}
                        </td>

                        <td className="border border-[#777] bg-[#e6c3e6] px-2 py-1.5 text-center">
                          {row.retail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
