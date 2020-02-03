# Tank.bench-profile  
[![npm version](https://badge.fury.io/js/tank.bench-profile.svg)](https://www.npmjs.com/package/tank.bench-profile)  
  
## What is it?  

`Tank.bench-profile` is a part of [MixBytes.Tank](https://github.com/mixbytes/tank) -   
the ultimate tool for testing blockchain performance. 
  
This project contains types and functions that will help you to create profiles to run them via [Tank.bench-common](https://github.com/mixbytes/tank.bench-common)

Please see [Tank.bench-common](https://github.com/mixbytes/tank.bench-common) to find out compatible versions of these projects.

You can find the boilerplate of profile [here](https://github.com/mixbytes/tank.bench-common/tree/master/test/profiles/example/Example.ts)  

## What is profile?  

Profile is a node.js JavaScript/TypeScript project, that contains `package.json` file with dependencies and at least one entrypoint code file, that exports object created with the `Profile` function.

Profile can be compiled with [Tank.bench-profile-compiler](https://github.com/mixbytes/tank.bench-profile-compiler). It creates single js file that is called the `Compiled profile`. 

Profile can be run with [Tank.bench-common](https://github.com/mixbytes/tank.bench-common). It can run compiled profiles, or non-compiled profiles.


## Creating profiles  
 
To create profile you should create new node.js project with the command `npm init`.

Than, you should install tank.bench-common dependency to be able to run and debug your profile. To do it, just use `npm install --save-dev tank.bench-common` . 

After creating project, you should create the entrypoint file. It is a js/ts file that exports object created with the `Profile` function.

```typescript  
export const profile = Profile({  
    configSchema,  
  prepare,  
  destroyBench,  
  constructBench,  
  commitTransaction,  
  telemetry: {  
        constructTelemetry,  
        onBenchEnded,  
        onKeyPoint  
  }  
});  
```  

The argument of this function is an object with fields that are functions that get special arguments and return special objects. You can read about them below.

You can find the boilerplate of profile [here](https://github.com/mixbytes/tank.bench-common/tree/master/test/profiles/example/Example.ts)  
  
  
### configSchema  
ConfigSchema is the configuration schema of your profile. The `module.config.json` file should respect that schema,  
otherwise there will be an error. `Tank.bench-common` uses [node-convict](https://github.com/mozilla/node-convict)  
to parse schema, configuration files and commandline arguments.  
  
The configuration from file will be passed to the `prepare` function.  
  
  
### prepare  
This function is called once in the main thread. Here you can make some preparation transactions,  
try your connection to the node, create network accounts etc.  
Anything you return from this function will be cloned to benchmark threads via the  
[structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)  
  
  
### constructBench  
This function is called once for every benchmark thread.  
Here you can initialize your connection to the blockchain to commit transactions later.  
Anything you return from this function will be passed to the commitTransaction function.  
For example, you can return the blockchain connection object  
  
  
### destroyBench  
This function is called once for every benchmark thread.  
after the last transaction is processed.  
Here you can destroy your connection to the blockchain  
  
  
### commitTransaction  
This function is called multiple times for every benchmark thread.  
Here you may send the transaction to the blockchain network.  
You should return the TransactionResult for the prometheus telemetry to run fine  
The uniqueData argument contains string that is unique among other threads and this function calls  
  
  
### Telemetry  
`Tank.bench-common` is able to push it's own telemetry to prometheus.  
But if you want, you can implement your own telemetry module.  
  
  
To do this, you should create 3 functions - one will be called when the telemetry  
is going to be constructed, one - when destroyed and one will be called every N seconds  
(specified via common config).  
  
