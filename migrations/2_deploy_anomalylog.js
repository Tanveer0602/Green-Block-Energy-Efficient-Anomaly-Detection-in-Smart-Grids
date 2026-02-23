const AnomalyLog = artifacts.require("AnomalyLog");

module.exports = function (deployer) {
    deployer.deploy(AnomalyLog);
};
