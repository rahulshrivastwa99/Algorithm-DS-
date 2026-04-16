import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import API_BASE_URL from "../../config/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusBadge from "@/components/StatusBadge";
import {
  ArrowLeft,
  Search,
  Filter,
  Eye,
  Loader2,
  Sparkles,
  FileText,
  Trophy,
  Medal,
  Award,
  Users,
  TrendingUp,
  Mic,
  Brain,
  ChevronUp,
  ChevronDown,
  AlertOctagon,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// ── Types ──────────────────────────────────────────────────────────────────────
interface CandidateApp {
  _id: string;
  status: string;
  interviewScore?: number;
  aiMatchScore?: number;
  aiReasoning?: string;
  appliedAt: string;
  hrFeedback?: string;
  candidateId: {
    _id: string;
    name: string;
    email: string;
    resume?: string;
    profileImage?: string;
  };
  jobId: {
    _id: string;
    title: string;
    location?: string;
  };
}

type SortKey = "rank" | "ats" | "interview" | "overall";
type SortDir = "asc" | "desc";

// ── Helpers ────────────────────────────────────────────────────────────────────
const getOverallScore = (app: CandidateApp): number => {
  const ats = app.aiMatchScore ?? 0;
  const interview = app.interviewScore ?? 0;

  // 🔥 HYBRID SCORING:
  // If interview exists, use weighted average (40% ATS, 60% Video)
  if (interview > 0) {
    if (ats > 0) return Math.round(ats * 0.4 + interview * 0.6);
    return interview; // Only interview (rare)
  }

  // If only ATS exists, use it as baseline
  return ats;
};

const getAILabel = (score: number) => {
  if (score >= 80)
    return {
      text: "Highly Recommended",
      color:
        "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
    };
  if (score >= 60)
    return {
      text: "Good Match",
      color:
        "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
    };
  if (score >= 40)
    return {
      text: "Average Match",
      color:
        "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800",
    };
  return {
    text: "Below Average",
    color:
      "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
  };
};

const ScoreBar = ({
  value,
  max = 100,
  color,
}: {
  value: number;
  max?: number;
  color: string;
}) => (
  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-1">
    <div
      className={`h-full rounded-full transition-all duration-500 ${color}`}
      style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
    />
  </div>
);

const RankBadge = ({ rank }: { rank: number }) => {
  if (rank === 1)
    return (
      <div className="flex items-center gap-1">
        <Trophy className="w-4 h-4 text-yellow-500" />
        <span className="font-bold text-yellow-600 dark:text-yellow-400">
          #1
        </span>
      </div>
    );
  if (rank === 2)
    return (
      <div className="flex items-center gap-1">
        <Medal className="w-4 h-4 text-slate-400" />
        <span className="font-bold text-slate-500">#2</span>
      </div>
    );
  if (rank === 3)
    return (
      <div className="flex items-center gap-1">
        <Award className="w-4 h-4 text-amber-600" />
        <span className="font-bold text-amber-700 dark:text-amber-500">#3</span>
      </div>
    );
  return (
    <span className="font-medium text-muted-foreground text-sm">#{rank}</span>
  );
};

// ── Component ──────────────────────────────────────────────────────────────────
const JobApplicants = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const [allCandidates, setAllCandidates] = useState<CandidateApp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("overall");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Fetch all applications for this employer, then filter by jobId
  useEffect(() => {
    const fetchApplicants = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const user = JSON.parse(storedUser);
      const userId = user.id || user._id;
      if (!userId) return;

      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${API_BASE_URL}/api/applications/employer/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (res.ok) {
          const data: CandidateApp[] = await res.json();
          // Filter for this specific job
          const forThisJob = data.filter(
            (app) => app.jobId?._id === jobId || (app.jobId as any) === jobId,
          );
          setAllCandidates(forThisJob);
          // Set job title from first match
          if (forThisJob.length > 0) {
            setJobTitle(forThisJob[0].jobId?.title || "Job");
          } else {
            // Try to get title from all jobs
            const anyMatch = data.find(
              (app) => app.jobId?._id === jobId || (app.jobId as any) === jobId,
            );
            if (anyMatch) setJobTitle(anyMatch.jobId?.title || "Job");
          }
        }
      } catch (err) {
        console.error("Error fetching applicants:", err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load applicants.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  // ── Sorting handler ───────────────────────────────────────────────────────────
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp className="w-3 h-3 opacity-30" />;
    return sortDir === "desc" ? (
      <ChevronDown className="w-3 h-3 text-primary" />
    ) : (
      <ChevronUp className="w-3 h-3 text-primary" />
    );
  };

  // ── Filter + Sort pipeline ────────────────────────────────────────────────────
  const processed = allCandidates
    .filter((app) => {
      const nameMatch = app.candidateId?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const emailMatch = app.candidateId?.email
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const statusMatch = statusFilter === "all" || app.status === statusFilter;
      return (nameMatch || emailMatch) && statusMatch;
    })
    .sort((a, b) => {
      let valA = 0,
        valB = 0;
      if (sortKey === "ats") {
        valA = a.aiMatchScore ?? 0;
        valB = b.aiMatchScore ?? 0;
      } else if (sortKey === "interview") {
        valA = a.interviewScore ?? 0;
        valB = b.interviewScore ?? 0;
      } else {
        valA = getOverallScore(a);
        valB = getOverallScore(b);
      }
      return sortDir === "desc" ? valB - valA : valA - valB;
    });

  const getResumeUrl = (path?: string) => {
    if (!path || path.trim() === "") return null;
    if (path.startsWith("http")) return path;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${API_BASE_URL}${cleanPath}`;
  };

  // ── Stats summary ─────────────────────────────────────────────────────────────
  const avgATS =
    allCandidates.length > 0
      ? Math.round(
          allCandidates.reduce((s, c) => s + (c.aiMatchScore ?? 0), 0) /
            allCandidates.length,
        )
      : 0;

  const avgInterview =
    allCandidates.length > 0
      ? Math.round(
          allCandidates.reduce((s, c) => s + (c.interviewScore ?? 0), 0) /
            allCandidates.length,
        )
      : 0;

  const topCandidate =
    allCandidates.length > 0
      ? allCandidates.reduce((best, curr) =>
          getOverallScore(curr) > getOverallScore(best) ? curr : best,
        )
      : null;

  return (
    <DashboardLayout role="employer">
      <div className="space-y-6 animate-fade-in">
        {/* ── Back nav + Header ── */}
        <div>
          <button
            onClick={() => navigate("/employer/dashboard")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                {jobTitle || "Job Applicants"}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {allCandidates.length} candidate
                {allCandidates.length !== 1 ? "s" : ""} ranked by AI Match &
                Interview Performance
              </p>
            </div>
            <Link to="/employer/candidates">
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                All Candidates
              </Button>
            </Link>
          </div>
        </div>

        {/* ── Quick Stats ── */}
        {!isLoading && allCandidates.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Total Applicants */}
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Total</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {allCandidates.length}
              </p>
              <p className="text-xs text-muted-foreground">Applicants</p>
            </div>

            {/* Avg ATS */}
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Brain className="w-4 h-4 text-purple-500" />
                <span className="text-xs text-muted-foreground">Avg ATS</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{avgATS}%</p>
              <p className="text-xs text-muted-foreground">AI Resume Match</p>
            </div>

            {/* Avg Interview */}
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Mic className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-muted-foreground">
                  Avg Interview
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {avgInterview}%
              </p>
              <p className="text-xs text-muted-foreground">Interview Score</p>
            </div>

            {/* Top Candidate */}
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-muted-foreground">Top Pick</span>
              </div>
              <p className="text-sm font-bold text-foreground truncate">
                {topCandidate?.candidateId?.name || "N/A"}
              </p>
              <p className="text-xs text-muted-foreground">
                Score: {topCandidate ? getOverallScore(topCandidate) : 0}%
              </p>
            </div>
          </div>
        )}

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Shortlisted">Shortlisted</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Interviewing">Interviewing</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ── Table ── */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : processed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {allCandidates.length === 0
                    ? "No applicants yet"
                    : "No matches found"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {allCandidates.length === 0
                    ? "Candidates who apply to this job will appear here."
                    : "Try adjusting your search or filter."}
                </p>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {/* Rank */}
                  <TableHead
                    className="w-[70px] cursor-pointer select-none"
                    onClick={() => handleSort("overall")}
                  >
                    <div className="flex items-center gap-1">
                      Rank <SortIcon col="overall" />
                    </div>
                  </TableHead>

                  {/* Candidate */}
                  <TableHead>Candidate</TableHead>

                  {/* ATS Score */}
                  <TableHead
                    className="cursor-pointer select-none"
                    onClick={() => handleSort("ats")}
                  >
                    <div className="flex items-center gap-1">
                      <Brain className="w-3.5 h-3.5 text-purple-500" />
                      ATS Score
                      <SortIcon col="ats" />
                    </div>
                  </TableHead>

                  {/* Interview Score */}
                  <TableHead
                    className="cursor-pointer select-none"
                    onClick={() => handleSort("interview")}
                  >
                    <div className="flex items-center gap-1">
                      <Mic className="w-3.5 h-3.5 text-blue-500" />
                      Interview
                      <SortIcon col="interview" />
                    </div>
                  </TableHead>

                  {/* Overall */}
                  <TableHead
                    className="cursor-pointer select-none"
                    onClick={() => handleSort("overall")}
                  >
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                      Overall
                      <SortIcon col="overall" />
                    </div>
                  </TableHead>

                  {/* AI Recommendation */}
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                      AI Verdict
                    </div>
                  </TableHead>

                  {/* Status */}
                  <TableHead>Status</TableHead>

                  {/* Actions */}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processed.map((app, index) => {
                  const overall = getOverallScore(app);
                  const label = getAILabel(overall);
                  const isDisq = app.status?.toLowerCase() === "disqualified";
                  const resumeUrl = getResumeUrl(app.candidateId?.resume);
                  // Top 3 row highlight
                  const rowHighlight =
                    index === 0
                      ? "bg-yellow-50/60 dark:bg-yellow-900/10"
                      : index === 1
                        ? "bg-slate-50/60 dark:bg-slate-800/20"
                        : index === 2
                          ? "bg-amber-50/60 dark:bg-amber-900/10"
                          : "";

                  return (
                    <TableRow
                      key={app._id}
                      className={cn(
                        "hover:bg-muted/40 transition-colors cursor-pointer",
                        rowHighlight,
                      )}
                      onClick={() =>
                        navigate(`/employer/application/${app._id}`)
                      }
                    >
                      {/* Rank */}
                      <TableCell>
                        <RankBadge rank={index + 1} />
                      </TableCell>

                      {/* Candidate */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 border flex items-center justify-center overflow-hidden flex-shrink-0">
                            {app.candidateId?.profileImage ? (
                              <img
                                src={app.candidateId.profileImage}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="font-bold text-primary text-sm">
                                {app.candidateId?.name?.charAt(0) || "U"}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {app.candidateId?.name || "Unknown"}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              {app.candidateId?.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* ATS Score */}
                      <TableCell>
                        <div className="min-w-[80px]">
                          <span
                            className={cn(
                              "font-bold text-sm",
                              (app.aiMatchScore ?? 0) >= 75
                                ? "text-green-600"
                                : (app.aiMatchScore ?? 0) >= 50
                                  ? "text-yellow-600"
                                  : "text-muted-foreground",
                            )}
                          >
                            {app.aiMatchScore != null
                              ? `${app.aiMatchScore}%`
                              : "N/A"}
                          </span>
                          {app.aiMatchScore != null && (
                            <ScoreBar
                              value={app.aiMatchScore}
                              color={
                                app.aiMatchScore >= 75
                                  ? "bg-green-500"
                                  : app.aiMatchScore >= 50
                                    ? "bg-yellow-500"
                                    : "bg-red-400"
                              }
                            />
                          )}
                        </div>
                      </TableCell>

                      {/* Interview Score */}
                      <TableCell>
                        <div className="min-w-[80px]">
                          {isDisq ? (
                            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200 uppercase tracking-wider flex items-center gap-1">
                              <AlertOctagon className="w-3 h-3" /> Disqualified
                            </span>
                          ) : app.interviewScore != null ? (
                            <>
                              <span
                                className={cn(
                                  "font-bold text-sm",
                                  app.interviewScore >= 70
                                    ? "text-green-600"
                                    : app.interviewScore >= 40
                                      ? "text-yellow-600"
                                      : "text-red-500",
                                )}
                              >
                                {app.interviewScore}%
                              </span>
                              <ScoreBar
                                value={app.interviewScore}
                                color={
                                  app.interviewScore >= 70
                                    ? "bg-blue-500"
                                    : app.interviewScore >= 40
                                      ? "bg-yellow-500"
                                      : "bg-red-400"
                                }
                              />
                            </>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">
                              Not interviewed
                            </span>
                          )}
                        </div>
                      </TableCell>

                      {/* Overall Score */}
                      <TableCell>
                        <div className="min-w-[70px]">
                          <span
                            className={cn(
                              "font-bold text-base",
                              overall >= 75
                                ? "text-green-600"
                                : overall >= 50
                                  ? "text-yellow-600"
                                  : overall > 0
                                    ? "text-red-500"
                                    : "text-muted-foreground",
                            )}
                          >
                            {overall > 0 ? `${overall}%` : "—"}
                          </span>
                          {overall > 0 && (
                            <ScoreBar
                              value={overall}
                              color={
                                overall >= 75
                                  ? "bg-gradient-to-r from-green-400 to-emerald-500"
                                  : overall >= 50
                                    ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                                    : "bg-red-400"
                              }
                            />
                          )}
                        </div>
                      </TableCell>

                      {/* AI Verdict */}
                      <TableCell>
                        <div className="max-w-[170px] space-y-1.5">
                          {app.aiMatchScore != null && app.aiMatchScore > 0 ? (
                            <>
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={cn(
                                    "text-[9px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider",
                                    getAILabel(app.aiMatchScore).color,
                                  )}
                                >
                                  {getAILabel(app.aiMatchScore).text}
                                </span>
                              </div>
                              {app.aiReasoning && (
                                <p className="text-[10px] text-muted-foreground/90 font-medium leading-relaxed line-clamp-3">
                                  {app.aiReasoning}
                                </p>
                              )}
                            </>
                          ) : (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border bg-slate-50 text-slate-500 border-slate-200">
                              No Resume Data
                            </span>
                          )}
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <StatusBadge status={app.status || "pending"} />
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <div
                          className="flex justify-end gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {resumeUrl && (
                            <a
                              href={resumeUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Button
                                variant="ghost"
                                size="icon"
                                title="View Resume"
                              >
                                <FileText className="w-4 h-4" />
                              </Button>
                            </a>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              navigate(`/employer/application/${app._id}`)
                            }
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobApplicants;
