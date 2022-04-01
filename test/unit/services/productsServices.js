const sinon = require('sinon');
const { expect } = require('chai');

const ProductModel = require('../../../models/productsModels');
const ProductService = require('../../../services/productsServices');

describe('verifica se produto é inserido com sucesso', () => {
  const createProduct = {
    id: 1,
    name: "produto A",
    quantity: 10
  }

  before(async () => {
    const executeName = [];
    sinon.stub(ProductModel, 'getByName').resolves(executeName);

    const execute = createProduct;
    sinon.stub(ProductModel, 'create').resolves(execute);
  });

  after(async () => {
    ProductModel.getByName.restore();
    ProductModel.create.restore();
  });

  it('retorna um objeto', async () => {
    const response = await ProductService.create({ name: "produto A", quantity: 10 });
    expect(response).to.be.an('object')
  });

  it('tal objeto possui o "id" do novo produto inserido', async () => {
    const response = await ProductService.create(createProduct);
    expect(response).to.have.a.property('id')
  });
});

describe('verifica se produto retorna com sucesso', () => {
  const getAllProduct = [
    {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    },
    {
      "id": 2,
      "name": "produto B",
      "quantity": 20
    }
  ];

  before(async () => {
    const execute = getAllProduct;
    sinon.stub(ProductModel, 'getAll').resolves(execute);
  });

  after(async () => {
    ProductModel.getAll.restore();
  });

  it('retorna um array', async () => {
    const response = await ProductService.getAll();
    expect(response).to.be.a('array')
  });

  it('tal array de objetos possui "name" como propriedade', async () => {
    const response = await ProductService.getAll();
    response.forEach((e) => expect(e).to.have.a.property('name'));
  });
});

describe('verifica se produto é editado com sucesso', () => {
  const updateProduct =  {
    id: 1,
    name: "serviço",
    quantity: 15,
  };

  before(async () => {
    const executeId = [updateProduct];
    sinon.stub(ProductModel, 'getById').resolves(executeId);
    
    const execute = updateProduct;
    sinon.stub(ProductModel, 'update').resolves(execute);
  });

  after(async () => {
    ProductModel.getById.restore();
    ProductModel.update.restore();
  });

  it('retorna um objeto', async () => {
    const response = await ProductService.update(updateProduct);
    expect(response).to.be.an('object')
  });

  it('tal objeto possui o "quantity" como propriedade', async () => {
    const response = await ProductService.update(updateProduct);
    expect(response).to.have.a.property('quantity')
  });
});