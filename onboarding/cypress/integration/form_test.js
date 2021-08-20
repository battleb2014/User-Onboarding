describe('Onboarding App', () => {

    beforeEach(() => {
        cy.visit( 'http://localhost:3000' )
    })

    const nameInput = () => cy.get( 'input[ name = name ]' )
    const emailInput = () => cy.get( 'input[ name = email ]' )
    const passwordInput = () => cy.get( 'input[ name = password ]' )
    const foobarInput = () => cy.get('input[name=foobar]')
    const termsCheckbox = () => cy.get( 'input[ name = terms ]' )
    const submitBtn = () => cy.get( 'button' )

    it('Make sure tests work', () => {
        expect(1+1).to.equal(2)
        expect(5*5).to.equal(25)
    })

    it('The proper elements are showing', () => {
        nameInput().should( 'exist' )
        emailInput().should( 'exist' )
        passwordInput().should( 'exist' )
        foobarInput().should( 'not.exist' )
        termsCheckbox().should( 'exist' )
        submitBtn().should( 'exist' )
    })

    describe('Filling in the inputs', () => {

        it('Can navigate to the site', () => {
            cy.url().should('include', 'localhost')
        })
        
        it('Submit button starts out disabled', () => {
            submitBtn().should( 'be.disabled' )
        })

        it('Can type in the inputs', () => {
            nameInput()
                .should( 'have.value', '' )
                .type( 'Carmen' )
                .should( 'have.value', 'Carmen' )

            emailInput()
            .should( 'have.value', '' )
            .type( 'abcdefg@123.com' )
            .should( 'have.value', 'abcdefg@123.com' )

            passwordInput()
                .should( 'have.value', '' )
                .type( '123456789' )
                .should( 'have.value', '123456789' )
        })

        it('Can check the checkbox', () => {
            termsCheckbox()
                .should( 'not.be.checked' )
                .check()
                .should( 'be.checked' )
        })
        
    })

    describe('Can submit form', () => {

        it('Fill in data, check the box, and submit', () => {
            nameInput().type( 'Carmen' )

            emailInput().type( 'abcdefg@123.com' )

            passwordInput().type( '123456789' )

            termsCheckbox().check()

            submitBtn().click()

            cy.contains( 'Carmen' )
            cy.contains( 'abcdefg@123.com' )
            cy.contains( '123456789' )
        })

    })

})