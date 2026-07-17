import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Phone,
  LifeBuoy,
  Radio,
  Shield,
  HeartPulse,
  Droplets,
  Backpack,
  FileDown,
  WifiOff,
  CheckCircle2,
  CircleDot,
  BookOpen,
  Flame,
  Bandage,
  Zap,
  AlertTriangle,
  Waves,
  Users,
  Database,
  MapPinned,
  Languages,
  ShieldAlert,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { StatusBadge } from "@/components/status-badge";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/survival-kit")({
  head: () => ({
    meta: [
      { title: "Offline Survival Kit — Flood Copilot" },
      {
        name: "description",
        content:
          "Emergency contacts, first aid, flood safety checklists, go-bag list and downloaded advisories that work without any network.",
      },
    ],
  }),
  component: SurvivalKitPage,
});

// ---------- Static structural data (icons, tones, numbers) ----------

const TONE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" },
  red: { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/30" },
  amber: { bg: "bg-warning/15", text: "text-warning-foreground dark:text-warning", border: "border-warning/40" },
  emerald: { bg: "bg-success/15", text: "text-success", border: "border-success/30" },
  info: { bg: "bg-info/15", text: "text-info", border: "border-info/30" },
};

const CONTACT_DEFS: {
  labelKey: string;
  hintKey: string;
  number: string;
  icon: LucideIcon;
  tone: keyof typeof TONE_STYLES;
}[] = [
  { labelKey: "survivalKit.contact.emergency", hintKey: "survivalKit.contact.emergencyHint", number: "112", icon: Phone, tone: "red" },
  { labelKey: "survivalKit.contact.disaster", hintKey: "survivalKit.contact.disasterHint", number: "1077", icon: LifeBuoy, tone: "amber" },
  { labelKey: "survivalKit.contact.ambulance", hintKey: "survivalKit.contact.ambulanceHint", number: "108", icon: HeartPulse, tone: "emerald" },
  { labelKey: "survivalKit.contact.police", hintKey: "survivalKit.contact.policeHint", number: "100", icon: Shield, tone: "primary" },
  { labelKey: "survivalKit.contact.fire", hintKey: "survivalKit.contact.fireHint", number: "101", icon: Flame, tone: "red" },
  { labelKey: "survivalKit.contact.ndrf", hintKey: "survivalKit.contact.ndrfHint", number: "011-24363260", icon: ShieldAlert, tone: "info" },
  { labelKey: "survivalKit.contact.women", hintKey: "survivalKit.contact.womenHint", number: "181", icon: Users, tone: "primary" },
  { labelKey: "survivalKit.contact.child", hintKey: "survivalKit.contact.childHint", number: "1098", icon: Users, tone: "emerald" },
];

const FIRST_AID_DEFS: {
  titleKey: string;
  stepKeys: string[];
  icon: LucideIcon;
  tone: keyof typeof TONE_STYLES;
}[] = [
  {
    titleKey: "survivalKit.aid.drowning.title",
    stepKeys: ["survivalKit.aid.drowning.s1", "survivalKit.aid.drowning.s2", "survivalKit.aid.drowning.s3", "survivalKit.aid.drowning.s4"],
    icon: Waves,
    tone: "info",
  },
  {
    titleKey: "survivalKit.aid.bleeding.title",
    stepKeys: ["survivalKit.aid.bleeding.s1", "survivalKit.aid.bleeding.s2", "survivalKit.aid.bleeding.s3", "survivalKit.aid.bleeding.s4"],
    icon: Bandage,
    tone: "red",
  },
  {
    titleKey: "survivalKit.aid.electric.title",
    stepKeys: ["survivalKit.aid.electric.s1", "survivalKit.aid.electric.s2", "survivalKit.aid.electric.s3", "survivalKit.aid.electric.s4"],
    icon: Zap,
    tone: "amber",
  },
  {
    titleKey: "survivalKit.aid.snake.title",
    stepKeys: ["survivalKit.aid.snake.s1", "survivalKit.aid.snake.s2", "survivalKit.aid.snake.s3", "survivalKit.aid.snake.s4"],
    icon: AlertTriangle,
    tone: "emerald",
  },
];

const SAFETY_DO_KEYS = [
  "survivalKit.safety.do1",
  "survivalKit.safety.do2",
  "survivalKit.safety.do3",
  "survivalKit.safety.do4",
  "survivalKit.safety.do5",
];

const SAFETY_DONT_KEYS = [
  "survivalKit.safety.dont1",
  "survivalKit.safety.dont2",
  "survivalKit.safety.dont3",
  "survivalKit.safety.dont4",
  "survivalKit.safety.dont5",
];

const GO_BAG_DEFS: {
  categoryKey: string;
  icon: LucideIcon;
  itemKeys: string[];
}[] = [
  { categoryKey: "survivalKit.bag.documents", icon: BookOpen, itemKeys: ["survivalKit.bag.doc1", "survivalKit.bag.doc2", "survivalKit.bag.doc3"] },
  { categoryKey: "survivalKit.bag.water", icon: Droplets, itemKeys: ["survivalKit.bag.water1", "survivalKit.bag.water2", "survivalKit.bag.water3"] },
  { categoryKey: "survivalKit.bag.health", icon: HeartPulse, itemKeys: ["survivalKit.bag.health1", "survivalKit.bag.health2", "survivalKit.bag.health3"] },
  { categoryKey: "survivalKit.bag.tools", icon: Backpack, itemKeys: ["survivalKit.bag.tool1", "survivalKit.bag.tool2", "survivalKit.bag.tool3"] },
  { categoryKey: "survivalKit.bag.comms", icon: Radio, itemKeys: ["survivalKit.bag.comm1", "survivalKit.bag.comm2", "survivalKit.bag.comm3"] },
  { categoryKey: "survivalKit.bag.children", icon: Users, itemKeys: ["survivalKit.bag.child1", "survivalKit.bag.child2", "survivalKit.bag.child3"] },
];

const DOWNLOADED_ADVISORIES = [
  { title: "Godavari basin evacuation routes (Bhadradri Kothagudem)", source: "TSDMA · PDF", size: "3.4 MB", updated: "2 hrs ago", status: "ready" as const },
  { title: "IMD 5-day rainfall outlook — Telangana", source: "IMD Hyderabad · PDF", size: "1.1 MB", updated: "6 hrs ago", status: "ready" as const },
  { title: "Do's and Don'ts during floods (Telugu)", source: "NDMA · Booklet", size: "5.8 MB", updated: "yesterday", status: "ready" as const },
  { title: "Musi reservoir gate operation notice", source: "TSDMA · Circular", size: "420 KB", updated: "just now", status: "updating" as const },
  { title: "First responder handbook (English + Telugu)", source: "NDRF · PDF", size: "8.2 MB", updated: "3 days ago", status: "ready" as const },
];

const OFFLINE_STATUS_DEFS: {
  labelKey: string;
  icon: LucideIcon;
  state: "ready" | "partial" | "pending";
  detail: string;
}[] = [
  { labelKey: "Offline maps (Telangana)", icon: MapPinned, state: "ready", detail: "324 MB · 33 districts cached" },
  { labelKey: "Telugu language pack", icon: Languages, state: "ready", detail: "Voice + text translation available offline" },
  { labelKey: "AI decision model", icon: Database, state: "partial", detail: "Core model ready · Vision pack downloading (68%)" },
  { labelKey: "Emergency SMS gateway", icon: Radio, state: "ready", detail: "SMS fallback to 112 configured" },
  { labelKey: "Shelter directory", icon: Shield, state: "ready", detail: "1,842 shelters synced" },
  { labelKey: "Weather nowcast cache", icon: Clock, state: "pending", detail: "Last synced 14 hrs ago · reconnect to refresh" },
];

// ---------- Page ----------

function SurvivalKitPage() {
  const { t } = useLanguage();

  const offlineStateMap = {
    ready: { badge: "success" as const, label: t("survivalKit.ready") },
    partial: { badge: "warning" as const, label: t("survivalKit.inProgress") },
    pending: { badge: "muted" as const, label: t("survivalKit.needsSync") },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge variant="success" pulse>
            <WifiOff className="h-3 w-3" />
            {t("survivalKit.worksOffline")}
          </StatusBadge>
          <StatusBadge variant="info">{t("survivalKit.lastSynced")}</StatusBadge>
        </div>
        <SectionHeader
          eyebrow={t("survivalKit.eyebrow")}
          title={t("survivalKit.title")}
          description={t("survivalKit.description")}
          className="!gap-3"
        />
      </div>

      {/* Emergency contacts */}
      <Section title={t("survivalKit.emergencyContactsTitle")} description={t("survivalKit.emergencyContactsDesc")} icon={Phone}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_DEFS.map((c, i) => {
            const ts = TONE_STYLES[c.tone];
            const Icon = c.icon;
            return (
              <motion.a
                key={c.labelKey}
                href={`tel:${c.number.replace(/[^\d+]/g, "")}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.2) }}
                className={cn(
                  "group flex flex-col rounded-2xl border bg-card p-4 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]",
                  ts.border,
                )}
              >
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", ts.bg, ts.text)}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-xs text-muted-foreground">{t(c.labelKey)}</p>
                <p className="text-2xl font-bold tracking-tight text-foreground">{c.number}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t(c.hintKey)}</p>
              </motion.a>
            );
          })}
        </div>
      </Section>

      {/* First aid */}
      <Section
        title={t("survivalKit.firstAidTitle")}
        description={t("survivalKit.firstAidDesc")}
        icon={HeartPulse}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {FIRST_AID_DEFS.map((g) => {
            const ts = TONE_STYLES[g.tone];
            const Icon = g.icon;
            return (
              <div
                key={g.titleKey}
                className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", ts.bg, ts.text)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">{t(g.titleKey)}</h3>
                </div>
                <ol className="mt-4 space-y-2">
                  {g.stepKeys.map((sk, i) => (
                    <li key={sk} className="flex gap-3 text-sm text-foreground">
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                          ts.bg,
                          ts.text,
                        )}
                      >
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{t(sk)}</span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Flood safety checklist */}
      <Section
        title={t("survivalKit.floodSafetyTitle")}
        description={t("survivalKit.floodSafetyDesc")}
        icon={ShieldAlert}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-success/30 bg-success/5 p-5">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="h-5 w-5" />
              <h3 className="text-base font-semibold">{t("survivalKit.do")}</h3>
            </div>
            <ul className="mt-3 space-y-2">
              {SAFETY_DO_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="text-base font-semibold">{t("survivalKit.dont")}</h3>
            </div>
            <ul className="mt-3 space-y-2">
              {SAFETY_DONT_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-2 text-sm text-foreground">
                  <CircleDot className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Emergency bag */}
      <Section
        title={t("survivalKit.bagTitle")}
        description={t("survivalKit.bagDesc")}
        icon={Backpack}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {GO_BAG_DEFS.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.categoryKey}
                className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">{t(g.categoryKey)}</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {g.itemKeys.map((ik) => (
                    <li key={ik} className="flex items-start gap-2 text-sm text-foreground">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 shrink-0 rounded border-border accent-primary"
                        aria-label={t(ik)}
                      />
                      <span>{t(ik)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Downloaded advisories */}
      <Section
        title={t("survivalKit.advisoriesTitle")}
        description={t("survivalKit.advisoriesDesc")}
        icon={FileDown}
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
          <ul className="divide-y divide-border">
            {DOWNLOADED_ADVISORIES.map((a) => (
              <li key={a.title} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-info/10 text-info">
                    <FileDown className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{a.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {a.source} · {a.size} · updated {a.updated}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:justify-end">
                  {a.status === "ready" ? (
                    <StatusBadge variant="success">
                      <CheckCircle2 className="h-3 w-3" />
                      {t("survivalKit.readyOffline")}
                    </StatusBadge>
                  ) : (
                    <StatusBadge variant="warning" pulse>
                      {t("survivalKit.updating")}
                    </StatusBadge>
                  )}
                  <button
                    type="button"
                    className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {t("survivalKit.openBtn")}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Offline resource status */}
      <Section
        title={t("survivalKit.offlineStatusTitle")}
        description={t("survivalKit.offlineStatusDesc")}
        icon={WifiOff}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {OFFLINE_STATUS_DEFS.map((r) => {
            const Icon = r.icon;
            const map = offlineStateMap[r.state];
            return (
              <div
                key={r.labelKey}
                className="flex items-start justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{r.labelKey}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{r.detail}</p>
                  </div>
                </div>
                <StatusBadge variant={map.badge} pulse={r.state === "partial"}>
                  {map.label}
                </StatusBadge>
              </div>
            );
          })}
        </div>
      </Section>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        {t("survivalKit.tip")}
      </p>
    </div>
  );
}

function Section({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">{title}</h2>
          <p className="text-xs text-muted-foreground sm:text-sm">{description}</p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
