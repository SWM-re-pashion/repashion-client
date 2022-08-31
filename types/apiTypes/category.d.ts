declare namespace res {
  type CategoryTreeChildren = {
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
