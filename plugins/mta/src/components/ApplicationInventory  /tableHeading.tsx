import { TableColumn } from '@backstage/core-components';

export const Columns: TableColumn[] = [
  { title: 'Name', field: 'name', highlight: true },
  { title: 'Description', field: 'description', highlight: true },
  { title: 'Business Service', field: 'businessService', highlight: true },
  { title: 'Analysis', field: 'analysis', highlight: true },
  { title: 'Report', field: 'report', highlight: true },
];

type DataTyoe = {
  name: string;
  description: number;
  businessService: string;
  analysis: string;

  report: string;
};

export type Data = {
  data: DataTyoe;
  dataAsArray: DataTyoe[];
};
