const Discord = require('discord.js');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
const {
  WebhookClientReactionListener,
  WebhookClientRobot,
} = require('./webhooks/index');
const {
  STORES: { newegg },
  SERVER_ID,
  THIRTY_EIGHTY_ROLE,
  THIRTY_NINETY_ROLE,
  THIRTY_SEVENTY_ROLE,
} = require('../../constants');

const scrape = async (store, url, storeButton, gpu, membersObj) => {
  let browser = null;
  let message = '';
  const dataObj = {};

  try {
    browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    // Configure the navigation timeout
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });

    await page
      .waitForSelector(storeButton, { timeout: 10000 })
      .then(() => console.log('Found Selector'))
      .catch(() => {
        message = 'Not Found';
      });

    if (message === 'Not Found') {
      console.log(`Selector ${message} @ ${url}`);
      return;
    }

    if (message === '') {
      dataObj['showTitle'] = await page.title();
      dataObj['available'] = await page.evaluate((storeButton) => {
        return document.querySelector(storeButton).innerText;
      }, storeButton);
      let time = new Date();
      console.log(`running, ${time.getHours()}:${time.getMinutes()}`);
      console.table(dataObj['showTitle']);
      console.table(dataObj['available']);

      message = dataObj['available'].toLowerCase();
    }

    if (message.includes('in stock')) {
      message = url;
      const embed = await new Discord.MessageEmbed()
        .setTitle(`NVIDIA GeForce RTX ${gpu}`)
        .addField('URL', url, true)
        .addField('Store', store.toUpperCase(), true)
        .addField('Brand', 'NVIDIA', true)
        .addField('Model', gpu, true)
        .setDescription(message)
        .setTimestamp()
        .setColor('#7cfc00');

      const members = membersObj[gpu];

      for (let member of members) {
        await WebhookClientReactionListener.users.cache
          .get(member)
          .send('IN STOCK!!!', {
            embed,
          });
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    browser.close();
  }
};

const getSubscribedMembers = async (guild) => {
  if (guild && guild.roles) {
    let memberIds = {};
    let thirtySeventy = [];
    let thirtyEighty = [];
    let thirtyNinety = [];

    const response = await guild.members
      .fetch()
      .then((response) => {
        return response;
      })
      .catch(console.error);

    response.map((member) => {
      if (member._roles.includes(THIRTY_SEVENTY_ROLE))
        thirtySeventy.push(member.user.id);
      if (member._roles.includes(THIRTY_EIGHTY_ROLE))
        thirtyEighty.push(member.user.id);
      if (member._roles.includes(THIRTY_NINETY_ROLE))
        thirtyNinety.push(member.user.id);
    });

    memberIds['3070'] = thirtySeventy;
    memberIds['3080'] = thirtyEighty;
    memberIds['3090'] = thirtyNinety;

    return memberIds;
  }
  return null;
};

const scrapeSites = async () => {
  const guild = await WebhookClientReactionListener.guilds.cache.get(SERVER_ID);

  const members = await getSubscribedMembers(guild);
  console.log('Subscribed Members: ', members);

  if (members) {
    for (let url of newegg['3070']) {
      await scrape('newegg', url, newegg.button, '3070', members);
    }
    for (let url of newegg['3080']) {
      await scrape('newegg', url, newegg.button, '3080', members);
    }
    for (let url of newegg['3090']) {
      console.log('scraping 3090');
      await scrape('newegg', url, newegg.button, '3090', members);
    }
  }
};

module.exports = scrapeSites;
