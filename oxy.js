/**
 * @param {Object} client
 * @param {Array} activities
 * @param {number} interval
 * @param {boolean} logActivity
 */
function oxypack(client, activities, interval = 120000, logActivity = true) {
  if (!client || !client.user) {
    throw new Error("Geçerli bir Discord client nesnesi sağlamalısın.");
  }

  if (!Array.isArray(activities) || activities.length === 0) {
    throw new Error("Aktiviteler dizisi boş olamaz.");
  }

  function oxyguncelle() {
    const activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(activity.name, { type: activity.type, url: activity.url });

    if (logActivity) {
      console.log(`Yeni aktivite ayarlandı: ${activity.name}`);
    }
  }


  oxyguncelle();

  setInterval(oxyguncelle, interval);
}

module.exports = { oxypack };
