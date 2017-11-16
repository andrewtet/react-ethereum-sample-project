pragma solidity ^0.4.11;

contract ReactExample {
    address private owner;
    string public you_awesome;
    string private secret;
    string private state;
    bool public psudeoRandomResult;
    event ExperimentComplete (bool result);
    
    function ReactExample() public {
        owner = msg.sender;
        you_awesome = "You are awesome!";
        secret = "Initial Secret";
        state = "Initial State";
    }
    
    // Secret functions
    function getSecret() public view returns (string) {
        return secret;
    }
    
    // State functions
    function getState() public view returns (string) {
        return state;
    }
    
    function setState(string newState) public payable {
        state = newState;
    }
    
    function kill() public {
        require(msg.sender == owner);
        selfdestruct(owner);
    }
    
    function setExperimentInMotion() public payable returns (bool) {
        bytes32 _psudeoRandomResult = keccak256(msg.sender, msg.data, msg.value);
        if (_psudeoRandomResult < bytes32(10)) psudeoRandomResult = true;
        else psudeoRandomResult = false;
        
        ExperimentComplete(psudeoRandomResult);
    }
    
    function () public payable {
        revert();
    }
}