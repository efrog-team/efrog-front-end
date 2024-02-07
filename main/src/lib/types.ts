/* eslint-disable @typescript-eslint/no-unused-vars */
type Dictionary = {[key:string]: string}
type FailFormBase = {error: string, data: Dictionary}

interface User{
    username: string
    email: string
    name: string
    problems_quota: number
    test_cases_quota: number
    competitions_quota: number
}

interface Team{
    name: string
    owner_user_username: string
    active: boolean
}

interface Member{
    member_username: string
    team_name: string
    coach: boolean
    confirmed: boolean
    declined: boolean 
}

interface Problem {
    id: number
    author_user_username: string
    name: string
    statement: string
    input_statement: string
    output_statement: string
    notes: string
    time_restriction: number
    memory_restriction: number
    private: boolean
    approved: boolean
    solved: boolean |null
}

interface ProblemFull extends Problem{ 
    test_cases: TestCase[]
    custom_checker: Checker | null
}

interface Checker {
    code: string
    language?: string,
    language_name: string
    language_version: string
    id: number
    problem_id: number
}

interface TestCase {
    id: number
    problem_id: number
    input: string
    solution: string
    score: number
    opened: boolean
}

interface Contest {
    id: number
    author_user_username: string
    name: string
    description: string
    start_time: string 
    end_time: string 
    status: "unstarted" | "ongoing" | "ended"
    private: boolean
    maximum_team_members_number: number
    auto_confirm_participants: boolean
    approved: boolean
    only_count_submissions_with_zero_edition_difference: boolean
    only_count_solved_or_not: boolean
    count_scores_as_percentages: boolean
    time_penalty_coefficient: number
    wrong_attempt_penalty: number
}

interface ScoreboardResult {
    individual: boolean
    username_or_team_name: string
    total_score: number|null
    total_penalty_score: number
    problems: {
        id: number
        name: string
        edition: number
        best_score: number | null
        solved: boolean
        penalty_minutes: number
        penalty_score: number
        attempts: number
    }[]
}

interface Scoreboard {
    time_penalty_coefficient: number
    wrong_attempt_penalty: number
    participants: ScoreboardResult[]
}

interface Participant{
    username_or_team_name: string
    individual: boolean
    author_confirmed: boolean
    author_declined: boolean
    participant_confirmed: boolean
    participant_declined: boolean 
}

interface ContestProblem extends Problem{
    test_cases: TestCase[];
}

interface SubmissionPublic{
    id: number
    author_user_username: string
    problem_id: number
    problem_name: string
    language_name: string
    language_version: string
    time_sent: string
    total_verdict: string
    problem_edition: number
    edition_difference: number
}

interface SubmissionPrivate extends SubmissionPublic{
    code: string
    checked: boolean
    compiled: boolean
    compilation_details: string
    results: TestCaseResult[]
    correct_score: number | undefined
    total_score: number | undefined
    realtime_link: string | undefined
}

interface TestCaseResult{
    test_case_id: number
    test_case_score: number
    test_case_opened: boolean
    verdict_text: string
    time_taken: number
    cpu_time_taken: number
    physical_memory_taken: number 
}

interface DebugResult{
    verdict_text: string
    time_taken: number
    cpu_time_taken: number
    physical_memory_taken: number
    output: string
}
/* eslint-enable @typescript-eslint/no-unused-vars */