/**
 * src/features/attendance/api/attendance.api.ts
 *
 * Client-side mock storage API layer for class sessions.
 * Implements full CRUD capabilities to enable visual verification.
 */

import type { ApiResponse, PageResponse } from "@/lib/api";
import type {
  ClassSession,
  ClassSessionFilters,
  CreateClassSessionRequest,
  UpdateClassSessionRequest,
} from "../types/attendance.type";

const isClient = typeof window !== "undefined";

const INITIAL_SESSIONS: ClassSession[] = [
  {
    id: "session-1",
    classId: "", // To be dynamically mapped or populated
    scheduleId: null,
    roomId: "", // To be dynamically mapped or populated
    sessionDate: new Date().toISOString().split("T")[0],
    startTime: "08:00",
    endTime: "09:30",
    lessonNo: 1,
    status: "PLANNED",
    note: "Buổi học định hướng và giới thiệu nội dung chương trình học.",
  },
];

function getStoredSessions(): ClassSession[] {
  if (!isClient) return INITIAL_SESSIONS;
  const stored = localStorage.getItem("apix_class_sessions");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_SESSIONS;
    }
  }
  localStorage.setItem("apix_class_sessions", JSON.stringify(INITIAL_SESSIONS));
  return INITIAL_SESSIONS;
}

function saveStoredSessions(sessions: ClassSession[]) {
  if (isClient) {
    localStorage.setItem("apix_class_sessions", JSON.stringify(sessions));
  }
}

export const attendanceApi = {
  async getAll(params?: ClassSessionFilters): Promise<PageResponse<ClassSession>> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let sessions = getStoredSessions();

    if (params?.classId) {
      sessions = sessions.filter((s) => s.classId === params.classId);
    }
    if (params?.status) {
      sessions = sessions.filter((s) => s.status === params.status);
    }
    if (params?.sessionDate) {
      sessions = sessions.filter((s) => s.sessionDate === params.sessionDate);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      sessions = sessions.filter(
        (s) =>
          s.note?.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)
      );
    }

    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const total = sessions.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    const data = sessions.slice(start, start + limit);

    return {
      success: true,
      message: "Retrieved class sessions successfully",
      data,
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  },

  async getById(id: string): Promise<ApiResponse<ClassSession>> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const sessions = getStoredSessions();
    const session = sessions.find((s) => s.id === id);
    if (!session) {
      throw new Error("Không tìm thấy buổi học.");
    }
    return {
      success: true,
      message: "Retrieved class session details successfully",
      data: session,
    };
  },

  async create(body: CreateClassSessionRequest): Promise<ApiResponse<ClassSession>> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const sessions = getStoredSessions();
    const newSession: ClassSession = {
      ...body,
      id: `session-${Date.now()}`,
    };
    sessions.push(newSession);
    saveStoredSessions(sessions);
    return {
      success: true,
      message: "Tạo buổi học thành công!",
      data: newSession,
    };
  },

  async update(id: string, body: UpdateClassSessionRequest): Promise<ApiResponse<ClassSession>> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const sessions = getStoredSessions();
    const index = sessions.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error("Không tìm thấy buổi học để cập nhật.");
    }
    const updated: ClassSession = {
      ...sessions[index],
      ...body,
    };
    sessions[index] = updated;
    saveStoredSessions(sessions);
    return {
      success: true,
      message: "Cập nhật buổi học thành công!",
      data: updated,
    };
  },

  async remove(id: string): Promise<ApiResponse<null>> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const sessions = getStoredSessions();
    const filtered = sessions.filter((s) => s.id !== id);
    saveStoredSessions(filtered);
    return {
      success: true,
      message: "Xóa buổi học thành công!",
      data: null,
    };
  },

  // Helper method to set mock session initial states (used inside client page load)
  async seedInitialReferences(classId: string, roomId: string): Promise<void> {
    if (!isClient) return;
    const sessions = getStoredSessions();
    let changed = false;
    const updated = sessions.map((s) => {
      let mod = { ...s };
      if (!s.classId && classId) {
        mod.classId = classId;
        changed = true;
      }
      if (!s.roomId && roomId) {
        mod.roomId = roomId;
        changed = true;
      }
      return mod;
    });
    if (changed) {
      saveStoredSessions(updated);
    }
  },
};
