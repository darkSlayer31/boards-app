export interface User {
  username: string;
  email: string;
  password: string;
  password2: string;
  id: string;
}

export interface Board {
  id: string;
  name: string;
}

export interface Column {
  id: string;
  name: string;
  parent: string;
}

export type Task = {
  id: string;
  name: string;
  author: string;
  description: string;
  parent: string;
  boardParent: string;
  columnName?: string;
};

export interface Comment {
  id: string;
  text: string;
  author: string;
  parent: string;
  columnParent: string;
  boardParent: string;
}

export type Prop = {
  isShow: boolean;
  id: string | null;
};
