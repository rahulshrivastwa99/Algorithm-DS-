import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { socket } from "../../lib/socket";
import API_BASE_URL from "../../config/api";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Plus,
  Users,
  Brain,
  Award,
  BarChart2,
  CheckCircle2,
  Video,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Import new Sub-Components
import { Section } from "./dashboard/DashboardSection";
import { IntelligenceGauge } from "./dashboard/IntelligenceGauge";
import { AnimatedDonut } from "./dashboard/CandidateDistribution";
import { SmartJobCard } from "./dashboard/SmartJobCard";
import { TalentCard } from "./dashboard/TalentSpotlight";
import { AnalyticsPanel } from "./dashboard/AnalyticsPanel";
import { LiveInterviewsHub } from "./dashboard/LiveInterviewsHub";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Activity } from "lucide-react";

// Types
import { JobStatus } from "@/components/employer/dashboard/JobStatusBadge";

interface Job {
  _id: string;
  title: string;
  type: string;
  location: string;
  createdAt: string;
  status: JobStatus;
}
interface CandidateApp {
  _id: string;
  status: string;
  interviewScore?: number;
  aiMatchScore?: number; // 👈 Naya field: Resume Match Score
  aiSummary?: string;
  appliedAt?: string;
  candidateId: { name: string; email: string; profileImage?: string };
  jobId: { _id: string; title: string };
  scheduledInterview?: {
    date: string;
    time: string;
    meetingLink?: string;
    status: string;
  };
}

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidates, setCandidates] = useState<CandidateApp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageReady, setPageReady] = useState(false);

  // FIX 1: User type ko strict banaya
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [selectedJob, setSelectedJob] = useState<string>("all-jobs");
  const [statusFilter, setStatusFilter] = useState<JobStatus | "ALL">("ALL");

  const fetchJobs = async (employerId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/api/jobs/employer/${employerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) setJobs(await response.json());
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchCandidates = async (employerId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/api/applications/employer/${employerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) setCandidates(await response.json());
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  // FIX 2: Yeh logic ab sirf EK BAAR chalega (Proper ID Extraction)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Backend MongoDB _id bhejta hai, toh usko safely nikal liya
      const currentUserId = parsedUser._id || parsedUser.id;

      if (currentUserId) {
        setUser({ id: currentUserId, name: parsedUser.name });

        // Data fetch karo
        Promise.all([
          fetchJobs(currentUserId),
          fetchCandidates(currentUserId),
        ]).finally(() => {
          setIsLoading(false);
          setTimeout(() => setPageReady(true), 80);
        });
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []); // <-- Empty array means it runs exactly once

  // FIX 3: Socket connection ekdum secure kar diya
  useEffect(() => {
    if (!user?.id) return; // Jab tak user set nahi hota, aage mat badho

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join-room", user.id);

    const handleUpdate = (data: any) => {
      if (
        data.type === "NEW_APPLICATION" ||
        data.type === "INTERVIEW_COMPLETED"
      ) {
        fetchCandidates(user.id);
        fetchJobs(user.id);
      }
    };

    socket.on("notification", handleUpdate);

    // CLEANUP: Jab component unmount ho, toh duplicate event listeners hata do
    return () => {
      socket.off("notification", handleUpdate);
    };
  }, [user?.id]); // <-- Sirf tab chalega jab user ID milegi

  // Derived State (Isko mat chhedna, iske aage ka code waisa hi rahega)
  const filteredJobs = useMemo(() => {
    if (statusFilter === "ALL") return jobs;
    return jobs.filter(
      (j) =>
        j.status === statusFilter || (statusFilter === "ACTIVE" && !j.status),
    );
  }, [jobs, statusFilter]);

  const filteredCandidates = useMemo(() => {
    if (selectedJob === "all-jobs") return candidates;
    return candidates.filter(
      (c) =>
        c.jobId?._id === selectedJob ||
        c.jobId?.title === selectedJob ||
        (c.jobId as any) === selectedJob,
    );
  }, [candidates, selectedJob]);

  const total = filteredCandidates.length;

  // Discrete Segments for Donut Chart
  const newAppliedCount = filteredCandidates.filter((c) =>
    ["Pending", "pending"].includes(c.status),
  ).length;
  const shortlistedCount = filteredCandidates.filter((c) =>
    ["Shortlisted", "shortlisted", "Completed", "completed"].includes(c.status),
  ).length;
  const rejectedCount = filteredCandidates.filter((c) =>
    ["Rejected", "rejected", "Disqualified", "disqualified"].includes(c.status),
  ).length;

  // AI Reviewed / In Review (everything that has been processed but not finalized as shortlist/reject)
  const reviewedCount =
    total - (newAppliedCount + shortlistedCount + rejectedCount);

  // Overall Metrics
  // 🔥 SMART METRIC: Use Interview Score if available, else use ATS Match Score
  const getDisplayScore = (c: CandidateApp) => c.interviewScore ?? c.aiMatchScore ?? 0;

  const avgScore =
    total > 0
      ? Math.round(
          filteredCandidates.reduce((a, c) => a + getDisplayScore(c), 0) /
            total,
        )
      : 0;

  // Rates
  const processedCount = total - newAppliedCount;
  const hireRate = total > 0 ? Math.round((shortlistedCount / total) * 100) : 0;
  const screenRate = total > 0 ? Math.round((processedCount / total) * 100) : 0;
  const automationRate = screenRate;

  const timeSaved = Math.max(0, Math.round((processedCount * 15) / 60));
  const workdays = Math.max(0, Math.round(timeSaved / 8));
  const costSaved = timeSaved * 45;

  const topCandidates = [...filteredCandidates]
    .filter((c) => getDisplayScore(c) >= 75)
    .sort((a, b) => getDisplayScore(b) - getDisplayScore(a))
    .slice(0, 3);
  const hiringScore = Math.min(
    100,
    Math.round(
      automationRate * 0.35 +
        screenRate * 0.25 +
        hireRate * 0.2 +
        Math.min(avgScore, 100) * 0.2,
    ),
  );

  const handleDonutClick = (key: string) => {
    let status = "all";
    // Map dashboard keys to Candidates status tabs
    if (key === "applied" || key === "screened") status = "In Review";
    else if (key === "shortlisted") status = "Shortlisted";
    else if (key === "rejected") status = "Rejected";

    const jobParam = selectedJob !== "all-jobs" ? `&job=${encodeURIComponent(selectedJob)}` : "";
    navigate(`/employer/candidates?status=${status}${jobParam}`);
  };

  const getCandidatesForJob = (jobId: string) =>
    candidates.filter(
      (c) => c.jobId?._id === jobId || (c.jobId as any) === jobId,
    );

  if (isLoading) {
    return (
      <DashboardLayout role="employer">
        <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-sm font-medium text-muted-foreground">
            Loading Employer Dashboard...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="employer">
      <div
        className="space-y-6 transition-all duration-500"
        style={{
          opacity: pageReady ? 1 : 0,
          transform: pageReady ? "translateY(0)" : "translateY(10px)",
        }}
      >
        {/* Header Section in Card */}
        <div className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 w-fit">
              Hiring Command Center
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              Welcome back,{" "}
              <span className="text-foreground font-bold">
                {user?.name || "Employer"}
              </span>
              . Your AI processed{" "}
              <span className="text-foreground font-bold">
                {processedCount} candidates
              </span>{" "}
              since last session.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="w-full sm:w-[240px]">
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger className="bg-background border-border h-11 shadow-sm text-xs font-bold rounded-xl">
                  <SelectValue placeholder="All Positions Overview" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border shadow-xl">
                  <SelectItem
                    value="all-jobs"
                    className="font-bold text-primary py-2.5 text-xs"
                  >
                    🌍 All Positions Overview
                  </SelectItem>
                  {Array.from(new Set(jobs.map((job) => job.title))).map(
                    (title, index) => {
                      if (!title) return null;
                      return (
                        <SelectItem
                          key={index}
                          value={title}
                          className="py-2 text-xs"
                        >
                          {title}
                        </SelectItem>
                      );
                    },
                  )}
                </SelectContent>
              </Select>
            </div>
            <Link to="/employer/create-job" className="w-full sm:w-auto">
              <Button className="w-full shadow-lg shadow-primary/20 gap-2 h-11 px-6 rounded-xl font-bold">
                <Plus className="w-4 h-4" /> Create New Job
              </Button>
            </Link>

            {/* LIVE HUB TRIGGER BUTTON */}
            <Sheet>
               <SheetTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto gap-2 h-11 px-6 rounded-xl font-bold border-emerald-200 bg-emerald-50/30 text-emerald-600 hover:bg-emerald-100/50 hover:text-emerald-700 transition-all shadow-sm">
                    <Activity className="w-4 h-4 animate-pulse" />
                    Live Interview Hub
                  </Button>
               </SheetTrigger>
               <SheetContent className="w-full sm:max-w-md bg-card border-l border-border p-0 overflow-hidden flex flex-col">
                  <SheetHeader className="p-6 border-b border-border bg-muted/20">
                     <SheetTitle className="text-xl font-black uppercase tracking-widest text-primary flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <Video className="w-5 h-5 text-primary" />
                        </div>
                        Live Command Hub
                     </SheetTitle>
                     <SheetDescription className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
                        Manage results and join live sessions
                     </SheetDescription>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                     <LiveInterviewsHub candidates={candidates} />
                  </div>
                  <div className="p-6 border-t border-border bg-muted/10">
                     <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider text-center opacity-40">
                         Yuvaan AI · Smart Scheduling
                     </p>
                  </div>
               </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Filtered Jobs",
              value:
                selectedJob === "all-jobs"
                  ? jobs.length
                  : jobs.filter(
                      (j) => j.title === selectedJob || j._id === selectedJob,
                    ).length,
              icon: Briefcase,
              color: "#6366f1",
            },
            {
              title: "Total Applicants",
              value: total,
              icon: Users,
              color: "#10b981",
            },
            {
              title: "Shortlisted",
              value: shortlistedCount,
              icon: Award,
              color: "#f59e0b",
            },
            {
              title: "Avg. Interview Score",
              value: `${avgScore}%`,
              icon: Brain,
              color: "#a855f7",
            },
          ].map(({ title, value, icon: Icon, color }) => (
            <div
              key={title}
              className="bg-card border border-border rounded-2xl p-5 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-10 blur-xl"
                style={{ background: color }}
              />
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{
                  background: `${color}18`,
                  border: `1px solid ${color}25`,
                }}
              >
                <Icon style={{ color, width: 18, height: 18 }} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">
                {title}
              </p>
              <p
                className="text-3xl font-black tabular-nums"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}99)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Candidate Distribution & AI Gauge */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <Section
              icon={BarChart2}
              iconColor="#6366f1"
              title="Candidate Distribution"
              subtitle="Interactive pipeline breakdown"
              className="h-full"
            >
              <AnimatedDonut
                values={[
                  newAppliedCount,
                  reviewedCount,
                  shortlistedCount,
                  rejectedCount,
                ]}
                onSegmentClick={handleDonutClick}
              />
            </Section>
          </div>
          <div className="lg:col-span-2">
            <Section
              icon={Brain}
              iconColor="#a855f7"
              title="AI Intelligence Score"
              subtitle="Composite hiring efficiency"
              className="h-full"
            >
              {total === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                  <Brain className="w-10 h-10 text-muted-foreground animate-pulse" />
                  <p className="text-sm text-muted-foreground">
                    Score activates once candidates apply
                  </p>
                </div>
              ) : (
                <div className="flex justify-center">
                  <IntelligenceGauge
                    score={hiringScore}
                    screenRate={screenRate}
                    hireRate={hireRate}
                    avgScore={avgScore}
                    automationRate={automationRate}
                  />
                </div>
              )}
            </Section>
          </div>
        </div>

        {/* Job Postings */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <h2 className="font-bold text-foreground text-sm uppercase tracking-wider">
                  Job Postings
                </h2>
              </div>
              <p className="text-xs text-muted-foreground">
                {filteredJobs.length} posting
                {filteredJobs.length !== 1 ? "s" : ""} · click any card to view
                ranked applicants
              </p>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3 bg-muted/50 p-1.5 rounded-xl border border-border/50">
                {["ALL", "ACTIVE", "PAUSED", "CLOSED", "DRAFT"].map((s) => {
                  const isActive = statusFilter === s;
                  const colorClasses: Record<string, string> = {
                    ALL: "bg-primary text-white shadow-primary/20",
                    ACTIVE: "bg-emerald-500 text-white shadow-emerald-500/20",
                    PAUSED: "bg-amber-500 text-white shadow-amber-500/20",
                    CLOSED: "bg-slate-600 text-white shadow-slate-600/20",
                    DRAFT: "bg-violet-600 text-white shadow-violet-600/20",
                  };

                  return (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s as any)}
                      className={cn(
                        "px-4 py-1.5 text-[10px] font-black rounded-lg transition-all duration-200 uppercase tracking-widest",
                        isActive
                          ? cn(colorClasses[s] || colorClasses.ALL, "shadow-lg")
                          : "text-muted-foreground hover:text-foreground hover:bg-muted",
                      )}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
            <Link
              to="/employer/create-job"
              className="flex items-center gap-1.5 text-sm text-primary font-bold hover:underline"
            >
              <Plus className="w-4 h-4" /> New Job
            </Link>
          </div>
          {filteredJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-4 border border-dashed border-border rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  No {statusFilter !== "ALL" ? statusFilter.toLowerCase() : ""}{" "}
                  jobs found
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {statusFilter === "ALL"
                    ? "Post your first job to activate AI screening"
                    : "Try adjusting your filters"}
                </p>
              </div>
              {statusFilter === "ALL" && (
                <Link to="/employer/create-job">
                  <Button size="sm" variant="outline">
                    <Plus className="w-3 h-3 mr-1" /> Post a Job
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredJobs.map((job) => (
                <SmartJobCard
                  key={job._id}
                  job={job}
                  jobCandidates={getCandidatesForJob(job._id)}
                  onClick={() =>
                    navigate(`/employer/jobs/${job._id}/applicants`)
                  }
                  onStatusUpdate={() => user?.id && fetchJobs(user.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Top Talent Spotlight */}
        {topCandidates.length > 0 && (
          <Section
            icon={Award}
            iconColor="#f59e0b"
            title="AI Top Talent Spotlight"
            subtitle={`${topCandidates.length} candidates scored ≥75%`}
            badge={
              <span className="flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                🔥 {topCandidates.length} Ready
              </span>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {topCandidates.map((c, i) => (
                <TalentCard key={c._id} candidate={c} index={i} />
              ))}
            </div>
          </Section>
        )}

        {/* AI Analytics Panel */}
        {(() => {
          const recentScores = [...filteredCandidates]
            .sort(
              (a, b) =>
                new Date(a.appliedAt).getTime() -
                new Date(b.appliedAt).getTime(),
            )
            .slice(-12)
            .map((c, i) => ({
              index: i,
              score: c.interviewScore || 0,
              name: c.candidateId?.name || "Candidate",
            }));

          return (
            <AnalyticsPanel
              automationRate={automationRate}
              screened={processedCount}
              hireRate={hireRate}
              total={total}
              timeSaved={timeSaved}
              workdays={workdays}
              costSaved={costSaved}
              avgScore={avgScore}
              newApplied={newAppliedCount}
              reviewed={reviewedCount}
              shortlisted={shortlistedCount}
              rejected={rejectedCount}
              recentScores={recentScores}
            />
          );
        })()}
      </div>
    </DashboardLayout>
  );
};

export default EmployerDashboard;
