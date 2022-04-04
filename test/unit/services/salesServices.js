const sinon = require('sinon');
const { expect } = require('chai');

const SaleModel = require('../../../models/salesModels');
const SaleService = require('../../../services/salesServices');

describe('SalesService', () => {
  describe('verifica função GetAll se a venda retorna com sucesso', () => {
    const getAllSale = [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      },
    ];

    before(async () => {
      const execute = getAllSale;
      sinon.stub(SaleModel, 'getAll').resolves(execute);
    });

    after(async () => {
      SaleModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const response = await SaleService.getAll();
      expect(response).to.be.a('array')
    });

    it('tal array de objetos possui "saleId" como propriedade', async () => {
      const response = await SaleService.getAll();
      response.forEach((e) => expect(e).to.have.a.property('saleId'));
    });
  });

  describe('verifica função GetById se a venda retorna com sucesso', () => {
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
    ];

    before(async () => {
      const execute = getByIdSale;
      sinon.stub(SaleModel, 'getById').resolves(execute);
    });

    after(async () => {
      SaleModel.getById.restore();
    });

    it('retorna um array', async () => {
      const response = await SaleService.getById(1);
      expect(response).to.be.an('array')
    });

    it('tal array de objetos possui "productId" como propriedade', async () => {
      const response = await SaleService.getById(1);
      response.forEach((e) => expect(e).to.have.a.property('productId'));
    });
  });

  describe('verifica função Update se a venda é editada com sucesso', () => {
    const updateSale = {
      "saleId": 1,
      "itemUpdated": [
        {
          "productId": 1,
          "quantity": 6
        }
      ]
    }

    before(async () => {
      const execute = updateSale;
      sinon.stub(SaleModel, 'update').resolves(execute);
    });

    after(async () => {
      SaleModel.update.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SaleService.update(updateSale);
      expect(response).to.be.an('object')
    });

    it('tal objeto possui o "itemUpdated" como propriedade', async () => {
      const response = await SaleService.update(updateSale);
      expect(response).to.have.a.property('itemUpdated')
    });
  });

  describe('verifica função Crete se venda é inserida com sucesso', () => {
    const createSale = {
      "id": 1,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 3
        },
      ],
    };

    const paramsCreateSale = [
      {
        "productId": 1,
        "quantity": 3
      },
    ];

    before(async () => {
      const execute = createSale;
      sinon.stub(SaleModel, 'create').resolves(execute);
    });

    after(async () => {
      SaleModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SaleService.create(paramsCreateSale);
      expect(response).to.be.an('object')
    });

    it('tal objeto possui o "itemsSold" como chave', async () => {
      const response = await SaleService.create(paramsCreateSale);
      expect(response).to.have.a.property('itemsSold')
    });
  });

});