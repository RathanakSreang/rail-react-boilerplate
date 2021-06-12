import logoImage from './logo.svg';
import advertiserImage from './undraw_marketing_v0iu.svg';
import publisherImage from './undraw_web_developer.svg';
import thankImage from './undraw_super_thank_you_obwk.svg';
import welcomeImage from './landing-team.svg';
import mailImage from './undraw_Mail_sent_qwwx.svg';
import updateImage from './undraw_update_uxn2.svg';

export const imagesList = {
  'logo': logoImage,
  '/register/publisher': publisherImage,
  '/register/advertiser': advertiserImage,
  '/register/thank-you': thankImage,
  '/forget-password/instruction-sent': mailImage,
  '/reset-password/changed': updateImage,
};

export const imagesByPath = (path) => {
  return imagesList[path] || welcomeImage;
}
