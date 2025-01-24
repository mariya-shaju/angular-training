export interface IStudent {
  id: number;
  username: string;
  password: string;
  name: string;
  age: number;
  marks: {
    math: number;
    science: number;
    english: number;
  };
  totalMarks: number;
}
