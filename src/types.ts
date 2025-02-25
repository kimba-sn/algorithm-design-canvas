export interface Canvas {
  id: number;
  problem_name: string;
  problem_url: string;
  constraints: string;
  ideas: string;
  test_cases: string;
  code: string;
}

export const emptyCanvas: Canvas = {
    id: 0,
    problem_name: '',
    problem_url: '',
    constraints: '',
    ideas: '',
    test_cases: '',
    code: ''
};
