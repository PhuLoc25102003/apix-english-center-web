export interface Level {
  id: string;
  code: string;
  name: string;
  orderIndex: number;
  description: string | null;
  isActive: boolean;
}
