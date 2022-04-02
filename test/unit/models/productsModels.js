const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');

const ProductModel = require('../../../models/productsModels');

describe('ProductModel', () => {
  describe('verifica função GelAll se produto retorna com sucesso', () => {
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
      const execute = [getAllProduct];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await ProductModel.getAll();
      expect(response).to.be.a('array')
    });

    it('tal array de objetos possui "name" como propriedade', async () => {
      const response = await ProductModel.getAll();
      response.forEach((e) => expect(e).to.have.a.property('name'));
    });
  });

  describe('verifica função GetById se a venda é requirida de  acordo com o id', () => {
    const getByIdProduct = {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    }

    before(async () => {
      const execute = [getByIdProduct];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductModel.getById(1);
      expect(response).to.be.a('object')
    });

    it('tal array de objetos possui "name" como propriedade', async () => {
      const response = await ProductModel.getById(1);
      expect(response).to.have.a.property('name');
    });
  });

  describe('verifica função GetByName se a venda é requirida de  acordo com o id', () => {
    const getByIdProduct = {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    }

    before(async () => {
      const execute = [getByIdProduct];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductModel.getByName('produto A');
      expect(response).to.be.a('object')
    });

    it('tal array de objetos possui "name" como propriedade', async () => {
      const response = await ProductModel.getByName('produto A');
      expect(response).to.have.a.property('name');
    });
  });

  describe('verifica função Create se produto quando é inserido com sucesso', () => {
    const createProduct = {
      name: "produto A",
      quantity: 10
    }

    before(async () => {
      const execute = [{ insertId: 1 }];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductModel.create(createProduct);
      expect(response).to.be.a('object')
    });

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await ProductModel.create(createProduct);
      expect(response).to.have.a.property('id')
    });
  });

  describe('verifica função Update se produto é editado com sucesso', () => {
    const updateProduct = {
      id: 1,
      name: "produto",
      quantity: 15,
    };

    before(async () => {
      const execute = updateProduct;
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductModel.update(updateProduct);
      expect(response).to.be.an('object')
    });

    it('tal objeto possui o "quantity" como propriedade', async () => {
      const response = await ProductModel.update(updateProduct);
      expect(response).to.have.a.property('quantity')
    });
  });
});