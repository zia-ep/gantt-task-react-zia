import React from "react";
import { Task, ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "./components/view-switcher";
import { getStartEndDateForProject, initTasks } from "./helper";
import "gantt-task-react/dist/index.css";
import { CustomTaskListTable } from "./components/custom-task-list-table";

// Init
const App = () => {
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = React.useState<Task[]>(initTasks());
  const [isChecked, setIsChecked] = React.useState(true);
  const [disableDepOnHover, setDisableDepOnHover] = React.useState(false);
  const [disableDepOnSelect, setDisableDepOnSelect] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredTasks, setFilteredTasks] = React.useState<Task[]>([]);
  const [searchTerm2, setSearchTerm2] = React.useState("");
  const [filteredTasks2, setFilteredTasks2] = React.useState<Task[]>([]);
  const ganttRef1 = React.useRef<{ scrollToTask: (taskId: string) => void; }>(null);
  const ganttRef2 = React.useRef<{ scrollToTask: (taskId: string) => void; }>(null);
  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const handleTaskChange = (task: Task) => {
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map(t => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map(t =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const handleDblClick = (task: Task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleClick = (task: Task) => {
    console.log("On Click event Id:" + task.id);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    if (searchTerm) {
      setFilteredTasks(
        tasks.filter(t => t.name.toLowerCase().includes(searchTerm))
      );
    } else {
      setFilteredTasks([]);
    }
  };

  const handleSearch2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm2(searchTerm);
    if (searchTerm) {
      setFilteredTasks2(
        tasks.filter(t => t.name.toLowerCase().includes(searchTerm))
      );
    } else {
      setFilteredTasks2([]);
    }
  };

  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={viewMode => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={disableDepOnHover}
            onChange={() => setDisableDepOnHover(!disableDepOnHover)}
          />
          Disable dependency style change on hover
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={disableDepOnSelect}
            onChange={() => setDisableDepOnSelect(!disableDepOnSelect)}
          />
          Disable dependency style change on select
        </label>
      </div>
      <h3>Gantt With Unlimited Height</h3>
      <div>
        <input
          type="text"
          placeholder="Search for a task"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div>
          {filteredTasks.map(task => (
            <button key={task.id} onClick={() => ganttRef1.current?.scrollToTask(task.id)}>
              {task.name}
            </button>
          ))}
        </div>
      </div>
      <Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onClick={handleClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
        onHoverPathColor={"blue"}
        disableDepOnHoverStyleChange={disableDepOnHover}
        disableDepSelectedStyleChange={disableDepOnSelect}
        TaskListTable={CustomTaskListTable}
        barBorderSelectedColor="blue"
        // barBorderColor="#FF0000"
        barBorderSelectedWidth={5}
        barBorderWidth={2}
        ganttRef={ganttRef1}
      />
      <h3>Gantt With Limited Height</h3>
      <div>
        <input
          type="text"
          placeholder="Search for a task"
          value={searchTerm2}
          onChange={handleSearch2}
        />
        <div>
          {filteredTasks2.map(task => (
            <button key={task.id} onClick={() => ganttRef2.current?.scrollToTask(task.id)}>
              {task.name}
            </button>
          ))}
        </div>
      </div>
      <Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onClick={handleClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
        onHoverPathColor={"blue"}
        disableDepOnHoverStyleChange={disableDepOnHover}
        disableDepSelectedStyleChange={disableDepOnSelect}
        TaskListTable={CustomTaskListTable}
        barBorderSelectedColor="blue"
        // barBorderColor="#FF0000"
        barBorderSelectedWidth={5}
        barBorderWidth={2}
        ganttRef={ganttRef2}
        ganttHeight={300}
      />
    </div>
  );
};

export default App;