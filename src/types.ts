export type Canvas = {
  problem_name: string
  problem_url?: string | null
  ideas?: string | null
  constraints?: string | null
  test_cases?: string | null
  code?: string | null
  id: string
  owner_id: string
}

export const emptyCanvas: Canvas = {
    id: '',
    problem_name: '',
    problem_url: '',
    constraints: '',
    ideas: '',
    test_cases: '',
    code: '',
    owner_id: ''
};

