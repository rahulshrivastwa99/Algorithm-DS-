import { Briefcase, MapPin, Calendar, ArrowRight, MoreVertical, Pause, Play, XCircle, CheckCircle2, Eye, Share2, Linkedin, MessageCircle, Copy } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { JobStatusBadge, JobStatus } from "@/components/employer/dashboard/JobStatusBadge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import API_BASE_URL from "../../../config/api";
import { useToast } from "@/components/ui/use-toast";

const JPAL: Record<string, { from: string; to: string; border: string }> = {
  "Full-time": { from: "#10b981", to: "#059669", border: "#10b98130" },
  "Part-time": { from: "#f59e0b", to: "#d97706", border: "#f59e0b30" },
  Contract: { from: "#8b5cf6", to: "#7c3aed", border: "#8b5cf630" },
  Remote: { from: "#06b6d4", to: "#0891b2", border: "#06b6d430" },
  Internship: { from: "#ec4899", to: "#db2777", border: "#ec489930" },
};

export function SmartJobCard({ job, jobCandidates, onClick, onStatusUpdate }: any) {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const p = JPAL[job.type] || { from: "#6366f1", to: "#4f46e5", border: "#6366f130" };
  const count = jobCandidates.length;
  // 🔥 SMART MATCH: Prioritize Interview Score, then ATS Match Score
  const getEffScore = (c: any) => c.interviewScore ?? c.aiMatchScore ?? 0;
  
  const scored = jobCandidates.filter((c: any) => getEffScore(c) > 0);
  const avgMatch = scored.length > 0 ? Math.round(scored.reduce((a: number, c: any) => a + getEffScore(c), 0) / scored.length) : 0;
  
  const hColor = avgMatch >= 70 ? "#10b981" : avgMatch >= 45 ? "#6366f1" : avgMatch > 0 ? "#f59e0b" : "#94a3b8";
  const hLabel = avgMatch >= 70 ? "Excellent Match" : avgMatch >= 45 ? "Good Match" : avgMatch > 0 ? "Under Review" : "No Data";
  const spark = Array.from({ length: 7 }, (_, i) => ({ i, v: Math.max(0, count * 0.3 + Math.sin(i * 0.9) * count * 0.3 + i * 0.3) }));
  const avatarColors = ["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#06b6d4"];

  const jobShortlisted = jobCandidates.filter((c: any) => ["Shortlisted", "Completed"].includes(c.status)).length;
  const jobRejected = jobCandidates.filter((c: any) => ["Rejected", "Disqualified"].includes(c.status)).length;
  const jobInReview = jobCandidates.filter((c: any) => ["Pending", "In Progress", "Interviewing", "Under Review"].includes(c.status)).length;
  
  const progress = count > 0 ? Math.round((jobShortlisted / count) * 100) : 0;
  
  const actionInsight = jobShortlisted > 0 
    ? `${jobShortlisted} candidate${jobShortlisted > 1 ? "s" : ""} ready for interview`
    : count > 0 
      ? "Hiring decision pending" 
      : "Waiting for applicants";

  const topCandidate = scored.length > 0 ? scored.reduce((a: any, b: any) => getEffScore(b) > getEffScore(a) ? b : a) : null;
  const daysOpen = Math.floor((Date.now() - new Date(job.createdAt).getTime()) / 86400000);

  // --- NEW LOGIC: URLs for Sharing ---
  const jobUrl = `${window.location.origin}/apply/${job._id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jobUrl);
    toast({ title: "Link Copied!", description: "Job apply link copied to clipboard." });
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`;
    window.open(linkedInUrl, '_blank');
  };

  const shareOnWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`We are hiring for ${job.title}! Apply here: ${jobUrl}`)}`;
    window.open(waUrl, '_blank');
  };
  // -----------------------------------

  const updateStatus = async (newStatus: JobStatus) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/${job._id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        toast({ title: "Status Updated", description: `Job is now ${newStatus.toLowerCase()}.` });
        if (onStatusUpdate) onStatusUpdate();
      } else {
        toast({ title: "Update Failed", description: "Could not update job status.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="group w-full relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl border-opacity-50">
      {/* Clickable Area */}
      <button onClick={onClick} className="absolute inset-0 w-full h-full text-left z-0" />
      
      <div className="p-5 relative z-10 pointer-events-none">
        <div className="flex items-start justify-between mb-4 gap-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary/10 border border-primary/20 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col items-end gap-1.5 pointer-events-auto">
            <div className="flex items-center gap-2">
              <JobStatusBadge status={job.status} />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 hover:bg-secondary rounded-md transition-colors">
                    <MoreVertical className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                  
                  {/* --- NEW UI: Preview & Share Features --- */}
                  <DropdownMenuItem 
                    onClick={() => window.open(`/candidate/interview/${job._id}?mode=preview`, '_blank')}
                    className="gap-2 text-xs font-semibold cursor-pointer text-primary bg-primary/5 focus:bg-primary/10 mb-1 rounded-lg"
                  >
                    <Eye className="w-4 h-4" /> Preview Interview
                  </DropdownMenuItem>

                  <div className="px-2 py-1.5 mb-1">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Share2 className="w-3 h-3" /> Share Link
                    </p>
                    <div className="flex items-center gap-2">
                      <button onClick={copyToClipboard} className="flex-1 flex justify-center p-1.5 bg-muted hover:bg-muted/80 rounded-md transition-colors" title="Copy Link">
                        <Copy className="w-4 h-4 text-foreground" />
                      </button>
                      <button onClick={shareOnLinkedIn} className="flex-1 flex justify-center p-1.5 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 rounded-md transition-colors" title="Share on LinkedIn">
                        <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                      </button>
                      <button onClick={shareOnWhatsApp} className="flex-1 flex justify-center p-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 rounded-md transition-colors" title="Share on WhatsApp">
                        <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      </button>
                    </div>
                  </div>
                  
                  <DropdownMenuSeparator className="my-1" />
                  {/* -------------------------------------- */}

                  {job.status === "ACTIVE" && (
                    <DropdownMenuItem onClick={() => updateStatus("PAUSED")} className="gap-2 text-xs font-semibold cursor-pointer rounded-lg">
                      <Pause className="w-3.5 h-3.5" /> Pause Job
                    </DropdownMenuItem>
                  )}
                  {(job.status === "PAUSED" || job.status === "CLOSED" || job.status === "DRAFT") && (
                    <DropdownMenuItem onClick={() => updateStatus("ACTIVE")} className="gap-2 text-xs font-semibold cursor-pointer rounded-lg">
                      <Play className="w-3.5 h-3.5" /> {job.status === "CLOSED" ? "Reopen Job" : "Publish Job"}
                    </DropdownMenuItem>
                  )}
                  {job.status !== "CLOSED" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10 cursor-pointer rounded-lg w-full mt-1">
                          <XCircle className="w-3.5 h-3.5" /> Close Job
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-2xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Close this job?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will stop all new applications and prevent interview scheduling. Data will remain read-only.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => updateStatus("CLOSED")}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
                          >
                            Close Job
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2">
              {job.type && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground border uppercase tracking-wider">{job.type}</span>}
              <span className="text-[9px] text-muted-foreground font-semibold">{daysOpen}d active</span>
            </div>
          </div>
        </div>
        
        <h3 className="font-bold text-foreground text-sm leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-1">{job.title}</h3>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-4 font-medium">
          {job.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>}
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(job.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
        </div>

        {/* Pipeline Overview Grid */}
        <div className="grid grid-cols-4 gap-1 mb-4 border-y border-border/50 py-3">
          {[
            { label: "Total", val: count, color: "text-foreground" },
            { label: "Shortlisted", val: jobShortlisted, color: "text-emerald-600" },
            { label: "In Review", val: jobInReview, color: "text-blue-600" },
            { label: "Rejected", val: jobRejected, color: "text-muted-foreground" }
          ].map(({ label, val, color }) => (
            <div key={label} className="text-center px-1">
              <span className={cn("block text-sm font-black tabular-nums", color)}>{val}</span>
              <span className="text-[8px] text-muted-foreground font-bold uppercase tracking-tighter">{label}</span>
            </div>
          ))}
        </div>

        {/* Hiring Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Hiring Progress</span>
            <span className="text-[10px] font-black text-primary">{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-500 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Action Insight */}
        <div className="mb-4 px-3 py-2 rounded-lg bg-muted/40 border border-border/50 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] font-bold text-foreground/80 tracking-tight">{actionInsight}</span>
        </div>
        
        {topCandidate && (
          <div className="flex items-center gap-2 mb-4 p-2 rounded-xl bg-secondary/30 border border-border/30">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-white flex-shrink-0 overflow-hidden bg-amber-500 shadow-sm">
              {topCandidate.candidateId?.profileImage ? (
                <img src={topCandidate.candidateId.profileImage} alt={topCandidate.candidateId.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              ) : (
                topCandidate.candidateId?.name?.charAt(0).toUpperCase() ?? "?"
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-foreground truncate">{topCandidate.candidateId?.name ?? "Top Candidate"}</p>
              <p className="text-[9px] text-muted-foreground">Match Score · {getEffScore(topCandidate)}%</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex">
              {count > 0 && jobCandidates.slice(0, 3).map((c: any, i: number) => {
                const name = c?.candidateId?.name || "Candidate";
                const img = c?.candidateId?.profileImage;
                return (
                  <div 
                    key={c._id || i} 
                    className="w-5 h-5 rounded-full border-2 border-card flex items-center justify-center text-[7px] font-black text-white overflow-hidden" 
                    style={{ marginLeft: i > 0 ? -6 : 0, zIndex: 10 - i, background: avatarColors[i % avatarColors.length] }}
                  >
                    {img ? (
                      <img src={img} alt={name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    ) : (
                      name.charAt(0).toUpperCase()
                    )}
                  </div>
                );
              })}
            </div>
            {count > 3 && <span className="text-[9px] text-muted-foreground">+{count - 3} more</span>}
            {count === 0 && <span className="text-[9px] text-muted-foreground italic">No applicants</span>}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all">
            Ranked List <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {isUpdating && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-50">
          <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}