# Oxy-Pack

**Oxy-Pack**; Discord botlarının durum bilgilerini rastgele değiştiren bir Node.js modülüdür. Botunuzun aktivitelerini dinamik olarak değiştirmek için kullanabilirsiniz. Bu paket, Discord.js ile kolayca entegre edilebilir ve botunuzun aktifliğini daha ilgi çekici hale getirebilir.

## Özellikler

- **Rastgele aktivite seçme:** Botunuzun aktivitelerini rastgele seçebilir.
- **Farklı türde aktiviteler:** İzleme, oynama, dinleme, yarışma, yayın yapma gibi farklı aktivite türlerini destekler.
- **Kolay kullanım:** Modülün kullanımının son derece basit olması sayesinde hızlıca entegre edilebilir.
- **Güncelleme aralıkları:** Aktivitenin ne kadar sıklıkla değişeceğini belirleme imkanı.

## Kurulum

Projenizi başlatmak ve **oxy-pack** modülünü kullanmak için aşağıdaki adımları takip edebilirsiniz.

### 1. Modülü Yükleme

```bash
npm install oxypack
```

### 2. Kullanım

`oxypack` modülünü projenize dahil ettikten sonra, aşağıdaki gibi kullanabilirsiniz:

#### **Örnek Kod:**

```js
const { Client, GatewayIntentBits } = require('discord.js');
const { oxypack } = require('oxypack'); // Oxy-Pack modülünü içe aktar

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const aktivite = [
  { name: '##oxydesign' }, // Varsayılan olarak "Playing"
  { name: '##oxydesign', type: 'watching' },
  { name: '##oxydesign', type: 'listening' },
  { name: '##oxydesign', type: 'competing' },
  { name: '##oxydesign', type: 'streaming', url: 'https://twitch.tv/ornek' }
];


client.once('ready', () => {
  console.log(`${client.user.tag} olarak giriş yaptım!`);

  // Aktiviteyi her 1 dakikada bir değiştirmek için
  oxypack(client, activities, 60000, true); // true log mesajlarını göstermek için
});

client.login('YOUR_BOT_TOKEN'); // Tokenınızı buraya yazın
```

### 3. Parametreler

- **client:** Discord botunuzun `client` nesnesi.
- **activities:** Aktivite dizisi, botunuzun yapacağı farklı aktiviteler.
- **interval (ms):** Aktivitenin değişme sıklığı, milisaniye cinsindendir (varsayılan: 2 dakika).
- **logActivity (boolean):** Aktivite değişiminde konsola log mesajı gösterilsin mi? (`true` / `false`).


Bu proje, **MIT Lisansı** altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakabilirsiniz.

