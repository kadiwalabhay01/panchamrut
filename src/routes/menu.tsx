import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MENU_INTRO, MENU_CHAPTERS, MenuChapter } from "@/lib/menuData";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Panchamrut Sanctuary" },
      {
        name: "description",
        content:
          "Sacred ingredients. Quietly perfected over generations. Explore our five chapter-by-chapter culinary offerings.",
      },
    ],
  }),
  component: MenuPage,
});

export function MenuPage() {
  // Store the active image and dish ID for each chapter
  const [chapterSelections, setChapterSelections] = useState<
    Record<string, { image: string; dishId: string; dishName: string; tag?: string }>
  >(() => {
    const initial: Record<
      string,
      { image: string; dishId: string; dishName: string; tag?: string }
    > = {};
    MENU_CHAPTERS.forEach((c) => {
      const firstItem = c.items[0];
      initial[c.id] = {
        image: firstItem?.image || c.image,
        dishId: firstItem?.id || "",
        dishName: firstItem?.name || c.title,
        tag: firstItem?.tag,
      };
    });
    return initial;
  });

  const handleSelectDish = (
    chapterId: string,
    dishId: string,
    dishName: string,
    image?: string,
    tag?: string
  ) => {
    setChapterSelections((prev) => ({
      ...prev,
      [chapterId]: {
        image: image || prev[chapterId]?.image || "",
        dishId,
        dishName,
        tag,
      },
    }));
  };

  return (
    <div className="">
      {/* ─── Header ─── */}
      <Header />
      <div className="bg-[#FBF9F4] text-[#895220] min-h-screen flex flex-col selection:bg-[#895220] selection:text-white">
        <main className="flex-1 py-10 sm:py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-10 sm:space-y-12 md:space-y-16">
            {/* ─── 1. Top Narrative Section ─── */}
            <section className="space-y-6">
              <div className="space-y-4 sm:space-y-5">
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C86432]">
                  {MENU_INTRO.eyebrow}
                </span>

                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[58px] leading-[1.08] text-[#895220] font-normal tracking-tight max-w-2xl">
                  {MENU_INTRO.title}
                </h1>

                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-[#5C5245] max-w-5xl">
                  {MENU_INTRO.description}
                </p>
              </div>
            </section>

            {/* ─── 2. All Chapters with Direct Interactive Image & Cards ─── */}
            <div className="space-y-10 sm:space-y-12 md:space-y-16">
              {MENU_CHAPTERS.map((chapter) => {
                const currentSelection = chapterSelections[chapter.id] || {
                  image: chapter.image,
                  dishId: chapter.items[0]?.id || "",
                  dishName: chapter.items[0]?.name || chapter.title,
                  tag: chapter.items[0]?.tag,
                };

                return (
                  <section
                    key={chapter.id}
                    id={`chapter-${chapter.id}`}
                    className="scroll-mt-24 space-y-6 sm:space-y-8"
                  >
                    {/* Chapter Dedicated Image Banner (Changes dynamically when card is clicked) */}
                    <div className="relative w-full aspect-[16/8] sm:aspect-[21/8] md:aspect-[2.8/1] rounded-xl overflow-hidden shadow-xl border border-[#E9E4DB] group select-none transition-all duration-700">
                      <img
                        key={currentSelection.image + currentSelection.dishId}
                        src={currentSelection.image}
                        alt={currentSelection.dishName}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 animate-fadeIn"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

                      {/* Floating Caption over Chapter Image */}
                      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white pointer-events-none max-w-lg">
                        <p className="font-display text-xl sm:text-2xl md:text-3xl text-white font-normal">
                          {currentSelection.dishName}
                        </p>
                      </div>
                    </div>

                    {/* Chapter Heading */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E9E4DB] pb-4">
                      <h2 className="font-display text-2xl sm:text-3xl lg:text-5xl text-[#895220] font-normal tracking-tight">
                        {chapter.title}
                      </h2>
                    </div>

                    {/* 2-Column Menu Items Grid with Clickable Cards */}
                    <div className="grid md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
                      {chapter.items.map((item) => {
                        const isItemActive = currentSelection.dishId === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() =>
                              handleSelectDish(
                                chapter.id,
                                item.id,
                                item.name,
                                item.image || chapter.image,
                                item.tag
                              )
                            }
                            className={`relative flex flex-col justify-between p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer ${isItemActive
                              ? "bg-[#F3EDE2] border-[#895220] shadow-md -translate-y-1 ring-.5 ring-[#895220]/40"
                              : "bg-[#FAF7F0]/80 border-[#E8E1D5] hover:bg-[#F5EFE5] hover:border-[#D5C9B8] hover:shadow-md"
                              }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1">
                                {item.tag && (
                                  <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#C86432] block">
                                    {item.tag}
                                  </span>
                                )}
                                <h3 className="font-display text-xl sm:text-2xl md:text-[26px] text-[#895220] font-normal tracking-wide">
                                  {item.name}
                                </h3>
                              </div>

                              <span className="font-display text-xl sm:text-2xl font-medium text-[#895220] shrink-0 pt-0.5">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </main>
      </div>
      {/* ─── Footer ─── */}
      <Footer />
    </div>
  );
}
