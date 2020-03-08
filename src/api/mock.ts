import Mock from 'mockjs';

const temps: Array<any> = [];

Mock.mock(RegExp('/api/temperature*'), 'get', (options: any) => {
  const machineTemps = temps.filter(item => item.machine_id === '123')
  const length = machineTemps.length;
  const lasterTemps = length > 30 ? machineTemps.slice(length - 30, length) : machineTemps;
  return { temps: lasterTemps };
});

Mock.mock('/api/temperature', 'post', (options: any) => {
  const { body } = options;
  temps.push(JSON.parse(body));
  return {
    "success" : "submitted successfully"
  };
});

Mock.mock('/api/lowstockalert', (options: any) => {
  return {
    "success" : "submitted successfully"
  };
});
