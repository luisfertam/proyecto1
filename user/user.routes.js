//1
app.post('/usuarios', async (req, res) => {
    const userData = req.body;
    const nuevoUsuario = new Usuario(userData);
    await nuevoUsuario.save();
    res.json(nuevoUsuario);
});


//2
app.get('/usuarios/:id', async (req, res) => {
  const userId = req.params.id;
  const usuario = await Usuario.findById(userId);
  res.json(usuario);
});


//3
app.put('/usuarios/:id', async (req, res) => {
    const userId = req.params.id;
    const newData = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(userId, newData, { new: true });
    res.json(usuarioActualizado);
});

  
//4
app.delete('/usuarios/:id', async (req, res) => {
    const userId = req.params.id;
    await Usuario.findByIdAndRemove(userId);
    res.json({ message: 'Usuario eliminado con éxito' });
});

