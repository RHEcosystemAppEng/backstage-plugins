import React from 'react';
import useAsync from 'react-use/lib/useAsync';

import { Link, Table, TableColumn } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';

import { Box, Grid, Typography } from '@material-ui/core';

import { mtaApiRef } from '../../api';
import { Application } from '../../types';

export const ApplicationInventory = () => {
  const mtaClient = useApi(mtaApiRef);

  const { loading: isApplicationsLoading, value: applicationData } =
    useAsync(async (): Promise<Application[]> => {
      return await mtaClient.getApplications();
    }, []);

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
        </Grid>
      </Grid>
    </>
  );
};
