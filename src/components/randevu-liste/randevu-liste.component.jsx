import RandevuKart from "../randevu-kart/randevu-kart.component";

const OZET = [
  { key: "toplam",     etiket: "Toplam",       ikon: "calendar2-check", cls: "toplam"     },
  { key: "bekleyen",   etiket: "Bekleyen",     ikon: "hourglass-split", cls: "bekleyen"   },
  { key: "tamamlanan", etiket: "Tamamlanan",   ikon: "patch-check",     cls: "tamamlanan" },
  { key: "iptal",      etiket: "İptal Edilen", ikon: "x-circle",        cls: "iptal"      },
];

const FILTRELER = [
  { deger: "bekliyor", etiket: "Bekleyen",       ikon: "hourglass-split" },
  { deger: "iptal",    etiket: "İptal Edilen",   ikon: "x-circle"        },
  { deger: "tumu",     etiket: "Tümü",           ikon: "list-ul"         },
];

const RandevuListe = ({ randevular, tumRandevular, durumFiltresi, onDurumFiltresi, onDuzenle, onSil, onDurumGuncelle }) => {
  const sayilar = {
    toplam:     tumRandevular.length,
    bekleyen:   tumRandevular.filter((r) => r.durum === "bekliyor").length,
    tamamlanan: tumRandevular.filter((r) => r.durum === "tamamlandi").length,
    iptal:      tumRandevular.filter((r) => r.durum === "iptal").length,
  };

  const siraliRandevular = [...randevular].sort(
    (a, b) => new Date(a.tarih + "T" + a.saat) - new Date(b.tarih + "T" + b.saat)
  );

  const aktifFiltre = FILTRELER.find((f) => f.deger === durumFiltresi);

  return (
    <div>
      {/* Özet kartları */}
      <div className="row g-3 mb-4">
        {OZET.map(({ key, etiket, ikon, cls }) => (
          <div className="col-6 col-md-3" key={key}>
            <div className={`card ozet-kart ${cls}`}>
              <div className="card-body text-center">
                <div className="ozet-icon"><i className={`bi bi-${ikon}`}></i></div>
                <div className="ozet-sayi">{sayilar[key]}</div>
                <div className="ozet-label">{etiket}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filtre butonları */}
      <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
        <span style={{ fontSize: "0.75rem", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Göster:
        </span>
        {FILTRELER.map((f) => {
          const aktif = durumFiltresi === f.deger;
          return (
            <button
              key={f.deger}
              onClick={() => onDurumFiltresi(f.deger)}
              className="btn btn-sm"
              style={{
                borderRadius: 20,
                fontWeight: 600,
                fontSize: "0.78rem",
                padding: "0.35rem 1rem",
                transition: "all 0.15s",
                background: aktif ? "linear-gradient(135deg, #4f46e5, #6366f1)" : "rgba(255,255,255,0.05)",
                color: aktif ? "#fff" : "#64748b",
                border: aktif ? "none" : "1px solid rgba(255,255,255,0.08)",
                boxShadow: aktif ? "0 4px 14px rgba(99,102,241,0.35)" : "none",
              }}
            >
              <i className={`bi bi-${f.ikon} me-1`}></i>{f.etiket}
            </button>
          );
        })}
        <span className="ms-auto badge" style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", fontSize: "0.75rem", padding: "0.4rem 0.8rem", borderRadius: 20 }}>
          {siraliRandevular.length} randevu
        </span>
      </div>

      {/* Liste */}
      <div className="bolum-baslik d-flex align-items-center gap-2">
        <i className={`bi bi-${aktifFiltre?.ikon}`}></i> {aktifFiltre?.etiket} Randevular
      </div>

      {siraliRandevular.length === 0 ? (
        <div className="text-center py-5" style={{ color: "#1e293b" }}>
          <i className="bi bi-calendar-x" style={{ fontSize: "3rem" }}></i>
          <p className="mt-3 mb-0" style={{ color: "#334155" }}>Bu kategoride randevu bulunamadı.</p>
        </div>
      ) : (
        <div className="row g-3">
          {siraliRandevular.map((r) => (
            <div className="col-md-6 col-xl-4" key={r.id}>
              <RandevuKart randevu={r} onDuzenle={onDuzenle} onSil={onSil} onDurumGuncelle={onDurumGuncelle} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RandevuListe;
