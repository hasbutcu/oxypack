const { ActivityType } = require('discord.js');

/**
 * @param {Object} client 
 * @param {Array} activities 
 * @param {number} interval
 * @param {boolean} logActivity
 * @param {string|Object} webhook
 */
function oxypack(client, activities, interval = 120000, logActivity = true, webhook = null) {
  if (!client || !client.user) {
    throw new Error("Geçerli bir Discord client nesnesi sağlamalısın.");
  }

  if (!Array.isArray(activities) || activities.length === 0) {
    throw new Error("Aktiviteler dizisi boş olamaz.");
  }

  let webhookUrl = null;
  if (webhook) {
    if (typeof webhook === 'string') {
      webhookUrl = webhook;
    } else if (typeof webhook === 'object' && webhook.webhook) {
      webhookUrl = webhook.webhook;
    }
  }

  const mapActivityType = (type) => {
    switch (type) {
      case 'watching':
        return ActivityType.Watching;
      case 'playing':
        return ActivityType.Playing;
      case 'listening':
        return ActivityType.Listening;
      case 'competing':
        return ActivityType.Competing;
      case 'streaming':
        return ActivityType.Streaming;
      default:
        return ActivityType.Playing; 
    }
  };

  const getActivityTypeString = (type) => {
    return Object.keys(ActivityType).find(key => ActivityType[key] === type) || 'Playing';
  };

  async function sendWebhook(activity, presenceData) {
    if (!webhookUrl) return;

    try {
      const activityTypeStr = getActivityTypeString(presenceData.activities[0].type);
      
      const webhookBody = {
        username: "oxypack Status Updater",
        embeds: [{
          title: "Activty Updated",
          color: 0x3498db,
          fields: [
            {
              name: "Activity Name",
              value: activity.name,
              inline: true
            },
            {
              name: "Activity Type",
              value: activityTypeStr,
              inline: true
            },
            {
              name: "Status",
              value: presenceData.status,
              inline: true
            }
          ],
          timestamp: new Date().toISOString()
        }]
      };

      if (activity.url) {
        webhookBody.embeds[0].fields.push({
          name: "URL",
          value: activity.url,
          inline: false
        });
      }

      const https = require('https');
      const url = new URL(webhookUrl);
      
      const options = {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      };
      
      const req = https.request(options, (res) => {
        if (res.statusCode !== 204) {
          console.error(`Webhook gönderilemedi: ${res.statusCode}`);
        }
      });
      
      req.on('error', (error) => {
        console.error("Webhook gönderilirken hata oluştu:", error);
      });
      
      req.write(JSON.stringify(webhookBody));
      req.end();
    } catch (error) {
      console.error("Webhook gönderilirken hata oluştu:", error);
    }
  }

  function oxyguncelle() {
    const activity = activities[Math.floor(Math.random() * activities.length)];

    const activityType = activity.type ? mapActivityType(activity.type) : ActivityType.Playing;
    
    const presenceData = {
      activities: [{
        name: activity.name,
        type: activityType,
        url: activity.url
      }],
      status: activity.status || 'online'
    };

    client.user.setPresence(presenceData);

    if (logActivity) {
      console.log(`Yeni aktivite ayarlandı: ${activity.name} (Status: ${presenceData.status})`);
    }

    sendWebhook(activity, presenceData);
  }

  oxyguncelle();
  setInterval(oxyguncelle, interval);
}

/**
 * @param {Object} client
 * @param {string|Object} webhook
 */
function oxy(client, webhook = null) {
  if (!client || !client.user) {
    throw new Error("Geçerli bir Discord client nesnesi sağlamalısın.");
  }

  let webhookUrl = null;
  if (webhook) {
    if (typeof webhook === 'string') {
      webhookUrl = webhook;
    } else if (typeof webhook === 'object' && webhook.webhook) {
      webhookUrl = webhook.webhook;
    }
  }

  const statuses = [
    { name: '##oxydesign', type: ActivityType.Playing },
    { name: '##oxydesign', type: ActivityType.Listening },
    { name: '##oxydesign', type: ActivityType.Streaming, url: 'https://twitch.tv/locxer' },
    { name: '##oxydesign', type: ActivityType.Watching }
  ];

  const getActivityTypeString = (type) => {
    return Object.keys(ActivityType).find(key => ActivityType[key] === type) || 'Listening';
  };

  async function sendWebhook(statusObj, presenceData) {
    if (!webhookUrl) return;

    try {
      const activityTypeStr = getActivityTypeString(statusObj.type);
      
      const webhookBody = {
        username: "oxypack Status Updater",
        embeds: [{
          title: "Activity Updated",
          color: 0x3498db,
          fields: [
            {
              name: "Activity Name",
              value: statusObj.name,
              inline: true
            },
            {
              name: "Aktivite Type",
              value: activityTypeStr,
              inline: true
            },
            {
              name: "Status",
              value: "idle",
              inline: true
            }
          ],
          timestamp: new Date().toISOString()
        }]
      };

      if (statusObj.url) {
        webhookBody.embeds[0].fields.push({
          name: "URL",
          value: statusObj.url,
          inline: false
        });
      }

      const https = require('https');
      const url = new URL(webhookUrl);
      
      const options = {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      };
      
      const req = https.request(options, (res) => {
        if (res.statusCode !== 204) {
          console.error(`Webhook gönderilemedi: ${res.statusCode}`);
        }
      });
      
      req.on('error', (error) => {
        console.error("Webhook gönderilirken hata oluştu:", error);
      });
      
      req.write(JSON.stringify(webhookBody));
      req.end();
    } catch (error) {
      console.error("Webhook gönderilirken hata oluştu:", error);
    }
  }

  function updateStatus() {
    const statusObj = statuses[Math.floor(Math.random() * statuses.length)];
  
    const presenceData = {
      activities: [{
        name: statusObj.name,
        type: statusObj.type,
        url: statusObj.url
      }],
      status: 'idle'
    };

    client.user.setPresence(presenceData);

    sendWebhook(statusObj, presenceData);
  }

  updateStatus();
  setInterval(updateStatus, 15000);
}

module.exports = { oxypack, oxy };