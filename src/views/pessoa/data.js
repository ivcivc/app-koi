const pessoa = {
  nome: "John",
  certificado: "John Heart",
  cracha: "Sr. John",
  dnasc: "1964/03/16",
  cpf: "87275090600",
  rg: "M5.093.807",
  sexo: "MASCULINO",
  camisa: "GG",
  estado_civil: "CASADO",
  profissao: "ANALISTA DE SISTEMAS",
  tel_resid: "3132918342",
  tel_com: "3121271842",
  tel_celular: "31987034132",
  tel_celular2: "31991916579",
  email: "ivan.a.oliveira@terra.com.br",
  email2: "email@terra.com.br",
  facebook: "facebook@face",
  instagram: "instagram.com",
  skype: "skype.com",
  nota:
    "John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.",
  endereco: {
    logradouro: "Rua dois, 236",
    compl: "sala 205",
    bairro: "Centro",
    cidade: "Alfenas",
    estado: "MG",
    cep: "37130093"
  },
  grupo: ["ALUNO"],
  situacao: "ATIVO"
};

const situacao = ["ATIVO", "INATIVO"];

const grupo = [
  { id: 1, nome: "ALUNO" },
  { id: 2, nome: "CONSULTOR" },
  { id: 3, nome: "FORNECEDOR" }
];

const estado_civil = ["SOLTEIRO", "CASADO", "UNIÃO ESTÁVEL", "DIVOCIADO"];

const camisas = ["P", "M", "G", "GG", "EXG"];

const sexos = ["MASCULINO", "FEMININO"];

export default {
  getPessoa() {
    return pessoa;
  },

  getSituacoes() {
    return situacao;
  },

  getGrupos() {
    return grupo;
  },

  getEstadosCivis() {
    return estado_civil;
  },

  getCamisas() {
    return camisas;
  },

  getSexos() {
    return sexos;
  }
};
