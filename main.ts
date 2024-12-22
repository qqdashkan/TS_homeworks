// Academic performance: total credits, gpa
// Person info: first name, last name, birth day, gender: male, female, other
// Contact info = ...
// Full person info = ...;

type ContactInfo = {
  email: string;
  phone: string;
};

const defaultContact: ContactInfo = {
  email: 'info@university.com',
  phone: '+380955555555',
};

class UniversityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UniversityError';
  }
}

class University {
  name: string;
  courses: Array<Course> = [];
  groups: Array<Group> = [];
  people: Array<Person> = [];

  constructor(name: string) {
    this.name = name;
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }

  addGroup(group: Group): void {
    this.groups.push(group);
  }

  addPerson(person: Person): void {
    this.people.push(person);
  }

  findGroupByCourse(course: Course): Group | undefined {
    return this.groups.find((group) => group.course === course);
  }

  getAllPeopleByRole(role: Person['role']): Array<Person> | never {
    switch (role) {
      case 'student':
        return this.people.filter((person) => person.role === 'student');
      case 'teacher':
        return this.people.filter((person) => person.role === 'teacher');
      default:
        return this.assertNeverRole(role);
    }
  }

  assertNeverRole(role: Person['role']): never {
    throw new Error(`Unhandled role: ${role}`);
  }
}

class Course {
  name: string;
  credits: number;
  discipline: string;

  constructor(name: string, credits: number, discipline: string) {
    this.name = name;
    this.credits = credits;
    this.discipline = discipline;
  }
}

class Group {
  name: string;
  course: Course;
  teacher: Teacher;
  students: Array<Student> = [];

  constructor(name: string, course: Course, teacher: Teacher) {
    this.name = name;
    this.course = course;
    this.teacher = teacher;
  }

  addStudent(student: Student): void | never {
    if (this.students.includes(student)) {
      throw new UniversityError('Student is already in the group');
    }

    this.students.push(student);
  }

  removeStudentById(id: Student['id']): void | never {
    const index: number = this.students.findIndex(
      (student) => student.id === id
    );

    if (!~index) {
      throw new UniversityError('Student not found in group');
    }

    this.students.splice(index, 1);
  }

  getAverageGroupScore(): number {
    if (this.students.length) {
      return 0;
    }

    const totalScore: number = this.students.reduce(
      (sum, student) => sum + student.getAverageScore(),
      0
    );

    return totalScore / this.students.length;
  }

  getStudents(): Array<Student> {
    return [...this.students];
  }

  // Add the ability to pass a single identifier and an array of identifiers

  getStudentById(studentsID: Array<Student['id']>): Array<Student>;

  getStudentById(studentsID: Student['id']): Student;

  getStudentById(studentsID: Array<Student['id']> | Student['id']) {
    if (Array.isArray(studentsID)) {
      return this.students.filter((student) => studentsID.includes(student.id));
    }
    return this.students.find((student) => student.id === studentsID);
  }
}

type PersonInfo = {
  firstName: string;
  lastName: string;
  birthDay: Date;
  id: number;
  gender: 'male' | 'female';
  contactInfo: ContactInfo;
};

class Person {
  static nextId: number = 1;
  firstName: string;
  lastName: string;
  birthDay: Date;
  id: number;
  gender: 'male' | 'female';
  contactInfo: ContactInfo;
  role: 'student' | 'teacher';

  constructor(info: PersonInfo & ContactInfo, role: 'student' | 'teacher') {
    const { firstName, lastName, birthDay, gender, email, phone } = info;

    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDay = birthDay;
    this.id = Person.nextId++;
    this.gender = gender;
    this.contactInfo = { email, phone };
    this.role = role;
  }

  get fullName() {
    return `${this.lastName} ${this.firstName}`;
  }

  get age() {
    const today: Date = new Date();
    let age: number = today.getFullYear() - this.birthDay.getFullYear();
    const monthDiff: number = today.getMonth() - this.birthDay.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < this.birthDay.getDate())
    ) {
      age--;
    }

    return age;
  }
}

class Teacher extends Person {
  specializations: string[] = [];
  courses: Array<Course> = [];

  constructor(info: PersonInfo & ContactInfo, specializations: string[] = []) {
    super(info, 'teacher');
    this.specializations = specializations;
  }

  assignCourse(course: Course): void {
    this.courses.push(course);
  }

  removeCourse(courseName: Course['name']): void {
    this.courses = this.courses.filter((course) => course.name !== courseName);
  }

  getCourses(): Array<Course> {
    return [...this.courses];
  }
}

type academicPerformance = {
  totalCredits: number;
  gpa: number;
};

class Student extends Person {
  academicPerformance: academicPerformance = {
    totalCredits: 0,
    gpa: 0,
  };
  enrolledCourses: Array<Course> = [];
  status: string;

  constructor(info: PersonInfo & ContactInfo) {
    super(info, 'student');
    this.status = 'active';
  }

  enrollCourse(course: Course): void | never {
    if (this.status !== 'active') {
      throw new UniversityError(
        'Cannot enroll: Student is not in active status'
      );
    }

    this.enrolledCourses.push(course);
    this.academicPerformance.totalCredits += course.credits;
  }

  getAverageScore(): number {
    return this.academicPerformance.gpa;
  }

  updateAcademicStatus(newStatus: string): void {
    this.status = newStatus;
  }

  getEnrolledCourses(): Array<Course> {
    return [...this.enrolledCourses];
  }
}
