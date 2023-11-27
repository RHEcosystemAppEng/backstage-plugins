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
