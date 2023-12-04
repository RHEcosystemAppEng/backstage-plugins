import React from 'react';

import { Link, Progress, Table } from '@backstage/core-components';

import { Button, Grid } from '@material-ui/core';

import {
  useApplications,
  useRunAnalysis,
  useTaskGroups,
  useTasks,
} from '../../hooks';
import { Application } from '../../types';
import {
  applicationColumns,
  taskColumns,
  taskGroupColumns,
  useStyles,
} from './tableHeading';

export const ApplicationInventory = () => {
  const classes = useStyles();

  const { isApplicationsLoading, applicationData } = useApplications();
  const { isTaskGroupsApplicationsLoading, taskGroupsData } = useTaskGroups();
  const { isTasksLoading, tasksData } = useTasks();
  const { runAnalysis } = useRunAnalysis();

  if (isApplicationsLoading) {
    return (
      <div data-testid="mta-application-progress">
        <Progress />
      </div>
    );
  }

  if (isTaskGroupsApplicationsLoading) {
    return (
      <div data-testid="mta-task-groups-progress">
        <Progress />
      </div>
    );
  }

  if (isTaskGroupsApplicationsLoading) {
    return (
      <div data-testid="mta-task-groups-progress">
        <Progress />
      </div>
    );
  }

  const analyseColumn = {
    title: 'Analyse',
    field: 'analyse',
    highlight: true,
    render: rowData => {
      const app = rowData as Application;
      return (
        <div>
          <Button onClick={e => runAnalysis(e, app)} variant="contained">
            Analyze
          </Button>
        </div>
      );
    },
  };

  const columns = [...applicationColumns, analyseColumn];

  return (
    <>
      <Grid style={{ marginTop: '1rem' }} container spacing={2}>
        <Grid item xs={10}>
          <Table
            title="Application Inventory"
            columns={columns}
            isLoading={isApplicationsLoading}
            data={applicationData || []}
            options={{
              padding: 'dense',
              pageSize: 100,
              emptyRowsWhenPaging: false,
              search: false,
            }}
            emptyContent={
              <div className={classes.empty}>
                No data was added yet,&nbsp;
                <Link to="https://backstage.io/">learn how to add data</Link>.
              </div>
            }
          />
          <Table
            title="Application TaskGroups"
            columns={taskGroupColumns}
            isLoading={isTaskGroupsApplicationsLoading}
            data={taskGroupsData || []}
            options={{
              padding: 'dense',
              pageSize: 100,
              emptyRowsWhenPaging: false,
              search: false,
            }}
            emptyContent={
              <div className={classes.empty}>
                No data was added yet,&nbsp;
                <Link to="https://backstage.io/">learn how to add data</Link>.
              </div>
            }
          />
          <Table
            title="Application Tasks"
            columns={taskColumns}
            isLoading={isTasksLoading}
            data={tasksData || []}
            options={{
              padding: 'dense',
              pageSize: 100,
              emptyRowsWhenPaging: false,
              search: false,
            }}
            emptyContent={
              <div className={classes.empty}>
                No data was added yet,&nbsp;
                <Link to="https://backstage.io/">learn how to add data</Link>.
              </div>
            }
          />
        </Grid>
      </Grid>
    </>
  );
};
