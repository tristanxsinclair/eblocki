import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check, ShieldCheck, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { logEvent } from "@/lib/eblocki/analytics";
import { Seo } from "@/components/Seo";
import { EblockiLogo } from "@/components/eblocki/EblockiLogo";

/**
 * Short activation flow. It introduces the proof loop, optionally seeds an
 * academic focus, then sends the user directly to the first artifact.
 */

const MODE_BANK = [
  { id: "LAW_MAX", name: "Law", line: "IRAC depth, authority discipline." },
  { id: "PSYCH_HD", name: "Psychology", line: "CAEE depth, post-2016 evidence." },
  { id: "SALES_CLOSE", name: "Sales", line: "Objection scripts, attachment." },
  { id: "EBLOCKI_BUILD", name: "Build", line: "Ship code, refine prompts." },
  { id: "ATHLETE_MODE", name: "Athlete", line: "Reps logged, movement noted." },
  { id: "FINANCE_BASICS", name: "Finance", line: "Tracker entries, saving rules." },
  { id: "GENERAL_EXECUTION", name: "General", line: "Resisted tasks, real artifacts." },
];

const STEPS = ["The loop", "Your focus", "First work"] as const;

export default function Welcome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    void logEvent("welcome_started");
  }, []);

  useEffect(() => {
    void logEvent("welcome_step_viewed", { step: STEPS[step] });
  }, [step]);

  const canAdvance = useMemo(() => {
    if (step === 1) return selectedModes.length > 0;
    return true;
  }, [step, selectedModes]);

  const toggle = (list: string[], v: string, setter: (n: string[]) => void) => {
    setter(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  };

  const finish = async (skipped = false) => {
    if (!user) return;
    setSubmitting(true);
    try {
      if (selectedModes.length > 0) {
        const rows = selectedModes.map((m) => {
          const meta = MODE_BANK.find((x) => x.id === m)!;
          return {
            user_id: user.id,
            mode_id: m,
            display_name: meta.name,
            description: meta.line,
            is_active: true,
            is_default: m === selectedModes[0],
          };
        });
        await supabase.from("user_modes").upsert(rows, { onConflict: "user_id,mode_id" });
      }

      await supabase
        .from("user_onboarding_profiles")
        .upsert(
          {
            user_id: user.id,
            seen_welcome: true,
          },
          { onConflict: "user_id" },
        );

      void logEvent(skipped ? "welcome_skipped" : "welcome_completed", {
        count: selectedModes.length,
      });
      toast.success(skipped ? "Welcome skipped. Submit your first proof." : "You're in. Submit your first proof.");
      navigate("/proof?first=1");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Could not save preferences.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo title="Welcome | EBLOCKI" description="A two-minute intro to proof-first behavioural execution." path="/welcome" />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <EblockiLogo variant="mark" size="md" />
          <div className="flex items-center gap-1.5 flex-1">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={cn(
                  "h-1 flex-1 rounded-sm transition-colors",
                  i <= step ? "bg-primary" : "bg-muted",
                )}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
          <span>Step {step + 1} of {STEPS.length}</span>
          <button
            onClick={() => finish(true)}
            disabled={submitting}
            className="hover:text-foreground"
          >
            Skip to first proof
          </button>
        </div>

        {step === 0 && <PhilosophyStep />}
        {step === 1 && (
          <ModesStep selected={selectedModes} toggle={(v) => toggle(selectedModes, v, setSelectedModes)} />
        )}
        {step === 2 && <FirstProofStep />}

        <div className="flex items-center justify-between gap-3 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0 || submitting}
          >
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button
              size="sm"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance || submitting}
            >
              Continue <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          ) : (
            <Button size="sm" onClick={() => finish(false)} disabled={submitting}>
              {submitting ? "Saving…" : "Go to first proof"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function PhilosophyStep() {
  const bullets = [
    "Submit one piece of real work.",
    "See what counted.",
    "Do the next action.",
  ];
  return (
    <Card className="panel p-5 sm:p-7 space-y-5">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
        The proof loop
      </span>
      <h1 className="text-2xl sm:text-3xl font-semibold leading-tight">
        Turn one piece of work into a better next attempt.
      </h1>
      <p className="text-sm text-muted-foreground">
        Eblocki is for university work you can show: an essay paragraph, IRAC answer, study notes, or a past-paper response.
      </p>
      <ol className="space-y-2 pt-2 text-sm">
        {bullets.map((b, i) => (
          <li key={b} className="flex gap-3">
            <span className="font-mono text-primary">0{i + 1}</span>
            <span>{b}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

function ModesStep({ selected, toggle }: { selected: string[]; toggle: (v: string) => void }) {
  return (
    <Card className="panel p-5 sm:p-7 space-y-4">
      <div className="flex items-center gap-2">
        <Target className="h-4 w-4 text-primary" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Modes</span>
      </div>
      <h2 className="text-xl sm:text-2xl font-semibold">What kind of work will you improve first?</h2>
      <p className="text-sm text-muted-foreground">
        Pick at least one focus so the verdict uses a useful standard. You can change this later.
      </p>
      <div className="grid sm:grid-cols-2 gap-2 pt-2">
        {MODE_BANK.map((m) => {
          const on = selected.includes(m.id);
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => toggle(m.id)}
              className={cn(
                "text-left rounded-md border p-3 transition-all touch-manipulation",
                on ? "border-primary bg-primary/5" : "border-border hover:border-primary/40",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest">{m.name}</span>
                {on && <Check className="h-3.5 w-3.5 text-primary" />}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">{m.line}</p>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function FirstProofStep() {
  return (
    <Card className="panel p-5 sm:p-7 space-y-4">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-primary" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">First proof</span>
      </div>
      <h2 className="text-xl sm:text-2xl font-semibold">Your first useful result is one verdict.</h2>
      <ol className="space-y-2.5 text-sm">
        <li className="flex gap-3">
          <span className="font-mono text-primary">01</span>
          <span>Paste or attach the work itself.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-mono text-primary">02</span>
          <span>See what the artifact demonstrates.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-mono text-primary">03</span>
          <span>Read the most important gap and the evidence behind it.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-mono text-primary">04</span>
          <span>Start the correction and submit the stronger attempt.</span>
        </li>
      </ol>
      <p className="text-[11px] text-muted-foreground italic border-l-2 border-primary/40 pl-2">
        Your work is stored as part of your private proof history under the app&apos;s existing account and data controls.
      </p>
    </Card>
  );
}
