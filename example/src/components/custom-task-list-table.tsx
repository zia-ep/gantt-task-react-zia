import React from 'react';
import { Task } from 'gantt-task-react';
import styles from './task-list-table.module.css';

export const CustomTaskListTable: React.FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string, source: 'list' | 'gantt') => void;
  onExpanderClick: (task: Task) => void;
}> = ({ tasks, setSelectedTask, rowHeight }) => {
  return (
    <div>
      {tasks.map(t => (
        <div key={t.id} className={styles.taskListTableRow} style={{ height: rowHeight }}>
          <button onClick={() => setSelectedTask(t.id, 'list')}>{t.name}</button>
        </div>
      ))}
    </div>
  );
};