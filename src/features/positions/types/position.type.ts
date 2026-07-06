export interface Position {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isTeachingPosition: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePositionDto {
  code: string;
  name: string;
  description?: string | null;
  isTeachingPosition: boolean;
  isActive: boolean;
}

export type UpdatePositionDto = CreatePositionDto;
