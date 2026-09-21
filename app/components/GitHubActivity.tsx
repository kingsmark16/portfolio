"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowRight, BookOpen, CalendarDays, Code2, Flame, GitBranch, RefreshCw, TrendingUp } from "lucide-react";

import AnimatedCount from "./AnimatedCount";

type Day = { date: string; count: number; level: number };
type ContributionPayload = { contributions: Day[]; total: Record<string, number> };
type Profile = { login: string; public_repos: number };
type Result<T> = { key: string; status: "ready"; data: T } | { key: string; status: "error" };

function usePublicData<T>(url: string, attempt: number, validate: (value: unknown) => T) {
 const key = url + ":" + attempt;
 const [result, setResult] = useState<Result<T> | null>(null);
 useEffect(() => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  let active = true;
  fetch(url, { signal: controller.signal })
   .then(async response => { if (!response.ok) throw new Error("Data unavailable"); return validate(await response.json()); })
   .then(data => { if (active) setResult({ key, status: "ready", data }); })
   .catch(() => { if (active) setResult({ key, status: "error" }); })
   .finally(() => clearTimeout(timeout));
  return () => { active = false; clearTimeout(timeout); controller.abort(); };
 }, [url, key, validate]);
 return result?.key === key ? result : null;
}

function validateProfile(value: unknown): Profile {
 const profile = value as Profile;
 if (!profile || typeof profile.login !== "string" || ![profile.public_repos].every(n => Number.isInteger(n) && n >= 0)) throw new Error("Invalid profile");
 return profile;
}

function validateContributions(value: unknown): ContributionPayload {
 const payload = value as ContributionPayload;
 if (!payload || !Array.isArray(payload.contributions) || payload.contributions.length === 0) throw new Error("Invalid contributions");
 const contributions = payload.contributions.map(day => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isInteger(day.count) || day.count < 0) throw new Error("Invalid day");
  return {date: day.date, count: day.count, level: Math.max(0, Math.min(4, Number(day.level) || 0))};
 }).sort((a,b) => a.date.localeCompare(b.date));
 return {contributions, total: payload.total ?? {}};
}

function makeCalendar(days: Day[]) {
 if (!days.length) return {weeks: [] as (Day | null)[][], months: [] as {label: string; index: number}[]};
 const start = new Date(days[0].date + "T00:00:00Z");
 start.setUTCDate(start.getUTCDate() - start.getUTCDay());
 const end = new Date(days[days.length - 1].date + "T00:00:00Z");
 const count = Math.ceil(((end.getTime() - start.getTime()) / 86400000 + 1) / 7);
 const lookup = new Map(days.map(day => [day.date, day]));
 const weeks = Array.from({length: count}, (_, week) => Array.from({length: 7}, (_, weekday) => {
  const date = new Date(start); date.setUTCDate(start.getUTCDate() + week * 7 + weekday);
  return lookup.get(date.toISOString().slice(0,10)) ?? null;
 }));
 const months = weeks.flatMap((week,index) => {
  const first = week.find(day => day?.date.endsWith("-01"));
  return first ? [{label: new Date(first.date + "T00:00:00Z").toLocaleDateString("en-US",{month:"short",timeZone:"UTC"}),index}] : [];
 });
 return {weeks, months};
}

export default function GitHubActivity() {
 const [year,setYear] = useState("last");
 const [attempt,setAttempt] = useState(0);
 const [selectedDate,setSelectedDate] = useState("");
 const profile = usePublicData("https://api.github.com/users/kingsmark16",attempt,validateProfile);
 const activity = usePublicData("https://github-contributions-api.jogruber.de/v4/kingsmark16?y=" + year,attempt,validateContributions);
 const data = activity?.status === "ready" ? activity.data : null;
 const stats = profile?.status === "ready" ? profile.data : null;
 const calendar = useMemo(() => makeCalendar(data?.contributions ?? []),[data]);
 const days = data?.contributions ?? [];
 const total = days.reduce((sum,day) => sum + day.count,0);
 const activeDays = days.filter(day => day.count > 0).length;
 let streak = 0, longest = 0;
 for (const day of days) { streak = day.count ? streak + 1 : 0; longest = Math.max(longest,streak); }
 const busiest = days.reduce<Day | null>((best,day) => !best || day.count > best.count ? day : best,null);
 const chosen = days.find(day => day.date === selectedDate) ?? days.at(-1);
 const currentYear = new Date().getFullYear();
 const years = ["last",...Array.from({length:6},(_,i) => String(currentYear-i))];
 const rangeLabel = year === "last" ? "the last year" : year;
 const metric = (value: number | undefined, failed: boolean) => value !== undefined ? <AnimatedCount value={value}/> : failed ? "Unavailable" : "Loading…";

 return <section className="section github-section" id="github" aria-labelledby="github-title">
  <div className="container github-inner">
   <div className="section-heading"><div><p className="eyebrow">Behind the Projects</p><h2 id="github-title">A little progress. Every day.</h2><p className="github-intro">The commits, experiments, and steady work behind what I build.</p></div><a className="button button-outline" href="https://github.com/kingsmark16" target="_blank" rel="noreferrer"><GitBranch aria-hidden="true"/>@kingsmark16 <ArrowRight aria-hidden="true"/></a></div>
   <div className="github-stats" aria-label="GitHub statistics">
    {[
     {icon:Code2,label:"Contributions",value:data ? total : undefined,failed:activity?.status==="error",note:year==="last"?"In the last year":"In "+year},
     {icon:BookOpen,label:"Public repositories",value:stats?.public_repos,failed:profile?.status==="error",note:"Projects & experiments"},
    ].map(({icon:Icon,label,value,failed,note}) => <article className="github-stat" key={label}><Icon aria-hidden="true"/><span>{label}</span><strong className={value===undefined?"github-stat-pending":undefined}>{metric(value,failed)}</strong><small>{note}</small></article>)}
   </div>
   {profile?.status==="error" && <p className="github-error" role="status">Profile statistics are temporarily unavailable. <button onClick={()=>setAttempt(n=>n+1)}>Retry statistics</button></p>}
   <div className="github-calendar-card">
    <div className="github-calendar-head"><div><h3>Contribution activity</h3><p role="status">{data ? <><AnimatedCount value={total}/> contributions in {rangeLabel}</> : activity?.status==="error" ? "Live activity is temporarily unavailable." : "Loading GitHub activity…"}</p></div><label className="github-year-filter">Show activity<select value={year} onChange={event=>{setYear(event.target.value);setSelectedDate("");}}>{years.map(option=><option value={option} key={option}>{option==="last"?"Last year":option}</option>)}</select></label></div>
    {data ? <>
     <div className="github-calendar-scroll" tabIndex={0} role="region" aria-label="Contribution calendar. Scroll horizontally on smaller screens. Use the date field below for daily counts.">
      <div className="github-calendar-chart" style={{"--weeks":calendar.weeks.length} as CSSProperties}>
       <div className="github-calendar-months" aria-hidden="true">{calendar.months.map(({label,index})=><span key={index} style={{gridColumn:index+1}}>{label}</span>)}</div>
       <div className="github-calendar-body"><div className="github-calendar-days" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></div><div className="github-calendar-grid" role="img" aria-label={total.toLocaleString()+" contributions across "+activeDays+" active days in "+rangeLabel}>{calendar.weeks.map((week,index)=><div className="github-calendar-week" key={index}>{week.map((day,weekday)=>day ? <span key={day.date} className="github-calendar-cell" data-level={day.level} title={day.count+" contributions on "+day.date}/> : <span key={"blank-"+weekday} className="github-calendar-cell github-calendar-empty"/>)}</div>)}</div>
      </div>
     </div>
     </div>
     <div className="github-calendar-foot"><label className="github-date-filter">Explore a day<input type="date" min={days[0]?.date} max={days.at(-1)?.date} value={chosen?.date ?? ""} onChange={event=>setSelectedDate(event.target.value)}/></label><p aria-live="polite">{chosen ? <><AnimatedCount value={chosen.count}/> contributions on {chosen.date}</> : ""}</p><div className="github-legend" aria-label="Lighter green means more contributions"><span>Less</span>{[0,1,2,3,4].map(level=><i key={level} data-level={level}/>)}<span>More</span></div></div>
    </> : <div className="github-calendar-state" role="status">{activity?.status==="error" ? <><CalendarDays aria-hidden="true"/><p>We couldn’t load the contribution graph.</p><button className="button button-outline" onClick={()=>setAttempt(n=>n+1)}><RefreshCw aria-hidden="true"/>Try again</button><a href="https://github.com/kingsmark16" target="_blank" rel="noreferrer">View activity on GitHub <ArrowRight aria-hidden="true"/></a></> : <><CalendarDays aria-hidden="true"/><p>Fetching the latest contributions…</p></>}</div>}
   </div>
   <div className="github-highlights">
    {[{icon:CalendarDays,label:"Active days",value:data?<AnimatedCount value={activeDays}/>:"—",text:"Days with at least one contribution"},{icon:Flame,label:"Longest streak",value:data?<><AnimatedCount value={longest}/> days</>:"—",text:"Consecutive active days in this range"},{icon:TrendingUp,label:"Busiest day",value:busiest?<AnimatedCount value={busiest.count}/>:"—",text:busiest?busiest.date:"Most contributions in one day"}].map(({icon:Icon,label,value,text})=><article key={label}><span className="icon-circle"><Icon aria-hidden="true"/></span><div><h3>{label}</h3><strong>{value}</strong><p>{text}</p></div></article>)}
   </div>
   <p className="github-source-note">Profile statistics from GitHub. Contribution history via <a href="https://github.com/grubersjoe/github-contributions-api" target="_blank" rel="noreferrer">GitHub Contributions API</a>. Activity reflects the visibility settings of the GitHub profile.</p>
  </div>
 </section>;
}
