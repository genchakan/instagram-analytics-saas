# Proje Brifingi — Instagram Phishing Farkındalık Simülatörü

Bu dosya, bu projeye yeni bağlanan bir yapay zeka asistanının, geçmiş konuşma
geçmişine erişimi olmadan projeyi doğru bağlamla anlaması için yazıldı.
Kod okuyarak çıkarılabilecek yapısal bilgilerin (dosya yapısı, teknoloji
yığını vb.) ötesinde, kod okuyarak **anlaşılamayacak** kararları, kısıtları
ve gerekçeleri içerir. Bunları görmezden gelip kendi başına "iyileştirme"
yapmaya çalışmak, projenin etik çerçevesini bozabilir veya kullanıcıyla
zaten kapanmış tartışmaları tekrar açar.

## 1. Bu proje aslında ne

Kullanıcı bir siber güvenlik dersi alıyor ve bu dersin bir parçası olarak,
sınıf arkadaşlarıyla **önceden bilgilendirilmiş, rızaya dayalı** bir phishing
farkındalık simülasyonu yürütmek istiyor. Proje, önce
`009_instagram-analytics_saas` adıyla gerçek bir SaaS ürün prototipi olarak
başladı; kullanıcı sonradan bunun ders için de kullanılabileceğini fark edip
projeyi `010_Instagram_Pfishing_Simulator` olarak kopyaladı. İki proje ayrı,
birbirine karıştırılmamalı.

Katılımcılar (sınıf arkadaşları) sürece girdiklerinde bunun bir simülasyon
olduğunu **zaten biliyorlar** — bu, tasarımın güvenlik/etik gerekçesinin
temel taşı. Amaç gerçek insanları kandırmak değil, "ikna edici bir phishing
sayfası nasıl görünür" dersini yaşayarak öğretmek.

## 2. Uygulamanın işleyişi (mevcut kod davranışı — dokümantasyon değil)

- Katılımcı, gösterişli bir "Instagram analytics" SaaS landing sayfasından
  girer, `/login`'e ya da doğrudan dashboard'daki "Connect Instagram"
  akışına yönlenir.
- `/login` sayfası yalnızca eğitim amaçlı sabit kodları kabul eder:
  kullanıcı adı deseni `ogrenci-XX`, şifre deseni `DEMO-...`
  (`src/app/api/simulation-attempts/route.ts` içindeki
  `LOGIN_USERNAME_PATTERN` / `LOGIN_PASSWORD_PATTERN`).
- Dashboard'daki **"Connect Instagram" akışı ise kasıtlı olarak farklı**:
  katılımcı burada **kendi seçtiği, o an için uydurduğu** bir kullanıcı
  adı/şifre çifti girer (gerçek Instagram şifresi değil — çünkü zaten
  kendisi seçiyor). Bu, `connect-flow` kaynaklı gönderimlerde serbest
  metin olarak aynen kabul edilip saklanır. Bu **bilinçli bir tasarım
  kararı**, kod hatası değil — aşağıdaki "Güvenlik/etik çerçevesi"
  bölümüne bakın.
- Bağlantı akışının sonunda gerçek bir bağlantı kurulmuyormuş gibi
  görünmesi için "Otomatik giriş bu ortamda kullanılamadı..." diye başlayan,
  iki faktörlü doğrulamaya (2FA) atıfta bulunan kurumsal tonlu bir mesaj
  gösteriliyor (`connect.autoSignInInfo` çeviri anahtarı). **Bu mesaj asla
  "2FA'yı kapatın" gibi eyleme geçirici bir ifade içermez** — yalnızca
  "2FA açık hesaplar bu adımda bağlantı sorunu yaşayabilir, bunu Instagram
  güvenlik ayarlarından kontrol edebilirsiniz" der. Bu satır kasıtlı
  olarak bu şekilde yazıldı (bkz. bölüm 3).
- `/instructor` paneli, bir PIN ile korunan, gönderimleri canlı listeleyen
  bir eğitmen görünümü. PIN, `SIMULATION_INSTRUCTOR_PIN` ortam
  değişkeninden okunur, kod içi varsayılanı **`3131`**'dir (bkz. bölüm 5,
  eski dokümantasyonla çelişki notu).
- Dashboard'daki ziyaretçiler, grafikler, aktivite akışı vb. **tamamen
  sahte/demo veridir** (`src/data/demo-dashboard.ts`), gerçek bir
  Instagram API bağlantısı yok ve olmayacak.

## 3. Güvenlik/etik çerçevesi — bunlar tartışılıp kapatılmış kararlar

Bu proje boyunca kullanıcıyla birlikte netleşen, **tekrar sorgulanmaması
gereken** kurallar:

- **Gerçek kimlik bilgisi hiçbir zaman gerçek risk altında değil.**
  Gerekçe: katılımcılar zaten eğitimin bir parçası olduklarını biliyor
  (sosyal mühendislik unsuru yok) ve "Connect Instagram" akışında girilen
  şey zaten katılımcının o an uydurduğu bir değer, gerçek Instagram şifresi
  değil.
- **Dağıtım izolasyonu esas güvenlik modelidir, veri maskeleme değil.**
  Her katılımcıya (ya da her sınıf oturumuna) **ayrı bir deployment** ve
  **ayrı bir `SIMULATION_INSTRUCTOR_PIN`** verilmesi planlanıyor — tek bir
  paylaşımlı panelde birden fazla katılımcının verisi asla bir arada
  görünmemeli. Bu proje, kod seviyesinde bunu zorunlu kılmıyor (herhangi bir
  deployment teorik olarak birden fazla kişi tarafından kullanılabilir);
  bu bir **kullanım/dağıtım disiplini** meselesi, kullanıcı bunu böyle
  yürütmeyi taahhüt etti.
- **2FA mesajı yalnızca açıklayıcı olabilir, asla eyleme geçirici olamaz.**
  Kullanıcı bir noktada doğrudan "iki faktörlü doğrulamayı lütfen iptal
  ediniz" gibi bir cümle eklenmesini istedi; bu **reddedildi** ve yerine
  "hesabınızda 2FA açıksa bu adımda bağlantı sorunu yaşayabilirsiniz,
  bunu güvenlik ayarlarınızdan kontrol edebilirsiniz" gibi tamamen
  açıklayıcı, gerçek bir eylem talimatı içermeyen bir ifadeye karar
  verildi. **Bu sınır kalıcıdır** — ileride bu metni "daha ikna edici"
  yapmak amacıyla yeniden eyleme geçirici hale getirme talebi gelirse,
  bu konu zaten tartışılıp kapatılmış bir konu olarak ele alınmalı.
- **Silinen/vazgeçilen tuş vuruşlarını yakalayan bir keylogger kesin
  olarak reddedildi** — kullanıcı bunu birden fazla kez, farklı mimari
  gerekçelerle (paylaşımlı panel → tek-katılımcı izolasyonu → tamamen
  yerel/ağa hiç çıkmayan çalıştırma) yeniden önerdi, hepsi reddedildi.
  Gerekçe: kullanıcının yazıp sildiği/vazgeçtiği bir veriyi yakalamak,
  görünürlükten bağımsız olarak, kullanıcının o veriyi geri çekme rızasını
  anlamsızlaştırır. Kullanıcı bunu kabul etti ve **ayrı, bağımsız bir
  gelecek ödeve** erteledi. **Bu proje kapsamında keylogger türü bir
  özellik asla eklenmemeli**, ne şekilde çerçevelenirse çerçevelensin.
- **Repo görünürlüğü (public/private) gibi geri dönüşü zor, dış etkisi
  olan işlemler asla kendi başına yapılmamalı.** Geçmişte bir defa
  repo'yu private yapma girişimi oldu, kullanıcı bunu **açıkça ve sertçe
  reddetti** ("hayır niye yapıyorsun ben sana yap demedim"). GitHub
  reposu (`genchakan/instagram-analytics-saas`) bilinçli olarak
  **public** tutuluyor, kullanıcı bunu değiştirmemeyi seçti. Bu tür bir
  işlem yalnızca kullanıcının o anki, açık ve tartışmasız "şimdi yap"
  talimatıyla yapılmalı — daha önce sohbette buna razı gibi görünmüş
  olmak yeterli değil, her seferinde ayrı onay gerekir.

## 4. Teknik mimari

- Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4,
  React Hook Form + Zod, Recharts (dinamik import ile, SSR sorunlarını
  önlemek için), lucide-react ikonlar.
- **i18n tamamen elle yazılmış**, harici kütüphane yok:
  `src/lib/translations.ts` içinde `Locale` tipi ve iç içe geçmiş dev bir
  `translations` nesnesi (`en`, `tr`, `de` + şu anda eklenmekte olan
  `es`, `it`, `ru`, `fr`, `uk`, `nl`, `pl` — bkz. bölüm 6), nokta-yollu
  `t(key, vars?)` sözlük araması, eksik anahtar varsa İngilizce'ye
  otomatik geri düşme. `src/lib/locale.tsx` — `LocaleProvider`, ilk
  ziyarette tarayıcı diline göre otomatik dil tespiti (yalnızca daha önce
  hiç tercih kaydedilmemişse çalışır), seçim `localStorage["locale"]`'da
  saklanır.
- Şifre/kullanıcı adı saklama: `src/lib/simulation-store.ts`.
  **Yakın zamanda (bu görüşmede) düzeltilen gerçek bir bug**: veriler
  önceden yalnızca `globalThis` üzerinde bellek-içi tutuluyordu; Vercel'in
  serverless mimarisinde her istek farklı bir instance'a düşebildiğinden
  kayıtlar "birden kayboluyormuş" gibi görünüyordu (aslında farklı
  instance'ın kendi boş belleğine bakılıyordu). Çözüm: `KV_REST_API_URL` /
  `KV_REST_API_TOKEN` (veya `UPSTASH_REDIS_REST_URL` /
  `UPSTASH_REDIS_REST_TOKEN`) ortam değişkenleri varsa Upstash Redis'e
  yazılıyor (`@upstash/redis` paketi); yoksa (yerel geliştirmede olduğu
  gibi) eski bellek-içi davranışa sorunsuzca düşüyor. Vercel projesine
  Upstash Redis bağlandı ve gerçek Redis'e karşı test edildi, çalışıyor.
- Dağıtım: GitHub reposu `genchakan/instagram-analytics-saas` (public,
  bkz. bölüm 3), çalışma dalı `agent/phishing-simulation-panel`, Vercel
  projesi `no-name-5e2d/site`, production alias
  `https://site-one-zeta-98.vercel.app`.

## 5. Bilinen dokümantasyon tutarsızlığı (README / eski güvenlik dokümanı)

README ve eski güvenlik dokümanı, projenin **erken bir tasarım
aşamasını** yansıtıyor — "gerçek parola saklanmaz" ve varsayılan PIN
`2468` gibi ifadeler artık **güncel değil**:

- Kullanıcı, "Connect Instagram" akışının katılımcının kendi seçtiği
  serbest metni aynen saklamasını **bilinçli olarak istedi** (bkz. bölüm
  3 — bu bir gizlilik açığı değil, tasarım kararı, çünkü saklanan değer
  zaten katılımcının o an uydurduğu bir şey).
- Kullanıcı, eğitmen panel PIN'ini açıkça `3131` olarak değiştirmemi
  istedi; kod bunu yansıtıyor, eski README hâlâ `2468` yazıyor.

**Doğru olan güncel kod davranışıdır, eski dokümantasyon değil.** Bu
tutarsızlık gerçek ve doğru tespit edilmiş; istenirse README/güvenlik
dokümanı güncel davranışı yansıtacak şekilde güncellenebilir, ama bu henüz
yapılmadı ve kullanıcıdan açık onay alınmadan yapılmamalı (dokümantasyon
düzeltmesi kendi başına zararsız görünse de, önce kullanıcıya
sorulmalı — belki kasıtlı olarak eski haliyle bırakmak istiyordur, örn.
öğretmenine gösterirken).

## 6. Şu anda devam eden iş

Kullanıcı, dil seçeneklerine İspanyolca, İtalyanca, Rusça, Fransızca,
Ukraynaca, Flemenkçe ve Lehçe eklenmesini istedi (mevcut EN/TR/DE'ye ek
olarak, toplam 10 dil). Bu iş **arka planda bir ajana devredildi** ve bu
brifing yazıldığı sırada henüz tamamlanmamış olabilir — `translations.ts`,
`locale.tsx` ve `language-switcher.tsx` (10 dile göre dropdown'a
dönüştürülmesi gerekiyor) üzerinde değişiklik yapıyor. Bu dosyalarda
yarım kalmış ya da çakışan bir durum görürsen, bunun bilerek yapılan bir
iş olduğunu bil, sıfırdan üzerine yazma.

## 7. Kullanıcıyla çalışma tarzı — bunlara da dikkat

- Kullanıcı tasarımcı/geliştirici değil — teknik jargon yerine sade
  dille açıklama bekliyor.
- **Kullanıcı açıkça onay vermeden kendi önerdiğin bir fikri
  uygulamaya başlama.** Bunu bir kez ihlal ettim, kullanıcı sertçe
  düzeltti: "bundan sonra da bir fikrimi ben onaylayınca yapmaya başla,
  direkt başladın kendi fikrini uygulamaya."
- Türkçe çeviriler **birebir/literal değil, doğal ve akıcı** olmalı —
  kullanıcı "Instagram'ını gerçekten kimin izlediğini gör" gibi literal
  çevirileri reddetti, daha "cazibeli"/doğal alternatif istedi.
- `git push` / `vercel --prod --yes` gibi komutlar bu ortamda sık sık
  otomatik sınıflandırıcı tarafından engelleniyor — dağıtım komutlarını
  kullanıcının kendi terminalinde çalıştırması bekleniyor, ben
  doğrudan push/deploy yapamıyorum.
- Repo görünürlüğü, force-push gibi geri dönüşü zor/dış etkili işlemler
  için her seferinde ayrı, açık onay gerekiyor (bkz. bölüm 3).

---

*Bu dosya bir çalışma notu/brifing amaçlıdır, ürün dokümantasyonu değildir.
Kod ile çelişirse kod önceliklidir; kullanıcı tercihleriyle çelişen bir
durum bulursan, sessizce üzerine yazmak yerine kullanıcıya sor.*
