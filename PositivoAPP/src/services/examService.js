import api from "./api";

export async function cadastrarExame(exame) {
  const payload = {
    hemacia: exame.hemacia,
    hemoglobina: exame.hemoglobina,
    hematocrito: exame.hematocrito,
    vcm: exame.vcm,
    hcm: exame.hcm,
    chcm: exame.chcm,
    rdw: exame.rdw,
    leucocitos: exame.leucocitos,
    neutrofilos: exame.neutrofilos,
    blastos: exame.blastos,
    promielocitos: exame.promielocitos,
    mielocitos: exame.mielocitos,
    metamielocitos: exame.metamielocitos,
    bastonetes: exame.bastonetes,
    segmentados: exame.segmentados,
    eosinofilos: exame.eosinofilos,
    basofilos: exame.basofilos,
    linfocitos: exame.linfocitos,
    linfocitosAtipicos: exame.linfocitosAtipicos,
    monocitos: exame.monocitos,
    mieloblastos: exame.mieloblastos,
    outrasCelulas: exame.outrasCelulas,
    celulasLinfoides: exame.celulasLinfoides,
    celulasMonocitoides: exame.celulasMonocitoides,
    plaquetas: exame.plaquetas,
    volplaquetariomedio: exame.volumeplaquetariomedio,
    id_responsavel: exame.id_responsavel,
    id_preceptor: exame.id_preceptor,
    id_paciente: exame.id_paciente,
    data: exame.data,
  };

  const response = await api.post("/exameHemato", payload);
  return response.data;
}

export async function atualizarExame(exame) {
  const payload = {
    id: exame.id,
    hemacia: exame.hemacia,
    hemoglobina: exame.hemoglobina,
    hematocrito: exame.hematocrito,
    vcm: exame.vcm,
    hcm: exame.hcm,
    chcm: exame.chcm,
    rdw: exame.rdw,
    leucocitos: exame.leucocitos,
    neutrofilos: exame.neutrofilos,
    blastos: exame.blastos,
    promielocitos: exame.promielocitos,
    mielocitos: exame.mielocitos,
    metamielocitos: exame.metamielocitos,
    bastonetes: exame.bastonetes,
    segmentados: exame.segmentados,
    eosinofilos: exame.eosinofilos,
    basofilos: exame.basofilos,
    linfocitos: exame.linfocitos,
    linfocitosAtipicos: exame.linfocitosAtipicos,
    monocitos: exame.monocitos,
    mieloblastos: exame.mieloblastos,
    outrasCelulas: exame.outrasCelulas,
    celulasLinfoides: exame.celulasLinfoides,
    celulasMonocitoides: exame.celulasMonocitoides,
    plaquetas: exame.plaquetas,
    volplaquetariomedio: exame.volumePlaquetarioMedio,
    idResponsavel: exame.idResponsavel,
    idPreceptor: exame.idPreceptor,
    idPaciente: exame.idPaciente,
    data: exame.data,
  };

  const response = await api.put(`/exameHemato/${exame.id}`, payload);
  return response.data;
}

export async function deletarExame(idExame) {
  const response = await api.delete(`/exameHemato/${idExame}`);
  return response.data;
}

export async function buscarTodosExamesPaciente(idPaciente) {
  const response = await api.get(`/exameHemato/${idPaciente}`);
  const examesFormatados = response.data.map((e) => ({
    id: e.id,
    hemacia: e.nhemacia,
    hemoglobina: e.nhemoglobina,
    hematocrito: e.nhematocrito,
    vcm: e.nvcm,
    hcm: e.nhcm,
    chcm: e.nchcm,
    rdw: e.nrdw,
    leucocitos: e.nleucocitos,
    neutrofilos: e.nneutrofilos,
    blastos: e.nblastos,
    promielocitos: e.npromielocitos,
    mielocitos: e.nmielocitos,
    metamielocitos: e.nmetamielocitos,
    bastonetes: e.nbastonetes,
    segmentados: e.nsegmentados,
    eosinofilos: e.neosinofilos,
    basofilos: e.nbasofilos,
    linfocitos: e.nlinfocitos,
    linfocitosAtipicos: e.nlinfocitos_atipicos,
    monocitos: e.nmonocitos,
    mieloblastos: e.nmieloblastos,
    outrasCelulas: e.noutras_celulas,
    celulasLinfoides: e.ncelulas_linfoides,
    celulasMonocitoides: e.ncelulas_monocitoides,
    plaquetas: e.nplaquetas,
    volumePlaquetarioMedio: e.nvolume_plaquetario_medio,
    data: e.ddata_exame,
    idPreceptor: e.id_preceptor,
    idResponsavel: e.id_responsavel,
    idPaciente: e.id_paciente
  }));
  return examesFormatados;
}

export async function buscarExame(idExame) {
  const response = await api.get(`/exameHemato/listar/${idExame}`);
  return response.data;
}
