describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Sami Kukkonen',
      username: 'samik',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('samik')
      cy.get('#password').type('salainen')
      cy.contains('login').click()
      cy.contains('logout').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrongUser')
      cy.get('#password').type('salainen')
      cy.contains('login').click()
      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('samik')
      cy.get('#password').type('salainen')
      cy.contains('login').click()
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('test 1')
      cy.get('#author').type('tester 1')
      cy.get('#url').type('test/1.com')
      cy.get('#create-button').click()
      cy.contains('test 1')
      cy.contains('tester 1')

    })
  })
  describe('When logged in and blog created', function () {
    beforeEach(function () {
      cy.get('#username').type('samik')
      cy.get('#password').type('salainen')
      cy.contains('login').click()
      cy.contains('new blog').click()
      cy.get('#title').type('test 1')
      cy.get('#author').type('tester 1')
      cy.get('#url').type('test/1.com')
      cy.get('#create-button').click()
    })
    it('The blog can be liked', function () {
      cy.contains('view').click()
      cy.contains('like').click()
    })
    it('The blog can be deleted', function () {
      cy.contains('view').click()
      cy.contains('remove').click()
    })
    it.only('The blogs are sorted by likes', function () {
      cy.contains('test 1').as('blog1')
      cy.get('#create-blog').click()
      cy.get('#title').type('test 2')
      cy.get('#author').type('tester 2')
      cy.get('#url').type('test/2.com')
      cy.get('#create-button').click()
      cy.contains('test 2').as('blog2')
      cy.wait(2000)

      cy.get('@blog1').contains('view').click()
      cy.get('@blog1').contains('like').as('like1').click().wait(500).click()

      cy.get('@blog2').contains('view').click()
      cy.get('@blog2').contains('like').as('like2').click().wait(500).click().wait(500).click().wait(500).click()

      cy.get(".blog").eq(0).should("contain", "test 2");
    })

  })
})