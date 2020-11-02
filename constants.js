require('dotenv').config();

const PORT = process.env.PORT || 5000;

const STORES = {
  bestbuy: {
    3070: [
      'https://www.bestbuy.com/site/nvidia-geforce-rtx-3070-8gb-gddr6-pci-express-4-0-graphics-card-dark-platinum-and-black/6429442.p?skuId=6429442',
      'https://www.bestbuy.com/site/gigabyte-geforce-rtx-3070-8g-gddr6-pci-express-4-0-graphics-card-black/6437909.p?skuId=6437909',
      'https://www.bestbuy.com/site/evga-geforce-rtx-3070-xc3-black-gaming-8gb-gddr6x-pci-express-4-0-graphics-card/6439300.p?skuId=6439300',
      'https://www.bestbuy.com/site/gigabyte-geforce-rtx-3070-8g-gddr6-pci-express-4-0-graphics-card-black/6437912.p?skuId=6437912',
      'https://www.bestbuy.com/site/pny-geforce-rtx-3070-8gb-dual-fan-graphics-card/6432654.p?skuId=6432654',
      'https://www.bestbuy.com/site/pny-geforce-rtx-3070-8gb-xlr8-gaming-epic-x-rgb-triple-fan-graphics-card/6432653.p?skuId=6432653',
    ],
    3080: [
      'https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429440.p?skuId=6429440',
      'https://www.bestbuy.com/site/evga-geforce-rtx-3080-xc3-ultra-gaming-10gb-gddr6x-pci-express-4-0-graphics-card/6432400.p?skuId=6432400',
      'https://www.bestbuy.com/site/msi-geforce-rtx-3080-ventus-3x-10g-oc-bv-gddr6x-pci-express-4-0-graphic-card-black-silver/6430175.p?skuId=6430175',
      'https://www.bestbuy.com/site/gigabyte-geforce-rtx-3080-10g-gddr6x-pci-express-4-0-graphics-card-black/6436223.p?skuId=6436223',
      'https://www.bestbuy.com/site/pny-geforce-rtx-3080-10gb-xlr8-gaming-epic-x-rgb-triple-fan-graphics-card/6432655.p?skuId=6432655',
      'https://www.bestbuy.com/site/evga-geforce-rtx-3080-xc3-ultra-gaming-10gb-gddr6x-pci-express-4-0-graphics-card/6436195.p?skuId=6436195',
      'https://www.bestbuy.com/site/evga-geforce-rtx-3080-ftw3-ultra-gaming-10gb-gddr6x-pci-express-4-0-graphics-card/6436196.p?skuId=6436196',
      'https://www.bestbuy.com/site/asus-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-strix-graphics-card-black/6432445.p?skuId=6432445',
    ],
    3090: [
      'https://www.bestbuy.com/site/nvidia-geforce-rtx-3090-24gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429434.p?skuId=6429434',
      'https://www.bestbuy.com/site/evga-geforce-rtx-3090-ftw3-ultra-gaming-24gb-gddr6x-pci-express-4-0-graphics-card/6436192.p?skuId=6436192',
      'https://www.bestbuy.com/site/gigabyte-geforce-rtx-3090-24g-gddr6x-pci-express-4-0-graphics-card-black/6437910.p?skuId=6437910',
      'https://www.bestbuy.com/site/asus-geforce-rtx-3090-24gb-gddr6x-pci-express-4-0-strix-graphics-card-black/6432447.p?skuId=6432447',
      'https://www.bestbuy.com/site/asus-tuf-rtx-3090-24gb-gddr6x-pci-express-4-0-graphics-card-black/6432446.p?skuId=6432446',
    ],
    button: '.add-to-cart-button',
  },
  newegg: {
    3070: [
      'https://www.newegg.com/asus-geforce-rtx-3070-rog-strix-rtx3070-o8g-gaming/p/N82E16814126458?Description=3070&cm_re=3070-_-14-126-458-_-Product',
      'https://www.newegg.com/msi-geforce-rtx-3070-rtx-3070-ventus-2x-oc/p/N82E16814137602?Description=3070&cm_re=3070-_-14-137-602-_-Product',
      'https://www.newegg.com/zotac-geforce-rtx-3070-zt-a30700h-10p/p/N82E16814500505?Description=3070&cm_re=3070-_-14-500-505-_-Product',
      'https://www.newegg.com/evga-geforce-rtx-3070-08g-p5-3751-kr/p/N82E16814487528?Description=3070&cm_re=3070-_-14-487-528-_-Product',
      'https://www.newegg.com/msi-geforce-rtx-3070-rtx-3070-ventus-3x-oc/p/N82E16814137601?Description=3070&cm_re=3070-_-14-137-601-_-Product&quicklink=true',
    ],
    3080: [
      'https://www.newegg.com/evga-geforce-rtx-3080-10g-p5-3897-kr/p/N82E16814487518?Description=3080&cm_re=3080-_-14-487-518-_-Product&quicklink=true',
      'https://www.newegg.com/asus-geforce-rtx-3080-tuf-rtx3080-o10g-gaming/p/N82E16814126452?Description=3080&cm_re=3080-_-14-126-452-_-Product',
      'https://www.newegg.com/msi-geforce-rtx-3080-rtx-3080-gaming-x-trio-10g/p/N82E16814137597?Description=3080&cm_re=3080-_-14-137-597-_-Product',
      'https://www.newegg.com/gigabyte-geforce-rtx-3080-gv-n3080gaming-oc-10gd/p/N82E16814932329?Description=3080&cm_re=3080-_-14-932-329-_-Product',
      'https://www.newegg.com/gigabyte-geforce-rtx-3080-gv-n3080vision-oc-10gd/p/N82E16814932337?Description=3080&cm_re=3080-_-14-932-337-_-Product',
      'https://www.newegg.com/asus-geforce-rtx-3080-rog-strix-rtx3080-o10g-gaming/p/N82E16814126457?Description=3080&cm_re=3080-_-14-126-457-_-Product',
      'https://www.newegg.com/evga-geforce-rtx-3080-10g-p5-3885-kr/p/N82E16814487520?Description=3080&cm_re=3080-_-14-487-520-_-Product',
    ],
    3090: [
      'https://www.newegg.com/evga-geforce-rtx-3090-24g-p5-3975-kr/p/N82E16814487524?Description=3090&cm_re=3090-_-14-487-524-_-Product&quicklink=true',
      'https://www.newegg.com/asus-geforce-rtx-3090-tuf-rtx3090-24g-gaming/p/N82E16814126455?Description=3090&cm_re=3090-_-14-126-455-_-Product&quicklink=true',
      'https://www.newegg.com/gigabyte-geforce-rtx-3090-gv-n3090aorus-m-24gd/p/N82E16814932341?Description=3090&cm_re=3090-_-14-932-341-_-Product',
      'https://www.newegg.com/evga-geforce-rtx-3090-24g-p5-3987-kr/p/N82E16814487526?Description=3090&cm_re=3090-_-14-487-526-_-Product',
      'https://www.newegg.com/msi-geforce-rtx-3090-rtx-3090-gaming-x-trio-24g/p/N82E16814137595?Description=3090&cm_re=3090-_-14-137-595-_-Product',
      'https://www.newegg.com/asus-geforce-rtx-3090-rog-strix-rtx3090-o24g-gaming/p/N82E16814126456?Description=3090&cm_re=3090-_-14-126-456-_-Product',
    ],
    button: '.product-inventory',
  },
};

const DEMSTONKS_CLIENT_ID = process.env.DEMSTONKS_CLIENT_ID || null;
const DEMSTONKS_BOT_TOKEN = process.env.DEMSTONKS_BOT_TOKEN || null;
const DEMSTONKS_HEARTBEAT_ID = process.env.DEMSTONKS_HEARTBEAT_ID || null;
const DEMSTONKS_HEARTBEAT_TOKEN = process.env.DEMSTONKS_HEARTBEAT_TOKEN || null;
const DEMSTONKS_BOT_APP_TOKEN = process.env.DEMSTONKS_BOT_APP_TOKEN || null;
const SERVER_ID = '641091138123595789';
const ALLOWED_EMOJIS = ['rtx3070', 'rtx3080', 'rtx3090'];
const THIRTY_SEVENTY_ROLE = '772204916872577034';
const THIRTY_EIGHTY_ROLE = '772238199749476362';
const THIRTY_NINETY_ROLE = '772263446997368882';

module.exports = {
  PORT,
  STORES,
  DEMSTONKS_CLIENT_ID,
  DEMSTONKS_BOT_TOKEN,
  DEMSTONKS_HEARTBEAT_ID,
  DEMSTONKS_HEARTBEAT_TOKEN,
  DEMSTONKS_BOT_APP_TOKEN,
  SERVER_ID,
  ALLOWED_EMOJIS,
  THIRTY_SEVENTY_ROLE,
  THIRTY_EIGHTY_ROLE,
  THIRTY_NINETY_ROLE,
};
