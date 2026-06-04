import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import AramaFiltre from "./components/arama-filtre/arama-filtre.component";
import RandevuForm from "./components/randevu-form/randevu-form.component";
import RandevuListe from "./components/randevu-liste/randevu-liste.component";
import "./App.css";

const App = () => {
  const [randevular, setRandevular] = useState(() => {
    const kayitli = localStorage.getItem("randevular");
    return kayitli ? JSON.parse(kayitli) : [];
  });
  const [duzenleRandevu, setDuzenleRandevu] = useState(null);
  const [modalAcik, setModalAcik] = useState(false);
  const [aramaMetni, setAramaMetni] = useState("");
  const [hizmetFiltresi, setHizmetFiltresi] = useState("Tümü");
  const [durumFiltresi, setDurumFiltresi] = useState("bekliyor");
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setYukleniyor(false), 2000);
    const unsub = onSnapshot(
      collection(db, "randevular"),
      (snapshot) => {
        clearTimeout(timeout);
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setRandevular(data);
        localStorage.setItem("randevular", JSON.stringify(data));
        setYukleniyor(false);
      },
      () => { clearTimeout(timeout); setYukleniyor(false); }
    );
    return () => { unsub(); clearTimeout(timeout); };
  }, []);

  const modalKapat = () => {
    setModalAcik(false);
    setDuzenleRandevu(null);
  };

  const filtreleriSifirla = () => {
    setAramaMetni("");
    setHizmetFiltresi("Tümü");
  };

  const localKaydet = (yeniListe) => {
    localStorage.setItem("randevular", JSON.stringify(yeniListe));
    setRandevular(yeniListe);
  };

  const randevuEkle = async (yeniRandevu) => {
    try {
      await addDoc(collection(db, "randevular"), yeniRandevu);
    } catch {
      localKaydet([...randevular, { ...yeniRandevu, id: Date.now().toString() }]);
    }
    filtreleriSifirla();
    modalKapat();
  };

  const randevuGuncelle = async (guncellenmis) => {
    try {
      const { id, ...data } = guncellenmis;
      await updateDoc(doc(db, "randevular", id), data);
    } catch {
      localKaydet(randevular.map((r) => (r.id === guncellenmis.id ? guncellenmis : r)));
    }
    setDuzenleRandevu(null);
    filtreleriSifirla();
    modalKapat();
  };

  const randevuSil = async (id) => {
    if (window.confirm("Bu randevuyu silmek istediğinize emin misiniz?")) {
      try {
        await deleteDoc(doc(db, "randevular", id));
      } catch {
        localKaydet(randevular.filter((r) => r.id !== id));
      }
    }
  };

  const durumGuncelle = async (id, yeniDurum) => {
    try {
      await updateDoc(doc(db, "randevular", id), { durum: yeniDurum });
    } catch {
      localKaydet(randevular.map((r) => (r.id === id ? { ...r, durum: yeniDurum } : r)));
    }
  };

  const filtrelenmisRandevular = randevular.filter((r) => {
    const aramaUyumu =
      r.musteriAdi.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      (r.aciklama || "").toLowerCase().includes(aramaMetni.toLowerCase());
    const hizmetUyumu = hizmetFiltresi === "Tümü" || r.hizmetTuru === hizmetFiltresi;
    const durumUyumu =
      durumFiltresi === "tumu" ? true :
      durumFiltresi === "bekliyor" ? r.durum === "bekliyor" :
      durumFiltresi === "iptal" ? r.durum === "iptal" : true;
    return aramaUyumu && hizmetUyumu && durumUyumu;
  });

  return (
    <>
      <div className="app-header">
        <div className="container text-center">
          {/* Senin eklediğin logo.png'yi public klasöründen tam burada okutuyoruz */}
          <h1>
            <img 
              src="./logo.png" 
              alt="logo" 
              style={{ width: 40, height: 40, marginRight: 10, verticalAlign: "middle", mixBlendMode: "screen", filter: "drop-shadow(0 0 6px rgba(129,140,248,0.6))" }} 
            />
            Randevu Takip
          </h1>
          <p className="mb-0">Tüm randevularınızı kolayca yönetin</p>
        </div>
      </div>

      <div className="container pb-5">
        {yukleniyor ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status" />
            <p className="text-secondary mt-3">Yükleniyor...</p>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-center mb-4">
              <button
                className="btn text-white d-flex align-items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #818cf8)",
                  border: "none", borderRadius: 12, padding: "0.65rem 1.4rem",
                  fontWeight: 700, fontSize: "0.9rem",
                  boxShadow: "0 4px 20px rgba(99,102,241,0.45)",
                }}
                onClick={() => { setDuzenleRandevu(null); setModalAcik(true); }}
              >
                <i className="bi bi-plus-lg"></i> Yeni Randevu Ekle
              </button>
            </div>

            <AramaFiltre
              aramaMetni={aramaMetni}
              onArama={setAramaMetni}
              hizmetFiltresi={hizmetFiltresi}
              onHizmetFiltresi={setHizmetFiltresi}
            />
            <RandevuListe
              randevular={filtrelenmisRandevular}
              tumRandevular={randevular}
              durumFiltresi={durumFiltresi}
              onDurumFiltresi={setDurumFiltresi}
              onDuzenle={(r) => { setDuzenleRandevu(r); setModalAcik(true); }}
              onSil={randevuSil}
              onDurumGuncelle={durumGuncelle}
            />

            {/* Modal */}
            {modalAcik && (
              <div
                onClick={modalKapat}
                style={{
                  position: "fixed", inset: 0, zIndex: 1000,
                  background: "rgba(0,0,0,0.75)",
                  backdropFilter: "blur(6px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "1rem",
                  animation: "fadeIn 0.2s ease",
                }}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: "100%", maxWidth: 720,
                    animation: "slideUp 0.25s ease",
                  }}
                >
                  <RandevuForm
                    duzenleRandevu={duzenleRandevu}
                    onEkle={randevuEkle}
                    onGuncelle={randevuGuncelle}
                    onIptal={modalKapat}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default App;