"use client";

import { memo } from "react";
import { CheckCircle2, AlertCircle, TrendingUp, Users, Globe, Instagram, Linkedin } from "lucide-react";

const AuditDashboard = memo(() => {
  const auditData = {
    website: {
      score: 68,
      status: "Needs Optimization",
      positives: ["Functional booking form", "Clear service listing", "Good domain authority"],
      negatives: ["Slow mobile load speed", "Outdated UI/UX", "Missing SEO meta tags"],
      recommendations: ["Migrate to Next.js for speed", "Redesign with premium theme", "Optimize for Ghana local SEO"],
    },
    instagram: {
      score: 45,
      status: "Growth Opportunity",
      metrics: { followers: "1.2k", engagement: "1.2%", posts: "3/week" },
      negatives: ["Inconsistent visual brand", "Low video/reels usage", "Generic captions"],
      recommendations: ["Switch to high-end safari visuals", "Implement 5x weekly Reels strategy", "Use community-driven storytelling"],
    },
    linkedin: {
      score: 30,
      status: "Underutilized",
      metrics: { followers: "150", engagement: "0.5%", reach: "Low" },
      negatives: ["Irregular posting", "Missing corporate value prop", "Low B2B interaction"],
      recommendations: ["Position as travel experts in Ghana", "Share MICE/Corporate success stories", "Direct outreach to corporate partners"],
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-10">
      {/* Header */}
      <div className="mb-16 reveal">
        <p className="font-mono-tag text-ink-muted mb-4">[ Strategic Audit — Q2 2025 ]</p>
        <h1 className="font-display text-5xl md:text-7xl leading-[0.85] text-ink dark:text-teal mb-6">
          Marketing Audit: <span className="font-serif text-blue dark:text-white">Lamaira Travel.</span>
        </h1>
        <p className="text-ink-soft text-lg md:text-xl max-w-3xl leading-relaxed">
          We analyzed your digital presence across three core channels. While you have a solid foundation,
          there are significant gaps in visual premiumness and conversion optimization that we can bridge.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Website Audit */}
        <div className="reveal">
          <div className="h-full border border-ink/10 p-8 md:p-10 bg-paper-deep/20 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="p-3 bg-teal/10 rounded-xl text-teal">
                <Globe size={24} />
              </div>
              <div className="text-right">
                <span className="block font-mono-tag text-xs text-ink-muted uppercase">Health Score</span>
                <span className="font-display text-3xl text-teal">{auditData.website.score}%</span>
              </div>
            </div>

            <h3 className="font-display text-3xl text-ink mb-2">Website Audit</h3>
            <p className="text-ink-muted font-mono-tag text-xs mb-8 uppercase tracking-widest">{auditData.website.status}</p>

            <div className="space-y-6 flex-grow">
              <div>
                <p className="font-mono-tag text-xs text-ink-muted mb-3">KEY ISSUES</p>
                <ul className="space-y-2">
                  {auditData.website.negatives.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-soft">
                      <AlertCircle size={14} className="mt-1 text-coral shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono-tag text-xs text-ink-muted mb-3">ROADMAP</p>
                <ul className="space-y-2">
                  {auditData.website.recommendations.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-soft">
                      <TrendingUp size={14} className="mt-1 text-blue shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram Audit */}
        <div className="reveal">
          <div className="h-full border border-ink/10 p-8 md:p-10 bg-paper-deep/20 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="p-3 bg-coral/10 rounded-xl text-coral">
                <Instagram size={24} />
              </div>
              <div className="text-right">
                <span className="block font-mono-tag text-xs text-ink-muted uppercase">Brand Score</span>
                <span className="font-display text-3xl text-coral">{auditData.instagram.score}%</span>
              </div>
            </div>

            <h3 className="font-display text-3xl text-ink mb-2">Social: Instagram</h3>
            <p className="text-ink-muted font-mono-tag text-xs mb-8 uppercase tracking-widest">{auditData.instagram.status}</p>

            {/* Simple SVG Chart */}
            <div className="mb-8 p-4 bg-white/50 rounded-lg">
              <p className="font-mono-tag text-[10px] text-ink-muted mb-2 uppercase">Engagement (Last 30 Days)</p>
              <svg viewBox="0 0 100 30" className="w-full h-12 overflow-visible">
                <path d="M0,25 Q15,20 25,22 T45,15 T65,18 T85,5 T100,8" fill="none" stroke="#FF6B4A" strokeWidth="2" />
                <circle cx="100" cy="8" r="2" fill="#FF6B4A" />
              </svg>
            </div>

            <div className="space-y-6 flex-grow">
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div>
                  <p className="text-xs font-mono-tag text-ink-muted mb-1">Followers</p>
                  <p className="font-display text-xl text-ink">{auditData.instagram.metrics.followers}</p>
                </div>
                <div>
                  <p className="text-xs font-mono-tag text-ink-muted mb-1">Engage</p>
                  <p className="font-display text-xl text-ink">{auditData.instagram.metrics.engagement}</p>
                </div>
                <div>
                  <p className="text-xs font-mono-tag text-ink-muted mb-1">Posts</p>
                  <p className="font-display text-xl text-ink">{auditData.instagram.metrics.posts}</p>
                </div>
              </div>

              <div>
                <p className="font-mono-tag text-xs text-ink-muted mb-3">STRATEGY SHIFT</p>
                <ul className="space-y-2">
                  {auditData.instagram.recommendations.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-soft">
                      <CheckCircle2 size={14} className="mt-1 text-teal shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* LinkedIn Audit */}
        <div className="reveal">
          <div className="h-full border border-ink/10 p-8 md:p-10 bg-paper-deep/20 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="p-3 bg-blue/10 rounded-xl text-blue">
                <Linkedin size={24} />
              </div>
              <div className="text-right">
                <span className="block font-mono-tag text-xs text-ink-muted uppercase">B2B Score</span>
                <span className="font-display text-3xl text-blue">{auditData.linkedin.score}%</span>
              </div>
            </div>

            <h3 className="font-display text-3xl text-ink mb-2">Corporate: LinkedIn</h3>
            <p className="text-ink-muted font-mono-tag text-xs mb-8 uppercase tracking-widest">{auditData.linkedin.status}</p>

            <div className="space-y-6 flex-grow">
              <div className="p-6 border border-blue/20 bg-blue/5 mb-6">
                <p className="text-sm italic text-blue-light">"Major opportunity to capture corporate travel contracts and MICE events in the Accra business hub through a structured LinkedIn presence."</p>
              </div>

              <div>
                <p className="font-mono-tag text-xs text-ink-muted mb-3">ACTION PLAN</p>
                <ul className="space-y-2">
                  {auditData.linkedin.recommendations.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-soft">
                      <TrendingUp size={14} className="mt-1 text-blue shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="mt-20 p-8 md:p-12 border-t border-ink/10 flex flex-col md:flex-row items-center justify-between gap-8 reveal">
        <div className="max-w-2xl text-center md:text-left">
          <h4 className="font-display text-3xl text-ink mb-4">Ready to fix these gaps?</h4>
          <p className="text-ink-soft">Our proposal is designed to solve every issue identified in this audit within the next 90 days. Let&apos;s build a digital presence that matches your service quality.</p>
        </div>
        <a href="/#contact" className="pill-cta">Get the Full Proposal →</a>
      </div>
    </div>
  );
});

AuditDashboard.displayName = "AuditDashboard";

export default AuditDashboard;
