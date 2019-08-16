import website from '@/website/router';
import designer from '@/designer/router';
import app from '@/app/router';

const routes = [
  {
    path: '',
    redirect: 'website/product'
  },
  ...website,
  ...designer,
  ...app
];

export default routes;
