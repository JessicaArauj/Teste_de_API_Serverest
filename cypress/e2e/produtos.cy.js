/// <reference types = "cypress" />

describe('Teste da Funcionalidade Produtos', () => {

    let token
    before(() => {
        cy.request('fulano@qa.com', 'teste').then(tkn => {token = tkn})
    });

    it('Listar Produtos', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/produtos',
        }).then((response) => {
            expect(response.body.produtos[1].nome).to.equal('Samsung 60 polegadas')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
            expect(response.duration).to.be.lessThan(15)
        })


    });

    it.only('Cadastrar Produto', () => {
        let produto = `Produto EBAC ${Math.floor(Math.random() * 100000000000)}`
        cy.request({
            method: 'POST',
            url: 'produto',
            body: {
            
                "nome": produto,
                "preco": 70,
                "descricao": "Adaptador",
                "quantidade": 50
              },
            headers: {authorization: 'token'}
            
        }).then((response) => {
        expect(response.status).to.equal(201)
        expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    });

});
});