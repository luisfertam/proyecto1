//1
app.post('/productos', async (req, res) => {
    const productoData = req.body;
    const nuevoProducto = new Producto(productoData);
    await nuevoProducto.save();
    res.json(nuevoProducto);
});
  

//2
app.get('/productos/:id', async (req, res) => {
    const productoId = req.params.id;
    const producto = await Producto.findById(productoId);
    res.json(producto);
});
  

//3
app.get('/productos', async (req, res) => {
    const { restauranteId, categoria } = req.query;
    const productos = await Producto.find({
      restaurante: restauranteId,
      categoria: { $regex: categoria, $options: 'i' },
    });
    res.json(productos);
});

  
//4
app.put('/productos/:id', async (req, res) => {
    const productoId = req.params.id;
    const newData = req.body;
    const productoActualizado = await Producto.findByIdAndUpdate(productoId, newData, { new: true });
    res.json(productoActualizado);
});

  
//5
app.delete('/productos/:id', async (req, res) => {
    const productoId = req.params.id;
    await Producto.findByIdAndRemove(productoId);
    res.json({ message: 'Producto eliminado con éxito' });
});

  