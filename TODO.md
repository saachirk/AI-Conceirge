# AI Concierge TODO

## Priority 1: Fix Errors (Current)
- [x] Install missing frontend deps (axios, react-router-dom)
- [x] Start backend server (python backend/app.py)
- [x] Test OnboardingPage → no import/backend errors

## Priority 2: Core Profiling
- [ ] Enhance OnboardingPage: Multi-turn profile extraction (age/job/goal/risk)
- [ ] Backend: Save profile to /user/save (use User model)
- [ ] Update ai_service.py: Dynamic prompts based on profile

## Priority 3: Real AI & ET Features
- [ ] Integrate Groq LLM in ai_service.py (need API key)
- [ ] Advanced prompts: Financial navigator, cross-sell (Prime/Markets/events)
- [ ] Recommender.py: Marketplace services (loans/CC)

## Priority 4: UI/Polish
- [ ] Dynamic Dashboard recs from profile
- [ ] Full ChatPage integration
- [ ] Add auth/persist DB (SQLite)

## Priority 5: Test/Deploy
- [ ] E2E tests
- [ ] Deploy instructions
