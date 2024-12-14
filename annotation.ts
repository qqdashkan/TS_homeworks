// Roles: student, teacher
// Disciplines: Computer Science, Mathematics, Physics, Biology, Chemistry
// Academic status: active, academic leave, graduated, expelled

class UniversityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UniversityError';
  }
}

class University {
  name: string;
  courses = [];
  groups = [];
  people = [];

  constructor(name: string) {
    this.name = name;
  }

  addCourse(course: string): void {
    this.courses.push(course);
  }

  addGroup(group: string): void {
    this.groups.push(group);
  }

  addPerson(person: string): void {
    this.people.push(person);
  }

  findGroupByCourse(course: string): string[] | undefined {
    return this.groups.find((group) => group.course === course);
  }

  getAllPeopleByRole(role: string): string[] | never {
    switch (role) {
      case 'student':
        return this.people.filter((person) => person.role === 'student');
      case 'teacher':
        return this.people.filter((person) => person.role === 'teacher');
      default:
        return this.assertNeverRole(role);
    }
  }

  assertNeverRole(role: string): never {
    throw new Error(`Unhandled role: ${role}`);
  }
}

class Course {
  name: string;
  credits: string;
  discipline: string;

  constructor(name: string, discipline: string, credits: string) {
    this.name = name;
    this.credits = credits;
    this.discipline = discipline;
  }
}

class Group {
  name: string;
  course: string;
  teacher: string;
  students = [];

  constructor(name: string, course: string, teacher: string) {
    this.name = name;
    this.course = course;
    this.teacher = teacher;
  }

  addStudent(student: string): void | never {
    if (this.students.includes(student)) {
      throw new UniversityError('Student is already in the group');
    }

    this.students.push(student);
  }

  removeStudentById(id: number): void | never {
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

  getStudents(): string[] {
    return [...this.students];
  }
}

class Person {
  static nextId: number = 1;

  firstName: string;
  lastName: string;
  birthDay: any;
  id: number;
  gender: string;
  contactInfo: any;
  role: string;

  constructor(info: any, role: string) {
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
    const today = new Date();
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
  specializations = [];
  courses = [];

  constructor(info: any, specializations = []) {
    super(info, 'teacher');
    this.specializations = specializations;
  }

  assignCourse(course: string): void {
    this.courses.push(course);
  }

  removeCourse(courseName: string): void {
    this.courses = this.courses.filter((course) => course.name !== courseName);
  }

  getCourses(): string[] {
    return [...this.courses];
  }
}

//Створіть перелічувані типи (enums).
enum academicPerformance {
  totalCredits = 0,
  gpa = 0,
}

class Student extends Person {
  academicPerformance = {
    totalCredits: academicPerformance.totalCredits,
    gpa: academicPerformance.gpa,
  };
  enrolledCourses = [];
  status: string;

  constructor(info: any) {
    super(info, 'student');
    this.status = 'active';
  }

  enrollCourse(course: string): void | never {
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

  getEnrolledCourses(): string[] {
    return [...this.enrolledCourses];
  }
}
