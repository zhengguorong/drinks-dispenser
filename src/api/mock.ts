import Mock from 'mockjs';

const temps: Array<any> = [];

Mock.mock('/api/temperature', 'get', (options: any) => {
  const { machine_id } = options.body;
  temps.filter(item => item.machine_id === machine_id)
  return { temps };
});

Mock.mock('/api/temperature', 'post', (options: any) => {
  const { body } = options;
  temps.push(body);
  return {
    "success" : "submitted successfully"
  };
});

Mock.mock('/api/lowstockalert', (options: any) => {
  return {
    "success" : "submitted successfully"
  };
});
