import { Test, TestingModule } from '@nestjs/testing';
import { EducationService } from './education.service';
import { Course } from './course.entity';
import { Student } from './student.entity';

describe('EducationService', () => {
  let educationService: EducationService;
  let course: Course;
  let student: Student;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationService],
    }).compile();

    educationService = module.get<EducationService>(EducationService);
    course = new Course('AI for Beginners', 'This is a course about AI');
    student = new Student('Jane Doe', 'jane.doe@example.com');
  });

  it('should be defined', () => {
    expect(educationService).toBeDefined();
  });

  describe('enrollStudent', () => {
    it('should enroll a student in a course', async () => {
      await educationService.enrollStudent(student, course);
      expect(student.courses).toContain(course);
    });
  });

  describe('getCourse', () => {
    it('should return a course by id', async () => {
      const result = await educationService.getCourse(course.id);
      expect(result).toBe(course);
    });
  });

  describe('getStudents', () => {
    it('should return a list of students', async () => {
      const students = await educationService.getStudents();
      expect(students).toContain(student);
    });
  });
});
