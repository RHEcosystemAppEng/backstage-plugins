import React from 'react';

import { Link, TableColumn } from '@backstage/core-components';

import { makeStyles } from '@material-ui/core';

import { Application } from '../../types';

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

export const applicationColumns: TableColumn[] = [
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
    title: 'Repository URL',
    field: 'repository.url',
    highlight: true,
  },
  {
    title: 'Created By',
    field: 'createUser',
    highlight: true,
  },
  {
    title: 'Report Status',
    field: 'reportStatus',
    highlight: true,
  },
  {
    title: 'Report',
    field: 'report',
    highlight: true,
    render: (rowData: any): React.ReactNode => {
      const app = rowData as Application;
      if (app.reportStatus === 'Failed') {
        return <span style={{ color: 'gray' }}>Report</span>;
      }
      return <Link to={`${app.report}`}>Report</Link>;
    },
  },
];

export const taskGroupColumns: TableColumn[] = [
  {
    title: 'ID',
    field: 'id',
    highlight: true,
  },
  {
    title: 'Name',
    field: 'name',
    highlight: true,
  },
  {
    title: 'State',
    field: 'state',
    highlight: true,
  },
  {
    title: 'Application ID',
    field: 'application.id',
    highlight: true,
  },
  {
    title: 'Test',
    field: 'tasks.name',
    highlight: true,
  },
];

export const taskColumns: TableColumn[] = [
  {
    title: 'ID',
    field: 'id',
    highlight: true,
  },
  {
    title: 'Name',
    field: 'name',
    highlight: true,
  },
  {
    title: 'State',
    field: 'state',
    highlight: true,
  },
  {
    title: 'Application Name',
    field: 'application.name',
    highlight: true,
  },
  {
    title: 'Error',
    field: 'error',
    highlight: true,
  },
  {
    title: 'Create Time',
    field: 'createTime',
    highlight: true,
  },
  {
    title: 'Report Status',
    field: 'report.status',
    highlight: true,
  },
];
