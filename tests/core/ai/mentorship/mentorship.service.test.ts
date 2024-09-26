import { Test, TestingModule } from '@nestjs /testing';
import { MentorshipService } from './mentorship.service';
import { Mentor } from './mentor.entity';
import { Student } from './student.entity';

describe('MentorshipService', () => {
  let mentorshipService: MentorshipService;
  let mentor: Mentor;
  let student: Student;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MentorshipService],
    }).compile();

    mentorshipService = module.get<MentorshipService>(MentorshipService);
    mentor = new Mentor('John Doe', 'john.doe@example.com');
    student = new Student('Jane Doe', 'jane.doe@example.com');
  });

  it('should be defined', () => {
    expect(mentorshipService).toBeDefined();
  });

  describe('assignMentor', () => {
    it('should assign a mentor to a student', async () => {
      await mentorshipService.assignMentor(student, mentor);
      expect(student.mentor).toBe(mentor);
    });
  });

  describe('getMentor', () => {
    it('should return a mentor by id', async () => {
      const result = await mentorshipService.getMentor(mentor.id);
      expect(result).toBe(mentor);
    });
  });

  describe('getStudents', () => {
    it('should return a list of students', async () => {
      const students = await mentorshipService.getStudents();
      expect(students).toContain(student);
    });
  });
});
