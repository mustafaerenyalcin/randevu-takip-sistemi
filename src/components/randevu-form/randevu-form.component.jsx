import { useState, useEffect } from "react";

const bosForm = {
  musteriAdi: "",
  hizmetTuru: "Doktor",
  tarih: "",
  saat: "",
  aciklama: "",
  durum: "bekliyor",
};

const RandevuForm = ({ duzenleRandevu, onEkle, onGuncelle, onIptal }) => {
  const [form, setForm] = useState(bosForm);
  const [hata, setHata] = useState("");
  const [basari, setBasari] = useState("");

  useEffect(() => {
    setForm(duzenleRandevu ?? bosForm);
    setHata("");
    setBasari("");
  }, [duzenleRandevu]);

  const handleDegisim = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleKaydet = async (e) => {
    e.preventDefault();
    if (!form.musteriAdi.trim() || !form.tarih || !form.saat) {
      setHata("Müşteri adı, tarih ve saat alanları zorunludur.");
      return;
    }
    if (duzenleRandevu) {
      await onGuncelle(form);
      setBasari("Randevu başarıyla güncellendi!");
    } else {
      await onEkle(form);
      setForm(bosForm);
      setBasari("Randevu başarıyla eklendi!");
    }
    setHata("");
    setTimeout(() => setBasari(""), 3000);
  };

  const handleTemizle = () => {
    setForm(bosForm);
    setHata("");
    setBasari("");
    if (duzenleRandevu) onIptal();
  };

  return (
    <div className="card form-card mb-4">
      <div className="card-header">
        <div className="d-flex align-items-center gap-2 w-100">
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #4f46e5, #818cf8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <i className={`bi bi-${duzenleRandevu ? "pencil-fill" : "plus-lg"} text-white`}></i>
          </div>
          <div className="flex-grow-1">
            <div className="fw-700 text-white" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
              {duzenleRandevu ? "Randevuyu Düzenle" : "Yeni Randevu Ekle"}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
              {duzenleRandevu ? "Bilgileri güncelleyin" : "Tüm alanları doldurun"}
            </div>
          </div>
          <button
            type="button"
            onClick={onIptal}
            style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8, color: "#64748b", width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0, fontSize: "1rem",
            }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>

      <div className="card-body p-4">
        {hata && (
          <div className="alert border-0 py-2 mb-3" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", borderRadius: 10 }}>
            <i className="bi bi-exclamation-circle me-2"></i>{hata}
          </div>
        )}
        {basari && (
          <div className="alert border-0 py-2 mb-3" style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", borderRadius: 10 }}>
            <i className="bi bi-check-circle me-2"></i>{basari}
          </div>
        )}

        <form onSubmit={handleKaydet}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">
                <i className="bi bi-person me-1" style={{ color: "#6366f1" }}></i>Müşteri Adı
              </label>
              <input
                type="text"
                className="form-control"
                name="musteriAdi"
                value={form.musteriAdi}
                onChange={handleDegisim}
                placeholder="Ad ve soyad girin"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                <i className="bi bi-grid me-1" style={{ color: "#6366f1" }}></i>Hizmet Türü
              </label>
              <select className="form-select" name="hizmetTuru" value={form.hizmetTuru} onChange={handleDegisim}>
                <option>Doktor</option>
                <option>Diş</option>
                <option>Kuaför</option>
                <option>Veteriner</option>
                <option>Danışmanlık</option>
                <option>Diğer</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">
                <i className="bi bi-calendar3 me-1" style={{ color: "#6366f1" }}></i>Tarih
              </label>
              <input type="date" className="form-control" name="tarih" value={form.tarih} onChange={handleDegisim} />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                <i className="bi bi-clock me-1" style={{ color: "#6366f1" }}></i>Saat
              </label>
              <input type="time" className="form-control" name="saat" value={form.saat} onChange={handleDegisim} />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                <i className="bi bi-flag me-1" style={{ color: "#6366f1" }}></i>Durum
              </label>
              <select className="form-select" name="durum" value={form.durum} onChange={handleDegisim}>
                <option value="bekliyor">Bekliyor</option>
                <option value="tamamlandi">Tamamlandı</option>
                <option value="iptal">İptal Edildi</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">
                <i className="bi bi-chat-left-text me-1" style={{ color: "#6366f1" }}></i>Açıklama / Not
              </label>
              <input
                type="text"
                className="form-control"
                name="aciklama"
                value={form.aciklama}
                onChange={handleDegisim}
                placeholder="Kısa not (isteğe bağlı)"
              />
            </div>
          </div>

          <div className="mt-4 d-flex gap-2">
            <button type="submit" className="btn btn-kaydet text-white">
              <i className={`bi bi-${duzenleRandevu ? "check-lg" : "save"} me-2`}></i>
              {duzenleRandevu ? "Güncelle" : "Kaydet"}
            </button>
            <button type="button" className="btn btn-temizle" onClick={handleTemizle}>
              <i className="bi bi-x-lg me-2"></i>
              {duzenleRandevu ? "İptal Et" : "Temizle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RandevuForm;
