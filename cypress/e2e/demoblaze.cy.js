describe('Demoblaze Tests', () => {
    let randomUsername;
    let randomPassword;
    const demoUser = 'arbuz123';
    const demoPassword = 'testPa$$word123';
  
    beforeEach(() => {
      cy.visit('https://www.demoblaze.com/');
    });
  
    describe('User Registration and Login', () => {
      it('Registers a new user with random credentials', () => {
        // Generate random username and password
        randomUsername = `ilosc_ananasow_${Math.random().toString(36).substring(2, 8)}`;
        randomPassword = `pass_${Math.random().toString(36).substring(2, 8)}`;
  
        // Click the sign up button
        cy.get('#signin2').should('be.visible').click();
        cy.get('#signInModal').should('be.visible'); // Verify the sign-up modal is visible

        // Add a short wait to ensure the input fields are ready
        cy.wait(500); 

        // Fill out the registration form with a delay between keystrokes
        cy.get('#sign-username').type(randomUsername, { delay: 100 });
        cy.get('#sign-password').type(randomPassword, { delay: 100 });
        cy.get('button[onclick="register()"]').click();

        // Verify registration success
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Sign up successful.');
        });
    });
  
      it('Logs in with valid credentials', () => {
        // Click the login button
        cy.get('#login2').click();
  
        // Fill out the login form with fixed demo credentials
        cy.get('#loginusername').clear().type(demoUser);
  
        // Ensure the password field is visible and focused before typing
        cy.get('#loginpassword')
          .should('be.visible')
          .click()
          .clear()
          .type(demoPassword, { delay: 100 });
  
        // Click the login button
        cy.get('button[onclick="logIn()"]').click();
  
        // Verify login success by checking for the user's name or logout button
        cy.get('#nameofuser', { timeout: 10000 }).should('be.visible');
      });
  
      it('Adds Samsung Galaxy S6 to the cart', () => {
        // Ensure the user is logged in before adding items to the cart
        cy.get('#login2').click();
        cy.get('#loginusername').clear().type(demoUser);
        cy.get('#loginpassword')
          .should('be.visible')
          .click()
          .clear()
          .type(demoPassword, { delay: 100 });
      
        cy.get('button[onclick="logIn()"]').click();
      
        // Verify login success
        cy.get('a#logout2.nav-link').should('be.visible');
      
        // Navigate to the Samsung Galaxy S6 product page
        cy.contains('Samsung galaxy s6').click();
      
        // Add to cart
        cy.contains('Add to cart').click();
        cy.on('window:alert', (str) => {
          expect(str).to.equal('Product added.');
        });
      
        // Directly navigate to the cart page
        cy.visit('https://www.demoblaze.com/cart.html');
      
        // Assert that the URL is correct
        cy.url().should('include', '/cart.html');
      
        // Wait for the product to appear in the cart
        cy.contains('Samsung galaxy s6', { timeout: 10000 }).should('be.visible');
      });      
    });
  });
  