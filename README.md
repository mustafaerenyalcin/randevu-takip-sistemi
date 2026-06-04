# 📅 Randevu Takip Uygulaması

Bu proje, kullanıcıların kolayca randevu oluşturmasını, takip etmesini ve yönetmesini sağlayan modern bir web uygulamasıdır. Hızlı, güvenilir ve kullanıcı dostu bir arayüz sunmak amacıyla en güncel web teknolojileri kullanılarak geliştirilmiştir.

## 🚀 Kullanılan Teknolojiler

Proje geliştirilirken aşağıdaki teknolojiler kullanılmıştır:

- **[React.js](https://react.dev/)**: Modern kullanıcı arayüzü ve bileşen yapısı için.
- **[Vite](https://vitejs.dev/)**: Hızlı geliştirme ortamı ve derleme (build) aracı olarak.
- **[Firebase](https://firebase.google.com/)**: Veritabanı yönetimi (Firestore/Realtime DB) ve hızlı arka uç hizmetleri için.
- **[Bootstrap 5](https://getbootstrap.com/) & [Bootstrap Icons](https://icons.getbootstrap.com/)**: Duyarlı (responsive) tasarım, bileşenler ve ikonlar için.

## ✨ Öne Çıkan Özellikler

- Hızlı ve modern tek sayfa uygulaması (SPA) deneyimi.
- Gerçek zamanlı veri senkronizasyonu (Firebase entegrasyonu sayesinde).
- Tüm cihazlara (mobil, tablet, masaüstü) uyumlu tasarım.
- Kolay yönetilebilir ve anlaşılır kod yapısı.

## 🛠️ Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz.

### Ön Koşullar

- Bilgisayarınızda [Node.js](https://nodejs.org/) (önerilen LTS sürümü) yüklü olmalıdır.

### Adımlar

1. **Projeyi İndirin (Klonlayın)**
   ```bash
   git clone https://github.com/KULLANICI_ADINIZ/randevu-takip.git
   cd randevu-takip
   ```

2. **Gerekli Paketleri Yükleyin**
   ```bash
   npm install
   ```

3. **Firebase Bağlantı Ayarları**
   - Projenin düzgün çalışması için kendi Firebase yapılandırmanızı eklemeniz gerekir. 
   - İlgili Firebase ayarlarını proje içerisindeki gerekli dosyalara (veya `.env` dosyanıza) girin.

4. **Projeyi Başlatın**
   ```bash
   npm run dev
   ```
   Bu komutu çalıştırdıktan sonra terminalde belirtilen adrese (genellikle `http://localhost:5173`) tarayıcınızdan giderek uygulamayı görüntüleyebilirsiniz.

## 📦 Canlı Ortama Alma (Build)

Uygulamayı canlı sunuculara (production) yüklemeye hazır hale getirmek için aşağıdaki komutu kullanabilirsiniz:

```bash
npm run build
```
Bu komut, projenizin optimize edilmiş son halini `dist` klasörüne çıkaracaktır.

---
*Bu proje Vite & React şablonu temel alınarak oluşturulmuştur.*
