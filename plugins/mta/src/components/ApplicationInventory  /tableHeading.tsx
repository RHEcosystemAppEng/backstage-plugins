import React from 'react';

import { Link, TableColumn } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';

import { Button, makeStyles } from '@material-ui/core';

import { mtaApiRef } from '../../api';
import { Application } from '../../types';

export const runAnalysis = (
  _: React.MouseEvent<HTMLButtonElement>,
  application: Application,
) => {
  const mtaClient = useApi(mtaApiRef);
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
    return mtaClient.submitTaskGroup(data);
  });
};

export const useStyles = makeStyles(theme => ({
  empty: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
  analyseButton: {
    border: 'black',
    color: 'black',
    textAlign: 'center',
    textDecoration: 'none',
  },
}));

export const columns: TableColumn[] = [
  {
    title: 'Name',
    field: 'name',
    highlight: true,
  },
  {
    title: 'Description',
    field: 'description',
    highlight: true,
  },
  {
    title: 'Business Service',
    field: 'businessService',
    highlight: true,
  },
  {
    title: 'Repository Kind',
    field: 'repository.kind',
    highlight: true,
  },
  {
    title: 'Repository URL',
    field: 'repository.url',
    highlight: true,
  },
  {
    title: 'Repository Branch',
    field: 'repository.branch',
    highlight: true,
  },
  {
    title: 'Repository Path',
    field: 'repository.path',
    highlight: true,
  },
  {
    title: 'Creating User',
    field: 'createUser',
    highlight: true,
  },
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
      const classes = useStyles();
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

export const taskGroupColumns: TableColumn[] = [
  { title: 'ID', field: 'id', highlight: true },
  { title: 'Name', field: 'name', highlight: true },
  { title: 'State', field: 'state', highlight: true },
  { title: 'Application ID', field: 'application.id', highlight: true },
  { title: 'Test', field: 'tasks.name', highlight: true },
];

export const taskColumns: TableColumn[] = [
  { title: 'ID', field: 'id', highlight: true },
  { title: 'Name', field: 'name', highlight: true },
  { title: 'State', field: 'state', highlight: true },
  { title: 'Application Name', field: 'application.name', highlight: true },
  { title: 'Error', field: 'error', highlight: true },
  { title: 'Retries', field: 'retries', highlight: true },
  { title: 'Report Status', field: 'report.status', highlight: true },
];
