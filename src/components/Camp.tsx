import type { FC } from "react";

/* eslint-disable react/no-unescaped-entities */

const Camp: FC = () => {
  return (
    <section className="2xl:max-container relative flex flex-col py-10 lg:mb-10 lg:py-20 xl:mb-20">
      <div className="flex h-85 w-full items-start justify-start gap-8 lg:h-100 xl:h-160">
        <img
          src="/img/ABOUT_BG.webp"
          alt="yoga background"
          width={1440}
          height={580}
          loading="lazy"
          decoding="async"
          className="w-screen h-screen object-cover object-center 2xl:rounded-s-xl"
        />
      </div>

      <div className="flexEnd mt-2 px-4 lg:-mt-60 lg:mr-6">
        <div className="bg-yellow-200 p-12 lg:max-w-125 xl:max-w-183.5 xl:rounded-5xl xl:px-16 xl:py-20 relative w-full overflow-hidden rounded-3xl">
          <h2 className="text-2xl md:text-4xl 2xl:text-6xl font-bold capitalize text-black leading-snug">
            Feeling Lost? Transform Uncertainty into Spiritual Strength.
          </h2>
          <p className="text-lg md:text-xl xl:text-2xl mt-5 text-black leading-relaxed">
            The journey into the unknown often leaves the seeker in deep uncertainty. We are here to help you clear the fog and navigate life’s toughest trials through the sacred wisdom of Sri Vidya and Kaula Marga.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Camp;
