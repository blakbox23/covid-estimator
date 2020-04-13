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
    impact.currentlyInfected = getCases(reportedCases, 10);
    impact.infectionsByRequestedTime = getCases(impact.currentlyInfected, result);
  



export default covid19ImpactEstimator;
