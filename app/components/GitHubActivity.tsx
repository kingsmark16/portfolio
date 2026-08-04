"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Code2 } from "lucide-react";

type GithubContribution = {
  date: string;
  count: number;
  level: number;
};

type GithubPayload = {
  contributions?: GithubContribution[];
  total?: Record<string, number>;
};

type GithubData = {
  contributions: GithubContribution[];
  total: number;
  year: string;
};

function normalizePayload(payload: GithubPayload, year: string): GithubData {
  const contributions = (payload.contributions ?? []).map((item) => ({
    date: item.date,
    count: Number(item.count) || 0,
    level: Math.max(0, Math.min(4, Number(item.level) || 0)),
  }));
  const totalEntries = Object.entries(payload.total ?? {});
  const total = payload.total?.[year] ?? payload.total?.lastYear ?? totalEntries.at(-1)?.[1] ?? contributions.reduce((sum, item) => sum + item.count, 0);

  return { contributions, total, year };
}

function buildCalendar(contributions: GithubContribution[]) {
  const byDate = new Map(contributions.map((item) => [item.date, item]));
  const latestDate = contributions.map((item) => item.date).sort().at(-1) ?? new Date().toISOString().slice(0, 10);
  const end = new Date(`${latestDate}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay()));
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 370);

  const weeks = Array.from({ length: 53 }, (_, weekIndex) =>
    Array.from({ length: 7 }, (_, dayIndex) => {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + weekIndex * 7 + dayIndex);
      const isoDate = date.toISOString().slice(0, 10);
      const contribution = byDate.get(isoDate);
      return { date: isoDate, count: contribution?.count ?? 0, level: contribution?.level ?? 0 };
    }),
  );

  const monthLabels = weeks.flatMap((week, index) => {
    const firstOfMonth = week.find((day) => day.date.endsWith("-01"));
    return firstOfMonth
      ? [{ label: new Date(`${firstOfMonth.date}T00:00:00Z`).toLocaleString("en-US", { month: "short", timeZone: "UTC" }), index }]
      : [];
  });

  return { weeks, monthLabels };
}

export default function GitHubActivity() {
  const currentYear = new Date().getFullYear();
  const years = ["last", ...Array.from({ length: 6 }, (_, index) => String(currentYear - index))];
  const [selectedYear, setSelectedYear] = useState("last");
  const [data, setData] = useState<GithubData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;

    fetch(`https://github-contributions-api.jogruber.de/v4/kingsmark16?y=${selectedYear}`)
      .then(async (response) => {
        if (!response.ok) throw new Error("GitHub contribution request failed");
        return normalizePayload((await response.json()) as GithubPayload, selectedYear);
      })
      .then((nextData) => {
        if (!active) return;
        setData(nextData);
        setStatus("ready");
      })
      .catch(() => {
        if (active) setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [selectedYear]);

  const calendar = useMemo(() => buildCalendar(data?.contributions ?? []), [data]);
  const year = data?.year ?? selectedYear;
  const contributionCount = data?.total ?? 0;
  const rangeLabel = year === "last" ? "the last year" : year;
  const heading = status === "ready" ? `${contributionCount.toLocaleString()} contributions in ${rangeLabel}` : status === "loading" ? "Loading GitHub contributions" : "GitHub contributions";
  const handleYearChange = (nextYear: string) => {
    setStatus("loading");
    setSelectedYear(nextYear);
  };

  return (
    <section className="github-activity section-block" aria-labelledby="github-activity-title">
      <div className="github-activity-heading">
        <div className="section-heading compact-heading">
          <div><p>Open source activity</p><h2 id="github-activity-title">Code in motion</h2></div>
        </div>
        <a className="github-profile-link" href="https://github.com/kingsmark16" target="_blank" rel="noreferrer"><Code2 size={16} aria-hidden="true" /> View GitHub profile <ArrowRight size={15} aria-hidden="true" /></a>
      </div>
      <div className="github-calendar-card">
        <div className="github-calendar-head"><strong>{heading}</strong><label className="github-year-filter"><span>Range</span><select aria-label="Contribution calendar range" value={selectedYear} onChange={(event) => handleYearChange(event.target.value)}>{years.map((yearOption) => <option value={yearOption} key={yearOption}>{yearOption === "last" ? "Default" : yearOption}</option>)}</select></label></div>
        <div className="github-calendar-scroll" aria-label="GitHub contribution calendar">
          <div className="github-calendar-months" aria-hidden="true">
            {calendar.monthLabels.map(({ label, index }) => <span key={`${label}-${index}`} style={{ gridColumn: index + 1 }}>{label}</span>)}
          </div>
          <div className="github-calendar-body">
            <div className="github-calendar-days" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></div>
            <div className="github-calendar-grid">
              {calendar.weeks.map((week, weekIndex) => (
                <div className="github-calendar-week" key={`week-${weekIndex}`}>
                  {week.map((day) => <span className="github-calendar-cell" data-level={day.level} key={day.date} role="img" aria-label={`${day.count} contributions on ${day.date}`} title={`${day.count} contributions on ${day.date}`} />)}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="github-calendar-foot"><span aria-live="polite">{status === "ready" ? "Public activity from GitHub" : status === "loading" ? "Loading live activity…" : "Could not load live data. View the GitHub profile for the latest activity."}</span><span className="github-legend"><em>Less</em><i data-level="0" /><i data-level="1" /><i data-level="2" /><i data-level="3" /><i data-level="4" /><em>More</em></span></div>
      </div>
    </section>
  );
}
