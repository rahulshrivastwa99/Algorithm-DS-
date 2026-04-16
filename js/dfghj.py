const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Job = require("../models/Job");
const User = require("../models/User");
const { analyzeMatch } = require("../utils/aiMatcher");
const Application = require("../models/Application");
const { sendMassJobAlertEmail } = require("../utils/emailService");
const checkAuth = require("../middleware/checkAuth");

// 1. POST: Create a new Job (LOCKED FOR APPROVED EMPLOYERS)
router.post("/create", checkAuth, async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      location,
      salaryRange,
      requirements,
      experienceLevel,
      skills,
      jobDomain,
      education,
      employerId,
      questions,
      status,
      package: jobPackage,
      visibility, drivePin, allowedDomains, driveType,
    } = req.body;

    const newJob = new Job({
      title,
      description,
      type,
      location,
      salaryRange,
      requirements,
      experienceLevel,
      skills,
      jobDomain,
      education,
      employerId: req.user._id, // 🔥 SECURITY: Forced ID to prevent spoofing
      questions: questions || [],
      status: status || "ACTIVE",
      package: jobPackage,
      visibility: visibility || "PUBLIC",
      drivePin: drivePin || "",
      allowedDomains: allowedDomains || [],
      driveType: driveType || "GENERAL",
    });

    const savedJob = await newJob.save();

    // --- 🔥 SOCKET EMIT: Broadcast to ALL users ---
    // We send a "notification" event with type "NEW_JOB"
    req.io.emit("notification", {
      type: "NEW_JOB",
      message: `New opening: ${title} (${type})`,
      job: savedJob, // Send the full job data so frontend can add it to list
    });

    console.log(`🔔 New Job Notification broadcasted: ${title}`);

    // --- 📧 MASS EMAIL ALERT: Notify all Candidates ---
    // We do this asynchronously so it doesn't block the response
    (async () => {
      try {
        const candidates = await User.find({ role: "candidate" });
        console.log(
          `✉️ Sending job alerts to ${candidates.length} candidates...`,
        );

        // Get employer info from authenticated user
        const companyName = req.user.name || "A New Employer";

        const emailPromises = candidates.map((candidate) =>
          sendMassJobAlertEmail(
            candidate.email,
            candidate.name,
            title,
            companyName,
            location,
            type,
            savedJob._id,
          ),
        );

        await Promise.allSettled(emailPromises);
        console.log(`✅ Mass job alerts processed for "${title}"`);
      } catch (err) {
        console.error("❌ Error in mass email notification:", err);
      }
    })();

    res.status(201).json(savedJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ... rest of routes

// 2. GET: Get ALL Jobs (For Candidate Dashboard)
router.get("/", async (req, res) => {
  try {
    // ✅ Extract page and limit from query (Default to 5 items per click)
    const { status, page = 1, limit = 5 } = req.query;

    // ✅ Relaxed Query: Include PUBLIC and legacy jobs (where visibility field doesn't exist)
    const query = { visibility: { $ne: "PRIVATE" } };
    if (status) {
      if (status === "ACTIVE") {
        query.$or = [{ status: "ACTIVE" }, { status: { $exists: false } }];
      } else {
        query.status = status;
      }
    }

    // ✅ Calculate how many jobs to skip based on the page number
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // ✅ Fetch only the specific chunk of jobs (with employer company info)
    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("employerId", "name companyName companyLogo companyDescription companySize companyWebsite verifiedCompany");

    // ✅ Calculate if there are more jobs left in the database
    const totalJobs = await Job.countDocuments(query);
    const hasMore = skip + jobs.length < totalJobs;

    // ✅ Return the object containing jobs array AND pagination boolean
    res.json({ jobs, hasMore, totalJobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. GET: Get Jobs by specific Employer (PROTECTED)
router.get("/employer/:employerId", checkAuth, async (req, res) => {
  try {
    const empId = req.params.employerId;

    // 🔥 SECURITY: Only let employers see THEIR OWN jobs
    if (String(empId) !== String(req.user._id) && req.user.role !== "superadmin") {
      return res.status(403).json({ error: "Unauthorized access to employer data." });
    }
    const { status } = req.query;

    // 👇 Niche wali line ko comment kar diya hai 👇
    // console.log("🔍 SEEKING JOBS FOR EMPLOYER ID:", empId, "STATUS:", status);

    const query = { employerId: empId };
    if (status) {
      if (status === "ACTIVE") {
        query.$or = [{ status: "ACTIVE" }, { status: { $exists: false } }];
      } else {
        query.status = status;
      }
    }

    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .populate("employerId", "name companyName companyLogo companyDescription companySize companyWebsite verifiedCompany");

    console.log(`✅ FOUND: ${jobs.length} jobs.`);

    res.json(jobs);
  } catch (err) {
    console.error("❌ ERROR FETCHING JOBS:", err.message);
    res.status(500).json({ error: err.message });
  }
});
// 4. GET: Get Single Job by ID
// 4. GET: Get Single Job by ID (WITH VIP SECURITY)
router.get("/:id", async (req, res) => {
  try {
    const { userId } = req.query; // Frontend se user ki id lenge
    
    const job = await Job.findById(req.params.id).populate(
      "employerId",
      "name companyName companyLogo companyDescription companySize companyWebsite verifiedCompany",
    );
    
    if (!job) return res.status(404).json({ error: "Job not found" });

    // 🔥 SECURITY CHECK: Is this a Private Drive?
    if (job.visibility === "PRIVATE") {
      let isUnlocked = false;

      // Validate userId and check unlockedDrives in resumeData
      if (userId && userId !== "undefined" && mongoose.Types.ObjectId.isValid(userId)) {
        const user = await User.findById(userId);
        if (user && user.resumeData?.unlockedDrives) {
          isUnlocked = user.resumeData.unlockedDrives.some(
            (id) => id.toString() === job._id.toString()
          );
        }
      }

      if (!isUnlocked) {
        return res.status(403).json({
          isPrivate: true,
          error: "This is a private assessment. Please log in and enter the Drive PIN in your dashboard.",
        });
      }
    }

    const applicantsCount = await Application.countDocuments({ jobId: job._id });
    const jobData = job.toObject();
    jobData.applicantsCount = applicantsCount;

    res.json(jobData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. PATCH: Update Job Status (PROTECTED)
router.patch("/:id/status", checkAuth, async (req, res) => {
  try {
    // 🔥 SECURITY: Check if job belongs to this employer
    const existingJob = await Job.findById(req.params.id);
    if (!existingJob) return res.status(404).json({ error: "Job not found" });

    if (String(existingJob.employerId) !== String(req.user._id) && req.user.role !== "superadmin") {
      return res.status(403).json({ error: "You cannot modify jobs you do not own." });
    }
    const { status } = req.body;
    if (!["ACTIVE", "PAUSED", "CLOSED", "DRAFT"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Broadcast status change
    req.io.emit("notification", {
      type: "JOB_STATUS_UPDATED",
      message: `Job "${job.title}" is now ${status}`,
      jobId: job._id,
      status: status,
    });

    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Recommended Jobs for a specific Candidate (Fast Match Algorithm)
// GET: Recommended Jobs for a specific Candidate (Smart ATS Match Algorithm)
// GET: Recommended Jobs for a specific Candidate (Smart ATS Match Algorithm)
router.get("/recommended/:candidateId", async (req, res) => {
  try {
    const user = await User.findById(req.params.candidateId);

    // 🔥 STRICT CHECK: Agar resume parse nahi hua YA onboarding incomplete hai, toh kuch mat bhejo
    if (!user || !user.resumeData || !user.isOnboardingComplete) {
      return res.json([]); // Frontend par recommendation section hide ho jayega
    }

    // Normalize candidate data (Lowercase for accurate matching)
    const candidateSkills = Array.isArray(user.resumeData.skills)
      ? user.resumeData.skills.map((s) => s.toLowerCase().trim())
      : [];
    const candidateDomain = (
      user.resumeData.candidateDomain || ""
    ).toLowerCase();

    // Get ALL active jobs (with employer company info)
    const activeJobs = await Job.find({
      $or: [{ status: "ACTIVE" }, { status: { $exists: false } }],
    }).populate("employerId", "name companyName companyLogo companyDescription companySize companyWebsite verifiedCompany");

    // ⚡ Smart Ranking Algorithm (Scores ALL jobs based on true match)
    const scoredJobs = activeJobs.map((job) => {
      let score = 0;

      // 1. Flexible Domain Match (30 Points)
      const jobDomain = (job.jobDomain || "").toLowerCase();
      if (
        jobDomain &&
        candidateDomain &&
        (candidateDomain.includes(jobDomain) ||
          jobDomain.includes(candidateDomain))
      ) {
        score += 30;
      }

      // 2. Skill Overlap (Check candidate skills inside entire job description)
      const jobText = (
        (job.requirements || []).join(" ") +
        " " +
        (job.description || "") +
        " " +
        (job.skills || []).join(" ")
      ).toLowerCase();

      let matchedSkillsCount = 0;
      candidateSkills.forEach((skill) => {
        if (skill && jobText.includes(skill)) {
          matchedSkillsCount++;
        }
      });

      // Give 15 points per matched skill (Max 65 points from skills)
      const skillScore = Math.min(65, matchedSkillsCount * 15);
      score += skillScore;

      // Add a slight randomization (1-3%) so scores look organic
      const organicBoost = Math.floor(Math.random() * 3) + 1;
      let finalScore = Math.min(score + organicBoost, 98); // Cap max score at 98%

      // Base score safeguard for weak matches
      if (finalScore < 15) finalScore = Math.floor(Math.random() * 15) + 10;

      return { ...job.toObject(), matchScore: finalScore };
    });

    // 🔥 STRICTLY FILTER & SORT: Highest Match Score First, Only Top 3
    const recommended = scoredJobs
      .filter((j) => j.matchScore >= 35) // Reject garbage matches below 35%
      .sort((a, b) => b.matchScore - a.matchScore) // Highest score first
      .slice(0, 3); // Pick exactly the top 3

    res.json(recommended);
  } catch (err) {
    console.error("Recommendation Error:", err);
    res.status(500).json({ error: err.message });
  }
});
router.get("/:jobId/ranked-candidates", async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    const applications = await Application.find({ jobId }).populate("userId");

    // Process analysis for unanalyzed applications
    const rankedList = await Promise.all(
      applications.map(async (app) => {
        if (!app.isAnalyzed) {
          const analysis = await analyzeMatch(
            app.userId.resumeData,
            job.description,
          );
          app.aiMatchScore = analysis.score;
          app.aiReasoning = analysis.reason;
          app.isAnalyzed = true;
          await app.save();
        }
        return app;
      }),
    );

    // Sort: Highest Match Score First
    rankedList.sort((a, b) => b.aiMatchScore - a.aiMatchScore);

    res.json(rankedList);
  } catch {
    res.status(500).json({ error: "Failed to rank candidates" });
  }
});

// 8. POST: Access Private Drive via PIN
router.post("/access-drive", async (req, res) => {
  try {
    const { pin, userEmail } = req.body;

    const job = await Job.findOne({ 
      drivePin: pin, 
      visibility: "PRIVATE", 
      status: "ACTIVE" 
    });

    if (!job) {
      return res.status(404).json({ error: "Invalid PIN or Drive is closed." });
    }

    // Check Domain Restriction
    if (job.allowedDomains && job.allowedDomains.length > 0) {
      const userDomain = "@" + userEmail.split("@")[1];
      if (!job.allowedDomains.includes(userDomain)) {
        return res.status(403).json({ error: "Your email domain is not authorized for this private drive." });
      }
    }

    // 🔥 NEW: Give Candidate VIP Access (Save in Vault)
    const user = await User.findOne({ email: userEmail });
    if (user) {
      // Use $addToSet so we don't add duplicate IDs in the nested field
      await User.findByIdAndUpdate(user._id, {
        $addToSet: { "resumeData.unlockedDrives": job._id }
      });
    }

    res.json({ success: true, jobId: job._id });
  } catch (err) {
    res.status(500).json({ error: "Server error while verifying PIN." });
  }
});

module.exports = router;
