const model = require('../models/tarefaModel');

exports.criar = async (req, res) => {
  const tarefa = await model.criarTarefa(req.body);
  res.status(201).json(tarefa);
};

exports.listar = async (req, res) => {
  const { page = 1, limit = 5, status } = req.query;

  const offset = (page - 1) * limit;

  const tarefas = await model.listarTarefas(limit, offset, status);

  res.json(tarefas);
};

exports.atualizar = async (req, res) => {
  const tarefa = await model.atualizarTarefa(req.params.id, req.body);
  res.json(tarefa);
};

exports.deletar = async (req, res) => {
  await model.deletarTarefa(req.params.id);
  res.json({ mensagem: 'Deletado com sucesso' });
};