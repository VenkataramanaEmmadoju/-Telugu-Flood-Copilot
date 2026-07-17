import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Languages,
  Palette,
  WifiOff,
  Bell,
  Info,
  Sun,
  Moon,
  Monitor,
  CheckCircle2,
  Waves,
  Github,
  Mail,
  Database,
  MapPinned,
  RefreshCw,
  ShieldCheck,
  Volume2,
  Vibrate,
  MessageSquare,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { StatusBadge } from "@/components/status-badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useLanguage, type Lang } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Flood Copilot" },
      {
        name: "description",
        content:
          "Language, theme, offline cache, notifications and app information for Flood Copilot.",
      },
    ],
  }),
  component: SettingsPage,
});

type ThemeChoice = "light" | "dark" | "system";

const LANGUAGES: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
];

function SettingsPage() {
  const { lang, setLang, t } = useLanguage();
  const [theme, setTheme] = useState<ThemeChoice>("system");

  // Notifications
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [dailyBulletin, setDailyBulletin] = useState(true);
  const [shelterUpdates, setShelterUpdates] = useState(false);
  const [voiceAnnouncements, setVoiceAnnouncements] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [smsFallback, setSmsFallback] = useState(true);

  // Load persisted theme
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("tfc.theme") as ThemeChoice | null;
    if (saved) setTheme(saved);
  }, []);

  // Persist + apply theme
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("tfc.theme", theme);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = theme === "dark" || (theme === "system" && prefersDark);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [theme]);

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow={t("settings.eyebrow")}
        title={t("settings.title")}
        description={t("settings.description")}
      />

      {/* Language */}
      <SettingsSection
        icon={Languages}
        title={t("settings.language")}
        description={t("settings.languageDesc")}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {LANGUAGES.map((l) => {
            const active = l.code === lang;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l.code)}
                className={cn(
                  "flex flex-col items-start gap-1 rounded-2xl border p-4 text-left transition-all",
                  active
                    ? "border-primary bg-primary/5 shadow-[var(--shadow-soft)]"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm font-semibold">{l.label}</span>
                  {active && <CheckCircle2 className="h-4 w-4 text-primary" />}
                </div>
                <span className="text-lg font-medium text-foreground">{l.native}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {t("settings.currentlyIn")}{" "}
          <span className="font-medium text-foreground">{currentLang.native}</span>.
        </p>
      </SettingsSection>

      {/* Theme */}
      <SettingsSection
        icon={Palette}
        title={t("settings.theme")}
        description={t("settings.themeDesc")}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {([
            { key: "light" as ThemeChoice, labelKey: "settings.light", hintKey: "settings.lightHint", icon: Sun },
            { key: "dark" as ThemeChoice, labelKey: "settings.dark", hintKey: "settings.darkHint", icon: Moon },
            { key: "system" as ThemeChoice, labelKey: "settings.system", hintKey: "settings.systemHint", icon: Monitor },
          ]).map((item) => {
            const Icon = item.icon;
            const active = theme === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setTheme(item.key)}
                className={cn(
                  "flex items-start gap-3 rounded-2xl border p-4 text-left transition-all",
                  active
                    ? "border-primary bg-primary/5 shadow-[var(--shadow-soft)]"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{t(item.labelKey)}</span>
                    {active && <CheckCircle2 className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{t(item.hintKey)}</p>
                </div>
              </button>
            );
          })}
        </div>
      </SettingsSection>

      {/* Offline status */}
      <SettingsSection
        icon={WifiOff}
        title={t("settings.offline")}
        description={t("settings.offlineDesc")}
      >
        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success/15 text-success">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{t("settings.readyOffline")}</p>
                <p className="text-xs text-muted-foreground">{t("settings.lastSynced")}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              {t("settings.syncNow")}
            </Button>
          </div>

          <div className="mt-5 space-y-4">
            <StorageRow icon={MapPinned} label="Offline maps (Telangana)" used={324} total={512} unit="MB" />
            <StorageRow icon={Languages} label="Telugu language pack" used={82} total={82} unit="MB" done />
            <StorageRow icon={Database} label="AI decision model" used={210} total={310} unit="MB" />
            <StorageRow icon={Waves} label="Shelter & advisory database" used={44} total={44} unit="MB" done />
          </div>
        </div>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection
        icon={Bell}
        title={t("settings.notifications")}
        description={t("settings.notificationsDesc")}
      >
        <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
          <ToggleRow
            icon={AlertTriangle}
            title={t("settings.criticalAlerts")}
            description={t("settings.criticalAlertsDesc")}
            tone="danger"
            checked={criticalAlerts}
            onCheckedChange={setCriticalAlerts}
          />
          <ToggleRow
            icon={Bell}
            title={t("settings.dailyBulletin")}
            description={t("settings.dailyBulletinDesc")}
            checked={dailyBulletin}
            onCheckedChange={setDailyBulletin}
          />
          <ToggleRow
            icon={MapPinned}
            title={t("settings.shelterUpdates")}
            description={t("settings.shelterUpdatesDesc")}
            checked={shelterUpdates}
            onCheckedChange={setShelterUpdates}
          />
          <div className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t("settings.delivery")}
            </p>
            <div className="mt-2 divide-y divide-border rounded-xl border border-border">
              <ToggleRow
                icon={Volume2}
                title={t("settings.voiceAnnouncements")}
                description={t("settings.voiceAnnouncementsDesc")}
                checked={voiceAnnouncements}
                onCheckedChange={setVoiceAnnouncements}
                compact
              />
              <ToggleRow
                icon={Vibrate}
                title={t("settings.vibration")}
                description={t("settings.vibrationDesc")}
                checked={vibration}
                onCheckedChange={setVibration}
                compact
              />
              <ToggleRow
                icon={MessageSquare}
                title={t("settings.smsFallback")}
                description={t("settings.smsFallbackDesc")}
                checked={smsFallback}
                onCheckedChange={setSmsFallback}
                compact
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 p-4">
            <div>
              <p className="text-sm font-semibold">{t("settings.quietHours")}</p>
              <p className="text-xs text-muted-foreground">{t("settings.quietHoursDesc")}</p>
            </div>
            <Select defaultValue="none">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">{t("settings.quietOff")}</SelectItem>
                <SelectItem value="night">22:00 – 06:00</SelectItem>
                <SelectItem value="work">09:00 – 17:00</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SettingsSection>

      {/* Application version */}
      <SettingsSection
        icon={Info}
        title={t("settings.appVersion")}
        description={t("settings.appVersionDesc")}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <InfoTile label="Version" value="1.4.0" />
          <InfoTile label="Build" value="2026.07.16" />
          <InfoTile label="Channel" value="Stable" />
          <InfoTile label="Data pack" value="TS-Monsoon 2026.2" />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <StatusBadge variant="success">
              <CheckCircle2 className="h-3 w-3" />
              {t("settings.upToDate")}
            </StatusBadge>
            <span className="text-xs text-muted-foreground">{t("settings.lastSynced")}</span>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {t("settings.checkUpdates")}
          </Button>
        </div>
      </SettingsSection>

      {/* About */}
      <SettingsSection
        icon={Waves}
        title={t("settings.about")}
        description={t("settings.aboutDesc")}
      >
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-5 shadow-[var(--shadow-soft)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-xl">
              <p className="text-sm text-foreground">
                Built with citizens, volunteers, and district responders. Free to use, open source,
                and designed to work when the network doesn't.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                © {new Date().getFullYear()} Flood Copilot · MIT Licensed
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium hover:border-primary/40 hover:text-primary"
              >
                <Info className="h-4 w-4" />
                {t("settings.learnMore")}
              </a>
              <a
                href="https://github.com/VenkataramanaEmmadoju/Telugu-Flood-Copilot"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium hover:border-primary/40 hover:text-primary"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="mailto:hello@telugufloodcopilot.in"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium hover:border-primary/40 hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {t("settings.contact")}
              </a>
            </div>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
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
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ToggleRow({
  icon: Icon,
  title,
  description,
  checked,
  onCheckedChange,
  tone,
  compact,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  tone?: "danger";
  compact?: boolean;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4", compact ? "p-3" : "p-4")}>
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl",
            tone === "danger" ? "bg-destructive/10 text-destructive" : "bg-muted text-foreground",
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}

function StorageRow({
  icon: Icon,
  label,
  used,
  total,
  unit,
  done,
}: {
  icon: LucideIcon;
  label: string;
  used: number;
  total: number;
  unit: string;
  done?: boolean;
}) {
  const pct = Math.min(100, Math.round((used / total) * 100));
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {used} / {total} {unit} {done && "· complete"}
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full", done ? "bg-success" : "bg-primary")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
