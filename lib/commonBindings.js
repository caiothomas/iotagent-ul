/*
 * Copyright 2016 Telefonica Investigación y Desarrollo, S.A.U
 *
 * This file is part of iotagent-ul
 *
 * iotagent-ul is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * iotagent-ul is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with iotagent-ul.
 * If not, seehttp://www.gnu.org/licenses/.
 *
 * For those usages not covered by the GNU Affero General Public License
 * please contact with::[iot_support@tid.es]
 */

'use strict';

var iotAgentLib = require('iotagent-node-lib'),
    config = require('./configService'),
    constants = require('./constants');

/**
 * Find the attribute given by its name between all the active attributes of the given device, returning its type, or
 * null otherwise.
 *
 * @param {String} attribute        Name of the attribute to find.
 * @param {Object} device           Device object containing all the information about a device.
 * @return {String}                 String identifier of the attribute type.
 */
function guessType(attribute, device) {
    for (var i = 0; i < device.active.length; i++) {
        if (device.active[i].name === attribute) {
            return device.active[i].type;
        }
    }

    if (attribute === constants.TIMESTAMP_ATTRIBUTE) {
        return constants.TIMESTAMP_TYPE;
    } else {
        return constants.DEFAULT_ATTRIBUTE_TYPE;
    }
}

function processMeasureGroup(device, apikey, previous, current, index) {
    var values = [];

    if (current.command) {
        previous.push(iotAgentLib.setCommandResult.bind(null,
            device.name,
            config.getConfig().iota.defaultResource,
            apikey,
            current.command,
            current.value,
            constants.COMMAND_STATUS_COMPLETED,
            device
        ));
    } else {
        for (var i in current) {
            if (current.hasOwnProperty(i)) {
                values.push({
                    name: i,
                    type: guessType(i, device),
                    value: current[i]
                });
            }
        }

//        previous.push(iotAgentLib.update.bind(null, device.name, device.type, '', values, device));
        previous.push(iotAgentLib.update.bind(null, device.name, device.service, device.subservice, values, device));
        
    }

    return previous;
}

exports.processMeasureGroup = processMeasureGroup;
exports.guessType = guessType;
