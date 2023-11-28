// scheduled-task.service.ts
import { Injectable } from '@nestjs/common';
import * as schedule from 'node-schedule';

@Injectable()
export class ScheduledTaskService {
  private scheduledJob: schedule.Job | null = null;

  startScheduledTask(): void {
    // Schedule the task to run every day at 12 AM
    const rule = new schedule.RecurrenceRule();
    rule.hour = 0;
    rule.minute = 0;

    this.scheduledJob = schedule.scheduleJob(rule, () => {
      // Run your task here
      console.log('Task is running... on 12 am');

      // Cancel the job after half an hour
      setTimeout(
        () => {
          this.cancelScheduledTask();
        },
        2 * 60 * 1000,
      ); // 30 minutes in milliseconds
    });
  }

  cancelScheduledTask(): void {
    if (this.scheduledJob) {
      this.scheduledJob.cancel();
      console.log('Task is canceled.');
      this.scheduledJob = null;
    }
  }
}
