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

export const success = <T>(data: T): Success<T> => ({
  ok: true,
  message: null,
  data,
});

export const error = (message: string): Error => ({
  ok: false,
  message,
  data: null,
});

export type Result<T> = Success<T> | Error;
