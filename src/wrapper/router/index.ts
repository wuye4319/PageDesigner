// import { website, designer } from 'authine-page-designer';
import website from '@/website/router';
import designer from '@/designer/router';
import admin from '@/admin/router';

const routes = [
  {
    path: '',
    redirect: 'admin'
  },
  ...website,
  ...designer,
  ...admin
];

export default routes;
