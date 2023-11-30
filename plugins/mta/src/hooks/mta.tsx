import { useAsync } from 'react-use';

import { useApi } from '@backstage/core-plugin-api';

import { mtaApiRef } from '../api';
import { Application, Task, TaskGroup } from '../types';

export const useApplications = () => {
  const mtaClient = useApi(mtaApiRef);
  const { loading: isApplicationsLoading, value: applicationData } =
    useAsync(async (): Promise<Application[]> => {
      return await mtaClient.getApplications();
    }, []);

  return { isApplicationsLoading, applicationData };
};

export const useTaskGroups = () => {
  const mtaClient = useApi(mtaApiRef);
  const { loading: isTaskGroupsApplicationsLoading, value: taskGroupsData } =
    useAsync(async (): Promise<TaskGroup[]> => {
      return await mtaClient.getTaskGroups();
    }, []);

  return { isTaskGroupsApplicationsLoading, taskGroupsData };
};

export const useTasks = () => {
  const mtaClient = useApi(mtaApiRef);
  const { loading: isTasksLoading, value: tasksData } =
    useAsync(async (): Promise<Task[]> => {
      return await mtaClient.getTasks();
    }, []);

  return { isTasksLoading, tasksData };
};
