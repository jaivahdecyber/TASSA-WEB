import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, ArrowRight, ArrowUpRight, Building2, CalendarDays, School, CheckSquare } from 'lucide-react';
import TassaAI from '@/components/TassaAI';
import { Reveal } from '@/components/Reveal';
import AchievementsSection from '@/components/AchievementsSection';
import ExamCountdown from '@/components/ExamCountdown';
import LeadershipSection from '@/components/LeadershipSection';
import ContentHighlights from '@/components/academic/ContentHighlights';
import classroomImage from '@/assets/tassa-classroom.jpg';
import founderImage from '@/assets/founder-daudi-manumba.jpg';
import { supabase } from '@/integrations/supabase/client';

const schoolActions = [
  { title: 'Register a school', to: '/registration', icon: School },
  { title: 'Confirm participation', to: '/participation', icon: CheckSquare },
  { title: 'Submit results', to: '/submit-results', icon: FileText },
  { title: 'Study materials', to: '/store', icon: BookOpen },
];

const HomePage = () => {
  const [schools, setSchools] = useState<{ id: string; school_name: string; region: string }[]>([]);
  const [schoolStatus, setSchoolStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  useEffect(() => {
    supabase.from('schools').select('id, school_name, region').order('school_name').then(({ data, error }) => {
      setSchools(data ?? []);
      setSchoolStatus(error ? 'error' : 'ready');
    });
  }, []);
  const rows = [schools.filter((_, i) => i % 2 === 0), schools.filter((_, i) => i % 2 === 1)];

  return <div className="bg-background">
    <TassaAI />
    <section className="relative isolate overflow-hidden text-hero-foreground">
      <img src={classroomImage} alt="Students studying together in a Tanzanian classroom" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" fetchPriority="high" />
      <div className="hero-photo-shade absolute inset-0 -z-10" />
      <div className="page-shell py-12 sm:py-16 lg:py-20">
        <p className="text-xs font-semibold uppercase mb-5 flex items-center gap-3"><span className="h-px w-8 bg-warning" />Together for academic excellence</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] max-w-3xl">Tanzania Advanced Socratic Schools Association</h1>
        <p className="text-base sm:text-lg text-hero-foreground/85 mt-6 max-w-xl leading-relaxed">Connecting schools, supporting teachers and celebrating academic achievement across Tanzania.</p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild size="lg" className="bg-warning text-warning-foreground hover:bg-warning/90"><Link to="/results">View results<ArrowUpRight /></Link></Button>
          <Button asChild size="lg" variant="outline" className="border-hero-foreground/50 text-hero-foreground bg-transparent hover:bg-hero-foreground hover:text-foreground"><Link to="/registration">Register your school<ArrowRight /></Link></Button>
        </div>
      </div>
    </section>
    <nav aria-label="School quick links" className="border-b border-border bg-card">
      <div className="page-shell grid grid-cols-2 lg:grid-cols-4">
        {schoolActions.map(a => <Link key={a.to} to={a.to} className="group flex items-center gap-3 py-6 pr-3 sm:pr-6 border-b lg:border-b-0 border-border hover:text-primary transition-colors"><a.icon className="h-6 w-6 shrink-0 text-primary" /><span className="font-semibold text-sm sm:text-base">{a.title}</span><ArrowUpRight className="h-4 w-4 ml-auto shrink-0 text-muted-foreground group-hover:text-primary" /></Link>)}
      </div>
    </nav>
    <div className="page-shell"><ExamCountdown /></div>
    <ContentHighlights />
    <section className="py-16 bg-secondary/50 border-b border-border">
      <div className="page-shell grid md:grid-cols-[240px_1fr] gap-8 md:gap-14 items-center max-w-5xl">
        <Reveal variant="up"><Link to="/about"><img src={founderImage} alt="Sir Daudi Musula Manumba, Co-Founder and Supervisor" className="w-56 h-64 object-cover object-top rounded-lg" loading="lazy" /></Link></Reveal>
        <Reveal variant="up"><p className="section-label mb-3">Our leadership</p><h2 className="text-3xl font-bold mb-6">Committed to education.<br />United by excellence.</h2><h3 className="text-xl font-semibold">Sir Daudi Musula Manumba</h3><p className="text-primary mt-2">Co-Founder &amp; Supervisor</p><Button asChild variant="outline" className="mt-6"><Link to="/about">About the association<ArrowUpRight /></Link></Button></Reveal>
      </div>
    </section>
    <LeadershipSection />
    <section className="py-16 bg-background overflow-hidden border-y border-border">
      <div className="page-shell">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8"><div><p className="section-label mb-3">Trusted by</p><h2 className="text-3xl font-bold">Schools across Tanzania</h2>{schoolStatus === 'ready' && schools.length > 0 && <p className="text-muted-foreground mt-3">{schools.length} registered schools. One shared commitment.</p>}</div><Button asChild variant="outline"><Link to="/registered-schools">School directory<ArrowUpRight /></Link></Button></div>
        {schoolStatus === 'loading' ? <p className="text-muted-foreground py-6">Loading registered schools…</p> : schoolStatus === 'error' ? <p className="text-muted-foreground py-6">The school directory is unavailable right now.</p> : !schools.length ? <p className="text-muted-foreground py-6">No schools registered yet.</p> : <div className="space-y-4">{rows.filter(row => row.length > 0).map((row, index) => <div key={index} className="overflow-hidden"><div className={`school-track flex w-max ${index === 0 ? 'animate-scroll-left' : 'animate-scroll-right'}`}>{[0,1].map(copy => <div key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex gap-4 pr-4">{row.map(s => <div key={s.id} className="flex items-center gap-3 w-72 min-h-20 shrink-0 rounded-lg border border-border bg-card px-4 py-3"><Building2 className="h-6 w-6 shrink-0 text-primary" /><div className="min-w-0"><p className="text-sm font-semibold break-words">{s.school_name}</p><p className="text-xs text-muted-foreground mt-1">{s.region}</p></div></div>)}</div>)}</div></div>)}</div>}
      </div>
    </section>
    <AchievementsSection />
    <section className="bg-secondary border-t border-border py-12"><div className="page-shell flex flex-col md:flex-row justify-between md:items-center gap-6"><div><p className="section-label mb-2">For your school</p><h2 className="text-2xl font-bold">Resources for the next step</h2></div><div className="flex flex-wrap gap-3"><Button asChild><Link to="/resources">School resource centre<ArrowUpRight /></Link></Button><Button asChild variant="outline"><Link to="/events"><CalendarDays />Events calendar</Link></Button></div></div></section>
  </div>;
};
export default HomePage;
