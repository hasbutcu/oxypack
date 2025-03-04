const { ActivityType } = require('discord.js'); // Discord.js'in ActivityType'ını modül içinde kullan

/**
 * @param {Object} client - Discord botunun client nesnesi
 * @param {Array} activities - Aktivite bilgileri (name ve opsiyonel olarak type, url)
 * @param {number} interval - Aktivite değişme süresi (milisaniye cinsinden, varsayılan: 2 dakika)
 * @param {boolean} logActivity - Aktivite değiştiğinde log gösterilsin mi? (varsayılan: true)
 */
function oxypack(client, activities, interval = 120000, logActivity = true) {
  if (!client || !client.user) {
    throw new Error("Geçerli bir Discord client nesnesi sağlamalısın.");
  }

  if (!Array.isArray(activities) || activities.length === 0) {
    throw new Error("Aktiviteler dizisi boş olamaz.");
  }

  // ActivityType dönüşümü
  const mapActivityType = (type) => {
    switch(type) {
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
        return ActivityType.Playing; // Varsayılan olarak "Playing"
    }
  }

  function oxyguncelle() {
    const activity = activities[Math.floor(Math.random() * activities.length)];

    // Eğer type belirtilmemişse varsayılan olarak 'Playing' kabul edilir
    const activityType = activity.type ? mapActivityType(activity.type) : ActivityType.Playing;

    client.user.setActivity(activity.name, { type: activityType, url: activity.url });

    if (logActivity) {
      console.log(`Yeni aktivite ayarlandı: ${activity.name}`);
    }
  }

  oxyguncelle();

  setInterval(oxyguncelle, interval);
}

module.exports = { oxypack };
