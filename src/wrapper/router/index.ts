import sheet from '@/designer/router';

const routes = [
  {
    path: '',
    redirect: 'excel'
  },
  ...sheet,
];

export default routes;
