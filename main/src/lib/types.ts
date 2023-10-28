interface User{
    username: string
    email: string
    name: string
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
    status: 'unstarted' | 'ongoing' | 'ended'
    private: boolean
    maximum_team_members_number: number
    auto_confirm_participants: boolean
}

interface ScoreboardResult {
    individual: boolean
    username_or_team_name: string
    total_score: number|null
    problems: {
        id: number
        name: string
        best_score: number
    }[]
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
}

interface SubmissionPrivate{
    id: number
    author_user_username: string
    problem_id: number
    problem_name: string
    code: string
    language_name: string
    language_version: string
    time_sent: string
    checked: boolean
    compiled: boolean
    compilation_details: string
    results: TestCaseResult[]
    total_verdict: string | undefined
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