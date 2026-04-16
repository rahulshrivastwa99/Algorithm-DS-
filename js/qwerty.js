import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API_BASE_URL from "../../config/api";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Search,
  Loader2,
  FileText,
  Target,
  Users,
  Briefcase,
  PieChart,
  Calendar,
  CheckCircle,
  ChevronRight,
  Trophy,
  MapPin,
  Mail,
  Smartphone,
  Sparkles
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Types
interface CandidateApp {
  _id: string;
  status: string;
  aiMatchScore?: number;
  aiReasoning?: string;
  appliedAt: string;
  candidateId: {
    _id: string;
    name: string;
    email: string;
    resume?: string;
    profileImage?: string;
    resumeData?: {
      experienceYears?: number;
      mobile?: string;
    };
  };
  jobId: {
    _id: string;
    title: string;
    location: string;
    experienceLevel?: string;
  };
  rank?: number;
}

interface JobData {
  _id: string;
  title: string;
}

const Candidates = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [candidates, setCandidates] = useState<CandidateApp[]>([]);
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Initialize from search params
  const [selectedJob, setSelectedJob] = useState<string>(searchParams.get("job") || "all-jobs");
  const [statusTab, setStatusTab] = useState(searchParams.get("status") || "all");

  // Sync state with URL params
  useEffect(() => {
    const status = searchParams.get("status");
    const job = searchParams.get("job");
    if (status) setStatusTab(status);
    if (job) setSelectedJob(job);
  }, [searchParams]);

  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser || "{}");
  const userId = user.id || user._id;

  // --- Fetch Jobs for Selection ---
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

  // --- Fetch ALL Candidates once ---
  useEffect(() => {
    const fetchCandidates = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${API_BASE_URL}/api/applications/candidates?employerId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCandidates(data);
        }
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCandidates();
  }, [userId]);

  // --- Client-side Filtering & Ranking (ATS Logic) ---
  const filteredAndRankedData = useMemo(() => {
    return candidates
      .filter((app) => {
        const matchesJob = selectedJob === "all-jobs" || app.jobId?._id === selectedJob || app.jobId?.title === selectedJob;
        
        let matchesStatus = false;
        if (statusTab === "all") {
          matchesStatus = true;
        } else if (statusTab === "In Review") {
          matchesStatus = ["Pending", "In Progress", "Interviewing", "Under Review"].includes(app.status);
        } else {
          matchesStatus = app.status === statusTab;
        }

        const candidateName = (app.candidateId?.name || "").toLowerCase();
        const candidateEmail = (app.candidateId?.email || "").toLowerCase();
        const searchLower = searchQuery.toLowerCase();

        const matchesSearch = candidateName.includes(searchLower) || candidateEmail.includes(searchLower);

        return matchesJob && matchesStatus && matchesSearch;
      })
      .sort((a, b) => (b.aiMatchScore || 0) - (a.aiMatchScore || 0)) 
      .map((item, index) => ({
        ...item,
        rank: index + 1 
      }));
  }, [candidates, selectedJob, statusTab, searchQuery]);

  // --- Stats Calculation based on current view ---
  const stats = useMemo(() => {
    const total = filteredAndRankedData.length;
    const avgScore = total > 0 
      ? Math.round(filteredAndRankedData.reduce((acc, curr) => acc + (curr.aiMatchScore || 0), 0) / total) 
      : 0;
    const topScore = total > 0 
      ? Math.max(...filteredAndRankedData.map(i => i.aiMatchScore || 0)) 
      : 0;
    const shortlistedCount = filteredAndRankedData.filter(c => c.status === "Shortlisted").length;

    return { total, avgScore, topScore, shortlistedCount };
  }, [filteredAndRankedData]);

  const getResumeUrl = (path?: string) => {
    if (!path || path.trim() === "") return null;
    if (path.startsWith("http")) return path;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${API_BASE_URL}${cleanPath}`;
  };

  // --- Helper: Premium Rank Badges ---
  const getRankBadge = (rank?: number) => {
    const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm ring-2 font-bold text-sm shrink-0";
    if (rank === 1) return (
        <div className={`${baseClasses} bg-gradient-to-br from-yellow-300 to-yellow-500 ring-yellow-500/20 shadow-yellow-500/30`}>
            <Trophy className="w-4 h-4" />
        </div>
    );
    if (rank === 2) return (
        <div className={`${baseClasses} bg-gradient-to-br from-slate-300 to-slate-400 ring-slate-400/20 shadow-slate-400/30`}>
            <Trophy className="w-4 h-4" />
        </div>
    );
    if (rank === 3) return (
        <div className={`${baseClasses} bg-gradient-to-br from-amber-500 to-orange-600 ring-orange-500/20 shadow-orange-500/30`}>
            <Trophy className="w-4 h-4" />
        </div>
    );
    return (
        <div className={`${baseClasses} bg-secondary text-secondary-foreground border border-border ring-transparent shadow-none`}>
            #{rank}
        </div>
    );
  };

  return (
    <DashboardLayout role="employer">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 animate-fade-in p-3 md:p-6 lg:p-8">
        
        {/* ATS Header & Selection */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-5 md:p-6 rounded-2xl border border-border shadow-sm">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              ATS Score
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              Manage, review, and rank applicants for your job roles.
            </p>
          </div>

          <div className="w-full md:w-[320px]">
            <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-1.5 mb-2 ml-1">
              <Briefcase className="w-3.5 h-3.5 text-primary" /> Filter by Job Role
            </label>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="bg-background border border-border focus:border-primary transition-all rounded-xl h-12 shadow-sm text-sm font-bold">
                <SelectValue placeholder="All Positions Overview" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border shadow-xl">
                <SelectItem value="all-jobs" className="font-bold text-primary py-2.5">🌍 All Positions Overview</SelectItem>
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

        {/* Professional Summary Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {[
            { label: "Candidates Found", value: stats.total, icon: Users, color: "text-blue-600", bg: "bg-blue-500" },
            { label: "Avg Match", value: `${stats.avgScore}%`, icon: PieChart, color: "text-primary", bg: "bg-primary" },
            { label: "Shortlisted", value: stats.shortlistedCount, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-500" },
            { label: "Top Match", value: `${stats.topScore}%`, icon: Target, color: "text-amber-500", bg: "bg-amber-500" },
          ].map((stat, i) => (
            <Card key={i} className="border border-border shadow-sm bg-card rounded-2xl overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-1 pt-4 px-4 md:px-5">
                <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-between">
                  {stat.label} <stat.icon className={cn("w-4 h-4", stat.color)} />
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4 px-4 md:px-5">
                <div className={cn("text-2xl md:text-3xl font-black", stat.color)}>{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ATS Filter & List Wrapper */}
        <div className="space-y-4">
          
          {/* Tabs & Search Row */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="w-full lg:w-auto overflow-hidden">
                <Tabs value={statusTab} onValueChange={setStatusTab} className="w-full">
                <TabsList className="bg-muted/50 p-1 rounded-full h-auto w-full lg:w-auto flex overflow-x-auto no-scrollbar justify-start border border-border/50">
                    <TabsTrigger value="all" className="rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-card data-[state=active]:text-foreground text-muted-foreground transition-all shrink-0">All</TabsTrigger>
                    <TabsTrigger value="In Review" className="rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-card data-[state=active]:text-foreground text-muted-foreground transition-all shrink-0">In Review</TabsTrigger>
                    <TabsTrigger value="Shortlisted" className="rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-muted-foreground transition-all shrink-0">Shortlisted</TabsTrigger>
                    <TabsTrigger value="Rejected" className="rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-red-500 data-[state=active]:text-white text-muted-foreground transition-all shrink-0">Rejected</TabsTrigger>
                </TabsList>
                </Tabs>
            </div>

            <div className="relative w-full lg:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-11 rounded-full border border-border bg-card focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-semibold"
              />
            </div>
          </div>

          {/* Candidates List Area */}
          <div className="space-y-3">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-card rounded-3xl border border-border">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-muted-foreground font-black tracking-widest uppercase text-[10px] mt-4">Analyzing Rosters...</p>
              </div>
            ) : filteredAndRankedData.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center bg-muted/20 rounded-3xl border-2 border-dashed border-border">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground">
                  <Briefcase className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="text-xl font-bold text-foreground">No matches found</h3>
                <p className="text-muted-foreground text-sm font-medium mt-1">Try adjusting your job selection or filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                {filteredAndRankedData.map((app) => (
                  <Card 
                    key={app._id} 
                    className="group border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 rounded-3xl overflow-hidden cursor-pointer bg-card overflow-hidden"
                    onClick={() => navigate(`/employer/application/${app._id}`)}
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row items-stretch md:items-center p-4 md:p-5 lg:p-6 gap-4 md:gap-6">
                        
                        {/* 🏆 Rank - Row on mobile, Pin on Desktop */}
                        <div className="flex items-center justify-between md:justify-center w-full md:w-10 border-b md:border-b-0 md:border-r border-border/50 pb-3 md:pb-0 md:pr-4">
                          <p className="md:hidden text-[10px] font-black text-muted-foreground uppercase tracking-widest">Global Rank</p>
                          {getRankBadge(app.rank)}
                        </div>

                        {/* 👤 Candidate Bio */}
                        <div className="flex items-center gap-4 flex-grow min-w-0">
                          <div className="shrink-0 transition-transform group-hover:scale-105 duration-300">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-muted flex items-center justify-center text-primary font-bold text-xl overflow-hidden border border-border/50 shadow-sm">
                                {app.candidateId?.profileImage ? (
                                <img src={app.candidateId.profileImage} alt="" className="w-full h-full object-cover" />
                                ) : (
                                (app.candidateId?.name || "U").charAt(0)
                                )}
                            </div>
                          </div>
                          
                          <div className="min-w-0 flex-1 space-y-1">
                            <h3 className="text-base md:text-lg font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-2 truncate">
                              {app.candidateId?.name}
                              <Badge variant="secondary" className="hidden sm:inline-flex font-bold text-[9px] py-0 px-2 h-5 rounded-md uppercase tracking-wide shrink-0">
                                {app.jobId?.title}
                              </Badge>
                            </h3>
                            <div className="space-y-1.5 mt-1.5">
                              {/* Row 1: Contact Info */}
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-bold text-primary/80 uppercase tracking-widest">
                                  <span className="flex items-center gap-1.5 lowercase whitespace-nowrap">
                                      <Mail className="w-3.5 h-3.5 text-primary/60 shrink-0" /> 
                                      <span className="truncate max-w-[150px] sm:max-w-full">{app.candidateId?.email || "N/A"}</span>
                                  </span>
                                  {app.candidateId?.resumeData?.mobile && (
                                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                                        <Smartphone className="w-3.5 h-3.5 text-primary/60" /> 
                                        {app.candidateId.resumeData.mobile}
                                    </span>
                                  )}
                              </div>
                              {/* Row 2: Metadata */}
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                                  {/* <span className="flex items-center gap-1.5 whitespace-nowrap">
                                      <Briefcase className="w-3 h-3 text-primary/40" /> 
                                      {app.candidateId?.resumeData?.experienceYears ?? 0} Yrs Expf.
                                  </span> */}
                                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                                      <MapPin className="w-3 h-3 text-primary/40" /> 
                                      {app.jobId?.location || "Remote"}
                                  </span>
                                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                                      <Calendar className="w-3 h-3 text-primary/40" /> 
                                      {new Date(app.appliedAt).toLocaleDateString()}
                                  </span>
                              </div>
                              {/* Row 3: AI Verdict (ATS Reason) */}
                              {app.aiReasoning && (
                                <div className="mt-2 pl-4 border-l-2 border-primary/10 py-0.5">
                                    <p className="text-[11px] text-muted-foreground/90 leading-relaxed line-clamp-1 italic flex items-center gap-1.5 font-medium">
                                        <Sparkles className="w-3 h-3 text-yellow-500" />
                                        {app.aiReasoning}
                                    </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 📊 Metrics & Actions Container */}
                        <div className="flex flex-row items-center justify-between md:justify-end gap-6 md:gap-10 border-t md:border-t-0 border-border/50 pt-4 md:pt-0">
                          
                          {/* ATS Score */}
                          <div className="text-center group-hover:translate-x-[-4px] transition-transform">
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-black mb-1.5 opacity-70">Efficiency</p>
                            <span className={cn(
                                "text-2xl md:text-3xl font-black leading-none tracking-tighter",
                                (app.aiMatchScore || 0) >= 80 ? "text-emerald-500" : 
                                (app.aiMatchScore || 0) >= 60 ? "text-primary" : "text-muted-foreground"
                            )}>
                                {app.aiMatchScore || 0}%
                            </span>
                          </div>

                          {/* Status Badge - Now visible on mobile */}
                          <div className="text-center flex flex-col items-center">
                            <p className="md:hidden text-[9px] uppercase tracking-widest text-muted-foreground font-black mb-1.5 opacity-70">Status</p>
                            <StatusBadge status={app.status || "pending"} />
                          </div>
                          
                          {/* Entry Trigger */}
                          <div className="flex items-center pl-2">
                            {app.candidateId?.resume && (
                                <a 
                                    href={getResumeUrl(app.candidateId.resume)!} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    onClick={(e) => e.stopPropagation()} 
                                    title="View Original CV"
                                    className="hidden sm:block mr-2"
                                >
                                    <Button variant="outline" size="sm" className="h-9 px-3 gap-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 border-border/50">
                                        <FileText className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">View Resume </span>
                                    </Button>
                                </a>
                            )}
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-muted/80 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:translate-x-1 group-hover:shadow-primary/20">
                                <ChevronRight className="w-6 h-6 stroke-[3px]" />
                            </div>
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

export default Candidates;