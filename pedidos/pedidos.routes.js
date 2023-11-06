//1
app.post('/pedidos', async (req, res) => {
    const pedidoData = req.body;
    const nuevoPedido = new Pedido(pedidoData);
    await nuevoPedido.save();
    res.json(nuevoPedido);
});

  
//2
app.get('/pedidos/:id', async (req, res) => {
    const pedidoId = req.params.id;
    const pedido = await Pedido.findById(pedidoId);
    res.json(pedido);
});

  
//3
app.get('/pedidos', async (req, res) => {
    const { usuario, restaurante, fechaInicio, fechaFin, enviadosSinAceptar } = req.query;
    const query = {};
  
    if (usuario) query.usuario = usuario;
    if (restaurante) query.restaurante = restaurante;
    if (fechaInicio && fechaFin) query.fecha = { $gte: fechaInicio, $lte: fechaFin };
    if (enviadosSinAceptar) query.aceptado = false;
  
    const pedidos = await Pedido.find(query);
    res.json(pedidos);
});

  
//4
app.put('/pedidos/:id', async (req, res) => {
    const pedidoId = req.params.id;
    const newData = req.body;
    const pedido = await Pedido.findById(pedidoId);
    if (!pedido.enviado) {
      const pedidoActualizado = await Pedido.findByIdAndUpdate(pedidoId, newData, { new: true });
      res.json(pedidoActualizado);
    } else {
      res.status(400).json({ message: 'No se puede actualizar un pedido enviado.' });
    }
});

  
//5
app.delete('/pedidos/:id', async (req, res) => {
    const pedidoId = req.params.id;
    await Pedido.findByIdAndRemove(pedidoId);
    res.json({ message: 'Pedido eliminado con éxito' });
});

  
