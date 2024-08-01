export interface Root {
  resources: Resource[];
  meta: Meta;
}

export interface Resource {
  id: string;
  record_type: string;
  fields: Fields;
  owner_id: string | null;
  children: unknown[];
  employers_info: unknown[];
  updated: string;
  created: string;
  updater?: string;
  creator: string;
  avatar_url: string;
  tags: Tag[];
  last_contacted: LastContacted;
  company_last_contacted: CompanyLastContacted;
  last_contacted_user: unknown;
  lc: unknown;
  is_important?: boolean;
  notice: unknown;
  reminders: unknown;
  reminder: unknown;
  creator_id: string;
  privacy: Privacy;
  is_editable: boolean;
  stages_info: StagesInfo;
  files: unknown;
  contexts: Context[];
  object_type: string;
  tags2: string[];
}

export interface Fields {
  email: Email[];
  "first name": FirstName[];
  "last name": LastName[];
  linkedin?: Linkedin[];
  "discovered education"?: DiscoveredEducation[];
  "discovered age range"?: DiscoveredAgeRange[];
  "discovered related address"?: Address[];
  "discovered employment"?: DiscoveredEmployment[];
}

export interface Email {
  label: string;
  modifier: string;
  value: string;
  is_primary: boolean;
}

export interface FirstName {
  label: string;
  modifier: string;
  value: string;
  is_primary: boolean;
}

export interface LastName {
  label: string;
  modifier: string;
  value: string;
  is_primary: boolean;
}

export interface Linkedin {
  label: string;
  modifier: string;
  value: string;
  is_primary: boolean;
}

export interface DiscoveredEducation {
  label: string;
  modifier: string;
  value: string;
  is_primary: boolean;
}

export interface DiscoveredAgeRange {
  label: string;
  modifier: string;
  value: string;
  is_primary: boolean;
}

export interface Address {
  label: string;
  modifier: string;
  value: string;
  is_primary: boolean;
}

export interface DiscoveredEmployment {
  label: string;
  modifier: string;
  value: string;
  is_primary: boolean;
}

export interface Tag {
  id: string;
  tag: string;
}

export interface LastContacted {
  tstamp: unknown;
  type: unknown;
  object_id: unknown;
  user_id: unknown;
  deletion_tstamp: unknown;
}

export interface CompanyLastContacted {
  in: unknown;
  out: unknown;
}

export interface Privacy {
  read: unknown;
  edit: unknown;
}

export interface StagesInfo {}

export interface Context {
  context_key: string;
  context?: unknown[];
}

export interface Meta {
  per_page: number;
  total: number;
  pages: number;
  page: number;
}
