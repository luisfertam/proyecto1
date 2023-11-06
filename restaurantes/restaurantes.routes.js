//1
app.post('/restaurantes', async (req, res) => {
    const restauranteData = req.body;
    const nuevoRestaurante = new Restaurante(restauranteData);
    await nuevoRestaurante.save();
    res.json(nuevoRestaurante);
});

  
//2
app.get('/restaurantes/:id', async (req, res) => {
    const restauranteId = req.params.id;
    const restaurante = await Restaurante.findById(restauranteId);
    res.json(restaurante);
});
  

//3
app.get('/restaurantes', async (req, res) => {
    const { categoria, nombre } = req.query;
    const restaurantes = await Restaurante.find({
      $or: [
        { categoria: { $regex: categoria, $options: 'i' } },
        { nombre: { $regex: nombre, $options: 'i' } },
      ],
    });
    res.json(restaurantes);
});

  
//4
app.put('/restaurantes/:id', async (req, res) => {
    const restauranteId = req.params.id;
    const newData = req.body;
    const restauranteActualizado = await Restaurante.findByIdAndUpdate(restauranteId, newData, { new: true });
    res.json(restauranteActualizado);
});

  
//5
app.delete('/restaurantes/:id', async (req, res) => {
    const restauranteId = req.params.id;
    await Restaurante.findByIdAndRemove(restauranteId);
    res.json({ message: 'Restaurante eliminado con éxito' });
});
  