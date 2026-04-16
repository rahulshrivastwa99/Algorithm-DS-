const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = async (req, res, next) = > {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader | | !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({error: 'Authorization denied. No token provided.'})
        }

        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(401).json({error: 'Authorization denied. Token missing.'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // 🔥 EXTRA PROTECTION: Fetch user from DB to check latest status
        const user = await User.findById(decoded.id).select('-password')
        if (!user) {
            return res.status(401).json({error: 'User no longer exists.'})
        }

        // 1. Check Suspension
        if (user.status === 'suspended') {
            return res.status(403).json({error: 'Your account has been suspended. Please contact support.'})
        }

        // 2. Check Employer Approval(Skip for Superadmins and Candidates)
        // 🔥 UPDATE: We allow GET requests to 'self' data so the dashboard can render while locked
        // We use originalUrl because path is relative to the router mount point
        const url = req.originalUrl
        const isMeRoute =
        url.includes('/api/users/me') | |
        url.includes('/api/employer/profile') | |
        (req.method === 'GET' & & (
            url.includes('/api/jobs/employer/') | |
            url.includes('/api/applications/employer/') | |
            url.includes('/api/applications/interviews') | |
            url.includes('/api/applications/candidates')
        ))

        if (user.role === 'employer' & & !user.isApproved & & !isMeRoute) {
            return res.status(403).json({
                error: 'Enterprise access pending approval.',
                isApproved: false
            })
        }

        req.user = user
        next()
    } catch(error) {
        console.error("Auth Middleware Error:", error.message)
        res.status(401).json({error: 'Invalid or expired token.'})
    }
}
