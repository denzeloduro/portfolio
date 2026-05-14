"use client";

import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudySection from "@/components/case-study/CaseStudySection";
import CaseStudyTLDR from "@/components/case-study/CaseStudyTLDR";
import CaseStudyMedia from "@/components/case-study/CaseStudyMedia";
import CaseStudyFlow from "@/components/case-study/CaseStudyFlow";
import CaseStudyCallout from "@/components/case-study/CaseStudyCallout";
import CaseStudyTeam from "@/components/case-study/CaseStudyTeam";
import CaseStudyFooter from "@/components/case-study/CaseStudyFooter";
import { getProject } from "@/content/projects";

/**
 * Case study: Search in Accounts Center (Meta, 2022).
 *
 * Content scaffolded from the original "XFN review v1.0" deck. Each section
 * mirrors the deck's pacing (Context → Designs → Future explorations) but
 * adapts the slide-by-slide rhythm into a continuous narrative suited to
 * a portfolio reader. Visual placeholders mark spots where slide exports
 * or refined mocks should drop in.
 */
export default function SearchInAccountsCenterPage() {
  const project = getProject("search-in-accounts-center")!;

  return (
    <CaseStudyLayout>
      <CaseStudyHero
        title={project.title}
        subtitle={project.subtitle}
        meta={[
          { label: "Role", value: project.role },
          { label: "Company", value: project.company },
          { label: "Year", value: project.year },
          { label: "Surface", value: "iOS, Android, Web" },
        ]}
      />

      <div className="mt-[64px] md:mt-[100px]">
        <CaseStudyTLDR
          body="Centralized settings made it possible to manage shared controls across Meta's Family of Apps in one place — but findability suffered. I designed a search experience inside Accounts Center that makes any setting reachable in a few keystrokes, with breadcrumbs for context and graceful transitions across apps, web, and authentication boundaries."
        />
      </div>

      <CaseStudySection
        index="01"
        eyebrow="Context"
        title="A new home for shared settings, with a discovery problem."
      >
        <div className="space-y-[24px] md:space-y-[28px] max-w-[760px] text-[18px] md:text-[20px] leading-[1.6] text-foreground/85">
          <p>
            With the launch of Centralized settings in Accounts Center, people
            could now manage shared settings across the Family of Apps from
            one place. Looking for those settings, however, was time
            consuming. It needed to be easy — and ideally a little
            delightful — for someone to quickly find any setting they had in
            mind.
          </p>
          <p>
            Qualitative research showed that while participants understood
            the concept of Accounts Center, they did not have a clear mental
            model of which settings lived inside it — even after completing
            tasks within Accounts Center. Some of that was newness, but it
            also pointed to a real findability problem when relying on
            navigation alone.
          </p>
          <p>
            Compounding this, FX2 was launching with regressed settings
            (Wave 1) and a follow-up second wave (Wave 2) planned later. We
            had a clear opportunity to use search to soften the impact of
            that staggered rollout.
          </p>
        </div>

        <CaseStudyMedia
          alt="Wave 1 vs. Wave 2 settings rollout — the gap that motivated search."
          caption="Slide 9 of the deck. Wave 1 shipped with regressed settings; Wave 2 followed later. Search was an opportunity to make settings findable across both."
        />

        <CaseStudyCallout label="Goal">
          Allow people to find settings within Accounts Center by introducing
          search, improving findability across the Family of Apps.
        </CaseStudyCallout>

        <div className="mt-[40px] md:mt-[60px] grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[60px]">
          <CaseStudyTeam
            title="Core team"
            people={[
              { name: "Manola Gonzalez", role: "Content Design" },
              { name: "Jesse Kim", role: "Product Design" },
              { name: "Aaron Jacob Varghese", role: "Engineering" },
              { name: "Jennifer Robbins", role: "UX Research" },
              { name: "Allan Nartey", role: "Product Management" },
            ]}
          />
          <CaseStudyTeam
            title="Consulted"
            people={[
              { name: "Chuyan Zhu", role: "Data Science (FX)" },
              { name: "Lli Li", role: "Product Design — FB Privacy Settings" },
              { name: "Jeffrey Wang", role: "PM — Search" },
              { name: "Liam Breen", role: "Engineering — Privacy Experience" },
              { name: "FX Design Crit", role: "Critique partners" },
            ]}
          />
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="02"
        eyebrow="Designs"
        title="From a quiet header to a fast, contextual search."
        lead="The before/after sat side by side in review: a settings list with a static header, versus the same surface revealing a search affordance that morphs into a focused finding experience."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[32px]">
          <CaseStudyMedia
            alt="Accounts Center before search — current experience."
            caption="Before: the existing Accounts Center surface."
            ratio="square"
          />
          <CaseStudyMedia
            alt="Accounts Center with search — proposed experience."
            caption="After: search promoted into the header, with a dedicated search homepage on tap."
            ratio="square"
          />
        </div>

        <CaseStudyFlow
          label="Flow overview — search within Accounts Center"
          steps={[
            { label: "Entry point", caption: "Tap the search icon from any AC page." },
            { label: "Search homepage", caption: "Recent + recommended queries." },
            { label: "Search results", caption: "Live filtering as you type." },
            { label: "Page from result", caption: "Lands on the destination setting." },
          ]}
        />

        <div className="mt-[40px] md:mt-[60px]">
          <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[40px] leading-[1.1] text-foreground mb-[16px] md:mb-[24px]">
            Breadcrumbs give every result context
          </h3>
          <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.6] text-foreground/85">
            Search results use a breadcrumb where necessary so people know
            where a setting lives inside Accounts Center. Top-level pages
            stand alone; sub-pages surface their parent above the result so
            you understand where you'll land before tapping.
          </p>
          <CaseStudyMedia
            alt="Search results showing breadcrumbs above settings buried in sub-pages."
            caption="Breadcrumbs only appear when a setting lives below the top level, so the list stays light for the common case."
          />
        </div>

        <div className="mt-[40px] md:mt-[60px] space-y-[60px] md:space-y-[100px]">
          <div>
            <p
              className="text-[12px] uppercase tracking-[0.2em] mb-[12px]"
              style={{ color: "#FF6200" }}
            >
              Transition — within Accounts Center
            </p>
            <h3 className="font-[family-name:var(--font-clash-display)] text-[24px] md:text-[32px] leading-[1.15] text-foreground mb-[12px]">
              Inter-AC navigation
            </h3>
            <p className="max-w-[760px] text-[17px] md:text-[19px] leading-[1.55] text-foreground/85">
              When the destination lives inside Accounts Center, we keep the
              transition fully native — the settings load in place without
              ever bouncing the user out of the surface they searched from.
            </p>
            <CaseStudyFlow
              steps={[
                { label: "Entry point" },
                { label: "Search homepage" },
                { label: "Search results" },
                { label: "AC transition", caption: "In-place navigation." },
                { label: "Loaded page", caption: "Destination setting." },
              ]}
            />
          </div>

          <div>
            <p
              className="text-[12px] uppercase tracking-[0.2em] mb-[12px]"
              style={{ color: "#FF6200" }}
            >
              Transition — AC to web (single account)
            </p>
            <h3 className="font-[family-name:var(--font-clash-display)] text-[24px] md:text-[32px] leading-[1.15] text-foreground mb-[12px]">
              When a setting only exists on web
            </h3>
            <p className="max-w-[760px] text-[17px] md:text-[19px] leading-[1.55] text-foreground/85">
              Some settings still only exist on web. Search routes single-
              account users straight there with a transition state that
              communicates the handoff and preserves trust.
            </p>
            <CaseStudyFlow
              steps={[
                { label: "Entry point" },
                { label: "Search homepage" },
                { label: "Search results" },
                { label: "Transition to web" },
                { label: "Loaded web page" },
              ]}
            />
          </div>

          <div>
            <p
              className="text-[12px] uppercase tracking-[0.2em] mb-[12px]"
              style={{ color: "#FF6200" }}
            >
              Transition — AC to native app
            </p>
            <h3 className="font-[family-name:var(--font-clash-display)] text-[24px] md:text-[32px] leading-[1.15] text-foreground mb-[12px]">
              Crossing apps (e.g. AC IG → native FB)
            </h3>
            <p className="max-w-[760px] text-[17px] md:text-[19px] leading-[1.55] text-foreground/85">
              When the destination is in a sister app, we explicitly hand
              off into that app's native surface — never silently — so the
              context switch always reads as intentional.
            </p>
            <CaseStudyFlow
              steps={[
                { label: "Entry point" },
                { label: "Search homepage" },
                { label: "Search results" },
                { label: "Transition to FB app" },
                { label: "Loaded native page" },
              ]}
            />
          </div>

          <div>
            <p
              className="text-[12px] uppercase tracking-[0.2em] mb-[12px]"
              style={{ color: "#FF6200" }}
            >
              Edge case — auth or profile selection
            </p>
            <h3 className="font-[family-name:var(--font-clash-display)] text-[24px] md:text-[32px] leading-[1.15] text-foreground mb-[12px]">
              Search behind a wall
            </h3>
            <p className="max-w-[760px] text-[17px] md:text-[19px] leading-[1.55] text-foreground/85">
              Some destinations require an extra step — re-auth, or picking
              a specific profile/account. Search anticipates this and routes
              into the correct gate before landing on the page, so the
              user's intent isn't lost.
            </p>
            <CaseStudyFlow
              steps={[
                { label: "Entry point" },
                { label: "Search homepage" },
                { label: "Search results" },
                { label: "Login / selection" },
                { label: "Loaded page" },
              ]}
            />
          </div>

          <div>
            <p
              className="text-[12px] uppercase tracking-[0.2em] mb-[12px]"
              style={{ color: "#FF6200" }}
            >
              Edge case — no results
            </p>
            <h3 className="font-[family-name:var(--font-clash-display)] text-[24px] md:text-[32px] leading-[1.15] text-foreground mb-[12px]">
              When nothing matches
            </h3>
            <p className="max-w-[760px] text-[17px] md:text-[19px] leading-[1.55] text-foreground/85">
              Empty states explain why and offer a way forward — never a
              dead end.
            </p>
            <CaseStudyMedia
              alt="No results state for Accounts Center search."
              caption="Empty state used when no settings match the query."
            />
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[40px] leading-[1.1] text-foreground mb-[16px]">
              Desktop
            </h3>
            <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.55] text-foreground/85">
              The same model translates to desktop — the search affordance
              moves into the header, opens a focused homepage, and resolves
              to results in place.
            </p>
            <CaseStudyMedia
              alt="Desktop search entry point and homepage."
              caption="Desktop entry point and search homepage."
              ratio="wide"
            />
          </div>
        </div>

        <CaseStudyCallout label="Timeline">
          Targeted for FX2 fast-follows in Q1 2023, dependent on engineering
          bandwidth.
        </CaseStudyCallout>
      </CaseStudySection>

      <CaseStudySection
        index="03"
        eyebrow="Future explorations"
        title="Where this could go next."
        lead="Three threads we explored beyond v1 — each one extending search to be more aware, more forgiving, and more proactive."
      >
        <div className="space-y-[60px] md:space-y-[100px]">
          <div>
            <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[40px] leading-[1.1] text-foreground mb-[16px]">
              Accounts Center aware of app-level settings
            </h3>
            <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.55] text-foreground/85">
              Today, app settings search is partially aware of Accounts
              Center on iOS and Android in Facebook and Instagram. The
              inverse is the bigger unlock: letting people search for app
              settings <em>from inside</em> Accounts Center, so a single
              query covers both layers and saves a lot of pogo-sticking.
            </p>
            <CaseStudyMedia
              alt="Exploration: AC search surfacing IG and FB app-level settings."
              caption="Exploration mocks: AC search querying both AC and app-level settings."
            />
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[40px] leading-[1.1] text-foreground mb-[16px]">
              Fuzzy matching
            </h3>
            <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.55] text-foreground/85">
              Research showed people often start a search in IG/FB settings
              and abandon it — likely because the literal keyword they used
              didn't return anything. Fuzzy matching closes that gap: typing{" "}
              <span className="text-foreground">"credit card"</span> can
              still surface{" "}
              <span className="text-foreground">"Meta Pay"</span>, even
              though there's no direct word match. We were exploring this
              with UXR to validate the synonym set.
            </p>
            <CaseStudyMedia
              alt="Fuzzy matching example mapping 'credit card' to 'Meta Pay'."
              caption="Synonym matching example explored with UXR."
            />
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[40px] leading-[1.1] text-foreground mb-[16px]">
              Recommended searches on the search homepage
            </h3>
            <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.55] text-foreground/85">
              Pre-filled recommended queries make the homepage do more than
              wait for input. We could surface either personalized
              suggestions or globally common ones — especially for settings
              that quantitative data flagged as hard to find.
            </p>
            <CaseStudyMedia
              alt="Search homepage with recommended queries above the keyboard."
              caption="Recommended searches concept for the search homepage."
            />
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="04"
        eyebrow="Reflection"
        title="What I'd take with me."
      >
        <div className="space-y-[24px] max-w-[760px] text-[18px] md:text-[20px] leading-[1.6] text-foreground/85">
          <p>
            The most useful design decisions on this project weren't the
            visible ones — they were the transition states. Every time
            search crossed a boundary (apps, web, auth) I had to
            deliberately design the seam, because anything implicit eroded
            trust at exactly the moment people were trying to manage
            sensitive settings.
          </p>
          <p>
            Findability problems also rarely have a single answer. Search,
            navigation, breadcrumbs, fuzzy matching, and recommendations
            were all partial fixes for the same underlying mental-model
            gap. Treating them as a system — and shipping the highest-
            leverage one first — is what made this feel feasible inside FX2's
            tight launch windows.
          </p>
        </div>
      </CaseStudySection>

      <CaseStudyFooter />
    </CaseStudyLayout>
  );
}
