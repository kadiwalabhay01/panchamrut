import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { STORIES_INTRO, INITIAL_STORIES, StoryItem } from "@/lib/storyData";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Stories & Musings — Panchamrut Journal" },
      {
        name: "description",
        content:
          "Sacred ink on paper. Recording South Indian culinary wisdom, botanical diaries, and ancient recipes.",
      },
    ],
  }),
  component: StoriesPage,
});

export function StoriesPage() {
  // Array of stories: stories[0] is the currently featured big story,
  // and stories.slice(1) are the musings listed below.
  const [storiesList, setStoriesList] = useState<StoryItem[]>(INITIAL_STORIES);

  const featuredStory = storiesList[0];
  const remainingStories = storiesList.slice(1);

  // When a user clicks on any card from "The Latest Musings",
  // swap that story into the featured top position, and move the previously featured story down.
  const handleSelectStory = (clickedStoryId: string) => {
    setStoriesList((prev) => {
      const clickedIndex = prev.findIndex((s) => s.id === clickedStoryId);
      if (clickedIndex <= 0) return prev;

      const newOrder = [...prev];
      const [clickedStory] = newOrder.splice(clickedIndex, 1);
      // Place clicked story at index 0 (featured), push previous featured story into list
      newOrder.unshift(clickedStory);
      return newOrder;
    });

    // Smooth scroll up to featured story
    const featuredElem = document.getElementById("featured-story");
    if (featuredElem) {
      featuredElem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="">
      {/* ─── Header ─── */}
      <Header />
      <div className="bg-[#FBF9F4] text-[#895220] min-h-screen flex flex-col selection:bg-[#895220] selection:text-white">
        <main className="flex-1 py-10 sm:py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-10 sm:space-y-12 md:space-y-14">
            {/* ─── 1. Top Journal Narrative Section ─── */}
            <section className="space-y-6">

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#E4DCD0] bg-[#F5F1E8] text-[11px] font-medium uppercase tracking-[0.18em] text-[#7A6B58]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C86432]" />
                {STORIES_INTRO.eyebrow}
              </div>

              <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[58px] leading-[1.08] text-[#895220] font-normal tracking-tight max-w-2xl">
                    {STORIES_INTRO.title}
                  </h1>
                </div>

                <div className="lg:col-span-5 flex lg:justify-start pt-2 lg:pt-8">
                  <p className="text-xs sm:text-sm md:text-base leading-relaxed text-[#5C5245] max-w-sm">
                    {STORIES_INTRO.description}
                  </p>
                </div>
              </div>
            </section>

            {/* ─── 2. Featured Big Story Showcase ─── */}
            {featuredStory && (
              <section
                id="featured-story"
                className="scroll-mt-24 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-[#FAF7F0] border border-[#E9E1D4] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg"
              >
                {/* Left Column: Big Editorial Image */}
                <div className="lg:col-span-6">
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-xl sm:rounded-2xl overflow-hidden shadow-md border border-[#E0D7C9] group select-none">
                    <img
                      key={featuredStory.id}
                      src={featuredStory.image}
                      alt={featuredStory.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 animate-fadeIn"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Right Column: Editorial Copy */}
                <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
                  <div className="space-y-4">
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C86432] block">
                      {featuredStory.category}
                    </span>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.12] text-[#895220] font-normal tracking-tight">
                      {featuredStory.title}
                    </h2>

                    <p className="text-xs sm:text-sm md:text-base leading-relaxed text-[#5C5245]">
                      {featuredStory.excerpt}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* ─── 3. The Latest Musings (Clickable Grid Cards) ─── */}
            <section className="space-y-6 sm:space-y-8 pt-4">
              <div className="flex items-center justify-between border-b border-[#E9E4DB] pb-4">
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#895220] font-normal tracking-tight">
                  The Latest Musings
                </h3>

              </div>

              {/* 3-Column Story Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
                {remainingStories.map((story) => (
                  <article
                    key={story.id}
                    onClick={() => handleSelectStory(story.id)}
                    className="group relative flex flex-col justify-between bg-[#FAF7F0]/90 border border-[#E8E1D5] rounded-2xl overflow-hidden p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-[#D5C9B8] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                  >
                    <div className="space-y-4">
                      {/* Card Thumbnail Image */}
                      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[#E3DAD0]">
                        <img
                          src={story.image}
                          alt={story.imageAlt}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                      </div>

                      <div className="space-y-2">
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C86432] block">
                          {story.category}
                        </span>

                        <h4 className="font-display text-xl sm:text-2xl text-[#895220] font-normal leading-snug group-hover:text-[#5C3616] transition-colors">
                          {story.title}
                        </h4>

                        <p className="text-xs sm:text-[13px] leading-relaxed text-[#5C5245] line-clamp-3">
                          {story.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#EDE5DA] flex items-center justify-between text-xs text-[#7A6B58]">
                      <span className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#895220]">
                        Read more
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* ─── Footer ─── */}
      <Footer />
    </div>
  );
}
