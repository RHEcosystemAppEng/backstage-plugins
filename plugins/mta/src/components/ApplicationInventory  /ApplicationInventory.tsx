import React from 'react';
import useAsync from 'react-use/lib/useAsync';

import { Table } from '@backstage/core-components';
import { configApiRef, useApi } from '@backstage/core-plugin-api';

import { Box, Grid, Typography } from '@material-ui/core';

import { Columns, Data } from './tableHeading';

export const ApplicationInventory = () => {
  const config = useApi(configApiRef);
  const BACKEND_URL = 'backend.baseUrl';

  const { loading: isSysInfoLoading, value: sysInfoData } =
    useAsync(async (): Promise<Data> => {
      const backendUrl = config.getString(BACKEND_URL);
      // TODO: Update the URL to match the new MTA client's backend .
      const backendApiEndPoint = `${backendUrl}/hub/applications`;
      const applicationInventory = await fetch(backendApiEndPoint)
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json());

      // To display the main data in a table, prepare the array to contain the ONLY data we have
      applicationInventory.mainDataAsArray = [];
      applicationInventory.mainDataAsArray[0] = applicationInventory.data;

      return applicationInventory;
    }, []);

  return (
    <>
      <Grid style={{ marginTop: '1rem' }} container spacing={2}>
        <Grid item xs={10}>
          <Table
            title="Application Inventory"
            columns={Columns}
            isLoading={isSysInfoLoading}
            data={sysInfoData?.dataAsArray || []}
            options={{
              padding: 'dense',
              pageSize: 1,
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
