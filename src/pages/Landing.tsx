import { Link } from "react-router-dom";
import { ArrowRight, Bot, CheckCircle2, FileCheck2, Gavel, History, RefreshCw, ShieldCheck, Target } from "lucide-react";
import { EblockiLogo } from "@/components/eblocki/EblockiLogo";
import { SinkSpaceAttribution } from "@/components/eblocki/SinkSpaceAttribution";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { logEvent } from "@/lib/eblocki/analytics";

const PROOF_LOOP = [
  { icon: FileCheck2, label: "01", title: "Submit real work", body: "Paste an essay paragraph, IRAC response, study notes, or a past-paper answer you actually produced." },
  { icon: Gavel, label: "02", title: "Receive a verdict", body: "See what the work demonstrates and whether the evidence is weak, developing, strong, or elite." },
  { icon: Target, label: "03", title: "Understand the gap", body: "Eblocki identifies the most important weakness holding the work below the next standard." },
  { icon: RefreshCw, label: "04", title: "Make the correction", body: "Apply one concrete change, then submit the stronger attempt while the feedback is still useful." },
] as const;

const ARTIFACT_EXAMPLES = [
  "An essay paragraph with your argument and evidence",
  "An IRAC answer from a tutorial or past paper",
  "Study notes rewritten in your own words",
  "A corrected response after feedback",
] as const;

export default function Landing() {
  return (
    <div className="operator-surface min-h-screen">
      <Seo title="Eblocki — Improve from the work you actually produce" description="Submit real academic work, receive an evidence-based verdict, find the most important gap, and make the next correction." path="/" />

      <header className="operator-chrome sticky top-0 z-40 border-b safe-top safe-x">
        <div className="container flex min-h-16 items-center justify-between gap-3">
          <Link to="/" className="operator-interactive operator-hit inline-flex items-center" aria-label="Eblocki home">
            <EblockiLogo variant="compact" size="md" />
          </Link>
          <nav className="flex items-center gap-2" aria-label="Public navigation">
            <a href="#how-it-works" className="operator-interactive operator-hit hidden items-center px-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:inline-flex">How it works</a>
            <Link to="/demo" className="operator-interactive operator-hit inline-flex items-center px-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">See an example</Link>
            <Link to="/auth" className="operator-interactive operator-hit inline-flex items-center px-2 font-mono text-[10px] uppercase tracking-widest text-primary">Sign in</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="grid-bg border-b border-border">
          <div className="container grid gap-10 py-12 md:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.75fr)] md:items-center md:py-20 lg:py-24">
            <div className="max-w-3xl">
              <div className="operator-label-signal">Proof-based improvement for university work</div>
              <h1 className="operator-heading-1 mt-5 md:text-6xl lg:text-7xl">Improve from the work<br /> <span className="text-primary">you actually produce.</span></h1>
              <p className="operator-body mt-6 max-w-2xl md:text-lg">Eblocki turns real academic work into a clear verdict, the most important gap, and one correction you can act on next.</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/auth" onClick={() => { void logEvent("activation_landing_primary_cta_clicked", { route: "/", destination: "/auth", ctaName: "submit_first_work" }); }}>
                    Submit your first work <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto"><Link to="/demo">See a sample verdict</Link></Button>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Real work, not intentions</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> One useful correction</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Prior attempts stay visible</span>
              </div>
            </div>
            <VerdictPreview />
          </div>
        </section>

        <section id="how-it-works" className="operator-section scroll-mt-20">
          <div className="container">
            <div className="max-w-2xl">
              <div className="operator-label-signal">The improvement loop</div>
              <h2 className="operator-heading-2 mt-2 md:text-4xl">Work. Verdict. Gap. Correction.</h2>
              <p className="operator-body mt-3">The first useful outcome is not a dashboard score. It is knowing what your work shows, what is missing, and what to change in the next attempt.</p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PROOF_LOOP.map(({ icon: Icon, label, title, body }) => (
                <Card key={title} className="operator-panel p-5">
                  <div className="flex items-center justify-between"><span className="operator-label">{label}</span><Icon className="h-4 w-4 text-primary" /></div>
                  <h3 className="operator-heading-3 mt-4">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="operator-section">
          <div className="container grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <div className="operator-label-signal">What to submit</div>
              <h2 className="operator-heading-2 mt-2 md:text-4xl">Bring the artifact, not the claim.</h2>
              <p className="operator-body mt-4">Eblocki is initially built for university students who want honest feedback on visible work. A plan to study can be useful, but it is not evidence of learning.</p>
            </div>
            <Card className="operator-panel p-5 sm:p-6">
              <ul className="grid gap-3 sm:grid-cols-2">
                {ARTIFACT_EXAMPLES.map((example) => (
                  <li key={example} className="flex items-start gap-3 rounded-md border border-border/80 bg-background/45 p-3 text-sm leading-6"><FileCheck2 className="mt-1 h-4 w-4 shrink-0 text-primary" /><span>{example}</span></li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">Paste text or attach a supported file. Eblocki assesses the submitted artifact; it does not treat confidence, time spent, or a checked box as proof of quality.</p>
            </Card>
          </div>
        </section>

        <section className="operator-section">
          <div className="container grid gap-4 md:grid-cols-3">
            <SupportingSystem icon={History} title="Evidence history" body="Earlier attempts remain available so improvement can be compared over time. The Court of Evidence is the deeper review layer after your first verdict." />
            <SupportingSystem icon={ShieldCheck} title="Evidence before reward" body="XP and progression can recognise work after it is recorded and judged. They do not replace the verdict or manufacture proof." />
            <SupportingSystem icon={Bot} title="Guidance, not certainty" body="Assessment separates visible evidence from interpretation. When the work is too thin, Eblocki should ask for more evidence instead of faking confidence." />
          </div>
        </section>

        <section className="operator-section">
          <div className="container text-center">
            <div className="mx-auto max-w-2xl">
              <div className="operator-label-signal">Begin with one artifact</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Get the gap while the work is still in front of you.</h2>
              <p className="mt-4 text-muted-foreground">Submit something real, read the verdict, and make one stronger attempt.</p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="w-full sm:w-auto"><Link to="/auth">Submit your first work <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto"><Link to="/demo">See a sample verdict</Link></Button>
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

function VerdictPreview() {
  return (
    <Card className="operator-panel-accent overflow-hidden" aria-label="Sample Eblocki verdict">
      <div className="border-b border-border bg-primary/[0.04] px-4 py-3"><div className="flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.2em]"><span className="text-primary">Sample verdict</span><span className="text-muted-foreground">Essay paragraph</span></div></div>
      <div className="space-y-3 p-5">
        <div><div className="operator-label">Observed</div><h2 className="mt-1 text-xl font-semibold">A clear claim with relevant evidence.</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">The paragraph states a position and uses one source to support it.</p></div>
        <div className="rounded-md border border-border bg-background/50 p-4"><div className="operator-label-signal">Most important gap</div><p className="mt-2 text-sm font-medium">The evidence is described, but not connected back to the argument.</p></div>
        <div className="rounded-md border border-primary/30 bg-primary/[0.045] p-4"><div className="operator-label-signal">Next correction</div><p className="mt-2 text-sm font-medium">Add two sentences explaining how the source proves your claim, then submit the revised paragraph.</p></div>
      </div>
    </Card>
  );
}

function SupportingSystem({ icon: Icon, title, body }: { icon: typeof Bot; title: string; body: string }) {
  return <Card className="operator-panel p-5 sm:p-6"><Icon className="h-5 w-5 text-primary" /><h2 className="mt-4 text-lg font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></Card>;
}
