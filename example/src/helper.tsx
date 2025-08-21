import { Task } from "../../dist/types/public-types";

export function initTasks() {
  const currentDate = new Date();
  let tasks: Task[] = [];
  let displayOrderCounter = 1;

  // Function to add a task with an adjusted start date and duration
  const addTask = (name: string, duration: number, predecessors: string[]) => {
    let start: Date;
    if (predecessors.length > 0) {
      // Find the latest end date among all predecessors
      const latestPredecessorEnd = predecessors.reduce((latestEnd, predId) => {
        const predTask = tasks.find(t => t.id === predId);
        if (predTask && predTask.end.getTime() > latestEnd.getTime()) {
          return predTask.end;
        }
        return latestEnd;
      }, new Date(0));
      start = latestPredecessorEnd;
    } else {
      start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    }

    const end = new Date(start.getTime());
    end.setDate(end.getDate() + duration);

    const newTask: Task = {
      start: start,
      end: end,
      name: name,
      id: name.replace(/ /g, ''), // Simple ID generation
      progress: 0,
      type: "task",
      dependencies: predecessors,
      project: "NewMexicoTemplate",
      displayOrder: displayOrderCounter++,
    };
    tasks.push(newTask);
  };

  // Add Project
  tasks.push({
    start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 30),
    name: "New Mexico Template",
    id: "NewMexicoTemplate",
    progress: 0,
    type: "project",
    hideChildren: false,
    displayOrder: displayOrderCounter++,
  });

  // Define tasks and their predecessors based on the Django file's complex dependencies
  const taskDependencies: { [key: string]: string[] } = {
    "Soil Remediation": [],
    "Form Pins": ["Soil Remediation"],
    "Form Layout": ["Form Pins"],
    "Plumb soil": ["Form Layout"],
    "Plumbing Inspection": ["Plumb soil"],
    "Footings": ["Plumbing Inspection"],
    "Post Tension": ["Footings"],
    "Monolithic Inspection": ["Post Tension"],
    "Slab": ["Monolithic Inspection"],
    "Grade": ["Slab"],
    "Material Delivery": ["Grade"],
    "Frame": ["Material Delivery"],
    "Window Install": ["Frame"],
    "Roof Trusses": ["Frame"],
    "Exterior Trim": ["Roof Trusses"],
    "Foreman Frame Walk": ["Roof Trusses"],
    "Exterior Sheathing Inspection": ["Exterior Trim"],
    "Stucco Wire Mesh": ["Exterior Sheathing Inspection"],
    "Stucco Lath Inspection": ["Stucco Wire Mesh"],
    "Plumbing Top Out": ["Foreman Frame Walk"],
    "HVAC Rough": ["Foreman Frame Walk"],
    "Plumbing Inspection Phase 2": ["Plumbing Top Out"],
    "Electrical Rough": ["Plumbing Top Out", "HVAC Rough"],
    "Roofing": ["Plumbing Top Out", "HVAC Rough"],
    "Electrical Inspection": ["Electrical Rough"],
    "HVAC Inspection": ["HVAC Rough"],
    "Prewire": ["Electrical Rough"],
    "Prewire Inspection": ["Prewire"],
    "In House Inspections": ["Prewire", "Roofing"],
    "City Inspection": ["In House Inspections"],
    "Insulation": ["City Inspection"],
    "Insulation Inspection": ["Insulation"],
    "Drywall Hang": ["Insulation Inspection"],
    "Drywall Inspection": ["Drywall Hang"],
    "Drywall Tape/Texture": ["Drywall Inspection"],
    "Paint Walls": ["Drywall Tape/Texture"],
    "Stucco Brown Coat": ["Drywall Tape/Texture"],
    "Floor Tile Install": ["Paint Walls"],
    "Door & Trim": ["Floor Tile Install"],
    "Tile Shower Walls": ["Floor Tile Install"],
    "Cabinet Install": ["Door & Trim"],
    "Grout": ["Tile Shower Walls"],
    "Foreman Cabinet/Home Inspection": ["Cabinet Install"],
    "Trim Paint": ["Foreman Cabinet/Home Inspection"],
    "Granite": ["Foreman Cabinet/Home Inspection"],
    "Plumbing Final": ["Granite"],
    "Backsplash Tile": ["Granite"],
    "Electrical Final": ["Granite"],
    "Plumbing/HVAC Inspection": ["Plumbing Final"],
    "Prewire Final": ["Electrical Final"],
    "Carpet Install": ["Electrical Final"],
    "Appliances": ["Electrical Final"],
    "Order Gas Meter": ["Plumbing/HVAC Inspection"],
    "Electrical/Prewire Inspection": ["Prewire Final", "Appliances"],
    "Trim Final": ["Carpet Install"],
    "Paint Finals (Int. & Ext)": ["Electrical/Prewire Inspection"],
    "Prospec Inspections": ["Electrical/Prewire Inspection"],
    "Clean & Cabinet Detail": ["Paint Finals (Int. & Ext)"],
    "Zia Detail": ["Clean & Cabinet Detail"],
    "Stucco Color": ["Stucco Brown Coat"],
    "Flatwork Forms": ["Stucco Brown Coat"],
    "Flatwork Inspection": ["Flatwork Forms"],
    "Flatwork Pour": ["Flatwork Inspection"],
    "Final Grade": ["Flatwork Pour"],
    "HVAC Final": ["Flatwork Pour"],
    "Final inspection": ["Zia Detail"],
  };

  // Define task durations based on the Django file
  const taskDurations: { [key: string]: number } = {
    "Soil Remediation": 6,
    "Form Pins": 1,
    "Form Layout": 2,
    "Plumb soil": 2,
    "Plumbing Inspection": 3,
    "Footings": 2,
    "Post Tension": 2,
    "Monolithic Inspection": 3,
    "Slab": 2,
    "Grade": 2,
    "Material Delivery": 0,
    "Frame": 4,
    "Roof Trusses": 3,
    "Window Install": 2,
    "Foreman Frame Walk": 2,
    "Exterior Trim": 2,
    "Exterior Sheathing Inspection": 0,
    "HVAC Rough": 4,
    "HVAC Inspection": 0,
    "Plumbing Top Out": 3,
    "Plumbing Inspection Phase 2": 0,
    "Electrical Rough": 3,
    "Electrical Inspection": 0,
    "Prewire": 2,
    "Prewire Inspection": 0,
    "Roofing": 2,
    "Stucco Wire Mesh": 3,
    "Stucco Lath Inspection": 0,
    "In House Inspections": 4,
    "City Inspection": 10,
    "Insulation": 3,
    "Insulation Inspection": 2,
    "Drywall Hang": 4,
    "Drywall Inspection": 3,
    "Drywall Tape/Texture": 4,
    "Stucco Brown Coat": 2,
    "Paint Walls": 2,
    "Floor Tile Install": 3,
    "Door & Trim": 4,
    "Cabinet Install": 1,
    "Tile Shower Walls": 4,
    "Grout": 2,
    "Foreman Cabinet/Home Inspection": 4,
    "Granite": 2,
    "Stucco Color": 2,
    "Backsplash Tile": 1,
    "Flatwork Forms": 1,
    "Flatwork Inspection": 3,
    "Flatwork Pour": 1,
    "Trim Paint": 3,
    "HVAC Final": 2,
    "Plumbing Final": 2,
    "Plumbing/HVAC Inspection": 3,
    "Order Gas Meter": 0,
    "Trim Final": 2,
    "Final Grade": 2,
    "Carpet Install": 2,
    "Paint Finals (Int. & Ext)": 4,
    "Appliances": 1,
    "Electrical Final": 3,
    "Prewire Final": 1,
    "Electrical/Prewire Inspection": 3,
    "Clean & Cabinet Detail": 2,
    "Zia Detail": 5,
    "Prospec Inspections": 1,
    "Final inspection": 3,
  };

  // Add tasks in a way that respects their dependencies
  const processedTasks = new Set<string>();

  while (processedTasks.size < Object.keys(taskDependencies).length) {
    let taskAddedThisLoop = false;
    for (const taskName of Object.keys(taskDependencies)) {
      if (!processedTasks.has(taskName)) {
        const predecessors = taskDependencies[taskName];
        const allPredecessorsProcessed = predecessors.every(pred => processedTasks.has(pred));

        if (allPredecessorsProcessed) {
          addTask(taskName, taskDurations[taskName], predecessors.map(p => p.replace(/ /g, '')));
          processedTasks.add(taskName);
          taskAddedThisLoop = true;
        }
      }
    }
    if (!taskAddedThisLoop && processedTasks.size < Object.keys(taskDependencies).length) {
      console.error("Circular dependency detected or a task is missing dependencies.");
      break;
    }
  }

  // Find the start and end dates for the project based on the created tasks
  const [projectStart, projectEnd] = getStartEndDateForProject(tasks, "NewMexicoTemplate");
  const projectIndex = tasks.findIndex(t => t.id === "NewMexicoTemplate");
  if (projectIndex !== -1) {
    tasks[projectIndex].start = projectStart;
    tasks[projectIndex].end = projectEnd;
  }

  return tasks;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const projectTasks = tasks.filter(t => t.project === projectId);
  if (projectTasks.length === 0) {
    return [new Date(), new Date()];
  }
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}