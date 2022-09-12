declare namespace res {
  type CategoryTreeChildren = {
    id?: string;
    name: string;
    code: string;
    children?: CategoryTreeChildren[];
  };
  type CategoryTree = {
    status: number;
    data: {
      name: string;
      code: string;
      children: CategoryTreeChildren[];
    };
  };
}
