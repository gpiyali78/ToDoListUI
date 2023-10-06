export interface TaskListRequest {
    taskName: string;
    description: string;
    taskStartDate: Date;
    taskEndDate: Date;
    totalEffortRequired: string;
}