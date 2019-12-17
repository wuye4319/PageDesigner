// import { website, designer } from 'authine-page-designer';
import website from '@/website/router';
import designer from '@/designer/router';

const routes = [
  {
    path: '',
    redirect: 'designer'
  },
  ...website,
  ...designer,
];

export default routes;
