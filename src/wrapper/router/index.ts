// import { website, designer } from 'authine-page-designer';
import website from '@/website/router';
import designer from '@/designer/router';
import app from '@/app/router';

const routes = [
  {
    path: '',
    redirect: 'app'
  },
  ...website,
  ...designer,
  ...app
];

export default routes;
