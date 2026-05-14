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
 * Case study: Login on Instagram — AYMH Improvements (Meta, 2026).
 *
 * Content scaffolded from the AYMH-tappability design review deck. Slides
 * are numbered in the deck and that numbering drives the chronological
 * narrative below: cover → TL;DR → context & data → control flows →
 * proposed designs (abandonment then overcrowding) → reflection.
 */
export default function LoginOnInstagramPage() {
  const project = getProject("login-on-instagram")!;
  const slide = (n: number) =>
    `/case-studies/login-on-instagram/slide-${String(n).padStart(2, "0")}.png`;

  return (
    <CaseStudyLayout>
      {/* Slide 1 — Cover */}
      <CaseStudyHero
        eyebrow="Case study · Core Growth Design"
        title={project.title}
        subtitle={project.subtitle}
        meta={[
          { label: "Role", value: project.role },
          { label: "Company", value: project.company },
          { label: "Year", value: project.year },
          { label: "Workstream", value: "MAA ID Growth" },
        ]}
      />

      <div className="mt-[40px] md:mt-[60px]">
        <CaseStudyMedia
          src={slide(1)}
          alt="AYMH Improvements cover slide — Christy Song's profile in the AYMH login screen and a multi-account list view."
          caption="Cover slide. AYMH (Accounts You May Have) is the screen people land on when they open Instagram or Facebook unauthenticated."
          ratio="wide"
        />
      </div>

      {/* Slide 2 — TL;DR */}
      <div className="mt-[64px] md:mt-[100px]">
        <CaseStudyTLDR
          body="Data and UXR surfaced a series of opportunities to make AYMH — the front door to login — easier to act on. I partnered with Annika Olives on a slate of experiments aimed at two stubborn problems: people abandoning the screen, and people getting lost when too many accounts are shown. This is the thinking behind that slate."
        />
      </div>

      {/* Slides 3–9 — Context */}
      <CaseStudySection
        index="01"
        eyebrow="Context"
        title="AYMH is the front door to login. What happens here matters."
        lead="Across Facebook and Instagram, more devices land on AYMH every day than on most product surfaces. Tiny rate changes here translate into a lot of people."
      >
        <CaseStudyMedia
          src={slide(3)}
          alt="AYMH usage stats — 123M devices/day, 95M FB native, 28M IG native, 30% see one account, 70% see multiple."
          caption="Slide 3. Volume and a key split: most people seeing AYMH actually see more than one account."
        />

        <CaseStudyMedia
          src={slide(4)}
          alt="The four AYMH variants today: Single AYMH on Facebook and Instagram, and Multi AYMH on Facebook and Instagram."
          caption="Slide 4. Four variants ship today: single vs. multi account, on Facebook and Instagram. Each one had to hold up to the same proposals."
        />

        <CaseStudyCallout label="Two problems">
          Two problem areas were limiting AYMH login success: <strong>abandonment</strong>{" "}
          (users seeing accounts but leaving the flow) and{" "}
          <strong>overcrowding</strong> (too many accounts making it hard to find the
          right one).
        </CaseStudyCallout>

        <div className="mt-[40px] md:mt-[60px]">
          <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[40px] leading-[1.1] text-foreground mb-[16px] md:mb-[24px]">
            Abandonment, by the numbers
          </h3>
          <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.6] text-foreground/85">
            Three signals stood out. A meaningful slice of people simply{" "}
            <em>do nothing</em> on the page. Single-AYMH abandonment is much
            higher than multi-AYMH abandonment — the same content, two very
            different conversion shapes. And a steady stream of users bypass
            AYMH entirely to enter manual login, often into an account that
            was already on the screen.
          </p>
          <CaseStudyMedia
            src={slide(6)}
            alt="Abandonment data: 9%/5% no-action; 16%/12% single AYMH abandonment vs 4%/3% multi; 12%/14% manual login leakage."
            caption="Slide 6. The single-AYMH gap was the loudest signal — roughly 4× higher abandonment than multi-AYMH on both apps."
          />
        </div>

        <div className="mt-[40px] md:mt-[60px]">
          <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[40px] leading-[1.1] text-foreground mb-[16px] md:mb-[24px]">
            Overcrowding, by the numbers
          </h3>
          <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.6] text-foreground/85">
            Most AYMH visitors see more than one account, and half of those
            see three or more. A third of the loaded accounts go untouched
            for a month. And when frequent visitors do leave for manual
            login, most end up logging into an account that was{" "}
            <em>already on the AYMH screen</em>. That last insight reframed
            the problem: people aren&apos;t bypassing AYMH because we
            don&apos;t have their account — they&apos;re bypassing it
            because they can&apos;t tell which row is theirs.
          </p>
          <CaseStudyMedia
            src={slide(8)}
            alt="Overcrowding data: 70% see multiple accounts (half see 3+); 1/3 of accounts never clicked; 75%/57% of manual logins are redundant."
            caption="Slide 8. Most of the manual-login leakage is redundant — the right account was on AYMH the whole time."
          />
        </div>

        <div className="mt-[60px] md:mt-[80px] grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[32px]">
          <div
            className="rounded-[24px] md:rounded-[32px] p-[24px] md:p-[32px]"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
            }}
          >
            <p
              className="text-[12px] uppercase tracking-[0.22em] mb-[12px]"
              style={{ color: "#FF6200" }}
            >
              How might we — Abandonment
            </p>
            <ul className="space-y-[12px] text-[18px] md:text-[20px] leading-[1.45] text-foreground">
              <li>01 · Reduce the single-AYMH abandonment rate.</li>
              <li>02 · Explore more seamless identity offers for users who bypass AYMH.</li>
            </ul>
          </div>
          <div
            className="rounded-[24px] md:rounded-[32px] p-[24px] md:p-[32px]"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
            }}
          >
            <p
              className="text-[12px] uppercase tracking-[0.22em] mb-[12px]"
              style={{ color: "#FF6200" }}
            >
              How might we — Overcrowding
            </p>
            <ul className="space-y-[12px] text-[18px] md:text-[20px] leading-[1.45] text-foreground">
              <li>01 · Reduce distractions on the AYMH page.</li>
              <li>02 · Help users differentiate between accounts and quickly identify the right one.</li>
            </ul>
          </div>
        </div>

        <div className="mt-[60px] md:mt-[80px] grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[60px]">
          <CaseStudyTeam
            title="Core team"
            people={[
              { name: "Denzel Oduro", role: "Product Design (lead)" },
              { name: "Annika Olives", role: "Product Design" },
              { name: "Core Growth Design", role: "Design org" },
            ]}
          />
          <CaseStudyTeam
            title="Partnered with"
            people={[
              { name: "ID Engineering", role: "Implementation" },
              { name: "MAA ID Growth", role: "Workstream" },
              { name: "UXR & Data Science", role: "Insights" },
            ]}
          />
        </div>
      </CaseStudySection>

      {/* Slides 10–15 — Control */}
      <CaseStudySection
        index="02"
        eyebrow="Control"
        title="The flows we're testing against."
        lead="Before proposing anything new, I mapped the four flows that already define AYMH today. Every variant in the deck had to make sense against this baseline — not just the happy path."
      >
        <CaseStudyMedia
          src={slide(11)}
          alt="The four control AYMH variants — single and multi on FB and IG."
          caption="Slide 11. The control set — single and multi AYMH on both apps."
        />

        <div className="mt-[40px] md:mt-[60px]">
          <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[36px] leading-[1.15] text-foreground mb-[12px]">
            One-tap success
          </h3>
          <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.55] text-foreground/85">
            When credentials are still valid, AYMH is essentially a single
            tap into Feed — the experience we&apos;re trying to protect.
          </p>
          <CaseStudyMedia
            src={slide(12)}
            alt="One-tap AYMH success: tap the suggested profile and land directly in Feed."
            caption="Slide 12. The success path — Continue → Feed."
          />
          <CaseStudyFlow
            label="Flow — one-tap success"
            steps={[
              { label: "AYMH", caption: "Single profile shown." },
              { label: "Continue", caption: "Tap the suggested account." },
              { label: "Feed", caption: "Logged in." },
            ]}
          />
        </div>

        <div className="mt-[40px] md:mt-[60px]">
          <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[36px] leading-[1.15] text-foreground mb-[12px]">
            One-tap failure → LARA
          </h3>
          <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.55] text-foreground/85">
            When tokens expire, the same tap drops people into LARA — the
            login-assisted recovery flow — for password, email, or SMS
            re-auth. Most variants in this case study have to play nicely
            with this fork.
          </p>
          <CaseStudyMedia
            src={slide(13)}
            alt="One-tap failure flow: AYMH → LARA password → email code → SMS code."
            caption="Slide 13. The failure fork — LARA branches into password, email code, or SMS code."
          />
          <CaseStudyFlow
            label="Flow — one-tap failure"
            steps={[
              { label: "AYMH" },
              { label: "Continue" },
              { label: "LARA — password" },
              { label: "LARA — email / SMS", caption: "Backup options." },
              { label: "Feed" },
            ]}
          />
        </div>

        <div className="mt-[40px] md:mt-[60px]">
          <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[36px] leading-[1.15] text-foreground mb-[12px]">
            AYMH deletion (today)
          </h3>
          <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.55] text-foreground/85">
            Removing an account today takes four steps and ends in a hard
            jump to manual login. We come back to this flow under
            Overcrowding.
          </p>
          <CaseStudyMedia
            src={slide(14)}
            alt="Current deletion flow: kebab → Remove profiles list → confirmation dialog → manual login with toast."
            caption="Slide 14. Current deletion: a four-step path that ends outside AYMH."
          />
        </div>

        <div className="mt-[40px] md:mt-[60px]">
          <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[36px] leading-[1.15] text-foreground mb-[12px]">
            AYMH-sourced login
          </h3>
          <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.55] text-foreground/85">
            &ldquo;Use another profile&rdquo; routes people to the manual login screen
            where two later experiments live: type-ahead login on the email
            field, and surfacing AYMH accounts in the Forgot password
            (account recovery) flow.
          </p>
          <CaseStudyMedia
            src={slide(15)}
            alt="Annotated AYMH-sourced login screen showing where login and AR experiments would live."
            caption="Slide 15. The two AYMH-sourced surfaces we'd target — manual login and account recovery."
          />
        </div>
      </CaseStudySection>

      {/* Slides 16–25 — Designs: Abandonment */}
      <CaseStudySection
        index="03"
        eyebrow="Designs · Abandonment"
        title="Make the screen feel actionable, and meet people on the path they pick."
        lead="Two HMWs sat under abandonment. One pushed on the AYMH page itself; the other followed people who chose to bypass it."
      >
        <div className="mt-[20px] md:mt-[40px]">
          <p
            className="text-[12px] uppercase tracking-[0.22em] mb-[12px]"
            style={{ color: "#FF6200" }}
          >
            Exploration · single AYMH redesign
          </p>
          <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[40px] leading-[1.1] text-foreground mb-[16px]">
            Treat single AYMH like multi AYMH.
          </h3>
          <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.55] text-foreground/85">
            The hypothesis: list cells read as more actionable than a large
            centered profile photo with a Continue button. Single-AYMH and
            multi-AYMH have very different abandonment rates today, and
            they also have very different visual structure. Aligning them
            could explain — and reduce — the gap. We ran a similar test in
            2023 with neutral / negative results, but the surface has had
            real upgrades since, so it&apos;s worth re-testing.
          </p>
          <CaseStudyMedia
            src={slide(18)}
            alt="Proposed single AYMH redesign on Instagram and Facebook using the multi-AYMH list cell pattern."
            caption="Slide 18. The proposed single-AYMH treatment — same content, list-cell affordance."
          />
        </div>

        <div className="mt-[60px] md:mt-[100px]">
          <p
            className="text-[12px] uppercase tracking-[0.22em] mb-[12px]"
            style={{ color: "#FF6200" }}
          >
            Exploration 1 · type-ahead in login
          </p>
          <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[40px] leading-[1.1] text-foreground mb-[16px]">
            If someone leaves for manual login, meet them there.
          </h3>
          <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.55] text-foreground/85">
            When users enter manual login from AYMH and start typing a
            credential point that already exists on AYMH, we surface that
            profile inline as a typeahead suggestion. Three input modes
            (email, mobile, username) all hit the same recall.
          </p>
          <CaseStudyMedia
            src={slide(20)}
            alt="Type-ahead login concept across three input modes: email, mobile number, username."
            caption="Slide 20. Type-ahead login across email, mobile, and username inputs."
          />
          <CaseStudyMedia
            src={slide(21)}
            alt="Full type-ahead login flow: multi AYMH → manual login → typeahead suggestion → email auto-fills."
            caption="Slide 21. Full flow — the AYMH-sourced credential is restored without a re-entry."
          />
          <CaseStudyFlow
            label="Flow — type-ahead login"
            steps={[
              { label: "AYMH (multi)" },
              { label: "Use another profile" },
              { label: "Manual login", caption: "Type a CP or username." },
              { label: "Type-ahead", caption: "AYMH match surfaces." },
              { label: "Auto-filled login", caption: "Restored credential." },
            ]}
          />
        </div>

        <div className="mt-[60px] md:mt-[100px]">
          <p
            className="text-[12px] uppercase tracking-[0.22em] mb-[12px]"
            style={{ color: "#FF6200" }}
          >
            Exploration 2 · type-ahead in account recovery
          </p>
          <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[40px] leading-[1.1] text-foreground mb-[16px]">
            The same recall pattern, on Forgot password.
          </h3>
          <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.55] text-foreground/85">
            When users enter the Forgot password flow from AYMH and type a
            CP or username that was already on AYMH, we surface the
            matching profile in a typeahead — on email and mobile number
            entry alike.
          </p>
          <CaseStudyMedia
            src={slide(22)}
            alt="Type-ahead AR concept on email and mobile number entry."
            caption="Slide 22. Type-ahead AR — same idea, applied to Find your account."
          />
          <CaseStudyMedia
            src={slide(23)}
            alt="Full type-ahead AR flow: multi AYMH → Forgot password? → Find your account → typeahead → WhatsApp code → Feed."
            caption="Slide 23. Full flow — AR can resolve straight to a code-delivery channel and into Feed."
          />
        </div>

        <div className="mt-[60px] md:mt-[100px]">
          <p
            className="text-[12px] uppercase tracking-[0.22em] mb-[12px]"
            style={{ color: "#FF6200" }}
          >
            Exploration 3 · recent logins on AR
          </p>
          <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[40px] leading-[1.1] text-foreground mb-[16px]">
            Surface AYMH accounts <em>before</em> the user types.
          </h3>
          <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.55] text-foreground/85">
            On the AR Find-your-account screen, show AYMH-sourced profiles
            as a &ldquo;Recent logins&rdquo; section by default. Typeahead handles the
            rest of the long tail; this gets the highest-intent users one
            tap away.
          </p>
          <CaseStudyMedia
            src={slide(24)}
            alt="Recent logins section on the AR Find-your-account screen, in resting and focused states."
            caption="Slide 24. Recent logins on AR — visible before any input."
          />
          <CaseStudyMedia
            src={slide(25)}
            alt="Full AR flow with Recent logins: multi AYMH → Forgot password? → Find your account with Recent logins → WhatsApp code → Feed."
            caption="Slide 25. Recent logins fits cleanly into the existing AR-to-Feed flow."
          />
        </div>
      </CaseStudySection>

      {/* Slides 26–31 — Designs: Overcrowding */}
      <CaseStudySection
        index="04"
        eyebrow="Designs · Overcrowding"
        title="Less to scan, easier to choose."
        lead="The second HMW pair attacked the page itself: removing rows people don't want to see, and making the rows that remain easier to differentiate."
      >
        <CaseStudyMedia
          src={slide(27)}
          alt="The current four-step deletion flow — kebab, profile sheet, list with Remove buttons, confirmation, manual login + toast."
          caption="Slide 27. The control deletion path — four steps and an exit."
        />

        <div className="mt-[40px] md:mt-[60px]">
          <p
            className="text-[12px] uppercase tracking-[0.22em] mb-[12px]"
            style={{ color: "#FF6200" }}
          >
            Exploration 1 · optimized deletion
          </p>
          <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[40px] leading-[1.1] text-foreground mb-[16px]">
            From four steps to two, with Undo.
          </h3>
          <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.55] text-foreground/85">
            Data shows people are actively using deletion to clean up
            AYMH. Making it lighter directly reduces the visual clutter
            users complained about — and replacing the destructive
            confirmation with a toast + Undo keeps it safe.
          </p>
          <CaseStudyMedia
            src={slide(28)}
            alt="Optimized deletion flow — kebab opens the Remove list directly, then a toast with Undo."
            caption="Slide 28. Two steps: open the list, remove. Undo replaces the modal."
          />
          <CaseStudyFlow
            label="Flow — optimized deletion"
            steps={[
              { label: "AYMH", caption: "Tap kebab." },
              { label: "Remove list" },
              { label: "Tap Remove" },
              { label: "Toast + Undo", caption: "Reversible." },
            ]}
          />
        </div>

        <div className="mt-[60px] md:mt-[100px]">
          <p
            className="text-[12px] uppercase tracking-[0.22em] mb-[12px]"
            style={{ color: "#FF6200" }}
          >
            Exploration 2 · inline deletion
          </p>
          <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[40px] leading-[1.1] text-foreground mb-[16px]">
            Remove a profile without leaving AYMH.
          </h3>
          <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.55] text-foreground/85">
            A swipe-to-delete micro-interaction lives directly inside
            AYMH, and an iOS-style action sheet handles the security
            confirmation. The user never sees a separate management
            screen.
          </p>
          <CaseStudyMedia
            src={slide(29)}
            alt="Inline deletion: swipe a row to reveal Remove, then confirm via an action sheet."
            caption="Slide 29. Swipe-to-remove — confirmation stays on the same surface."
          />
          <CaseStudyMedia
            src={slide(39)}
            alt="Inline deletion variant 2 — persistent trash icon on each row plus action-sheet confirmation."
            caption="Slide 39. Variant 2 — make Remove visible at all times for users who use deletion frequently."
          />
        </div>

        <div className="mt-[60px] md:mt-[100px]">
          <p
            className="text-[12px] uppercase tracking-[0.22em] mb-[12px]"
            style={{ color: "#FF6200" }}
          >
            Exploration 3 · cap profiles
          </p>
          <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[40px] leading-[1.1] text-foreground mb-[16px]">
            Show three by default, &ldquo;See more&rdquo; on demand.
          </h3>
          <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.55] text-foreground/85">
            With a third of loaded accounts going untouched in 28 days, a
            soft cap of three meaningfully reduces clutter. &ldquo;See
            more&rdquo; expands to the full set; type-ahead in manual login
            covers anyone who needs an account that wasn&apos;t promoted.
          </p>
          <CaseStudyMedia
            src={slide(30)}
            alt="Capping AYMH profiles: 3 promoted profiles + See more, expanded full list, type-ahead fallback."
            caption="Slide 30. Three by default, expand on demand, fall back to type-ahead."
          />
          <CaseStudyMedia
            src={slide(38)}
            alt="Cap AYMH profiles variant 2 — Use another profile reveals the full list before manual login."
            caption="Slide 38. Variant 2 — Use another profile expands inline before pushing to manual login."
          />
        </div>

        <div className="mt-[60px] md:mt-[100px]">
          <p
            className="text-[12px] uppercase tracking-[0.22em] mb-[12px]"
            style={{ color: "#FF6200" }}
          >
            Exploration 4 · differentiation via badging
          </p>
          <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[40px] leading-[1.1] text-foreground mb-[16px]">
            Help users tell rows apart at a glance.
          </h3>
          <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.55] text-foreground/85">
            Badges on multi-account AYMH carry a hint about <em>which</em>{" "}
            row to tap — &ldquo;Most recent login,&rdquo; &ldquo;No password
            needed,&rdquo; &ldquo;Recently logged in,&rdquo; &ldquo;One-tap
            login.&rdquo; Different copy carries
            different commitments, so we treated this as a small content
            study with multiple variants.
          </p>
          <CaseStudyMedia
            src={slide(33)}
            alt="Badging on multi-account AYMH on Facebook and Instagram."
            caption="Slide 33. Inline badges as the primary differentiator."
          />
          <CaseStudyMedia
            src={slide(35)}
            alt="Badging content variants — Log in without password / Recently logged in / One-tap login."
            caption="Slide 35. Three content variants tested under the same visual treatment."
          />
        </div>

        <div className="mt-[60px] md:mt-[100px]">
          <p
            className="text-[12px] uppercase tracking-[0.22em] mb-[12px]"
            style={{ color: "#FF6200" }}
          >
            Exploration 5 · differentiation via CPs
          </p>
          <h3 className="font-[family-name:var(--font-clash-display)] text-[28px] md:text-[40px] leading-[1.1] text-foreground mb-[16px]">
            Show the credential point under the name.
          </h3>
          <p className="max-w-[760px] text-[18px] md:text-[20px] leading-[1.55] text-foreground/85">
            Surfacing the email or phone associated with each row gives
            people a real anchor when they have multiple
            &ldquo;christy_song&rdquo; variants. For unvetted accounts we
            explored an obfuscated treatment (j*****@gmail.com) so we
            don&apos;t accidentally surface
            CPs to the wrong person on a shared device.
          </p>
          <CaseStudyMedia
            src={slide(34)}
            alt="Adding CPs (email under name) on Multi AYMH FB and IG."
            caption="Slide 34. Vetted accounts show their CP directly."
          />
          <CaseStudyMedia
            src={slide(40)}
            alt="Obfuscated CPs as a variant for unvetted accounts."
            caption="Slide 40. Obfuscated variant for accounts that haven't been verified on this device."
          />
        </div>
      </CaseStudySection>

      {/* Reflection */}
      <CaseStudySection
        index="05"
        eyebrow="Reflection"
        title="What I'd take with me."
      >
        <div className="space-y-[24px] max-w-[760px] text-[18px] md:text-[20px] leading-[1.6] text-foreground/85">
          <p>
            The most useful framing on this project came from a small
            data point: when frequent users left AYMH for manual login,
            they were usually logging into an account that was already on
            the screen. That single insight collapsed two problems —
            abandonment and overcrowding — into one shared root cause:{" "}
            <em>people couldn&apos;t quickly tell which row was theirs.</em>
          </p>
          <p>
            Once that was the framing, the slate organized itself: make
            the screen easier to read (cap, badge, CPs); make the rows
            easier to act on (single-AYMH redesign, lighter deletion);
            and meet people where they are if they still pick a different
            path (typeahead in login, recent logins in AR).
          </p>
          <p>
            Working at this scale also forced a different posture on
            confidence. With 123M devices a day, the cost of a
            &ldquo;neutral&rdquo; test result is real, and most of these
            variants will only ever be one slice of a bigger A/B matrix.
            The narrative above is how I&apos;d defend that matrix in
            review — not the order in
            which any individual experiment will ship.
          </p>
        </div>
      </CaseStudySection>

      <CaseStudyFooter />
    </CaseStudyLayout>
  );
}
