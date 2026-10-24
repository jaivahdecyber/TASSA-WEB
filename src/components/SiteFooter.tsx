import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const columns = [
  { title: 'Association', links: [{ label: 'About TASSA', to: '/about' }, { label: 'News & announcements', to: '/news' }, { label: 'Events calendar', to: '/events' }, { label: 'Contact', to: '/contact' }] },
  { title: 'Schools', links: [{ label: 'Register school', to: '/registration' }, { label: 'Confirm participation', to: '/participation' }, { label: 'Registered schools', to: '/registered-schools' }, { label: 'Payment status', to: '/payment-status' }] },
  { title: 'Resources', links: [{ label: 'View results', to: '/results' }, { label: 'Submit results', to: '/submit-results' }, { label: 'Study materials', to: '/store' }, { label: 'Help & FAQs', to: '/help' }] },
];
export function SiteFooter() {
  return <footer className="bg-footer text-footer-foreground border-t border-footer-foreground/10">
    <div className="page-shell py-12 lg:py-16">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 mb-10 border-b border-footer-foreground/20">
        <Link to="/" className="flex items-start gap-3 max-w-xl"><GraduationCap className="h-9 w-9 shrink-0 text-warning" /><div><p className="text-xl font-bold">TASSA</p><p className="text-sm text-footer-foreground/80 mt-1">Tanzania Advanced Socratic Schools Association</p></div></Link>
        <Button asChild variant="outline" className="self-start border-footer-foreground/30 bg-transparent text-footer-foreground hover:bg-footer-foreground hover:text-footer"><Link to="/news">Association updates<ArrowUpRight /></Link></Button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {columns.map(column => <nav key={column.title} aria-label={`Footer ${column.title}`}><h3 className="text-sm font-semibold mb-5">{column.title}</h3><ul className="space-y-3">{column.links.map(l => <li key={l.to}><Link to={l.to} className="text-sm text-footer-foreground/70 hover:text-footer-foreground transition-colors">{l.label}</Link></li>)}</ul></nav>)}
        <div><h3 className="text-sm font-semibold mb-5">Contact</h3><address className="not-italic space-y-3 text-sm text-footer-foreground/70"><a href="mailto:info@tassa.or.tz" className="flex gap-2 items-start break-all hover:text-footer-foreground"><Mail className="h-4 w-4 shrink-0 mt-0.5" />info@tassa.or.tz</a><a href="tel:+255752837561" className="flex items-start gap-2 hover:text-footer-foreground"><Phone className="h-4 w-4 shrink-0 mt-0.5" /><span>+255 752 837 561</span></a><p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 mt-0.5" /><span>Geita – Tanzania</span></p></address></div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-5 mt-10 pt-6 border-t border-footer-foreground/20 text-xs text-footer-foreground/65"><p>© {new Date().getFullYear()} TASSA. All rights reserved.</p><nav aria-label="Legal" className="flex flex-wrap gap-5"><Link to="/legal#terms" className="hover:text-footer-foreground">Terms & conditions</Link><Link to="/legal#privacy" className="hover:text-footer-foreground">Privacy policy</Link><Link to="/legal#cookies" className="hover:text-footer-foreground">Cookies</Link></nav></div>
    </div>
  </footer>;
}
export default SiteFooter;
