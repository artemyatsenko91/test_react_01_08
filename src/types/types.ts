export interface IContactsResponse {
  resources: Resource[];
  meta: Meta;
}

export interface Resource {
  id: string;
  record_type: string;
  fields: ContactFields;
  owner_id: string | null;
  avatar_url: string;
  tags: Tag[];
}

export interface ContactFields {
  email: Field[];
  "first name": Field[];
  "last name": Field[];
  linkedin?: Field[];
  "discovered education"?: DiscoveredEducation[];
  "discovered age range"?: DiscoveredAgeRange[];
  "discovered related address"?: Address[];
  "discovered employment"?: DiscoveredEmployment[];
}

interface Field {
  label: string;
  modifier: string;
  value: string;
  is_primary: boolean;
}

interface DiscoveredEducation {
  label: string;
  modifier: string;
  value: string;
  is_primary: boolean;
}

interface DiscoveredAgeRange {
  label: string;
  modifier: string;
  value: string;
  is_primary: boolean;
}

interface Address {
  label: string;
  modifier: string;
  value: string;
  is_primary: boolean;
}

interface DiscoveredEmployment {
  label: string;
  modifier: string;
  value: string;
  is_primary: boolean;
}

interface Tag {
  id: string;
  tag: string;
}

interface Meta {
  per_page: number;
  total: number;
  pages: number;
  page: number;
}

export interface IDeleteResponse {
  data: { ids: string };
  status: string;
}
