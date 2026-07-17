import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/language-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { StatusBadge } from "@/components/status-badge";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [online] = useState(true);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useLanguage();

  const links = [
    { to: "/", key: "nav.home" },
    { to: "/report", key: "nav.report" },
    { to: "/shelters", key: "nav.shelters" },
    { to: "/alerts", key: "nav.alerts" },
    { to: "/survival-kit", key: "nav.survivalKit" },
    { to: "/about", key: "nav.about" },
    { to: "/settings", key: "nav.settings" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="text-2xl" aria-hidden>🌊</span>
          <span className="hidden text-base tracking-tight sm:inline">
            Telugu Flood Copilot
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {t(l.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <StatusBadge variant={online ? "success" : "muted"} pulse={online} className="hidden md:inline-flex">
            {online ? <><Wifi className="h-3 w-3" /> {t("common.online")}</> : <><WifiOff className="h-3 w-3" /> {t("common.offline")}</>}
          </StatusBadge>
          <div className="hidden md:block">
            <LanguageSelector />
          </div>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium",
                  pathname === l.to
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-accent",
                )}
              >
                {t(l.key)}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
              <LanguageSelector />
              <StatusBadge variant={online ? "success" : "muted"} pulse={online}>
                {online ? t("common.online") : t("common.offline")}
              </StatusBadge>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
