declare namespace data {
  export type CategoryTreeChildren = {
    name: string;
    code: string;
    children?: CategoryTreeChildren[];
  };
  type CategoryTree = {
    name: string;
    code: string;
    children: CategoryTreeChildren[];
  };
}
