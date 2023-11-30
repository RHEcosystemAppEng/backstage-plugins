import React from 'react';

import { Link, TableColumn } from '@backstage/core-components';

import makeStyles from '@material-ui/core/styles/makeStyles';

import { Application } from '../../types';

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
];

export const useStyles = makeStyles(theme => ({
  empty: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
}));
