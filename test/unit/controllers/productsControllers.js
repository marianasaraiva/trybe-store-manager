const sinon = require('sinon');
const { expect } = require('chai');

const ProductService = require('../../../services/productsServices');
const ProductController = require('../../../controllers/productsControllers');

describe('ProductController', () => {
  const response = {};
  const request = {};

  describe('Verifica se a função getAll está retornando com erros quando não retornar produtos', () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductService, 'getAll').resolves(false);
    });

    after(async () => {
      ProductService.getAll.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await ProductController.getAll(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Nenhum produto retornado"', async () => {
      await ProductController.getAll(request, response);
      expect(response.json.calledWith({ message: 'Nenhum produto retornado' })).to.be.equal(true);
    });
  });

  describe('Verifica se a função getAll está retornando com sucesso os produtos', () => {
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

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductService, 'getAll').resolves(getAllProduct);
    });

    after(async () => {
      ProductService.getAll.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await ProductController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com o array', async () => {
      await ProductController.getAll(request, response);
      expect(response.json.calledWith(getAllProduct)).to.be.equal(true);
    });
  });

  describe('Verifica se a função getById está retornando com erro ao selecionar produto não cadastrado', () => {
    request.params = {
      id: 1
    };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductService, 'getById').resolves(null);
    });

    after(async () => {
      ProductService.getById.restore();
    });

    it('controller getById é chamado o status com o código 404', async () => {
      await ProductController.getById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('controller getById é chamado o json retorna Mensagem de erro', async () => {
      await ProductController.getById(request, response);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  });

  describe('Verifica se a função getById está retornando com sucesso o produto selecionado', () => {
    request.params = {
      id: 1
    };

    const getById = {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductService, 'getById').resolves(getById);
    });

    after(async () => {
      ProductService.getById.restore();
    });

    it('controller getById é chamado o status com o código 200', async () => {
      await ProductController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('controller getById é chamado o json retorna objeto', async () => {
      await ProductController.getById(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe('Verifica se a função Create está adicionado novos produtos', () => {
    request.body = { name: "produto", quantity: 15 };
    const createReturnProducts = { id: 1, name: "produto", quantity: 15 };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductService, 'create').resolves(createReturnProducts);
    });

    after(async () => {
      ProductService.create.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await ProductController.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com o objeto', async () => {
      await ProductController.create(request, response);
      expect(response.json.calledWith(createReturnProducts)).to.be.equal(true);
    });
  });

  describe('Verifica se a função Update está atualizando os produtos', () => {
    request.body = { name: "produto", quantity: 15 };
    request.params = { id: 1 };
    const updateProducts = { id: 1, name: "produto", quantity: 15 };
  

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductService, 'update').resolves(updateProducts);
    });

    after(async () => {
      ProductService.update.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await ProductController.update(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com o objeto', async () => {
      await ProductController.update(request, response);
      expect(response.json.calledWith(updateProducts)).to.be.equal(true);
    });
  });

});