import {
  ConfigApi,
  createApiRef,
  DiscoveryApi,
  IdentityApi,
} from '@backstage/core-plugin-api';

import { Application, Task, TaskGroup } from '../types';

const DEFAULT_PROXY_PATH = '/mta/api';

export interface MtaApiV1 {
  getApplications(): Promise<Application[]>;
  createTaskGroup(taskGroup: TaskGroup): Promise<TaskGroup>;
  submitTaskGroup(taskGroup: TaskGroup): Promise<void>;
  getTaskGroups(): Promise<TaskGroup[]>;
  getTasks(): Promise<Task[]>;
}

export const mtaApiRef = createApiRef<MtaApiV1>({
  id: 'plugin.mta.service',
});

export type Options = {
  discoveryApi: DiscoveryApi;
  configApi: ConfigApi;
  identityApi: IdentityApi;
};

export class MtaApiClient implements MtaApiV1 {
  // @ts-ignore
  private readonly discoveryApi: DiscoveryApi;

  private readonly configApi: ConfigApi;

  private readonly identityApi: IdentityApi;

  constructor(options: Options) {
    this.discoveryApi = options.discoveryApi;
    this.configApi = options.configApi;
    this.identityApi = options.identityApi;
  }

  private async getBaseUrl() {
    const proxyPath =
      this.configApi.getOptionalString('mta.proxyPath') || DEFAULT_PROXY_PATH;
    return `${await this.discoveryApi.getBaseUrl('proxy')}${proxyPath}`;
  }

  private async fetcher(url: string) {
    const { token: idToken } = await this.identityApi.getCredentials();
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(idToken && { Authorization: `Bearer ${idToken}` }),
      },
    });
    if (!response.ok) {
      throw new Error(
        `failed to fetch data, status ${response.status}: ${response.statusText}`,
      );
    }
    return await response.json();
  }

  private async performRestCall(
    url: string,
    method: string,
    data: any,
    expectedResponseStatus: number,
  ) {
    const response = await this.performRestCallInternal(
      url,
      method,
      data,
      expectedResponseStatus,
    );

    return await response.json();
  }

  private async performRestCallInternal(
    url: string,
    method: string,
    data: any,
    expectedResponseStatus: number,
  ) {
    const { token: idToken } = await this.identityApi.getCredentials();
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(idToken && { Authorization: `Bearer ${idToken}` }),
      },
    });
    if (!response.ok || response.status !== expectedResponseStatus) {
      throw new Error(
        `failed to fetch data, status ${response.status}: ${response.statusText}`,
      );
    }

    return response;
  }

  private async submitTaskGroupCall(
    url: string,
    method: string,
    data: any,
    expectedResponseStatus: number,
  ) {
    await this.performRestCallInternal(
      url,
      method,
      data,
      expectedResponseStatus,
    );
  }

  async getApplications() {
    const proxyUrl = await this.getBaseUrl();
    const mtaUiUrl = this.configApi.getString('mta.uiUrl');
    const applications = (await this.fetcher(
      `${proxyUrl}/hub/applications`,
    )) as Application[];

    const tasks = await Promise.all(
      applications.map(app =>
        this.getLatestTaskByApplication(app.id).then(task => {
          app.reportStatus = task?.state || null;
          app.report = `${mtaUiUrl}/hub/applications/${app.id}/bucket/windup/report/`;
          return app;
        }),
      ),
    );

    return applications;
  }

  async getTaskGroups() {
    const proxyUrl = await this.getBaseUrl();

    return (await this.fetcher(`${proxyUrl}/hub/taskgroups`)) as TaskGroup[];
  }

  private async getLatestTaskByApplication(
    applicationID: number,
  ): Promise<Task | null> {
    const proxyUrl = await this.getBaseUrl();
    const tasks = (await this.fetcher(`${proxyUrl}/hub/tasks`)) as Task[];

    // Filter tasks by application name
    const filteredTasks = tasks.filter(
      task => task.application.id === applicationID,
    );

    if (filteredTasks.length === 0) {
      return null; // No tasks found for the specified application
    }

    // Sort tasks by the terminated property in descending order (latest first)
    filteredTasks.sort(
      (a, b) =>
        new Date(b.terminated).getTime() - new Date(a.terminated).getTime(),
    );

    // Return the latest task
    return filteredTasks[0];
  }

  async getTasks() {
    const proxyUrl = await this.getBaseUrl();

    return (await this.fetcher(`${proxyUrl}/hub/tasks`)) as Task[];
  }

  async createTaskGroup(taskGroup: TaskGroup) {
    const proxyUrl = await this.getBaseUrl();

    return (await this.performRestCall(
      `${proxyUrl}/hub/taskgroups`,
      'POST',
      taskGroup,
      201,
    )) as TaskGroup;
  }

  async submitTaskGroup(taskGroup: TaskGroup) {
    JSON.stringify(taskGroup);
    const proxyUrl = await this.getBaseUrl();

    await this.submitTaskGroupCall(
      `${proxyUrl}/hub/taskgroups/${taskGroup.id}/submit`,
      'PUT',
      taskGroup,
      204,
    );
  }
}
