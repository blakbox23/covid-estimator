const covid19ImpactEstimator = (data) => (
    {
        data,
        impact: {
            currentlyInfected: data.reportedCases*10,
            infectionsByRequestedTime: currentlyInfected*1024
        },
        servereImpact: {
            currentlyInfected: data.reportedCases*50,
            infectionsByRequestedTime: this.currentlyInfected*1024
        }
    }
)


export default covid19ImpactEstimator;
