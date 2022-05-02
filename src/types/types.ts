export type User = {
  username: string;
  email: string;
  password: string;
  password2: string;
  id: string;
};

export type Board = {
  id: string;
  name: string;
};

export type Column = {
  id: string;
  name: string;
  parent: string;
};

export type Task = {
  id: string;
  name: string;
  author: string;
  description: string;
  parent: string;
  boardParent: string;
  columnName?: string;
};

export type Comment = {
  id: string;
  text: string;
  author: string;
  parent: string;
  columnParent: string;
  boardParent: string;
};

export type Prop = {
  isShow: boolean;
  id: string | null;
};
