const MortgageAPI = {
  calculateMortgage({ loanAmount, interestRate, loanTerm, propertyTax = 0, insurance = 0, otherCosts = 0 }) {
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPI =
      monthlyRate === 0
        ? loanAmount / numberOfPayments
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const monthlyTax = propertyTax ? propertyTax / 12 : 0;
    const monthlyInsurance = insurance ? insurance / 12 : 0;
    const monthlyOther = otherCosts ? otherCosts / 12 : 0;
    const totalMonthlyPayment = monthlyPI + monthlyTax + monthlyInsurance + monthlyOther;
    const totalPayment = totalMonthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    return {
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      monthlyOther,
      totalMonthlyPayment,
      totalPayment,
      totalInterest
    };
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("mortgage-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Read values
    const loanAmount = parseFloat(document.getElementById("loan-amount").value);
    const interestRate = parseFloat(document.getElementById("interest-rate").value);
    const loanTerm = parseFloat(document.getElementById("loan-term").value);
    const propertyTax = parseFloat(document.getElementById("property-tax").value) || 0;
    const insurance = parseFloat(document.getElementById("insurance").value) || 0;
    const otherCosts = parseFloat(document.getElementById("other-costs").value) || 0;

    const result = MortgageAPI.calculateMortgage({
      loanAmount,
      interestRate,
      loanTerm,
      propertyTax,
      insurance,
      otherCosts
    });

    document.getElementById("monthly-pi").textContent = result.monthlyPI.toFixed(2);
    document.getElementById("monthly-tax").textContent = result.monthlyTax.toFixed(2);
    document.getElementById("monthly-insurance").textContent = result.monthlyInsurance.toFixed(2);
    document.getElementById("monthly-other").textContent = result.monthlyOther.toFixed(2);
    document.getElementById("monthly-total").textContent = result.totalMonthlyPayment.toFixed(2);
    document.getElementById("total-payment").textContent = result.totalPayment.toFixed(2);
    document.getElementById("total-interest").textContent = result.totalInterest.toFixed(2);
  });
});
