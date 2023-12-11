import React from 'react';
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

export function useRunAnalysis() {
  const mtaApi = useApi(mtaApiRef);

  // Define the runAnalysis function
  const runAnalysis = async (
    _: React.MouseEvent<HTMLButtonElement>,
    application: Application,
  ) => {
    let bucketId;

    // Check if the application has a bucket and an id
    if (application?.bucket?.id) {
      bucketId = application.bucket.id;
    }

    // Create and submit a task group
    const taskGroup = createTaskGroup(application, bucketId);
    const createdTaskGroup = await mtaApi.createTaskGroup(taskGroup);
    await mtaApi.submitTaskGroup(createdTaskGroup);
  };

  // Return the runAnalysis function from the hook
  return { runAnalysis };
}

function createTaskGroup(application, bucketId) {
  const applicationId = application.id;
  const applicationName = application.name;

  const taskGroup = {
    id: 0,
    createUser: 'admin',
    updateUser: '',
    createTime: '2023-11-29T15:43:04.090028268Z',
    name: 'taskgroup.windup',
    addon: 'windup',
    data: {
      output: '/windup/report',
      tagger: {
        enabled: true,
      },
      mode: {
        binary: false,
        withDeps: true,
        artifact: '',
        diva: false,
      },
      scope: {
        withKnown: true,
        packages: {
          included: [],
          excluded: [],
        },
      },
      rules: {
        labels: ['konveyor.io/target=cloud-readiness'],
        path: '',
        tags: {
          excluded: [],
        },
        rulesets: [
          {
            name: 'Containerization',
            id: 2,
          },
        ],
      },
    },
    bucket: {
      id: bucketId,
    },
    state: 'Created',
    tasks: [
      {
        name: `${applicationName}.1.windup`,
        data: {},
        application: {
          id: applicationId,
          name: applicationName,
        },
      },
    ],
  };

  return taskGroup;
}
