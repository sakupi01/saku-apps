type Success<T> = {
  ok: true;
  message: null;
  data: T;
};

type Error = {
  ok: boolean;
  message: string;
  data: null;
};

export type Result<T> = Success<T> | Error;
