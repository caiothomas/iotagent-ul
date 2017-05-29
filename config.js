/*
 * Copyright 2015 Telefonica Investigación y Desarrollo, S.A.U
 *
 * This file is part of iotagent-mqtt
 *
 * iotagent-mqtt is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * iotagent-mqtt is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with iotagent-mqtt.
 * If not, seehttp://www.gnu.org/licenses/.
 *
 * For those usages not covered by the GNU Affero General Public License
 * please contact with::[contacto@tid.es]
 */
var config = {};

/**
 * Configuration for the MQTT binding.
 */
config.mqtt = {
    /**
     * Host where the MQTT Broker is located.
     */
    host: 'localhost',

    /**
     * Port where the MQTT Broker is listening
     */
//    port: 1883,
    port: 8883, //security port
    
    /**
     * User name for the IoTAgent in the MQTT broker, if authentication is activated.
     */
    username: 'figuardian',

    /**
     * Password for the IoTAgent in the MQTT broker, if authentication is activated.
     */
    password: 'ufu',    
    cert: '/etc/mosquitto/easy/localhost.server.crt',
    key: '/etc/mosquitto/easy/localhost.server.key'
};
    
/**
 * Conmfiguration for the HTTP transport binding.
 */
config.http = {
    /**
     * Port where the HTTP Ultralight transport binding will be listening for device requests.
     */
    port: 7896
};


config.iota = {
    /**
     * Configures the log level. Appropriate values are: FATAL, ERROR, INFO, WARN and DEBUG.
     */
    logLevel: 'DEBUG',

    /**
     * When this flag is active, the IoTAgent will add the TimeInstant attribute to every entity created, as well
     * as a TimeInstant metadata to each attribute, with the current timestamp.
     */
    timestamp: false,
    
    /**
     * Context Broker configuration. Defines the connection information to the instance of the Context Broker where
     * the IoT Agent will send the device data.
     */
    contextBroker: {
        /**
         * Host where the Context Broker is located.
         */
        host: 'http://localhost',

        /**
         * Port where the Context Broker is listening.
         */
        port: '1026'
        //PORT 1027 SSL IN IOT BROKER
        //PORT 1026 NORMAL PORT IN IOT BROKER
    },

    
    
    /**
     * The ngsi request will be with ssl connections
     */
    ssl: {
        active: true,
        keyFile: 'certificados/server/key.pem',
        certFile: 'certificados/server/cert.pem',
        //ca: 'certificados/mqtt.perm',
        rejectUnauthorized: false
    },

    /**
     * Configuration of the Northbound server of the IoT Agent.
     */
    server: {
        /**
         * Port where the IoT Agent will be listening for requests.
         */
        port: 4061,
        ssl : {
            portSSL: 4062,
        
            /**
             * This flag activates the HTTPS protocol in the server. The endpoint always listen to the indicated port
             * independently of the chosen protocol.
             */
            active: true,

            /**
             * Key file to use for codifying the HTTPS requests. Only mandatory when the flag active is true.
             */
            keyFile: 'certificados/server/key.pem',

            /**
             * SSL Certificate to present to the clients. Only mandatory when the flag active is true.
             */
            certFile: 'certificados/server/cert.pem',

            ca: '',
            requestCert: false,
            rejectUnauthorized: false                 
        }       
    },

    authentication: {
        enabled: true,
        protocol: 'http://',
        host: 'localhost',
        port: '80',
        path: '/orion/token.php',
        user: 'caio',
        password: 'caio',
        domain: 'figuardian'
    },

    /**
     *
    authentication: {
        enabled: true,
        protocol: 'http://',
        host: 'localhost',
        port: '5000',
        path: '/v3/auth/tokens',
        user: 'caio',
        password: 'caio',
        domain: 'figuardian'
    },
    */    
    
    /**
     * Configuration for the IoT Manager. If the IoT Agent is part of a configuration composed of multiple IoTAgents
     * coordinated by an IoT Manager, this section defines the information that will be used to connect with that manager.
     */
//    iotManager: {
        /**
         * Host where the IoT Manager is located.
         */
//       host: 'localhost',

        /**
         * Port where the IoT Manager is listening.
         */
//       port: 8082,

        /**
         * Path where the IoT Manager accepts subscriptions.
         */
//       path: '/protocols',

        /**
         * Protocol code identifying this IoT Agent.
         */
//        protocol: 'MQTT_UL',

        /**
         * Textual description of this IoT Agent.
         */
//       description: 'MQTT Ultralight 2.0 IoT Agent (Node.js version)'
//   },

    /**
     * Default resource of the IoT Agent. This value must be different for every IoT Agent connecting to the IoT
     * Manager.
     */
    defaultResource: '/iot/d',

    /**
  	   * Defines the configuration for the Device Registry, where all the information about devices and configuration
     * groups will be stored. There are currently just two types of registries allowed:
     *
     * - 'memory': transient memory-based repository for testing purposes. All the information in the repository is
     *             wiped out when the process is restarted.
     *
     * - 'mongodb': persistent MongoDB storage repository. All the details for the MongoDB configuration will be read
     *             from the 'mongoDb' configuration property.
     */
    deviceRegistry: {
        type: 'memory'
    },

    /**
     * Mongo DB configuration section. This section will only be used if the deviceRegistry property has the type
     * 'mongodb'.
     */
    mongodb: {
        /**
         * Host where MongoDB is located. If the MongoDB used is a replicaSet, this property will contain a
         * comma-separated list of the instance names or IPs.
         */
        host: 'localhost',

        /**
         * Port where MongoDB is listening. In the case of a replicaSet, all the instances are supposed to be listening
         * in the same port.
         */
        port: '27017',

        /**
         * Name of the Mongo database that will be created to store IOTAgent data.
         */
        db: 'iotagentul'

        /**
         * Name of the set in case the Mongo database is configured as a Replica Set. Optional otherwise.
         */
        //replicaSet: ''
    },

    /**
     *  Types array for static configuration of services. Check documentation in the IoTAgent Library for Node.js for
     *  further details:
     *
     *      https://github.com/telefonicaid/iotagent-node-lib#type-configuration     
     */
    types: {
        'Room': {
            apikey: 'apikeyDevice1',//cada type deve ter uma API KEY diferente
            type: 'Room',
            service: 'figuardian',
            subservice: '/ufu',
            trust: 'd0fa707131204b56a46103c53e67fab7',
            cbHost: 'http://localhost:1027',
            commands: [{ "object_id": "z", "name": "turn", "type": "string" }],
            lazy: [],
            attributes: [
                {
                    name: 'statusConfigActive',
                    type: 'Boolean',
                    object_id: 'a'
                },
                {
                    name: 'luminescenceConfigActive',
                    type: 'Lumens',
                    object_id: 'b'                    
                }                
            ]
        },
        'Car': {
            apikey: 'apikeyDevice2',
            type: 'Car',
            service: 'figuardian',
            subservice: '/ufu',            
            trust: 'b17509-Trust',
            cbHost: 'http://localhost:1027',
            commands: [{ "object_id": "z", "name": "turn", "type": "string" }],
            lazy: [],
            attributes: [
                {
                    name: 'statusConfigActive',
                    type: 'Boolean',
                    object_id: 'a'
                },
                {
                    name: 'luminescenceConfigActive',
                    type: 'Lumens',
                    object_id: 'b'                    
                }                
            ]            
        }        
    },

	//types: {},

    /**
     * Default service, for IOTA installations that won't require preregistration.
     */
    service: 'universidade',

    /**
     * Default subservice, for IOTA installations that won't require preregistration.
     */
    subservice: '/subteste',

    /**
     * URL Where the IOTA Will listen for incoming updateContext and queryContext requests (for commands and passive
     * attributes). This URL will be sent in the Context Registration requests.
     */
    providerUrl: 'https://192.168.1.9:4062',//security connection
//    providerUrl: 'http://192.168.1.9:4061',
    

    /**
     * Default maximum expire date for device registrations.
     */
    deviceRegistrationDuration: 'P1Y',

    /**
     * Default type, for IOTA installations that won't require preregistration.
     */
    defaultType: 'Thing',
    pollingExpiration: 14890837853,
    pollingDaemonFrequency:  20    
};


/**
 * Default API Key, to use with device that have been provisioned without a Configuration Group.
 */
config.defaultKey = 'apikey-mqtt';

/**
 * Default transport protocol when no transport is provisioned through the Device Provisioning API.
 */
config.defaultTransport = 'MQTT';


module.exports = config;



