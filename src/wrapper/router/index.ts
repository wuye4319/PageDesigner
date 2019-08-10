import website from '@/website/router';
import designer from '@/designer/router';

const routes = [
  {
    path: '',
    redirect: 'website'
  },
  ...website,
  ...designer
];

export default routes;
