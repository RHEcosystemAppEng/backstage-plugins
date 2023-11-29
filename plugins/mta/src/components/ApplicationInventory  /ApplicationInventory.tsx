import React from 'react';

import { Link, Progress, Table, TableColumn } from '@backstage/core-components';

import { Grid } from '@material-ui/core';

import { useApplications } from '../../hooks';
import { columns, useStyles } from './tableHeading';

export const ApplicationInventory = () => {
  const classes = useStyles();

  const { isApplicationsLoading, applicationData } = useApplications();
  if (isApplicationsLoading) {
    return (
      <div data-testid="mta-application-progress">
        <Progress />
      </div>
    );
  }

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
        </Grid>
      </Grid>
    </>
  );
};
