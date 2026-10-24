import { useEffect, useState } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface ExamSetting {
  exam_date: string;
  series_name: string;
}

const ExamCountdown = () => {
  const [examSetting, setExamSetting] = useState<ExamSetting | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch active exam setting from database
  useEffect(() => {
    const fetchExamSetting = async () => {
      const { data, error } = await supabase
        .from('exam_settings')
        .select('exam_date, series_name')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        setExamSetting(data);
      }
      setLoading(false);
    };

    fetchExamSetting();
  }, []);

  useEffect(() => {
    if (!examSetting) return;

    const examDate = new Date(examSetting.exam_date);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = examDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [examSetting]);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="text-center min-w-0">
      <div className="bg-primary-light text-primary rounded-md h-14 sm:h-16 flex items-center justify-center tabular-nums">
        <span className="text-xl sm:text-2xl font-bold">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-xs text-muted-foreground block mt-2">{label}</span>
    </div>
  );

  if (loading || !examSetting || isExpired) return null;
  const examDate = new Date(examSetting.exam_date);
  return (
    <section aria-label="Examination countdown" className="py-8 border-b border-border flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
      <div>
        <p className="section-label flex items-center gap-2 mb-2"><Calendar className="h-4 w-4" />Countdown to</p>
        <h2 className="text-xl font-bold">{examSetting.series_name}</h2>
        <p className="text-sm text-muted-foreground flex items-start gap-2 mt-2"><Clock className="h-4 w-4 shrink-0 mt-0.5" />{examDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      <div className="grid grid-cols-4 gap-3 w-full max-w-sm shrink-0">
        <TimeBlock value={timeLeft.days} label="Days" />
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <TimeBlock value={timeLeft.minutes} label="Minutes" />
        <TimeBlock value={timeLeft.seconds} label="Seconds" />
      </div>
    </section>
  );
};
export default ExamCountdown;
