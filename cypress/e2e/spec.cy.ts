import { textInputFieldErrorTestId, textInputFieldInputTestId } from '../../app/src/components/textInputFieldTestIds';

describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/');

    clickSubmitButton();

    getFirstNameError().should('contain.text', 'Please enter your first name');

    getLastNameError().should('contain.text', 'Please enter your last name');

    getFirstNameInput().type('Alex');
    getFirstNameError().should('not.exist');

    getLastNameInput().type('Potter');
    getLastNameError().should('not.exist');

    clickSubmitButton();

    getSubmitButton().should('be.disabled');
    getFirstNameInput().should('be.disabled');
    getLastNameInput().should('be.disabled');

    cy.wait(500);

    getSubmitButton().should('not.be.disabled');
    getFirstNameInput().should('not.be.disabled');
    getLastNameInput().should('not.be.disabled');
  });
});

const getByTestId = (testId: string) => cy.get(`[data-testid="${testId}"]`);

const fieldNames = {
  firstName: 'firstName',
  lastName: 'lastName',
};

const getSubmitButton = () => cy.contains('Submit');

const clickSubmitButton = () => getSubmitButton().click();

const getFirstNameInput = () => getByTestId(textInputFieldInputTestId(fieldNames.firstName));

const getFirstNameError = () => getByTestId(textInputFieldErrorTestId(fieldNames.firstName));

const getLastNameInput = () => getByTestId(textInputFieldInputTestId(fieldNames.lastName));

const getLastNameError = () => getByTestId(textInputFieldErrorTestId(fieldNames.lastName));
