export type TUserBody = {
  email: string;
  name: string;
  gender: string;
  status: string;
};

export type TUserData = TUserBody & {
  id: number;
};

export type TMetaData = {
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
};

export type TServerResponse<T> = {
  data: T;
  code: number;
  meta: TMetaData;
};
