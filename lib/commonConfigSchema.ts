import * as convict from "convict";

export const CommonConfigSchema = {
    logLevel: {
        arg: 'common.log.level',
        format: "int",
        default: 0,
        doc: "the level of the log. 0 - only errors, 3 - full log"
    },
    stopOn: {
        error: {
            arg: 'common.stopOn.error',
            format: ["stop", "print", "no"],
            default: "no",
            doc: "weather to stop benchmark on blockchain errors or not. Available values - (\"stop\", \"print\", \"no\")"
        },
        processedTransactions: {
            arg: 'common.stopOn.processedTransactions',
            format: "int",
            default: -1,
            doc: "Stop if achieved this amount of transactions. WARNING: some additional transactions may be processed."
        }
    },
    skipPreparation: {
        arg: 'skipPreparation',
        format: Boolean,
        default: false,
        doc: "weather to skip the preparation step or not (Bench step will receive commonConfig as config)"
    },
    prometheusTelemetry: {
        enable: {
            arg: 'prometheusTelemetry.enable',
            format: Boolean,
            default: false,
            doc: "weather to send telemetry to promethus gateway or not"
        },
        url: {
            arg: 'prometheusTelemetry.url',
            format: String,
            default: "",
            doc: "url of prometheus pushgateway"
        },
        user: {
            arg: 'prometheusTelemetry.user',
            format: String,
            default: "admin",
            doc: "user of prometheus pushgateway. If do not want to use auth, leave blank"
        },
        password: {
            arg: 'prometheusTelemetry.password',
            format: String,
            default: "admin",
            sensitive: true,
            doc: "password of prometheus pushgateway. If do not want to use auth, leave blank"
        },
        respCodeBuckets: {
            arg: 'prometheusTelemetry.respCodeBuckets',
            format: Array,
            default: [
                100,
                200,
                300,
                400,
                500
            ],
            doc: "possible return codes from node"
        },
        trxsDurationBuckets: {
            arg: 'prometheusTelemetry.trxsDurationBuckets',
            format: Array,
            default: [
                10,
                50,
                100,
                200,
                500,
                2000,
                10000
            ],
            doc: "buckets for possible transaction durations"
        }
    },
    telemetryStepInterval: {
        arg: 'common.dataStepInterval',
        format: Number,
        default: 1000,
        doc: "call onKeyPoint every N milliseconds"
    },
    tps: {
        arg: 'common.tps',
        format: Number,
        default: -1,
        doc: "desired transactions per second"
    },
    threadsAmount: {
        arg: 'common.threadsAmount',
        format: "int",
        default: -1,
        doc: "amount of threads to perform transfer transactions"
    },
    maxActivePromises: {
        arg: 'common.maxActivePromises',
        format: "int",
        default: -1,
        doc: "amount of threads to perform transfer transactions"
    },
    sharding: {
        shards: {
            arg: 'sharding.shards',
            format: "int",
            default: -1,
            doc: "amount of shards that run the benchmark simultaneously"
        },
        shardId: {
            arg: 'sharding.shardId',
            format: "int",
            default: -1,
            doc: "id of shard from shards that run the benchmark simultaneously"
        }
    }
};

type AntiConvict<T> = T extends convict.Schema<infer N> ? N : T;

export type CommonConfig = AntiConvict<typeof CommonConfigSchema>
