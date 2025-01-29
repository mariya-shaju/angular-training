export interface Student {
  id: string; // Incremental ID or UUID
  username: string;
  password: string;
  name: string;
  age: number;
  class: number;
  marks: {
    math: number;
    science: number;
    english: number;
  };
  totalMarks: number;
}
export interface IStudentSubmit {
  student: Student;
  valid: boolean;
}
