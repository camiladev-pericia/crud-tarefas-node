const db = require('../config/database');

exports.criarTarefa = async (dados) => {
  const { titulo, descricao } = dados;
  const result = await db.query(
    'INSERT INTO tarefas (titulo, descricao) VALUES ($1, $2) RETURNING *',
    [titulo, descricao]
  );
  return result.rows[0];
};

exports.listarTarefas = async (limit, offset, status) => {
  let query = 'SELECT * FROM tarefas';
  let values = [];
  let index = 1;

  if (status) {
    query += ` WHERE status = $${index}`;
    values.push(status);
    index++;
  }

  query += ` ORDER BY id LIMIT $${index} OFFSET $${index + 1}`;
  values.push(limit, offset);

  const result = await db.query(query, values);
  return result.rows;
};

exports.atualizarTarefa = async (id, dados) => {
  const { titulo, descricao, status } = dados;
  const result = await db.query(
    `UPDATE tarefas 
     SET titulo=$1, descricao=$2, status=$3 
     WHERE id=$4 RETURNING *`,
    [titulo, descricao, status, id]
  );
  return result.rows[0];
};

exports.deletarTarefa = async (id) => {
  await db.query('DELETE FROM tarefas WHERE id=$1', [id]);
};