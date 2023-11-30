import React, { useMemo, useState } from 'react';
import { useAsync } from 'react-use';

import { configApiRef, useApi } from '@backstage/core-plugin-api';

import { Box, Chip, makeStyles } from '@material-ui/core';

import { mtaApiRef } from '../api';
import { useStyles } from '../components/ApplicationInventory  /tableHeading';
import { Application } from '../types';

const useLocalStyles = makeStyles({
  chip: {
    margin: 0,
    marginRight: '.2em',
    height: '1.5em',
    '& > span': {
      padding: '.3em',
    },
  },
});

export const useApplications = () => {
  const mtaClient = useApi(mtaApiRef);
  const { loading: isApplicationsLoading, value: applicationData } =
    useAsync(async (): Promise<Application[]> => {
      return await mtaClient.getApplications();
    }, []);

  return { isApplicationsLoading, applicationData };
};
