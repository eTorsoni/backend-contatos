
require('dotenv').config()
const express = require('express')
const { createClient } = require('@supabase/supabase-js')


const app = express()
app.use(express.json())


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)


////// ROTAS PARA O THUNDER CLIENT 

// AQUI ESTÃO AS ROTAS 




/////GET
app.get('/contatos', async (req, res) => {
  const { data, error } = await supabase
    .from('contatos')
    .select('*')

  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})


////////GET ID
app.get('/contatos', async (req, res) => {
  const { data, error } = await supabase
    .from('contatos')
    .select('*')

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  res.json(data)
})

///////////GET
app.get('/contatos/:id', async (req, res) => {
  const { id } = req.params

  const { data, error } = await supabase
    .from('contatos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return res.status(404).json({ error: 'Contato não encontrado' })
  }

  res.json(data)
})

//////////POST
app.post('/contatos', async (req, res) => {
  const { nome, telefone, email, favorito } = req.body

  const { data, error } = await supabase
    .from('contatos')
    .insert([{ nome, telefone, email, favorito }])

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  res.status(201).json(data)
})

///////////PUT
app.put('/contatos/:id', async (req, res) => {
  const { id } = req.params
  const { nome, telefone, email, favorito } = req.body

  const { data, error } = await supabase
    .from('contatos')
    .update({ nome, telefone, email, favorito })
    .eq('id', id)

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  res.json(data)
})

///////DELETE
app.delete('/contatos/:id', async (req, res) => {
  const { id } = req.params

  const { data, error } = await supabase
    .from('contatos')
    .delete()
    .eq('id', id)

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  res.json({ message: 'Contato removido com sucesso!' })
})


////////////FILTRO DOS FAVORITOS - ROTA
app.get('/contatos-favoritos', async (req, res) => {
  const { data, error } = await supabase
    .from('contatos')
    .select('*')
    .eq('favorito', true)

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  res.json(data)
})




//Servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000 ✅')
})
