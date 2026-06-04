const HIZMET_TURLERI = ["Tümü", "Doktor", "Diş", "Kuaför", "Veteriner", "Danışmanlık", "Diğer"];

const AramaFiltre = ({ aramaMetni, onArama, hizmetFiltresi, onHizmetFiltresi }) => {
  return (
    <div className="card filtre-card mb-4">
      <div className="card-body p-3">
        <div className="row g-3 align-items-center">
          <div className="col-md-8">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="İsim veya açıklamaya göre ara..."
                value={aramaMetni}
                onChange={(e) => onArama(e.target.value)}
              />
              {aramaMetni && (
                <button className="btn" style={{ background: "#0f172a", border: "1px solid rgba(99,102,241,0.2)", color: "#64748b" }} onClick={() => onArama("")}>
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={hizmetFiltresi}
              onChange={(e) => onHizmetFiltresi(e.target.value)}
            >
              {HIZMET_TURLERI.map((tur) => (
                <option key={tur} value={tur}>{tur}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AramaFiltre;
