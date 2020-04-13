const covid19ImpactEstimator = (data) => {
    const {reportedCases, timeToElapse, periodTime, totalHospotalBeds
} = data;
    const {avgDailyIncomeInUSD, avgDailyIncomePopulation 
} = data.region;


//get the factor
let estimate;
    if (periodType === 'months') {
      estimate = Math.ceil(timeToElapse * 30);
    } else if (periodType === 'weeks') {
      estimate = timeToElapse * 7;
    } else {
      estimate = timeToElapse;
    }
    const factor = Math.trunc(estimate / 3);
    const result = 2 ** factor;

    const impact = {};
    const severeImpact = {};

    const casesOf = (cases, num) => cases * num;
    impact.currentlyInfected = casesOf(reportedCases, 10);
    impact.infectionsByRequestedTime = casesOf(impact.currentlyInfected, result);
    
    let severeCases = casesOf(impact.infectionsByRequestedTime, 0.15);
    severeCases = Math.trunc(severeCases);
  

    const casesForICU = casesOf(impact.infectionsByRequestedTime, 0.05);
  

    const casesForVentilators = casesOf(impact.infectionsByRequestedTime, 0.02);
  

    const populationIncome = avgDailyIncomePopulation * avgDailyIncomeInUSD;
    const moneyLoss = (impact.infectionsByRequestedTime * populationIncome) / estimate;
  

    let hospitalBeds = casesOf(totalHospitalBeds, 0.35);
    hospitalBeds = Math.trunc(hospitalBeds - severeCases);
  

    impact.severeCasesByRequestedTime = severeCases;
    impact.hospitalBedsByRequestedTime = hospitalBeds;
    impact.casesForICUByRequestedTime = Math.trunc(casesForICU);
    impact.casesForVentilatorsByRequestedTime = Math.trunc(casesForVentilators);
    impact.dollarsInFlight = Math.trunc(moneyLoss);
    
    
    
    severeImpact.currentlyInfected = casesOf(reportedCases, 50);
    severeImpact.infectionsByRequestedTime = casesOf(
      severeImpact.currentlyInfected,
      result
    );
  

    let severeImpactCases = casesOf(
      severeImpact.infectionsByRequestedTime,
      0.15
    );
    severeImpactCases = Math.trunc(severeImpactCases);
    const severeCasesForICU = casesOf(
      severeImpact.infectionsByRequestedTime,
      0.05
    );
  
    const severeCasesForVentilators = casesOf(
      severeImpact.infectionsByRequestedTime,
      0.02
    );
  
    const severePopIncome = avgDailyIncomePopulation * avgDailyIncomeInUSD;
    const severeMoneyLoss = (severeImpact.infectionsByRequestedTime * severePopIncome) / estimate;
  
    let severeImpactHospitalBeds = casesOf(totalHospitalBeds, 0.35);
    severeImpactHospitalBeds = Math.trunc(
      severeImpactHospitalBeds - severeImpactCases
    );
    severeImpact.severeCasesByRequestedTime = severeImpactCases;
    severeImpact.hospitalBedsByRequestedTime = severeImpactHospitalBeds;
    severeImpact.casesForICUByRequestedTime = Math.trunc(severeCasesForICU);
    severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(severeCasesForVentilators);
    severeImpact.dollarsInFlight = Math.trunc(severeMoneyLoss);
  

    return { data, impact, severeImpact };
  };
  

  module.exports = covid19ImpactEstimator;


