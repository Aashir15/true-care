export const metadata = {
  title: "Protection Categories | TruCare",
  description:
    "Explore TruCare protection categories for appliances, electronics, furniture, and mattresses.",
};

const categories = [
  {
    eyebrow: "Electronics protection",
    title: "Electronics",
    description:
      "Parts and labor when a product fails even when it's out of your control, like a power surge or an accident. Service is available where your customer lives.",
    features: [
      "Mechanical & electrical failures",
      "Power surge",
      "Accidental damage, including cracked screens",
      "Replacement plans available",
      "No deductibles or hidden costs",
      "Carry-in, depot or in-home repair",
    ],
    products: [
      "Audio Components",
      "Audio system",
      "Camcorder",
      "Camera",
      "Cellular Phone",
      "Computer",
      "DJ System",
      "DVD Player",
      "Game System",
      "Home Theatre",
      "Laptop",
      "Notebooks",
      "Portable Cas",
      "Portable CD",
      "Projector TV",
      "Rack System",
      "Soundbar",
      "Speaker",
      "Stereo System",
      "Tablet",
      "Telephone",
      "TV",
      "Typewriter",
      "VCR",
      "Video Game",
    ],
  },
  {
    eyebrow: "Appliance protection",
    title: "Appliances",
    description:
      "Covers mechanical and electrical failures from normal use, including failures caused by a power surge plus accidental damage.",
    features: [
      "Mechanical & electrical breakdowns",
      "Power surge",
      "Accidental damage",
      "Food spoilage from a covered failure",
      "In-home service",
      "No Lemon guarantee",
    ],
    products: [
      "Air Conditioner",
      "Air Fryer",
      "Blender",
      "Coffee Maker",
      "Cooktop- Electric",
      "Cooktop- Gas",
      "Cooktop- Induction",
      "Dishwasher",
      "Dryer",
      "Freezer",
      "Heater",
      "Ice Maker",
      "Microwave",
      "Microwave- Built in",
      "Mixer",
      "OTR Microwave",
      "Range- Electric",
      "Range- Gas",
      "Refrigerator",
      "Sewing Machine",
      "Vacuum Cleaner",
      "Wall Oven",
      "Washer",
      "Wine Cooler",
    ],
  },
  {
    eyebrow: "Furniture protection",
    title: "Furniture",
    description:
      "Accidental stains, rips, tears and breakage on fabric, leather and wood, plus structural and mechanism failures on motion furniture.",
    features: [
      "Food, beverage and pet stains",
      "Rips, tears, cuts and punctures",
      "Broken frames, legs and mechanisms",
      "Heat marks and water rings",
      "Recliner and lift-chair motors",
      "Wood scratches, gouges and chips",
    ],
    products: [
      "Accent Chair",
      "Adjustable Base",
      "Bar",
      "Bar Stool",
      "Bed- Footboard",
      "Bed- Frame",
      "Bed- Headboard",
      "Bed- Rails",
      "Bed- Slats",
      "Bedroom Set",
      "Bench",
      "Box Spring",
      "Buffet/ Server",
      "Bunkie Board",
      "Chest",
      "Coffee Table",
      "Desk",
      "Dining Room- Chair",
      "Dining Room- Table",
      "Dining Room- Table Base",
      "Dining Server/ Buffet",
      "Dresser",
      "Dresser W/ Mirror",
      "End Table",
      "Entertainment Center",
      "Glass Table Tops",
      "Hutch",
      "Lamp",
      "Lift Chair",
      "Living Room Chair",
      "Living Room Set/ Kit",
      "Living Room Table Set",
      "Loveseat",
      "Massage Chair",
      "Mirror",
      "Nightstand",
      "Reclining Chair",
      "Reclining Loveseat",
      "Reclining Sofa",
      "Rocker Recliner",
      "Shelf",
      "Small Office",
      "Sofa",
      "Sofa Bed",
      "Sofa Console",
      "Stool",
      "Table",
      "Table- Base",
      "Table- Leafe",
      "Table- Legs",
      "Table- Stand",
      "Table- Top",
      "Trundle Bed",
      "TV Stand",
      "Youth Bed",
    ],
  },
  {
    eyebrow: "Mattress protection",
    title: "Mattresses",
    description:
      "Stains and accidental damage on mattresses, plus loss of support and spring damage.",
    features: [
      "Stains and bodily fluids",
      "Rips, tears and punctures",
      "Spring damage",
      "Loss of resiliency",
    ],
    products: [
      "Mattress- King",
      "Mattress- Queen",
      "Mattress- Twin",
      "Water Bed",
    ],
  },
];

const planTerms = ["1 year", "2 years", "3 years", "4 years", "5 years"];

export default function CategoriesPage() {
  return (
    <main className="bg-(--bg-color)">
      {/* Categories */}
      <section className="px-5 py-16 md:px-8 md:pb-24">
        <div className="mx-auto grid max-w-300 gap-6">
          {categories.map((category) => (
            <article
              key={category.title}
              className="flex flex-col rounded-[18px] border border-[#e4dfdc] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-(--primary-color)">
                {category.eyebrow}
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-[#222] md:text-3xl">
                {category.title}
              </h2>

              <p className="mt-4 text-lg leading-7">{category.description}</p>

              <ul className="mt-6 grid gap-x-10 gap-y-3 md:grid-cols-2">
                {category.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-lg text-[#333]"
                  >
                    <span className="mt-[7px] size-2 shrink-0 rounded-full bg-(--primary-color)" />

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-[#e8e3e0] pt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[#333]">
                  Eligible products
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {category.products.map((product) => (
                    <span
                      key={product}
                      className="rounded-full border border-[#e3ddda] bg-[#faf8f7] px-3 py-1 text-md text-[#555]"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Plan Terms */}
      <section className="border-t border-[#e4dfdc] bg-white px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1000px] text-center">
          <h2 className="text-2xl font-semibold text-[#222] md:text-3xl">
            Plan terms
          </h2>

          <p className="mx-auto mt-4 max-w-[760px] text-lg leading-7">
            Every category is available in these terms. Your plan does not
            replace the manufacturer&apos;s warranty it extends and adds to it.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {planTerms.map((term) => (
              <span
                key={term}
                className="rounded-full bg-(--primary-color) px-5 py-1 text-md font-semibold text-white"
              >
                {term}
              </span>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-[820px] text-md leading-6 text-[#202020]">
            Coverage is subject to the terms and conditions of your plan. Damage
            from abuse, moving outside the home, or acts of nature such as
            flood, fire or theft is not covered.
          </p>
        </div>
      </section>
    </main>
  );
}
