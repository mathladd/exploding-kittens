export const getSuccessStatus = (data: any) => ({
  isSuccess: true,
  completed: new Date(),
  data,
});

export const getErrorStatus = (err: Error) => ({
  isSuccess: false,
  completed: new Date(),
  data: err,
});
