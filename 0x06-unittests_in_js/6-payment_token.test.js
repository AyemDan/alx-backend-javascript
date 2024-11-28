const { expect } = require('chai');
const getPaymentTokenFromAPI = require('./6-payment_token');

describe('getPaymentTokenFromAPI', () => {
  it('should return a resolved promise with data when success is true', (done) => {
    getPaymentTokenFromAPI(true)
      .then((response) => {
        expect(response).to.deep.equal({ data: 'Successful response from the API' });

        done();
      })
      .catch(done);
  });

  it('should do nothing when success is false', (done) => {
    // Call the function with success = false
    getPaymentTokenFromAPI(false)
      .then((response) => {
        expect(response).to.be.undefined;

        // Call done to signal that the test is complete
        done();
      })
      .catch(done);
  });
});
