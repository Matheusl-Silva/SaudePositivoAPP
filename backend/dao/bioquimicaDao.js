const db = require("../database/connection");

exports.findByRegistroPaciente = (registroPaciente) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT id, ddata_exame, id_preceptor FROM exame_bioquimica WHERE id_paciente = ? ORDER BY ddata_exame DESC";

    db.query(query, [registroPaciente], (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });
};

exports.findById = (idExame) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT
      e.*,
      p.cnome AS nome_paciente,
      u_resp.cnome AS nome_responsavel,
      u_prec.cnome AS nome_preceptor
  FROM
      exame_bioquimica e,
      paciente p,
      usuario u_resp,
      usuario u_prec
  WHERE
      e.id_paciente = p.id AND
      e.id_responsavel = u_resp.id AND
      e.id_preceptor = u_prec.id AND
      e.id = ?`;

    db.query(query, [idExame], (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });
};

exports.create = (data) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO exame_bioquimica (
        nbilirrubina_total,
        nbilirrubina_direta,
        nproteina_total,
        nalbumina,
        namilase,
        ntgo_transaminase_glutamico_oxalacetica,
        ntgp_transaminase_glutamico_piruvica,
        ngama_gt_glutamiltransferase,
        nfosfatase_alcalina,
        nreatina_quinase_ck,
        nglicose,
        nferro,
        ncolesterol_total,
        nhdl,
        nldl,
        ntriglicerideos,
        nureia,
        ncreatinina,
        nacido_urico,
        npcr_proteina_c_reativa,
        ncalcio,
        nldh,
        nmagnesio,
        nfosforo,
        id_responsavel,
        id_preceptor,
        id_paciente,
        ddata_exame
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      data.nbilirrubina_total,
      data.nbilirrubina_direta,
      data.nproteina_total,
      data.nalbumina,
      data.namilase,
      data.ntgo_transaminase_glutamico_oxalacetica,
      data.ntgp_transaminase_glutamico_piruvica,
      data.ngama_gt_glutamiltransferase,
      data.nfosfatase_alcalina,
      data.nreatina_quinase_ck,
      data.nglicose,
      data.nferro,
      data.ncolesterol_total,
      data.nhdl,
      data.nldl,
      data.ntriglicerideos,
      data.nureia,
      data.ncreatinina,
      data.nacido_urico,
      data.npcr_proteina_c_reativa,
      data.ncalcio,
      data.nldh,
      data.nmagnesio,
      data.nfosforo,
      data.id_responsavel,
      data.id_preceptor,
      data.id_paciente,
      data.ddata_exame,
    ];

    db.query(query, values, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};
