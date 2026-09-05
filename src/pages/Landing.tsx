import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  FileCheck2,
  Gavel,
  Map,
  RefreshCw,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Swords,
  Target,
  Trophy,
} from "lucide-react";
import { EblockiLogo } from "@/components/eblocki/EblockiLogo";
import { SinkSpaceAttribution } from "@/components/eblocki/SinkSpaceAttribution";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { logEvent } from "@/lib/eblocki/analytics";

const GAME_LOOP = [
  {
    icon: Target,
    label: "01",
    title: "Take the quest",
    body: "Start with one bounded challenge in study, work, sport, building, or life.",
  },
  {
    icon: FileCheck2,
    label: "02",
    title: "Produce the artifact",
    body: "Write, solve, build, practise, sell, or decide. The output is the attempt.",
  },
  {
    icon: Gavel,
    label: "03",
    title: "Face the verdict",
    body: "The Court separates what is visible from what is inferred and names the decisive gap.",
  },
  {
    icon: RefreshCw,
    label: "04",
    title: "Make the correction",
    body: "Apply one concrete fix while the feedback is still attached to the work.",
  },
  {
    icon: Trophy,
    label: "05",
    title: "Raise the character",
    body: "Verified work becomes XP, mastery, momentum, and a harder future standard.",
  },
] as const;

const SYSTEMS = [
  {
    icon: Sparkles,
    eyebrow: "Today",
    title: "One route through the day",
    body: "Your current command, active quest, required evidence, and next move live in one place.",
    to: "/demo",
    action: "See the route",
  },
  {
    icon: Swords,
    eyebrow: "Arena",
    title: "Train before it counts",
    body: "GameForge turns weak skills into focused reps. Practice remains separate from earned proof.",
    to: "/gameforge",
    action: "Enter Arena",
  },
  {
    icon: Gavel,
    eyebrow: "Court",
    title: "Feedback tied to the attempt",
    body: "See the standard, the evidence, the gap, and the correction beside the work that produced them.",
    to: "/proof",
    action: "View proof",
  },
  {
    icon: BrainCircuit,
    eyebrow: "Character",
    title: "A capability profile you earn",
    body: "Levels and identity reflect judged artifacts across your real domains, not time spent in the app.",
    to: "/operator",
    action: "View character",
  },
  {
    icon: Bot,
    eyebrow: "Game Master",
    title: "Personalised daily direction",
    body: "Your recent evidence and weakest standard shape one useful directive, with an honest local fallback.",
    to: "/coach",
    action: "Meet Game Master",
  },
  {
    icon: Map,
    eyebrow: "Intel",
    title: "See the trajectory",
    body: "Evidence history, risk, momentum, and future paths reveal whether your system is actually working.",
    to: "/systems",
    action: "Open Intel",
  },
] as const;

const ARTIFACTS = [
  "An essay paragraph with a claim and evidence",
  "An IRAC answer from a tutorial or past paper",
  "Study notes rewritten in your own words",
  "A corrected response after feedback",
] as const;

export default function Landing() {
  return (
    <div className="operator-surface life-game-shell">
      <Seo
        title="Eblocki — Turn Your Life Into a Game You Can Prove"
        description="A behavioural evidence operating system where real work becomes feedback, correction, mastery, and an identity you earned."
        path="/"
      />

      <header className="operator-chrome sticky top-0 z-40 border-b safe-top safe-x">
        <div className="container flex min-h-16 items-center justify-between gap-3">
          <Link to="/" className="operator-interactive operator-hit inline-flex items-center" aria-label="Eblocki home">
            <EblockiLogo variant="compact" size="md" />
          </Link>
          <nav className="flex items-center gap-2" aria-label="Public navigation">
            <a href="#system" className="operator-interactive operator-hit hidden items-center px-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:inline-flex">
              Explore system
            </a>
            <Link to="/demo" className="operator-interactive operator-hit inline-flex items-center px-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Play demo
            </Link>
            <Link to="/auth" className="operator-interactive operator-hit inline-flex items-center px-2 font-mono text-[10px] uppercase tracking-widest text-primary">
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="grid-bg border-b border-border">
          <div className="container grid gap-8 py-12 md:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] md:items-center md:py-20 lg:py-24">
            <div className="max-w-3xl">
              <div className="operator-label-signal">&gt; Behavioural Evidence OS // online</div>
              <h1 className="operator-heading-1 mt-5 md:text-6xl lg:text-7xl">
                Your life.
                <br />
                <span className="text-primary">Turned into a game you can prove.</span>
              </h1>
              <p className="operator-body mt-6 max-w-2xl md:text-lg">
                Eblocki combines a daily learning path, adaptive practice, academic command centre,
                evidence-based feedback, and earned character progression. Real work enters. A better
                next attempt comes out.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link
                    to="/auth"
                    onClick={() => {
                      void logEvent("activation_landing_primary_cta_clicked", {
                        route: "/",
                        destination: "/auth",
                        ctaName: "start_your_run",
                      });
                    }}
                  >
                    Start your run <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <Link
                    to="/demo"
                    onClick={() => {
                      void logEvent("life_game_demo_started", { route: "/", source: "landing" });
                    }}
                  >
                    Play the system demo
                  </Link>
                </Button>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> No artifact, no claim</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Corrections stay visible</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> XP must be earned</span>
              </div>
            </div>

            <CharacterPreview />
          </div>
        </section>

        <section className="operator-section">
          <div className="container">
            <div className="max-w-3xl">
              <div className="operator-label-signal">Your daily route</div>
              <h2 className="operator-heading-2 mt-2 md:text-4xl">A learning path with consequences.</h2>
              <p className="operator-body mt-3">
                Bite-sized enough to start, adaptive enough to stay difficult, and rigorous enough that a streak cannot impersonate mastery.
              </p>
            </div>

            <ol className="relative mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" aria-label="Eblocki evidence progression">
              {GAME_LOOP.map(({ icon: Icon, label, title, body }, index) => (
                <li key={title} className="relative">
                  <Card className="operator-panel h-full p-5">
                    <div className="flex items-center justify-between">
                      <span className="operator-label">Stage {label}</span>
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-primary/35 bg-primary/[0.06] text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                    <h3 className="operator-heading-3 mt-4">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                  </Card>
                  {index < GAME_LOOP.length - 1 && <ArrowRight className="absolute -right-2 top-7 z-10 hidden h-4 w-4 text-primary/60 lg:block" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="system" className="operator-section scroll-mt-20 border-y border-border bg-card/20">
          <div className="container">
            <div className="max-w-3xl">
              <div className="operator-label-signal">The system, restored</div>
              <h2 className="operator-heading-2 mt-2 md:text-4xl">More than a proof form. Your operating system.</h2>
              <p className="operator-body mt-3">
                The clarity of a student portal, the rhythm of a daily brain workout, and the progression of a great game—powered by Eblocki&apos;s existing evidence engine.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {SYSTEMS.map(({ icon: Icon, eyebrow, title, body, to, action }) => (
                <Card key={title} className="operator-panel group flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <div className="operator-label-signal">{eyebrow}</div>
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{body}</p>
                  <Link to={to} className="operator-interactive mt-5 inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary">
                    {action} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="operator-section">
          <div className="container grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <div className="operator-label-signal">Academic workbench</div>
              <h2 className="operator-heading-2 mt-2 md:text-4xl">Bring the work, not the claim.</h2>
              <p className="operator-body mt-4">
                Submit the same visible work your university already expects. Eblocki keeps the attempt, feedback, and correction together so the next rep starts from evidence.
              </p>
            </div>
            <Card className="operator-panel p-5 sm:p-6">
              <ul className="grid gap-3 sm:grid-cols-2">
                {ARTIFACTS.map((artifact) => (
                  <li key={artifact} className="flex items-start gap-3 rounded-md border border-border/80 bg-background/45 p-3 text-sm leading-6">
                    <FileCheck2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span>{artifact}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-md border border-primary/25 bg-primary/[0.04] p-4">
                <div className="operator-label-signal">Correction loop</div>
                <p className="mt-2 text-sm leading-6">Verdict → decisive gap → corrected attempt → higher standard.</p>
              </div>
            </Card>
          </div>
        </section>

        <section id="how-xp-works" className="operator-section">
          <div className="container grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <div className="operator-label-signal">Evidence engine</div>
              <h2 className="operator-heading-2 mt-2 md:text-4xl">The game cannot award itself.</h2>
              <p className="operator-body mt-4">
                Postgres remains authoritative for verdicts, XP, levels, and identity escalation. The Game Master can explain a result or issue a quest; it cannot invent one.
              </p>
            </div>

            <div className="space-y-3">
              <EvidenceRule title="Artifact before completion" body="Proof-required quests lead to Log Action. A checkbox cannot manufacture progress." />
              <EvidenceRule title="Verdict before reward" body="Missing Court or XP records display as pending or unavailable—not accepted by assumption." />
              <EvidenceRule title="Practice before progression" body="Arena reps can be playful and adaptive. Character XP begins only after the result is filed and judged." />
            </div>
          </div>
        </section>

        <section className="operator-section">
          <div className="container text-center">
            <div className="mx-auto max-w-2xl">
              <div className="operator-label-signal">Begin with one real action</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Build the character from evidence.</h2>
              <p className="mt-4 text-muted-foreground">Explore the whole system without an account, or start a real run and file the first artifact.</p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="w-full sm:w-auto"><Link to="/auth">Start your run <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto"><Link to="/demo">Play the system demo</Link></Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="safe-bottom safe-x">
        <div className="container flex flex-col gap-4 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2"><EblockiLogo variant="compact" size="sm" /><SinkSpaceAttribution /></div>
          <div className="flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-widest">
            <Link to="/legal/privacy" className="operator-interactive inline-flex min-h-11 items-center">Privacy</Link>
            <Link to="/legal/terms" className="operator-interactive inline-flex min-h-11 items-center">Terms</Link>
            <Link to="/legal/ai-disclosure" className="operator-interactive inline-flex min-h-11 items-center">AI disclosure</Link>
            <Link to="/pricing" className="operator-interactive inline-flex min-h-11 items-center">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CharacterPreview() {
  return (
    <Card className="operator-panel-accent overflow-hidden" aria-label="Sample Eblocki character and daily route">
      <div className="border-b border-border bg-primary/[0.04] px-4 py-3">
        <div className="flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.2em]">
          <span className="text-primary">Today // live run</span>
          <span className="text-muted-foreground">Sample data</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="operator-label-signal">Operator Level 12</div>
            <h2 className="mt-1 text-xl font-semibold">Compound Operator</h2>
          </div>
          <div className="text-right">
            <div className="operator-number text-lg font-semibold">4,280</div>
            <div className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">Verified XP</div>
          </div>
        </div>
        <Progress value={59.5} className="mt-4 h-2" />

        <div className="mt-5 rounded-sm border border-primary/30 bg-primary/[0.04] p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">Active quest</div>
            <span className="rounded-full border border-primary/30 px-2 py-1 font-mono text-[8px] uppercase tracking-widest text-primary">18 min</span>
          </div>
          <div className="mt-2 font-semibold">Strengthen one evidence-to-claim link</div>
          <div className="mt-3 rounded-sm border border-border bg-background/50 p-3">
            <div className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">Evidence required</div>
            <p className="mt-1 text-xs text-foreground">Original paragraph + corrected paragraph</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-1.5" aria-label="Sample daily route progress">
          {[
            ["Quest", "done"],
            ["Attempt", "done"],
            ["Verdict", "now"],
            ["Grow", "next"],
          ].map(([label, state]) => (
            <div key={label} className={`rounded-sm border p-2 text-center ${state === "now" ? "border-primary bg-primary/[0.07]" : "border-border bg-background/35"}`}>
              <div className={`mx-auto mb-1 h-1.5 w-1.5 rounded-full ${state === "done" || state === "now" ? "bg-primary" : "bg-muted-foreground/30"}`} />
              <div className="font-mono text-[7px] uppercase tracking-wider text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <PreviewPanel icon={Bot} label="Game Master" value="Your argument is clear. The authority is not yet doing work." />
          <PreviewPanel icon={ScrollText} label="Run log" value="MIND LEVEL 13 → 14 // +96 XP" />
        </div>
      </div>
    </Card>
  );
}

function PreviewPanel({ icon: Icon, label, value }: { icon: typeof Bot; label: string; value: string }) {
  return (
    <div className="operator-panel p-3">
      <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-widest text-muted-foreground"><Icon className="h-3 w-3 text-primary" />{label}</div>
      <p className="mt-2 text-xs leading-5">{value}</p>
    </div>
  );
}

function EvidenceRule({ title, body }: { title: string; body: string }) {
  return (
    <div className="operator-panel flex gap-3 p-4">
      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p></div>
    </div>
  );
}
