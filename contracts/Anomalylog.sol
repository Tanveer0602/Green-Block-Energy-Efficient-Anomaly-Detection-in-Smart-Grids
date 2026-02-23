// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AnomalyLog {

    struct Anomaly {
        string meterId;
        string anomalyType;
        uint timestamp;
    }

    Anomaly[] public anomalies;

    function storeAnomaly(string memory _meterId, string memory _type) public {
        anomalies.push(Anomaly(_meterId, _type, block.timestamp));
    }

    function getCount() public view returns (uint) {
        return anomalies.length;
    }
}
