import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StatusBadge from "@/components/StatusBadge";
import API_BASE_URL from "../../config/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Loader2,
  Trophy,
  Users,
  Target,
  ChevronRight,
  Sparkles,
  MapPin,
  Calendar,
  Briefcase,
  Mail,
  Smartphone,
  Video,
  Clock
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- Types ---
interface InterviewData {
  _id: string;
  status: string;
  interviewScore?: number;
  appliedAt: string;
  rank?: number;
  candidateId?: {
    name: string;
    email: string;
    profileImage?: string;
    resumeData?: {
      mobile?: string;
    };
  };
  jobId?: {
    _id: string;
    title: string;
    location: string;
  };
  scheduledInterview?: {
    date: string;
    time: string;
    meetingLink?: string;
    status: string;
  };
}

interface JobData {
  _id: string;
  title: string;
}

const Interviews = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState<InterviewData[]>([]);
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>("all-jobs");
  const [statusTab, setStatusTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user._id || user.id;

  // --- Fetch Jobs for Dropdown ---
  useEffect(() => {
    const fetchJobs = async () => {
      if (!userId) return;
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/api/jobs/employer/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };
    fetchJobs();
  }, [userId]);

  // --- Fetch ALL Interviews once ---
  useEffect(() => {
    const fetchInterviews = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${API_BASE_URL}/api/applications/interviews?employerId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setInterviews(data);
        }
      } catch (error) {
        console.error("Failed to fetch interviews:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInterviews();
  }, [userId]);

  // --- Helper Logic ---
const getRecommendation = (score?: number) => {
  // If no score or 0, it means the evaluation isn't done
  if (!score || score === 0) return "Awaiting Analysis";
  
  // Tier 1: Top Talent
  if (score >= 85) return "Exceptional Match"; 
  
  // Tier 2: Strong candidates
  if (score >= 70) return "Highly Recommended"; 
  
  // Tier 3: Good but needs review
  if (score >= 50) return "Qualified";
  
  // Tier 4: Below threshold
  return "Not Recommended";
};

  const getRankBadge = (rank?: number) => {
    const baseClasses = "w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md ring-4 font-bold text-lg shrink-0 transition-transform group-hover:scale-110 duration-300";
    if (rank === 1) return (
        <div className={`${baseClasses} bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 ring-yellow-400/20`}>
            <Trophy className="w-5 h-5" />
        </div>
    );
    if (rank === 2) return (
        <div className={`${baseClasses} bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 ring-slate-400/20`}>
            <Trophy className="w-5 h-5" />
        </div>
    );
    if (rank === 3) return (
        <div className={`${baseClasses} bg-gradient-to-br from-amber-500 via-orange-500 to-orange-700 ring-orange-500/20`}>
            <Trophy className="w-5 h-5" />
        </div>
    );
    return (
        <div className={`${baseClasses} bg-slate-100 text-slate-400 border border-slate-200 ring-transparent shadow-none text-sm`}>
            #{rank}
        </div>
    );
  };

  // --- FRONTEND FILTERING & RANKING (Calculates strictly per-job) ---
  const filteredAndRankedData = interviews
    .filter(item => {
      const matchesJob = selectedJob === "all-jobs" || item.jobId?._id === selectedJob || item.jobId?.title === selectedJob;
      const currentStatus = (item.status || "").toLowerCase().trim();
      const currentTab = statusTab.toLowerCase().trim();
      
      let matchesStatus = currentTab === "all" || currentStatus === currentTab;
      
      // Professional Status Grouping per tab
      if (currentTab === "completed") {
        matchesStatus = currentStatus === "completed" || currentStatus === "under review";
      } else if (currentTab === "in progress") {
        matchesStatus = 
          currentStatus === "in progress" || 
          currentStatus === "in-progress" || 
          currentStatus === "interviewing" || 
          currentStatus === "pending";
      } else if (currentTab === "rejected") {
        matchesStatus = currentStatus === "rejected" || currentStatus === "disqualified";
      }

      const candidateName = (item.candidateId?.name || "").toLowerCase();
      const candidateEmail = (item.candidateId?.email || "").toLowerCase();
      const searchLower = searchQuery.toLowerCase();
      
      const matchesSearch = candidateName.includes(searchLower) || candidateEmail.includes(searchLower);
      
      return matchesJob && matchesStatus && matchesSearch;
    })
    .sort((a, b) => (b.interviewScore || 0) - (a.interviewScore || 0)) 
    .map((item, index) => ({
      ...item,
      rank: index + 1 
    }));

  // --- Stats Calculation based on current filtered view ---
  const totalCandidates = filteredAndRankedData.length;
  const avgScore = totalCandidates > 0 
    ? Math.round(filteredAndRankedData.reduce((acc, curr) => acc + (curr.interviewScore || 0), 0) / totalCandidates) 
    : 0;
  const topScore = totalCandidates > 0 
    ? Math.max(...filteredAndRankedData.map(i => i.interviewScore || 0)) 
    : 0;

  return (
    <DashboardLayout role="employer">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 animate-fade-in p-3 md:p-6 lg:p-8">
        
        {/* Header Section (Compact & Clean) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-5 md:p-6 rounded-2xl border border-border shadow-sm">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Interviews Score
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              Rank and review candidates based on AI evaluation.
            </p>
          </div>

          <div className="w-full md:w-[320px]">
            <label className="text-[10px] font-black text-muted-foreground flex items-center gap-1.5 uppercase tracking-widest mb-2 ml-1">
              <Briefcase className="w-3.5 h-3.5 text-primary" /> Filter by Job Role
            </label>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="bg-background border border-border focus:border-primary transition-all rounded-xl h-12 shadow-sm text-sm font-bold">
                <SelectValue placeholder="All Jobs Overview" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border shadow-xl">
                <SelectItem value="all-jobs" className="font-bold text-primary py-2.5">🌍 All Jobs Overview</SelectItem>
                <div className="h-px bg-border/50 my-1 mx-2" />
                {Array.from(new Set(jobs.map(job => job.title))).map((title, index) => {
                  if (!title) return null;
                  return (
                    <SelectItem key={index} value={title} className="py-2">{title}</SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Dynamic Stats Grid (Professional minimal sizing) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
          {[
            { label: "Candidates Found", value: totalCandidates, icon: Users, color: "text-blue-600", detail: "In current selection" },
            { label: "Average AI Score", value: `${avgScore}%`, icon: Sparkles, color: "text-primary", showBar: true },
            { label: "Top Score", value: `${topScore}%`, icon: Trophy, color: "text-amber-500", detail: "Highest ranking talent" },
          ].map((stat, i) => (
            <Card key={i} className="border border-border shadow-sm bg-card rounded-2xl overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-1 pt-4 px-4 md:px-5">
                <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-between">
                  {stat.label} <stat.icon className={cn("w-4 h-4", stat.color)} />
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4 px-4 md:px-5">
                <div className={cn("text-2xl md:text-3xl font-black", stat.color)}>{stat.value}</div>
                {stat.showBar ? (
                    <div className="w-full bg-primary/10 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${avgScore}%` }} />
                    </div>
                ) : (
                    <p className="text-[10px] text-muted-foreground mt-0.5 font-bold uppercase tracking-tight">{stat.detail}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters & Leaderboard Wrapper */}
        <div className="space-y-4">
          
          {/* Tabs & Search row */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="w-full lg:w-auto overflow-hidden">
                <Tabs value={statusTab} onValueChange={setStatusTab} className="w-full">
                <TabsList className="bg-muted/50 p-1 rounded-full h-auto w-full lg:w-auto flex overflow-x-auto no-scrollbar justify-start border border-border/50">
                    <TabsTrigger value="all" className="rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-card data-[state=active]:text-foreground text-muted-foreground transition-all shrink-0">All</TabsTrigger>
                    <TabsTrigger value="Completed" className="rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-card data-[state=active]:text-foreground text-muted-foreground transition-all shrink-0">Ready to Review</TabsTrigger>
                    <TabsTrigger value="Shortlisted" className="rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-muted-foreground transition-all shrink-0">Shortlisted</TabsTrigger>
                    <TabsTrigger value="In Progress" className="rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-card data-[state=active]:text-foreground text-muted-foreground transition-all shrink-0">In Progress</TabsTrigger>
                    <TabsTrigger value="Rejected" className="rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-red-500 data-[state=active]:text-white text-muted-foreground transition-all shrink-0">Rejected</TabsTrigger>
                </TabsList>
                </Tabs>
            </div>

            <div className="relative w-full lg:w-72 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-11 rounded-full border border-border bg-card focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-semibold shadow-sm"
              />
            </div>
          </div>

          {/* Candidates List */}
          <div className="space-y-3">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-card rounded-3xl border border-border">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-muted-foreground font-black tracking-widest uppercase text-[10px] mt-4">Calibrating Scores...</p>
              </div>
            ) : filteredAndRankedData.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center bg-muted/20 rounded-3xl border-2 border-dashed border-border">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground">
                  <Users className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="text-xl font-bold text-foreground">No records found</h3>
                <p className="text-muted-foreground text-sm font-medium mt-1">Try adjusting your job selection or filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                {filteredAndRankedData.map((interview) => (
                  <Card 
                    key={interview._id} 
                    className="group border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 rounded-3xl overflow-hidden cursor-pointer bg-card overflow-hidden"
                    onClick={() => navigate(`/employer/application/${interview._id}`)}
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row items-stretch md:items-center p-4 md:p-5 lg:p-6 gap-4 md:gap-6">
                        
                        {/* 🏆 Leaderboard Rank - Row on mobile, Pin on Desktop */}
                        <div className="flex items-center justify-between md:justify-center w-full md:w-12 border-b md:border-b-0 md:border-r border-border/50 pb-3 md:pb-0 md:pr-4">
                          <p className="md:hidden text-[10px] font-black text-muted-foreground uppercase tracking-widest">Global Rank</p>
                          {getRankBadge(interview.rank)}
                        </div>

                        {/* 👤 Candidate Info */}
                        <div className="flex items-center gap-4 flex-grow min-w-0">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-muted/50 flex items-center justify-center text-primary font-bold text-xl overflow-hidden border border-border/50 shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-300">
                            {interview.candidateId?.profileImage ? (
                              <img src={interview.candidateId.profileImage} alt={interview.candidateId.name} className="w-full h-full object-cover" />
                            ) : (
                              (interview.candidateId?.name || "U").charAt(0)
                            )}
                          </div>
                          <div className="min-w-0 flex-1 space-y-1">
                            <h3 className="text-base md:text-lg font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-2 truncate">
                              {interview.candidateId?.name || "Unknown Candidate"}
                              <Badge variant="secondary" className="hidden sm:inline-flex font-bold text-[9px] py-0 px-2 h-5 rounded-md uppercase tracking-wide shrink-0">
                                {interview.jobId?.title || "Deleted Job"}
                              </Badge>
                            </h3>
                            <div className="space-y-1.5 mt-1.5">
                              {/* Row 1: Contact Info */}
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-bold text-primary/80 uppercase tracking-widest">
                                  <span className="flex items-center gap-1.5 lowercase whitespace-nowrap">
                                      <Mail className="w-3.5 h-3.5 text-primary/60 shrink-0" /> 
                                      <span className="truncate max-w-[150px] sm:max-w-full">{interview.candidateId?.email || "N/A"}</span>
                                  </span>
                                  {interview.candidateId?.resumeData?.mobile && (
                                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                                        <Smartphone className="w-3.5 h-3.5 text-primary/60" /> 
                                        {interview.candidateId.resumeData.mobile}
                                    </span>
                                  )}
                              </div>
                              {/* Row 2: Metadata */}
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                                      <MapPin className="w-3 h-3 text-primary/40" /> 
                                      {interview.jobId?.location || "Remote"}
                                  </span>
                                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                                      <Calendar className="w-3 h-3 text-primary/40" /> 
                                      {new Date(interview.appliedAt).toLocaleDateString()}
                                  </span>
                                  {interview.status === "Shortlisted" && interview.scheduledInterview?.date && (
                                    <span className="flex items-center gap-1.5 whitespace-nowrap text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-900/30">
                                        <Clock className="w-3 h-3" />
                                        Scheduled: {new Date(interview.scheduledInterview.date).toLocaleDateString()} at {interview.scheduledInterview.time}
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 📊 Score & Logic Section */}
                        <div className="flex flex-row items-center justify-between md:justify-end gap-6 md:gap-10 border-t md:border-t-0 border-border/50 pt-4 md:pt-0">
                          
                          {/* AI Score */}
                          <div className="text-center group-hover:translate-x-[-4px] transition-transform duration-300">
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-black mb-1.5 opacity-70">AI Score</p>
                            <span className={cn(
                                "text-2xl md:text-3xl font-black leading-none tracking-tighter",
                                (interview.interviewScore || 0) >= 80 ? "text-emerald-500" : 
                                (interview.interviewScore || 0) >= 60 ? "text-amber-500" : "text-destructive"
                            )}>
                                {interview.interviewScore || 0}%
                            </span>
                          </div>

                          {/* Status Badge */}
                          <div className="text-center flex flex-col items-center">
                            <p className="md:hidden text-[9px] uppercase tracking-widest text-muted-foreground font-black mb-1.5 opacity-70">Status</p>
                            <StatusBadge
                                status={
                                    interview.status === "Pending" ? "pending" : 
                                    interview.status === "Completed" ? "completed" : 
                                    interview.status === "Shortlisted" ? "shortlisted" : 
                                    interview.status === "Rejected" ? "rejected" : "in-progress"
                                }
                            />
                          </div>
                          
                          {/* AI Insights - Professional Badge */}
                          <div className="text-center min-w-[120px] hidden sm:block">
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-black mb-1.5 opacity-70">
                              AI Insights
                            </p>
                            <span className={cn(
                              "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg border transition-all duration-300 whitespace-nowrap",
                              {
                                "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30": getRecommendation(interview.interviewScore) === "Exceptional Match",
                                "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30": getRecommendation(interview.interviewScore) === "Highly Recommended",
                                "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30": getRecommendation(interview.interviewScore) === "Qualified",
                                "bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-900/30": getRecommendation(interview.interviewScore) === "Awaiting Analysis",
                                "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30": getRecommendation(interview.interviewScore) === "Not Recommended",
                              }
                            )}>
                              {getRecommendation(interview.interviewScore)}
                            </span>
                          </div>

                          {/* Trigger */}
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-muted/80 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:translate-x-1">
                            <ChevronRight className="w-6 h-6 stroke-[3px]" />
                          </div>

                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Interviews;