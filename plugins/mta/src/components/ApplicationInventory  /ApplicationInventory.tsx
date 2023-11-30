import React from 'react';
import useAsync from 'react-use/lib/useAsync';

import { Link, Table, TableColumn } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';

import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';

import { mtaApiRef } from '../../api';
import { Application, Task, TaskGroup } from '../../types';

const useStyles = makeStyles(_theme => ({
  analyseButton: {
    border: 'black',
    color: 'black',
    textAlign: 'center',
    textDecoration: 'none',
  },
}));

export const ApplicationInventory = () => {
  const mtaClient = useApi(mtaApiRef);
  const classes = useStyles();

  const { loading: isApplicationsLoading, value: applicationData } =
    useAsync(async (): Promise<Application[]> => {
      return await mtaClient.getApplications();
    }, []);

  const { loading: isTaskGroupsApplicationsLoading, value: taskGroupsData } =
    useAsync(async (): Promise<TaskGroup[]> => {
      return await mtaClient.getTaskGroups();
    }, []);

  const { loading: isTasksLoading, value: tasksData } =
    useAsync(async (): Promise<Task[]> => {
      return await mtaClient.getTasks();
    }, []);

  const runAnalysis = (
    _: React.MouseEvent<HTMLButtonElement>,
    application: Application,
  ) => {
    let bucketId = 0;
    const applicationId = application.id;
    const applicationName = application.name;

    if (application?.bucket?.id) {
      bucketId = application?.bucket?.id;
    }

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

    mtaClient.createTaskGroup(taskGroup).then(data => {
      mtaClient.submitTaskGroup(data);
    });
  };

  const Columns: TableColumn[] = [
    { title: 'Name', field: 'name', highlight: true },
    { title: 'Description', field: 'description', highlight: true },
    { title: 'Business Service', field: 'businessService', highlight: true },
    { title: 'Repository Kind', field: 'repository.kind', highlight: true },
    { title: 'Repository URL', field: 'repository.url', highlight: true },
    { title: 'Repository Branch', field: 'repository.branch', highlight: true },
    { title: 'Repository Path', field: 'repository.path', highlight: true },
    { title: 'Creating User', field: 'createUser', highlight: true },
    {
      title: 'Report',
      field: 'report',
      highlight: true,
      render: (rowData: any): React.ReactNode => {
        const app = rowData as Application;
        return <Link to={`${app.report}`}>Report</Link>;
      },
    },
    {
      title: 'Analyse',
      field: 'report',
      highlight: true,
      render: (rowData: any): React.ReactNode => {
        const app = rowData as Application;
        return (
          <div>
            <Button
              className={classes.analyseButton}
              onClick={e => runAnalysis(e, app)}
              variant="contained"
            >
              Analyze
            </Button>
          </div>
        );
      },
    },
  ];

  const TaskGroupColumns: TableColumn[] = [
    { title: 'ID', field: 'id', highlight: true },
    { title: 'Name', field: 'name', highlight: true },
    { title: 'State', field: 'state', highlight: true },
    { title: 'Application ID', field: 'application.id', highlight: true },
    { title: 'Test', field: 'tasks.name', highlight: true },
  ];

  const TaskColumns: TableColumn[] = [
    { title: 'ID', field: 'id', highlight: true },
    { title: 'Name', field: 'name', highlight: true },
    { title: 'State', field: 'state', highlight: true },
    { title: 'Application Name', field: 'application.name', highlight: true },
    { title: 'Error', field: 'error', highlight: true },
    { title: 'Retries', field: 'retries', highlight: true },
    { title: 'Report Status', field: 'report.status', highlight: true },
  ];

  return (
    <>
      <Grid style={{ marginTop: '1rem' }} container spacing={2}>
        <Grid item xs={10}>
          <Table
            title="Application Inventory"
            columns={Columns}
            isLoading={isApplicationsLoading}
            data={applicationData || []}
            options={{
              padding: 'dense',
              pageSize: 100,
              emptyRowsWhenPaging: false,
              search: false,
            }}
            emptyContent={
              <Box style={{ textAlign: 'center', padding: '15px' }}>
                <Typography variant="body1">Backend data NOT found</Typography>
              </Box>
            }
          />
          <Table
            title="Application TaskGroups"
            columns={TaskGroupColumns}
            isLoading={isTaskGroupsApplicationsLoading}
            data={taskGroupsData || []}
            options={{
              padding: 'dense',
              pageSize: 100,
              emptyRowsWhenPaging: false,
              search: false,
            }}
            emptyContent={
              <Box style={{ textAlign: 'center', padding: '15px' }}>
                <Typography variant="body1">Backend data NOT found</Typography>
              </Box>
            }
          />
          <Table
            title="Application Tasks"
            columns={TaskColumns}
            isLoading={isTasksLoading}
            data={tasksData || []}
            options={{
              padding: 'dense',
              pageSize: 100,
              emptyRowsWhenPaging: false,
              search: false,
            }}
            emptyContent={
              <Box style={{ textAlign: 'center', padding: '15px' }}>
                <Typography variant="body1">Backend data NOT found</Typography>
              </Box>
            }
          />
        </Grid>
      </Grid>
    </>
  );
};
