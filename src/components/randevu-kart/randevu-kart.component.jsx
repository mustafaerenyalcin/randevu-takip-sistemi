const DURUM = {
  bekliyor:   { metin: "Bekliyor",     renk: "#f59e0b", bg: "rgba(245,158,11,0.12)",  ikon: "hourglass-split" },
  tamamlandi: { metin: "Tamamlandı",   renk: "#10b981", bg: "rgba(16,185,129,0.12)",  ikon: "check-circle"    },
  iptal:      { metin: "İptal Edildi", renk: "#ef4444", bg: "rgba(239,68,68,0.12)",   ikon: "x-circle"        },
};

const HIZMET_IKONLARI = {
  Doktor: "heart-pulse", Diş: "emoji-smile", Kuaför: "scissors",
  Veteriner: "bird", Danışmanlık: "briefcase", Diğer: "three-dots",
};

const tarihFormatla = (tarihStr) => {
  if (!tarihStr) return "";
  const [yil, ay, gun] = tarihStr.split("-");
  return `${gun}.${ay}.${yil}`;
};

const RandevuKart = ({ randevu, onDuzenle, onSil, onDurumGuncelle }) => {
  const { id, musteriAdi, hizmetTuru, tarih, saat, aciklama, durum } = randevu;
  const bugun = new Date().toISOString().split("T")[0];
  const gecmis = tarih < bugun && durum === "bekliyor";
  const d = DURUM[durum] ?? DURUM.bekliyor;

  return (
    <div className={`card randevu-kart h-100 ${gecmis ? "gecmis" : ""}`}>
      <div className={`kart-ustbant ${durum}`}></div>
      <div className="card-body d-flex flex-column p-3">

        {/* Üst satır */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="d-flex align-items-center gap-1" style={{
            fontSize: "0.72rem", fontWeight: 600, padding: "0.3rem 0.7rem",
            borderRadius: 20, background: d.bg, color: d.renk,
          }}>
            <i className={`bi bi-${d.ikon}`}></i> {d.metin}
          </span>
          <span className="hizmet-badge">
            <i className={`bi bi-${HIZMET_IKONLARI[hizmetTuru] ?? "grid"} me-1`}></i>
            {hizmetTuru}
          </span>
        </div>

        {gecmis && (
          <div className="mb-2 d-flex align-items-center gap-1" style={{ fontSize: "0.75rem", color: "#f59e0b" }}>
            <i className="bi bi-exclamation-triangle-fill"></i> Tarihi Geçmiş
          </div>
        )}

        {/* Müşteri adı */}
        <h6 className="fw-bold mb-2 text-white" style={{ fontSize: "0.95rem" }}>{musteriAdi}</h6>

        {/* Tarih & Saat */}
        <div className="d-flex gap-3 mb-2">
          <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
            <i className="bi bi-calendar3 me-1" style={{ color: "#6366f1" }}></i>
            {tarihFormatla(tarih)}
          </span>
          <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
            <i className="bi bi-clock me-1" style={{ color: "#6366f1" }}></i>
            {saat}
          </span>
        </div>

        {aciklama && (
          <p className="mb-2" style={{ fontSize: "0.78rem", color: "#475569" }}>
            <i className="bi bi-chat-left-text me-1"></i>{aciklama}
          </p>
        )}

        {/* Butonlar */}
        <div className="d-flex gap-2 mt-auto pt-2">
          <button
            className="btn btn-sm flex-fill"
            style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 8, fontSize: "0.78rem" }}
            onClick={() => onDuzenle(randevu)}
          >
            <i className="bi bi-pencil me-1"></i>Düzenle
          </button>

          {durum !== "tamamlandi" && (
            <button
              className="btn btn-sm flex-fill"
              style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 8, fontSize: "0.78rem" }}
              onClick={() => onDurumGuncelle(id, "tamamlandi")}
            >
              <i className="bi bi-check-lg me-1"></i>Tamamlandı
            </button>
          )}

          <button
            className="btn btn-sm"
            style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, fontSize: "0.78rem" }}
            onClick={() => onSil(id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandevuKart;
