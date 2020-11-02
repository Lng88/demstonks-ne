#!/usr/bin/env node

const CronJob = require('cron').CronJob;
const Discord = require('discord.js');
// const app = require('./src/util/keepHerokuAlive');
const {
  WebhookClientRobot,
  WebhookClientHeartbeat,
  WebhookClientReactionListener,
} = require('./src/lib/webhooks/index');
const scrapeSites = require('./src/lib/scrapeSites');

const job = new CronJob({
  cronTime: '0 */3 * * * *',
  onTick: async function () {
    await console.log('\n*** You will see this message every 3 minutes ***\n');
    await scrapeSites();
  },
  start: true,
  runOnInit: true,
});

const start = async () => {
  WebhookClientRobot.build();
  job.start();
};

start();
