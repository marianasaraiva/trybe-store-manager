const sinon = require('sinon');
const { expect } = require('chai');

const SaleService = require('../../../services/salesServices');
const SaleController = require('../../../controllers/salesControllers');

describe('SaleController', () => {
  const response = {};
  const request = {};

  describe('Verifica se a função getAll está sinalizando sale não encontrada', () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SaleService, 'getAll').resolves(false);
    });

    after(async () => {
      SaleService.getAll.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await SaleController.getAll(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Nenhuma sale retornada"', async () => {
      await SaleController.getAll(request, response);
      expect(response.json.calledWith({ message: 'Nenhuma sale retornada' })).to.be.equal(true);
    });
  });

  describe('Verifica se a função getAll está retornando com sucesso as vendas', () => {
    const getAllSale = [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ]

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SaleService, 'getAll').resolves(getAllSale);
    });

    after(async () => {
      SaleService.getAll.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await SaleController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com o array', async () => {
      await SaleController.getAll(request, response);
      expect(response.json.calledWith(getAllSale)).to.be.equal(true);
    });
  });

  describe('Verifica se a função getById está retornando com erro ao selecionar sale não cadastrado', () => {
    request.params = {
      id: 1
    };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SaleService, 'getById').resolves(null);
    });

    after(async () => {
      SaleService.getById.restore();
    });

    it('controller getById é chamado o status com o código 404', async () => {
      await SaleController.getById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });

  describe('Verifica se a função getById está retornando com sucesso a sale selecionado', () => {
    request.params = {
      id: 1
    };

    const getByIdSale = [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ]

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SaleService, 'getById').resolves(getByIdSale);
    });

    after(async () => {
      SaleService.getById.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await SaleController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json retorna array', async () => {
      await SaleController.getById(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Verifica se a função Create está adicionado novas vendas', () => {
    request.body = [
      {
        "productId": 1,
        "quantity": 3
      }
    ];

    const createSale = {
      "id": 1,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 3
        }
      ]
    }

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SaleService, 'create').resolves(createSale);
    });

    after(async () => {
      SaleService.create.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await SaleController.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com o objeto', async () => {
      await SaleController.create(request, response);
      expect(response.json.calledWith(createSale)).to.be.equal(true);
    });
  });

  describe('Verifica se a função Update está atualizando novas vendas', () => {
    request.body = [
      {
        "productId": 1,
        "quantity": 6
      }
    ];

    request.params = { id: 1 };

    const updateSales = {
      "saleId": 1,
      "itemUpdated": [
        {
          "productId": 1,
          "quantity": 6
        }
      ]
    }

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SaleService, 'update').resolves(updateSales);
    });

    after(async () => {
      SaleService.update.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await SaleController.update(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com o objeto', async () => {
      await SaleController.update(request, response);
      expect(response.json.calledWith(updateSales)).to.be.equal(true);
    });
  });

});