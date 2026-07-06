export interface Curriculum {
  id: string;
  courseId: string;
  courseName: string | null;
  name: string;
  versionName: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCurriculumDto {
  courseId: string;
  name: string;
  versionName: string;
  description?: string | null;
  isActive: boolean;
}

export type UpdateCurriculumDto = CreateCurriculumDto;
