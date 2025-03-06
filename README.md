# OxyPack

Discord botunuz için dinamik ve esnek aktivite sistemi. Belirli aralıklarla otomatik olarak değişen bot aktiviteleri oluşturun ve webhook entegrasyonuyla aktivite değişimlerini takip edin.

[![npm version](https://img.shields.io/npm/v/oxypack)](https://www.npmjs.com/package/oxypack)
[![npm downloads](https://img.shields.io/npm/dt/oxypack)](https://www.npmjs.com/package/oxypack)
[![License](https://img.shields.io/npm/l/oxypack)](https://github.com/hasbutcu/oxypack/blob/main/LICENSE)

## 📦 Kurulum

```bash
npm install oxypack
```

## 🚀 Özellikler

- 🔄 Otomatik değişen bot aktiviteleri
- 🎮 Farklı aktivite türleri (Oynuyor, İzliyor, Dinliyor, Yayında, vb.)
- ⏱️ Özelleştirilebilir zaman aralıkları
- 📊 Discord Webhook entegrasyonu
- 🛠️ Kolay konfigürasyon ve kurulum

## 📚 Kullanım

### Temel Kullanım

```javascript
const { Client, GatewayIntentBits } = require('discord.js');
const { oxy, oxypack } = require('oxypack');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.on('ready', () => {
  console.log(`${client.user.tag} ile giriş yapıldı!`);
  
  // Hazır Oxy presetini kullanın
  oxy(client);
});

client.login('TOKEN');
```

### Webhook ile Kullanım

```javascript
const { Client, GatewayIntentBits } = require('discord.js');
const { oxy } = require('oxypack');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.on('ready', () => {
  console.log(`${client.user.tag} ile giriş yapıldı!`);
  
  // Webhook URL'si ile
  const webhook = "https://discord.com/api/webhooks/your-webhook-url";
  oxy(client, webhook);
});

client.login('TOKEN');
```

### Config Dosyası ile Kullanım

```javascript
const { Client, GatewayIntentBits } = require('discord.js');
const { oxy } = require('oxypack');
const config = require('./config.json'); // { "webhook": "https://..." }

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.on('ready', () => {
  console.log(`${client.user.tag} ile giriş yapıldı!`);
  
  // Config dosyasından webhook kullanımı
  oxy(client, config);
});

client.login('TOKEN');
```

### Özel Aktiviteler ile Kullanım

```javascript
const { Client, GatewayIntentBits } = require('discord.js');
const { oxypack } = require('oxypack');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.on('ready', () => {
  console.log(`${client.user.tag} ile giriş yapıldı!`);
  
  // Özel aktiviteler tanımlayın
  const activities = [
    { name: 'Müzik', type: 'listening', status: 'online' },
    { name: 'Minecraft', type: 'playing', status: 'idle' },
    { name: 'YouTube', type: 'watching', status: 'dnd' },
    { name: 'Twitch Yayını', type: 'streaming', url: 'https://twitch.tv/yourusername', status: 'online' }
  ];
  
  // oxypack kullanarak özel aktiviteler ve webhook ile
  oxypack(client, activities, 60000, true, config.webhook);
});

client.login('TOKEN');
```

## 📋 Fonksiyon Referansları

### `oxy(client, webhook)`

Basit ve hızlı bir şekilde botunuza değişen aktiviteler ekler. Her 15 saniyede bir farklı bir aktivite ayarlar ve bot durumunu her zaman "idle" olarak ayarlar.

| Parametre | Tip | Açıklama | Varsayılan |
|-----------|-----|----------|------------|
| client | Object | Discord.js client nesnesi | (Zorunlu) |
| webhook | String veya Object | Discord webhook URL'si veya webhook bilgisini içeren obje | null |

### `oxypack(client, activities, interval, logActivity, webhook)`

Daha gelişmiş özelleştirme sağlayan ve özel aktiviteler belirlemenize olanak tanıyan fonksiyon.

| Parametre | Tip | Açıklama | Varsayılan |
|-----------|-----|----------|------------|
| client | Object | Discord.js client nesnesi | (Zorunlu) |
| activities | Array | Aktivite bilgilerini içeren dizi | (Zorunlu) |
| interval | Number | Aktivite değişim süresi (ms) | 120000 (2 dakika) |
| logActivity | Boolean | Aktivite değişimlerini konsola yazdırma | true |
| webhook | String veya Object | Discord webhook URL'si veya webhook bilgisini içeren obje | null |

## 📝 Aktivite Yapısı

Aktivite nesnesi aşağıdaki özelliklere sahip olabilir:

```javascript
{
  name: 'Aktivite Adı', // Gösterilecek metin
  type: 'playing',      // Aktivite türü: 'playing', 'watching', 'listening', 'competing', 'streaming'
  url: 'https://...',   // Streaming türü için gerekli URL (opsiyonel)
  status: 'online'      // Bot durumu: 'online', 'idle', 'dnd', 'invisible' (opsiyonel)
}
```

## 🔔 Webhook Bildirimleri

Webhook özelliği etkinleştirildiğinde, her aktivite değişiminde aşağıdaki bilgileri içeren bir embed mesajı webhook'a gönderilir:

- Aktivite İsmi
- Aktivite Türü
- Bot Durumu
- URL (eğer varsa)
- Zaman damgası

## 📃 Örnek config.json

```json
{
  "token": "your-discord-bot-token",
  "webhook": "https://discord.com/api/webhooks/your-webhook-url",
  "prefix": "!",
  "botSettings": {
    "activityInterval": 60000
  }
}
```

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

## 👨‍💻 Geliştirici

Oxy tarafından geliştirilmiştir.

- Discord: @oxyinc
- GitHub: [github.com/oxydesign](https://github.com/hasbutcu)
- Website: [oxyinc.xyz](https://oxyinc.xyz)

---

🌟 OxyPack'i beğendiyseniz yıldız vermeyi unutmayın! 🌟