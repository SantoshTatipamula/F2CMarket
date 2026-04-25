import heroImg from "../../../assets/images/farmer.webp";

import FloatingBadge from "./FloatingBadge";

export default function HeroVisual() {
  return (
    <div className="relative flex justify-center items-center">

      {/* Glow */}
      <div className="absolute w-[320px] h-[420px] rounded-full bg-[radial-gradient(circle,_rgba(22,163,74,0.22)_0%,_rgba(132,204,22,0.16)_35%,_rgba(245,158,11,0.12)_65%,_transparent_80%)] blur-3xl"></div>

      {/* Hero Image */}
      <div className="relative z-10">
        <img
          src={heroImg}
          alt="Fresh Products"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>

      {/* Floating Cards */}
      <FloatingBadge
        title="Today's Offer"
        value="Up to 30% Off"
        className="top-10 left-0"
      />

      <FloatingBadge
        title="Trusted Farmers"
        value="500+ Sellers"
        className="bottom-10 right-0"
        delay={1}
      />

    </div>
  );
}