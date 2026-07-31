import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileCheck2,
  Gavel,
  ScrollText,
  ShieldCheck,
  Swords,
  Target,
  Trophy,
} from "lucide-react";
import { EblockiLogo } from "@/components/eblocki/EblockiLogo";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { logEvent } from "@/lib/eblocki/analytics";

const GAME_LOOP = [
  {
    icon: Target,
    label: "01",
    title: "Do the action",
    body: "The quest happens in real life: write, build, train, sell, practise, or decide.",
  },
  {
    icon: FileCheck2,
    label: "02",
    title: "Log the evidence",
    body: "File the visible artifact. A checked box or confident story is not completion.",
  },
  {
    icon: Gavel,
    label: "03",
    title: "Get the verdict",
    body: "The existing evidence engine decides what counted and what would strengthen it.",
  },
  {
    icon: Trophy,
    label: "04",
    title: "Gain real XP",
    body: "Authoritative XP appears only after the artifact is recorded and judged.",
  },
  {
    icon: Bot,
    label: "05",
    title: "Receive the next quest",
    body: "The Game Master turns the real bottleneck into one controllable next move.",
  },
] as const;

export default function Landing() {
  return (
    <div className="operator-surface life-game-shell">
      <Seo
        title="Eblocki — Turn Real Life Into a Game"
        description="A life game where real actions only count when evidence exists."
        path="/"
      />

      <header className="operator-chrome sticky top-0 z-40 border-b safe-top safe-x">
        <div className="container flex min-h-16 items-center justify-between gap-3">
          <Link to="/" className="operator-interactive operator-hit inline-flex items-center">
            <EblockiLogo variant="compact" size="md" />
          </Link>
          <nav className="flex items-center gap-3">
            <a
              href="#how-xp-works"
              className="operator-interactive operator-hit hidden items-center px-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:inline-flex"
            >
              How XP works
            </a>
            <Link
              to="/demo"
              className="operator-interactive operator-hit inline-flex items-center px-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            >
              Demo
            </Link>
            <Link
              to="/auth"
              className="operator-interactive operator-hit inline-flex items-center px-2 font-mono text-[10px] uppercase tracking-widest text-primary"
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="grid-bg border-b border-border">
          <div className="container grid gap-8 py-12 md:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] md:items-center md:py-20 lg:py-24">
            <div className="max-w-3xl">
              <div className="operator-label-signal">
                &gt; Booting Eblocki ...
              </div>
              <h1 className="operator-heading-1 mt-5 md:text-6xl lg:text-7xl">
                Your life.
                <br />
                <span className="text-primary">Turned into a game.</span>
              </h1>
              <p className="operator-body mt-6 max-w-xl md:text-lg">
                Real actions only count with evidence. Eblocki turns behaviour into artifacts,
                artifacts into verdicts, and verified progress into a character you actually earned.
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
                      void logEvent("life_game_demo_started", {
                        route: "/",
                        source: "landing",
                      });
                    }}
                  >
                    Play the demo
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="w-full sm:w-auto">
                  <a href="#how-xp-works">
                    View how XP works
                  </a>
                </Button>
              </div>

              <div className="operator-label-signal mt-8 flex min-h-11 items-center gap-2 rounded-md border border-primary/30 bg-primary/[0.05] px-3 py-2 sm:inline-flex">
                <ShieldCheck className="h-4 w-4" />
                No artifact // no XP
              </div>
            </div>

            <CharacterPreview />
          </div>
        </section>

        <section className="operator-section">
          <div className="container">
            <div className="max-w-2xl">
              <div className="operator-label-signal">
                The core loop
              </div>
              <h2 className="operator-heading-2 mt-2 md:text-4xl">
                Progress has a transaction.
              </h2>
              <p className="operator-body mt-3">
                Fun comes from fast feedback and earned progression—not fake rewards or constant
                animation.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {GAME_LOOP.map(({ icon: Icon, label, title, body }) => (
                <Card key={title} className="operator-panel p-5">
                  <div className="flex items-center justify-between">
                    <span className="operator-label">
                      {label}
                    </span>
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="operator-heading-3 mt-4">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-xp-works" className="operator-section">
          <div className="container grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <div className="operator-label-signal">
                Evidence engine
              </div>
              <h2 className="operator-heading-2 mt-2 md:text-4xl">
                The game cannot award itself.
              </h2>
              <p className="operator-body mt-4">
                Your character is a view over Eblocki&apos;s existing behavioural evidence system.
                Postgres remains authoritative for verdicts, XP, levels, and identity escalation.
                The Game Master can explain a result or issue a quest; it cannot invent one.
              </p>
            </div>

            <div className="space-y-3">
              <EvidenceRule
                title="Artifact before completion"
                body="Proof-required quests lead to Log Action. They do not expose a checkbox that can manufacture progress."
              />
              <EvidenceRule
                title="Verdict before reward"
                body="Missing Court or XP records display as sync pending or unavailable—not accepted, zero, or successful by assumption."
              />
              <EvidenceRule
                title="Arena Score is not character XP"
                body="Practice can be playful. Character progression begins only after the result is filed as evidence and judged."
              />
            </div>
          </div>
        </section>

        <section className="operator-section">
          <div className="container grid gap-4 md:grid-cols-2">
            <Card className="operator-panel p-6 sm:p-8">
              <Bot className="h-5 w-5 text-primary" />
              <div className="operator-label-signal mt-5">
                Game Master
              </div>
              <h2 className="mt-2 text-2xl font-semibold">One exact directive.</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                It diagnoses avoidance, defines one quest, names the required artifact, and remains
                useful through a deterministic local fallback when remote AI is unavailable.
              </p>
            </Card>
            <Card className="operator-panel p-6 sm:p-8">
              <Swords className="h-5 w-5 text-primary" />
              <div className="operator-label-signal mt-5">
                Arena
              </div>
              <h2 className="mt-2 text-2xl font-semibold">Practice under pressure.</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                GameForge remains the practice engine underneath. Play the rep, review the result,
                then file it into the evidence loop when it deserves a real verdict.
              </p>
            </Card>
          </div>
        </section>

        <section className="operator-section">
          <div className="container text-center">
            <div className="mx-auto max-w-2xl">
              <div className="operator-label-signal">
                Begin with one action
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Build the character from evidence.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Explore the sample operator without an account, or start a real run and file the
                first artifact.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/auth">
                    Start your run <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <Link to="/demo">
                    Play the demo
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="safe-bottom safe-x">
        <div className="container flex flex-col gap-4 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <EblockiLogo variant="compact" size="sm" />
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
    <Card className="operator-panel-accent overflow-hidden">
      <div className="border-b border-border bg-primary/[0.04] px-4 py-3">
        <div className="flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.2em]">
          <span className="text-primary">Character preview</span>
          <span className="text-muted-foreground">Sample data</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="operator-label-signal">
              Operator Level 12
            </div>
            <h2 className="mt-1 text-xl font-semibold">Compound Operator</h2>
          </div>
          <div className="text-right">
            <div className="operator-number text-lg font-semibold">4,280</div>
            <div className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
              Total XP
            </div>
          </div>
        </div>
        <Progress value={59.5} className="mt-4 h-2" />

        <div className="mt-5 rounded-sm border border-primary/30 bg-primary/[0.04] p-4">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
            Active quest
          </div>
          <div className="mt-2 font-semibold">Ship one verified product improvement</div>
          <div className="mt-3 rounded-sm border border-border bg-background/50 p-3">
            <div className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
              Evidence required
            </div>
            <p className="mt-1 text-xs text-foreground">Commit + relevant command output</p>
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <PreviewPanel
            icon={Bot}
            label="GM callout"
            value="Polishing is protecting you from a verdict."
          />
          <PreviewPanel
            icon={ScrollText}
            label="Run Log"
            value="MIND LEVEL 13 → 14 // +96 XP"
          />
        </div>
      </div>
    </Card>
  );
}

function PreviewPanel({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Bot;
  label: string;
  value: string;
}) {
  return (
    <div className="operator-panel p-3">
      <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3 w-3 text-primary" />
        {label}
      </div>
      <p className="mt-2 text-xs leading-5">{value}</p>
    </div>
  );
}

function EvidenceRule({ title, body }: { title: string; body: string }) {
  return (
    <div className="operator-panel flex gap-3 p-4">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
