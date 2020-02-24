// import { website, designer } from 'authine-page-designer';
import website from '@/website/router';
import designer from '@/designer/router';
import login from '@/login/router';
import admin from '@/admin/router';

const routes = [
  {
    path: '',
    redirect: 'admin'
  },
  ...website,
  ...designer,
  ...login,
  ...admin,
];

export default routes;
