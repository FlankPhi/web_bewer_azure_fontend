console.log('Running script to establish conection with ROS');
// Connecting to ROS
// -----------------

var ros = new ROSLIB.Ros({
    url : 'ws://192.168.1.41:9090'
});

ros.on('connection', function() {
    console.log('Connected to websocket server.');
});

ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
    console.log('Connection to websocket server closed.');
});

// Setup subs
/* Template
var listener_search = new ROSLIB.Topic({
    ros : ros,
    name : '/search_started',
    messageType : 'std_msgs/Bool'
});
listener_search.subscribe(function(message) {
    console.log('Received message on ' + listener.name + ': ' + message.data);
    window.location =  '/diag_conole.html?task=product search&ID=' + sel_config;
});
*/

let pot_temperature = new ROSLIB.Topic({
    ros : ros,
    name : '/t1',
    messageType : 'std_msgs/Float32'
});

let amb_temperature = new ROSLIB.Topic({
    ros : ros,
    name : '/t2',
    messageType : 'std_msgs/Float32'
});

let setpoint = new ROSLIB.Topic({
    ros : ros,
    name : '/sp',
    messageType : 'std_msgs/Float32'
});

let u_setpoint = new ROSLIB.Topic({
    ros : ros,
    name : '/user/sp',
    messageType : 'std_msgs/Float32'
});
u_setpoint.advertise();

let power = new ROSLIB.Topic({
    ros : ros,
    name : '/pow',
    messageType : 'std_msgs/UInt8'
});


pot_temperature.subscribe(function(message) {
    console.log('Received message on ' + pot_temperature.name + ': ' + message.data);
    document.getElementById('btemp').innerHTML =  parseFloat( message.data).toFixed(2);
});

amb_temperature.subscribe(function(message) {
    console.log('Received message on ' + pot_temperature.name + ': ' + message.data);
    document.getElementById('atemp').innerHTML =  parseFloat( message.data).toFixed(2);
});

setpoint.subscribe(function(message) {
    console.log('Received message on ' + setpoint.name + ': ' + message.data);
    document.getElementById('stemp').innerHTML =  message.data;
});

power.subscribe(function(message) {
    console.log('Received message on ' + power.name + ': ' + message.data);
    document.getElementById('pow').innerHTML =  message.data;
});

function commit() {
    var sp =  Number(document.getElementById('settemp').getAttribute('value'));
    console.log(sp);
    u_setpoint.publish(new ROSLIB.Message({data:sp}));
}
function add() {
    var sp =  document.getElementById('settemp').getAttribute('value');
    document.getElementById('settemp').setAttribute('value', ++sp);
}
function sub() {
    var sp =  document.getElementById('settemp').getAttribute('value');
    document.getElementById('settemp').setAttribute('value', --sp);
}