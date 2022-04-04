const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');

const SaleModel = require('../../../models/salesModels');

describe('salesModels', () => {
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
      }
    ];

    before(async () => {
      const execute = [getAllSale];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await SaleModel.getAll();
      expect(response).to.be.a('array')
    });

    it('tal array de objetos possui "productId" como propriedade', async () => {
      const response = await SaleModel.getAll();
      response.forEach((e) => expect(e).to.have.a.property('productId'));
    });
  });

  describe('verifica função GetById se a venda é requirida de  acordo com o id', () => {
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

    before(async () => {
      const execute = [getByIdSale];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await SaleModel.getById(1);
      expect(response).to.be.a('array')
    });

    it('tal array de objetos possui "date" como propriedade', async () => {
      const response = await SaleModel.getById(1);
      response.forEach((e) => expect(e).to.have.a.property('date'));
    });
  });

  describe('verifica função Update se venda é editada com sucesso', () => {
    const updateSales = [
        {
          "productId": 1,
          "quantity": 6
        }
      ];

    before(async () => {
      sinon.stub(connection, 'execute').resolves();
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SaleModel.update(1, updateSales);
      console.log(response);
      expect(response).to.be.an('object');
    });

    it('tal objeto possui o "itemUpdated" como propriedade', async () => {
      const response = await SaleModel.update(1, updateSales);
      expect(response).to.have.a.property('itemUpdated')
    });
  });

  describe('verifica função create realizada com sucesso', () => {
    const createSale = [
      {
        "productId": 1,
        "quantity": 3
      }
    ];

      before(async () => {
        const execute = [[{ insertId: 2 }]];
        sinon.stub(connection, 'execute').resolves(execute);
      });
    
      after(async () => {
        connection.execute.restore();
      });

      it('retorna um objeto', async () => {
        const response = await SaleModel.create(createSale);
        expect(response).to.be.an('object');
      });

      it('retorna um objeto com o "id" da venda criada', async () => {
        const response = await SaleModel.create(createSale);
        expect(response).to.have.a.property('id');
      });
    });

});