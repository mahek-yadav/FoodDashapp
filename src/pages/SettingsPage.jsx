import { Bell, Globe2, Moon, Sun } from "lucide-react";
import PageTransition from "../components/common/PageTransition";
import SectionHeader from "../components/common/SectionHeader";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";

const languages = ["English", "Hindi", "Tamil", "Telugu", "Bengali", "Gujarati"];

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { profile, setProfile } = useUser();

  return (
    <PageTransition className="section-pad">
      <div className="page-shell">
        <SectionHeader eyebrow="Settings" title="Preferences" />
        <div className="grid gap-5 lg:grid-cols-2">
          <section className="glass-panel rounded-[30px] p-6">
            <h2 className="flex items-center gap-2 font-display text-2xl font-black">
              {theme === "dark" ? <Moon size={22} /> : <Sun size={22} />} Theme
            </h2>
            <div className="mt-5 flex rounded-full bg-ink-950/5 p-1 dark:bg-white/10">
              {["dark", "light"].map((mode) => (
                <button
                  type="button"
                  key={mode}
                  onClick={() => (theme !== mode ? toggleTheme() : null)}
                  className={[
                    "flex-1 rounded-full px-5 py-3 text-sm font-black capitalize transition",
                    theme === mode ? "bg-flame-gradient text-ink-950" : "text-ink-700 dark:text-cream/65",
                  ].join(" ")}
                >
                  {mode}
                </button>
              ))}
            </div>
          </section>

          <section className="glass-panel rounded-[30px] p-6">
            <h2 className="flex items-center gap-2 font-display text-2xl font-black">
              <Globe2 size={22} /> Language
            </h2>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {languages.map((language) => (
                <button
                  type="button"
                  key={language}
                  onClick={() => setProfile((current) => ({ ...current, language }))}
                  className={[
                    "rounded-2xl border px-4 py-3 text-left text-sm font-bold transition",
                    profile.language === language
                      ? "border-flame-400 bg-flame-400/15"
                      : "border-ink-900/10 bg-white/65 dark:border-white/10 dark:bg-white/[0.06]",
                  ].join(" ")}
                >
                  {language}
                </button>
              ))}
            </div>
          </section>

          <section className="glass-panel rounded-[30px] p-6 lg:col-span-2">
            <h2 className="flex items-center gap-2 font-display text-2xl font-black">
              <Bell size={22} /> Notifications
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["Order updates", "Offers", "Recommendations"].map((label) => (
                <label key={label} className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 text-sm font-bold dark:bg-white/10">
                  {label}
                  <input type="checkbox" defaultChecked className="h-5 w-5 accent-flame-500" />
                </label>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
