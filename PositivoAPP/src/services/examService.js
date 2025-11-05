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
    volumePlaquetarioMedio: exame.volumeplaquetariomedio,
    idResponsavel: exame.id_responsavel,
    idPreceptor: exame.id_preceptor,
    idPaciente: exame.id_paciente,
    dataExame: exame.data_exame,
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
  return response.data;
}

export async function buscarExame(idExame){
    const response = await api.get(`/exameHemato/listar/${idExame}`);
    return response.data;
}