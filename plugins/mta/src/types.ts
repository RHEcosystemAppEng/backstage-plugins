export interface Application {
  id: number;
  createUser: string;
  updateUser: string;
  createTime: string;
  name: string;
  description: string;
  bucket: Bucket | null;
  repository: Repository | null;
  binary: string;
  review: Review | null;
  comments: string;
  identities: string[];
  tags: Tag[] | null;
  businessService: string | null;
  owner: string | null;
  contributors: string[];
  migrationWave: string | null;
  report: string | null;
}

export interface ApplicationShort {
  id: number;
  name: string;
}

export interface Bucket {
  id: number;
}

export interface Repository {
  kind: string;
  url: string;
  branch: string;
  tag: string;
  path: string;
}

export interface Review {
  id: number;
}

export interface Tag {
  id: number;
  name: string;
  source: string;
}

export interface TaskGroup {
  id: number;
  name: string;
  state: string;
  addon: string;
  bucket: Bucket | null;
  createUser: string;
  updateUser: string;
  createTime: string;
  data: TaskGroupData;
  tasks: TaskGroupTask[];
}

export interface TaskGroupData {
  mode: Mode;
  output: string;
  rules: Rules;
  scope: Scope;
  tagger: Tagger;
}

export interface Mode {
  artifact: string;
  binary: boolean;
  diva: boolean;
  withDeps: boolean;
}

export interface Rules {
  labels: string[];
  path: string;
  rulesets: RuleSet[];
  tags: Tags;
}

export interface RuleSet {
  id: number;
  name: string;
}

export interface Tags {
  excluded: string[];
}

export interface Scope {
  withKnown: boolean;
  packages: Packages;
}

export interface Packages {
  excluded: string[];
  included: string[];
}

export interface Tagger {
  enabled: boolean;
}

export interface TaskGroupTask {
  application: ApplicationShort;
  data: TaskData;
  name: string;
}

export interface TaskData {}

export interface Task {
  activity: string[];
  addon: string;
  application: ApplicationShort;
  bucket: Bucket;
  canceled: boolean;
  createTime: string;
  createUser: string;
  data: TaskData;
  errors: Error[];
  id: number;
  image: string;
  locator: string;
  name: string;
  pod: string;
  policy: string;
  priority: number;
  purged: true;
  retries: number;
  started: string;
  state: string;
  terminated: string;
  ttl: TTL;
  updateUser: string;
  variant: string;
}

export interface Error {
  description: string;
  severity: string;
}

export interface TTL {
  created: number;
  failed: number;
  pending: number;
  postponed: number;
  running: number;
  succeeded: number;
}
