var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var rndName = require('rnd.name');

var lastCreep = 0;
/*
Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], "name",{memory: {role: "harvester"}} )
*/
module.exports.loop = function () {
    
    
    if(Game.spawns['Spawn1'].energy>=300 && Object.keys(Game.creeps).length <= 8){
        var name;
        var role;
        switch (lastCreep) {
            case 0:
                name = 'Harvester' + ' ' + rndName.get();
                role = 'harvester';
                lastCreep = 1;
                break;
        
            case 1:
                name = 'Builder' + ' ' + rndName.get();
                role = 'builder';
                lastCreep = 2;
                break;
        
            case 2:
                name = 'Upgrader' + ' ' + rndName.get();
                role = 'upgrader';
                lastCreep = 0;
                break;
        
            default:
                break;
        }
        Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], name,
            { 
                memory: {
                    role: role 
                }
            } 
            );
    }else if(Object.keys(Game.creeps).length >= 8){
        //Apagar Robos mortos
        for(var i in Memory.creeps) {
            if(!Game.creeps[i] || Game.creeps[i].ticksToLive < 2) {
                delete Memory.creeps[i];
            }
        }
    }

    console.log("SPAWN",Game.spawns['Spawn1'].energy,Object.keys(Game.creeps).length)
    for(var name in Game.creeps) {
        console.log(name+" "+Game.creeps[name].ticksToLive);
        
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            //roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            //roleBuilder.run(creep);
        }
    }
}