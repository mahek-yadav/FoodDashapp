import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "../components/common/PageTransition";

export default function NotFoundPage() {
  return (
    <PageTransition className="section-pad">
      <div className="page-shell">
        <div className="glass-panel mx-auto max-w-2xl rounded-[34px] p-8 text-center">
          <p className="text-sm font-black uppercase text-flame-600 dark:text-flame-300">404</p>
          <h1 className="mt-3 font-display text-4xl font-black text-ink-950 dark:text-cream">This page is off the menu</h1>
          <p className="mt-4 text-sm leading-6 text-ink-700 dark:text-cream/65">
            The FoodDash route you opened is unavailable.
          </p>
          <Link to="/" className="flame-button mt-7">
            <ArrowLeft size={18} /> Back home
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
