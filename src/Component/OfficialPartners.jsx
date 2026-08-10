import pickabooLogo from "../assets/pickaboo.png";
import darazLogo from "../assets/daraz.png";
import shareTripLogo from "../assets/share.png";
import motionLogo from "../assets/motion.jpg";
import cartupLogo from "../assets/cartup.png";
import appleGadgetsLogo from "../assets/apple.png";
import Container from "./Container";

const PARTNERS = [
  { id: 1, name: "Pickaboo", logo: pickabooLogo },
  { id: 2, name: "Daraz", logo: darazLogo },
  { id: 3, name: "ShareTrip", logo: shareTripLogo },
  { id: 4, name: "Motion", logo: motionLogo },
  { id: 5, name: "Cartup", logo: cartupLogo },
  { id: 6, name: "Apple Gadgets", logo: appleGadgetsLogo },
];

export default function OfficialPartners() {
  // Duplicate the list so the marquee can loop seamlessly.
  const loopItems = [...PARTNERS, ...PARTNERS];

  return (
    <>
        <section className=" mx-auto max-w-7xl overflow-hidden px-2 py-12 sm:px-6 lg:px-10">
          <h2 className="mb-6 text-2xl">
            Official <span className="font-extrabold">Partners</span>
          </h2>

          <div className="relative overflow-hidden">
            {/* fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

            <div className="flex w-max animate-marquee gap-16">
              {loopItems.map((partner, i) => (
                <div
                  key={`${partner.id}-${i}`}
                  className="flex h-16 shrink-0 items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-10 w-auto object-contain transition-transform duration-300 ease-out hover:scale-125 sm:h-12"
                  />
                </div>
              ))}
            </div>
          </div>

          <style>{`
         @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 12s linear infinite;
        }
      `}</style>
        </section>
    </>
  );
}
